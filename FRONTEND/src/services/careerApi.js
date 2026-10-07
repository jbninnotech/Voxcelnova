const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";


// =========================================================
// TOKEN
// =========================================================

import authStorage from "../utils/authStorage";

const getToken = () => {
  return authStorage.getToken() || "";
};


// =========================================================
// HEADERS
// =========================================================

const authHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
};


// =========================================================
// GET JOBS
// =========================================================

export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(
    ([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    }
  );

  const query = params.toString();

  const response = await fetch(
    `${API_URL}/careers${
      query ? `?${query}` : ""
    }`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load jobs"
    );
  }

  return data;
};


// =========================================================
// GET SINGLE JOB
// =========================================================

export const getJob = async (id) => {
  const response = await fetch(
    `${API_URL}/careers/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load job"
    );
  }

  return data;
};


// =========================================================
// CREATE JOB
// =========================================================

export const createJob = async (jobData) => {
  const response = await fetch(
    `${API_URL}/careers`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(jobData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create job"
    );
  }

  return data;
};


// =========================================================
// UPDATE JOB
// =========================================================

export const updateJob = async (
  id,
  jobData
) => {
  const response = await fetch(
    `${API_URL}/careers/${id}`,
    {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(jobData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update job"
    );
  }

  return data;
};


// =========================================================
// DELETE JOB
// =========================================================

export const deleteJob = async (id) => {
  const response = await fetch(
    `${API_URL}/careers/${id}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete job"
    );
  }

  return data;
};


// =========================================================
// ADMIN JOBS
// =========================================================

export const getAdminJobs = async () => {
  const response = await fetch(
    `${API_URL}/careers/admin/all`,
    {
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to load admin jobs"
    );
  }

  return data;
};


// =========================================================
// APPLY JOB
// =========================================================

export const applyForJob = async (
  formData
) => {
  const response = await fetch(
    `${API_URL}/applications/apply`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to submit application"
    );
  }

  return data;
};


// =========================================================
// ADMIN APPLICATIONS
// =========================================================

export const getApplications =
  async () => {
    const response = await fetch(
      `${API_URL}/applications/admin`,
      {
        headers: authHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to load applications"
      );
    }

    return data;
  };


// =========================================================
// APPLICATION STATS
// =========================================================

export const getApplicationStats =
  async () => {
    const response = await fetch(
      `${API_URL}/applications/admin/stats`,
      {
        headers: authHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to load statistics"
      );
    }

    return data;
  };


// =========================================================
// UPDATE APPLICATION
// =========================================================

export const updateApplication =
  async (
    id,
    updateData
  ) => {
    const response = await fetch(
      `${API_URL}/applications/admin/${id}`,
      {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(
          updateData
        ),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to update application"
      );
    }

    return data;
  };


// =========================================================
// DELETE APPLICATION
// =========================================================

export const deleteApplication =
  async (id) => {
    const response = await fetch(
      `${API_URL}/applications/admin/${id}`,
      {
        method: "DELETE",
        headers: authHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to delete application"
      );
    }

    return data;
  };