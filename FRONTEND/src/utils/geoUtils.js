// src/utils/geoUtils.js

export const fetchCurrentLocationAddress = () => {
  return new Promise((resolve, reject) => {
    // 1. Check if the browser supports geolocation
    if (!navigator.geolocation) {
      return reject(new Error("Your browser does not support geolocation."));
    }

    // 2. Request current GPS coordinates from the device
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 3. Send coordinates to OpenStreetMap to get street/city details
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                "Accept-Language": "en", // Forces response in English
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch address details from map server.");
          }

          const data = await response.json();
          const addr = data.address || {};

          // 4. Map the API response into clean fields for your form
          resolve({
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
          });
        } catch (err) {
          reject(new Error("Network error while resolving address."));
        }
      },
      (error) => {
        // Handle common browser errors
        if (error.code === 1) {
          reject(new Error("Permission denied. Please allow location access."));
        } else if (error.code === 2) {
          reject(new Error("Position unavailable. Check your device GPS."));
        } else if (error.code === 3) {
          reject(new Error("Location request timed out."));
        } else {
          reject(new Error("Could not detect location."));
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
};