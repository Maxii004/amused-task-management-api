import axios from "axios";
import config from "../../config/config";
import logger from "./logger";

const axiosInstance = axios.create({
  baseURL: config.jsonplaceholder.apiUrl, // Use the URL from the config object
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    logger.info("Sending request", { url: config.url, method: config.method });
    return config;
  },
  (error) => {
    logger.error("Request error", { error });
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    logger.info("Received response", {
      url: response.config.url,
      status: response.status,
    });
    return response;
  },
  (error) => {
    logger.error("Response error", { error });
    return Promise.reject(error);
  }
);

export default axiosInstance;
