import axios from "axios";

/*
  Create an axios instance with base backend URL
*/
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

/*
  Interceptor runs BEFORE every request
  We attach JWT automatically if present
*/
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
