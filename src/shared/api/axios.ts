import axios, { type CreateAxiosDefaults } from "axios";
import {
  getAccessToken,
  removeFromStorage,
  saveTokenStorage,
} from "../lib/auth-tokens";
import { errorCatch } from "./error";

const options: CreateAxiosDefaults = {
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const api = axios.create(options);

const apiWithAuth = axios.create(options);

apiWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 ||
      errorCatch(error) === "jwt expired" ||
      (errorCatch(error) === "jwt must be provided" &&
        error.config &&
        !error.config._isRetry)
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await api.get("/auth/refresh");
        if (response.data.access_token)
          saveTokenStorage(response.data.access_token);

        return apiWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") {
          removeFromStorage();
        }
      }
    }
    throw error;
  },
);

const countryApi = axios.create({
  baseURL: "https://api.countrystatecity.in/v1",
  headers: {
    "Content-Type": "application/json",
    "X-CSCAPI-KEY": "API_KEY",
  },
});

export { api, apiWithAuth, countryApi };
