const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
};

// Create Order
export const createOrder = async (orderData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create order.");
  }
  return data;
};

// Get User Orders
export const getUserOrders = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/orders/my-orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders.");
  }
  return data;
};

// Get Order by ID
export const getOrderById = async (orderId) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch order details.");
  }
  return data;
};

// Validate Coupon
export const validateCouponApi = async (code, subtotal) => {
  const response = await fetch(`${API_URL}/orders/validate-coupon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, subtotal }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Invalid coupon code.");
  }
  return data;
};

// Admin: Get All Orders
export const getAllOrdersAdmin = async (search = "", status = "ALL") => {
  const token = getToken();
  const response = await fetch(
    `${API_URL}/orders/admin/all?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch admin orders.");
  }
  return data;
};

// Admin: Update Order Status
export const updateOrderStatusAdmin = async (orderId, orderStatus, paymentStatus = "") => {
  const token = getToken();
  const response = await fetch(`${API_URL}/orders/admin/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderStatus, paymentStatus }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update order status.");
  }
  return data;
};
