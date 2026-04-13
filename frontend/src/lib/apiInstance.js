import axios from "axios";

const apiInstance = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "dev"
      ? import.meta.env.VITE_BACKEND_URL_DEVELOPMENT_WITH_ENDPOINT
      : import.meta.env.VITE_BACKEND_URL_WITH_ENDPOINT,
  withCredentials: true,
});

export default apiInstance;
