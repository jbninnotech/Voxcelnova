import api from "./api";

const clientService = {
  // ================= STATS =================
  getStats: async () => {
    try {
      const res = await api.get("/clients/stats");
      return res.data;
    } catch {
      const res = await api.get("/client-stats");
      return res.data;
    }
  },

  // ================= PROJECTS / DELIVERIES =================
  getProjects: async (category = "All") => {
    const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
    try {
      // First try /clients/projects
      const res = await api.get(`/clients/projects${query}`);
      return res.data;
    } catch (err) {
      // Fallback to /clients
      const res = await api.get(`/clients${query}`);
      return res.data;
    }
  },

  createProject: async (formData) => {
    try {
      const res = await api.post("/clients/projects", formData);
      return res.data;
    } catch {
      const res = await api.post("/clients", formData);
      return res.data;
    }
  },

  updateProject: async (id, formData) => {
    try {
      const res = await api.put(`/clients/projects/${id}`, formData);
      return res.data;
    } catch {
      const res = await api.put(`/clients/${id}`, formData);
      return res.data;
    }
  },

  deleteProject: async (id) => {
    try {
      const res = await api.delete(`/clients/projects/${id}`);
      return res.data;
    } catch {
      const res = await api.delete(`/clients/${id}`);
      return res.data;
    }
  },

  // ================= REVIEWS =================
  getReviews: async (all = false) => {
    try {
      const res = await api.get(`/clients/reviews?all=${all}`);
      return res.data;
    } catch {
      const res = await api.get(`/reviews?all=${all}`);
      return res.data;
    }
  },

  submitReview: async (reviewData) => {
    const res = await api.post("/clients/reviews", reviewData);
    return res.data;
  },

  adminCreateReview: async (formData) => {
    try {
      const res = await api.post("/clients/admin/reviews", formData);
      return res.data;
    } catch {
      const res = await api.post("/clients/reviews/admin", formData);
      return res.data;
    }
  },

  toggleReviewApproval: async (id) => {
    const res = await api.patch(`/clients/reviews/${id}/approve`);
    return res.data;
  },

  deleteReview: async (id) => {
    const res = await api.delete(`/clients/reviews/${id}`);
    return res.data;
  },

  // ================= FEEDBACKS =================
  getFeedbacks: async (all = false) => {
    const res = await api.get(`/clients/feedbacks?all=${all}`);
    return res.data;
  },

  createFeedback: async (formData) => {
    const res = await api.post("/clients/feedbacks", formData);
    return res.data;
  },

  toggleFeedbackPublication: async (id) => {
    const res = await api.patch(`/clients/feedbacks/${id}/publish`);
    return res.data;
  },

  deleteFeedback: async (id) => {
    const res = await api.delete(`/clients/feedbacks/${id}`);
    return res.data;
  },
};

export default clientService;