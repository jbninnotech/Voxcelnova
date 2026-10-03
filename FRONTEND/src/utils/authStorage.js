// src/utils/authStorage.js

export const authStorage = {
  setToken(token) {
    if (token) {
      sessionStorage.setItem("token", token);
    }
  },

  getToken() {
    return sessionStorage.getItem("token");
  },

  removeToken() {
    sessionStorage.removeItem("token");
  },

  setUser(user) {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  },

  getUser() {
    try {
      const user = sessionStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error("Failed to parse user session:", e);
      return null;
    }
  },

  removeUser() {
    sessionStorage.removeItem("user");
  },

  setRole(role) {
    if (role) {
      sessionStorage.setItem("role", role);
    }
  },

  getRole() {
    return sessionStorage.getItem("role");
  },

  removeRole() {
    sessionStorage.removeItem("role");
  },

  clear() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("buyNowCheckout");
  },
};

export default authStorage;
