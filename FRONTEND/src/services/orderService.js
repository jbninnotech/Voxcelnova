import api from "./api";

// Create Order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to create order.");
  }
};

// Get User Orders
export const getUserOrders = async () => {
  try {
    const response = await api.get("/orders/my-orders");
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to fetch orders.");
  }
};

// Get Order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to fetch order details.");
  }
};

// Cancel User Order
export const cancelUserOrder = async (orderId) => {
  try {
    const response = await api.post(`/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to cancel order.");
  }
};

// Soft Delete User Order (Hide from user history)
export const softDeleteUserOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to remove order.");
  }
};

// Validate Coupon
export const validateCouponApi = async (code, subtotal) => {
  try {
    const response = await api.post("/orders/validate-coupon", { code, subtotal });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Invalid coupon code.");
  }
};

// Admin: Get All Orders
export const getAllOrdersAdmin = async (search = "", status = "ALL") => {
  try {
    const response = await api.get(
      `/orders/admin/all?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to fetch admin orders.");
  }
};

// Admin: Update Order Status
export const updateOrderStatusAdmin = async (orderId, orderStatus, paymentStatus = "") => {
  try {
    const response = await api.patch(`/orders/admin/${orderId}/status`, {
      orderStatus,
      paymentStatus,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to update order status.");
  }
};
