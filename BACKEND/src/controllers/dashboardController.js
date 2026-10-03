import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

// =========================================================
// GET REPORTS & ANALYTICS STATS
// GET /api/reports or /api/dashboard/stats
// Query params: ?range=7days|30days|thisMonth|lastMonth|3months|6months|thisYear|today
// =========================================================
export const getDashboardStats = async (req, res) => {
  try {
    const { range = "30days" } = req.query;

    const now = new Date();
    let startDate = new Date(0); // Default all time if unspecified

    if (range === "today") {
      startDate = new Date(now.setHours(0, 0, 0, 0));
    } else if (range === "7days") {
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (range === "30days") {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    } else if (range === "thisMonth") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (range === "lastMonth") {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    } else if (range === "3months") {
      startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    } else if (range === "6months") {
      startDate = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);
    } else if (range === "thisYear") {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    const dateFilter = { createdAt: { $gte: startDate } };

    // 1. Total Products
    const totalProducts = await Product.countDocuments();

    // 2. Orders query in filtered range
    const rangeOrders = await Order.find(dateFilter);
    const totalOrders = rangeOrders.length;

    // 3. Status counters & Revenue
    let totalRevenue = 0;
    let pendingOrders = 0;
    let completedOrders = 0;
    let cancelledOrders = 0;

    const statusCounts = {
      Pending: 0,
      Confirmed: 0,
      Processing: 0,
      Shipped: 0,
      OutForDelivery: 0,
      Delivered: 0,
      Cancelled: 0,
    };

    const productSalesMap = {};

    rangeOrders.forEach((order) => {
      const status = order.orderStatus || "Pending";
      const normStatus = status.replace(/\s+/g, "");

      if (normStatus === "Cancelled") {
        cancelledOrders++;
        statusCounts.Cancelled++;
      } else {
        totalRevenue += Number(order.totalAmount || 0);
        if (normStatus === "Delivered") {
          completedOrders++;
          statusCounts.Delivered++;
        } else if (normStatus === "Pending") {
          pendingOrders++;
          statusCounts.Pending++;
        } else if (normStatus === "Confirmed") {
          statusCounts.Confirmed++;
        } else if (normStatus === "Processing") {
          statusCounts.Processing++;
        } else if (normStatus === "Shipped") {
          statusCounts.Shipped++;
        } else if (normStatus === "OutForDelivery" || normStatus === "OutforDelivery") {
          statusCounts.OutForDelivery++;
        }
      }

      // Track product sales for Bar Chart
      if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
          const pName = item.productName || "Product";
          if (!productSalesMap[pName]) {
            productSalesMap[pName] = { unitsSold: 0, revenue: 0 };
          }
          productSalesMap[pName].unitsSold += Number(item.quantity || 1);
          productSalesMap[pName].revenue += Number(item.subtotal || item.price * item.quantity || 0);
        });
      }
    });

    // 4. Total Customers
    const totalCustomers = await User.countDocuments({ role: "USER" });

    // 5. Format Product Sales for Bar Graph (Top 8 products)
    const productSales = Object.keys(productSalesMap)
      .map((name) => ({
        name,
        unitsSold: productSalesMap[name].unitsSold,
        revenue: productSalesMap[name].revenue,
      }))
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 8);

    // 6. Format Order Distribution for Donut Graph
    const orderDistribution = [
      { name: "Pending", count: statusCounts.Pending, color: "#F59E0B" },
      { name: "Confirmed", count: statusCounts.Confirmed, color: "#10B981" },
      { name: "Processing", count: statusCounts.Processing, color: "#3B82F6" },
      { name: "Shipped", count: statusCounts.Shipped, color: "#6366F1" },
      { name: "Out for Delivery", count: statusCounts.OutForDelivery, color: "#8B5CF6" },
      { name: "Delivered", count: statusCounts.Delivered, color: "#059669" },
      { name: "Cancelled", count: statusCounts.Cancelled, color: "#EF4444" },
    ];

    return res.status(200).json({
      success: true,
      range,
      data: {
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        totalCustomers,
        productSales,
        orderDistribution,
      },
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load report metrics: " + error.message,
    });
  }
};