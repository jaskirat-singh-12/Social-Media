
import axios from "axios";

const AxiosContext = axios.create({
  baseURL: "https://social-media-3wo8.onrender.com", // backend URL
  withCredentials: true, // allow sending cookies
});

// If server sends 401, we can handle it globally
AxiosContext.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: auto logout on unauthorized
      console.warn("Unauthorized, logging out...");
    }
    return Promise.reject(error);
  }
);

export default AxiosContext;
