export const failedRequest = (error) => {
  let errorMessage = "An error occurred.";
  let statusCode = null;

  console.log('Error:', error);

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = error.response.data.message || "Server Error";
    statusCode = error.response.status;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = "Network Error";
  } else {
    // Something happened in setting up the request that triggered an error
    errorMessage = error.message || "Request Error";
  }

  return { message: errorMessage, code: statusCode };
};
