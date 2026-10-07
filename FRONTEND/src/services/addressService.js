// ============================================================================
// ENVIRONMENT VARIABLES & CONFIGURATION
// ============================================================================

const API_URL =
  import.meta.env.VITE_API_BASE_URL|| "http://localhost:5000/api";

const GEO_URL =
  import.meta.env.VITE_GEOCODE_URL ||
  "https://nominatim.openstreetmap.org/reverse";

// ============================================================================
// AUTHENTICATION HELPERS
// ============================================================================

const getToken = () => {
  return sessionStorage.getItem("token");
};

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ============================================================================
// 1. GET ALL ADDRESSES
// ============================================================================

export const getAddresses = async () => {
  const response = await fetch(`${API_URL}/addresses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch addresses");
  }

  return data;
};

// ============================================================================
// 2. ADD A NEW ADDRESS
// ============================================================================

export const addAddress = async (addressData) => {
  const response = await fetch(`${API_URL}/addresses`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(addressData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add address");
  }

  return data;
};

// ============================================================================
// 3. UPDATE AN EXISTING ADDRESS
// ============================================================================

export const updateAddress = async (id, addressData) => {
  const response = await fetch(`${API_URL}/addresses/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(addressData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update address");
  }

  return data;
};

// ============================================================================
// 4. DELETE AN ADDRESS
// ============================================================================

export const deleteAddress = async (id) => {
  const response = await fetch(`${API_URL}/addresses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete address");
  }

  return data;
};

// ============================================================================
// 5. SET DEFAULT ADDRESS
// ============================================================================

export const setDefaultAddress = async (id) => {
  const response = await fetch(`${API_URL}/addresses/${id}/default`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to set default address");
  }

  return data;
};

// ============================================================================
// 6. GEOLOCATION: GET GPS COORDINATES FROM DEVICE
// ============================================================================

export const getDeviceCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(
        new Error("Geolocation is not supported by your current browser.")
      );
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                "Location permission denied. Please allow location access in your browser settings."
              )
            );
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location signal is unavailable."));
            break;
          case error.TIMEOUT:
            reject(new Error("Location request timed out. Please try again."));
            break;
          default:
            reject(new Error("Failed to detect your current location."));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

// ============================================================================
// 7. REVERSE GEOCODING: CONVERT (LAT, LON) TO READABLE ADDRESS
// ============================================================================

export const reverseGeocodeCoordinates = async (latitude, longitude) => {
  const url = `${GEO_URL}?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en", // Ensures address comes in English
    },
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve address from the map service.");
  }

  const data = await response.json();
  const addr = data.address || {};

  // Formats returned components into clean form fields
  return {
    latitude,
    longitude,
    addressLine1: [
      addr.house_number,
      addr.road,
      addr.suburb || addr.neighbourhood,
    ]
      .filter(Boolean)
      .join(", "),
    city: addr.city || addr.town || addr.village || addr.county || "",
    state: addr.state || "",
    postalCode: addr.postcode || "",
    country: addr.country || "",
  };
};

// ============================================================================
// 8. COMBINED HELPER: FETCH CURRENT DEVICE LOCATION & ADDRESS
// ============================================================================

export const getCurrentLocationAddress = async () => {
  // Step 1: Query browser hardware for GPS coords
  const { latitude, longitude } = await getDeviceCoordinates();

  // Step 2: Query map API to resolve street, city, state, postalCode
  return await reverseGeocodeCoordinates(latitude, longitude);
};