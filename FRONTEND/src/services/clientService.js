import api from "./api";

const clientService = {
  // ================= STATS =================
  getStats: async () => {
    const res = await api.get("/clients/stats");
    return res.data;
  },

  // ================= PROJECTS / DELIVERIES =================
  getProjects: async (category = "All") => {
    const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
    const res = await api.get(`/clients/projects${query}`);
    return res.data;
  },

  // FIXED: Forces browser to set multipart/form-data boundary
  createProject: async (formData) => {
    const res = await api.post("/clients/projects", formData, {
      headers: {
        "Content-Type": undefined, // CRITICAL: Allows browser to attach boundary
      },
    });
    return res.data;
  },

  updateProject: async (id, formData) => {
    const res = await api.put(`/clients/projects/${id}`, formData, {
      headers: {
        "Content-Type": undefined,
      },
    });
    return res.data;
  },

  deleteProject: async (id) => {
    const res = await api.delete(`/clients/projects/${id}`);
    return res.data;
  },

  // ================= REVIEWS =================
  getReviews: async (all = false) => {
    const res = await api.get(`/clients/reviews?all=${all}`);
    return res.data;
  },

  submitReview: async (reviewData) => {
    const res = await api.post("/clients/reviews", reviewData);
    return res.data;
  },

  adminCreateReview: async (formData) => {
    const res = await api.post("/clients/admin/reviews", formData, {
      headers: {
        "Content-Type": undefined,
      },
    });
    return res.data;
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
    const res = await api.post("/clients/feedbacks", formData, {
      headers: {
        "Content-Type": undefined,
      },
    });
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