import axios from "axios";

const devBaseURL =
  import.meta.env.VITE_BACKEND_URL_DEVELOPMENT_WITH_ENDPOINT ||
  import.meta.env.VITE_BACKENT_URL_DEVELOPMENT ||
  "http://localhost:5001/api";

const apiInstance = axios.create({
  baseURL: import.meta.env.DEV ? devBaseURL : "/api",
  withCredentials: true,
});

export default apiInstance;
