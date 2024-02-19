export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const response = {
            retrievable: true,
            message: "",
            location: {
              latitude: latitude,
              longitude: longitude,
            },
          };

          resolve(response);
        },
        (error) => {
          const response = {
            retrievable: false,
            message: "Error getting location: " + error.message,
            location: {
              latitude: 0.0,
              longitude: 0.0,
            },
          };

          reject(response);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      const response = {
        retrievable: false,
        message: "Geolocation is not supported by this browser.",
        location: {
          latitude: 0.0,
          longitude: 0.0,
        },
      };

      reject(response);
    }
  });
};
