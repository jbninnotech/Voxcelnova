import Order from "../models/Order.js";
import Product from "../models/Product.js";

// =========================================================
// CREATE ORDER
// =========================================================
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      subtotal,
      deliveryCharge = 0,
      discount = 0,
      totalAmount,
      paymentMethod,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item.",
      });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({
        success: false,
        message: "Valid shipping address is required.",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method is required.",
      });
    }

    // Process items & update product stock
    const processedItems = [];
    for (const item of items) {
      const productId = item.product || item.productId;
      const product = await Product.findById(productId);

      if (product) {
        if (typeof product.stock === "number" && product.stock >= item.quantity) {
          product.stock -= item.quantity;
          await product.save();
        }
      }

      processedItems.push({
        product: productId,
        productName: item.productName || item.name || product?.name || "Product",
        image: item.image || product?.thumbnail || product?.images?.[0]?.url || "",
        size: item.selectedSize || item.size || "",
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
        subtotal: Number(item.subtotal) || (Number(item.price) * Number(item.quantity)),
      });
    }

    const calculatedSubtotal = Number(subtotal) || processedItems.reduce((acc, curr) => acc + curr.subtotal, 0);
    const calculatedTotal = Number(totalAmount) || Math.max(0, calculatedSubtotal + Number(deliveryCharge) - Number(discount));

    const isCod = paymentMethod === "Cash on Delivery" || paymentMethod === "COD";
    const initialPaymentStatus = isCod ? "Pending" : "Paid";

    const initialHistory = [
      { status: "Pending", timestamp: new Date(), note: "Order placed successfully" },
      { status: "Confirmed", timestamp: new Date(), note: "Order confirmed by system" }
    ];

    const order = await Order.create({
      user: req.user._id,
      items: processedItems,
      shippingAddress: {
        fullName: shippingAddress.fullName,
        phone: shippingAddress.phone,
        houseFlat: shippingAddress.houseFlat || shippingAddress.addressLine1 || "",
        street: shippingAddress.street || shippingAddress.addressLine2 || "",
        area: shippingAddress.area || shippingAddress.landmark || "",
        city: shippingAddress.city,
        state: shippingAddress.state,
        country: shippingAddress.country || "India",
        pincode: shippingAddress.pincode || shippingAddress.postalCode,
        addressType: shippingAddress.addressType || "Home",
      },
      subtotal: calculatedSubtotal,
      deliveryCharge: Number(deliveryCharge),
      discount: Number(discount),
      totalAmount: calculatedTotal,
      paymentMethod,
      paymentStatus: initialPaymentStatus,
      orderStatus: "Confirmed",
      statusHistory: initialHistory,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to place order. " + error.message,
    });
  }
};

// =========================================================
// GET USER ORDERS
// =========================================================
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      isDeletedByUser: { $ne: true },
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get user orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};

// =========================================================
// GET ORDER BY ID
// =========================================================
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = ["ADMIN", "CEO", "MANAGER"].includes(req.user.role);

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order by ID error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order details.",
    });
  }
};

// =========================================================
// CANCEL ORDER (USER)
// =========================================================
export const cancelUserOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this order.",
      });
    }

    const cancellableStatuses = ["Pending", "Confirmed"];
    if (!cancellableStatuses.includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Orders with status '${order.orderStatus}' cannot be cancelled.`,
      });
    }

    order.orderStatus = "Cancelled";
    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({
      status: "Cancelled",
      timestamp: new Date(),
      note: "Cancelled by customer",
    });

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to cancel order.",
    });
  }
};

// =========================================================
// SOFT DELETE ORDER (USER HISTORY HIDE)
// =========================================================
export const softDeleteUserOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    order.isDeletedByUser = true;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order removed from your history.",
    });
  } catch (error) {
    console.error("Soft delete order error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove order from history.",
    });
  }
};

// =========================================================
// GET ALL ORDERS (ADMIN)
// =========================================================
export const getAllOrders = async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = {};

    if (status && status !== "ALL") {
      query.orderStatus = status;
    }

    let orders = await Order.find(query)
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    if (search) {
      const term = search.toLowerCase().trim();
      orders = orders.filter((order) => {
        const orderIdMatch = order._id.toString().toLowerCase().includes(term);
        const userNameMatch = order.user?.name?.toLowerCase().includes(term);
        const userEmailMatch = order.user?.email?.toLowerCase().includes(term);
        return orderIdMatch || userNameMatch || userEmailMatch;
      });
    }

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin orders.",
    });
  }
};

// =========================================================
// UPDATE ORDER STATUS (ADMIN)
// =========================================================
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus, paymentVerificationToken } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const isOnlinePayment = !["Cash on Delivery", "COD"].includes(order.paymentMethod);

    if (paymentStatus && paymentStatus === "Paid" && order.paymentStatus !== "Paid" && isOnlinePayment) {
      if (!paymentVerificationToken || paymentVerificationToken !== "SYSTEM_VERIFIED_TRANSACTION_KEY") {
        return res.status(400).json({
          success: false,
          message: "Manual verification of online payment failed: Missing valid backend payment verification token.",
        });
      }
    }

    if (orderStatus) {
      const validStatuses = [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "OutForDelivery",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ];
      if (!validStatuses.includes(orderStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status.",
        });
      }

      order.orderStatus = orderStatus;

      if (!order.statusHistory) order.statusHistory = [];
      const lastStatus = order.statusHistory[order.statusHistory.length - 1]?.status;
      if (lastStatus !== orderStatus) {
        order.statusHistory.push({
          status: orderStatus,
          timestamp: new Date(),
          note: `Status updated to ${orderStatus} by Admin`,
        });
      }
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order status.",
    });
  }
};

// =========================================================
// VALIDATE COUPON
// =========================================================
export const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal = 0 } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required.",
      });
    }

    const cleanCode = code.trim().toUpperCase();
    const numSubtotal = Number(subtotal);

    const coupons = {
      NOVA10: { type: "percent", value: 10, description: "10% off on all orders" },
      WELCOME50: { type: "flat", value: 50, description: "Flat ₹50 discount" },
      FREESHIP: { type: "shipping", value: 99, description: "Free Delivery" },
      FASHION20: { type: "percent", value: 20, description: "20% off fashion collection" },
    };

    const coupon = coupons[cleanCode];

    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: "Invalid coupon code. Try NOVA10 or WELCOME50.",
      });
    }

    let discount = 0;
    if (coupon.type === "percent") {
      discount = Math.round((numSubtotal * coupon.value) / 100);
    } else if (coupon.type === "flat") {
      discount = Math.min(coupon.value, numSubtotal);
    } else if (coupon.type === "shipping") {
      discount = coupon.value;
    }

    return res.status(200).json({
      success: true,
      message: `Coupon '${cleanCode}' applied successfully!`,
      coupon: {
        code: cleanCode,
        discount,
        description: coupon.description,
      },
    });
  } catch (error) {
    console.error("Validate coupon error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to validate coupon.",
    });
  }
};
