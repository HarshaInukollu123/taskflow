import axios from "../utils/axiosInstance.js";

export const loginAPI = (credentials) => {
  return axios.post("/auth/login", credentials);
};

export const registerAPI = (userData) => {
    return axios.post("/auth/register", userData);
  };

