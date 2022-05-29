/* eslint-disable */
import Axios from "axios";
import axiosRetry from "axios-retry";
import { cacheAdapterEnhancer } from "axios-extensions";
import { sumoLogger } from "sumoLogger";

export const axios = Axios.create({
  baseURL: "",
  timeout: 10e3,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  adapter: cacheAdapterEnhancer(Axios.defaults.adapter),
});

/**
 * This wrapper will retry any http-request that fails due to network/server errors.
 */
axiosRetry(axios, {
  retries: 4,
  retryCondition: (error) => {
    if (
      error &&
      error.message === "Network Error" &&
      error.config &&
      error.config.url.includes("lookup.")
    ) {
      return false;
    }
  },
  // eslint-disable-next-line no-magic-numbers
  retryDelay: () => 1000,
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorResp = error.response;
    if (errorResp) {
      sumoLogger.log({
        error: errorResp.data,
        userAgent: navigator.userAgent,
        params: error.config.params,
        headers: error.config.headers,
        apiUrl: error.config.url,
      });
    }

    if (error.message === "Network Error") {
      return Promise.reject(error.toJSON());
    } else if (errorResp) {
      let errorData = {};
      if (typeof errorResp.data === "string") {
        errorData.message = errorResp.data;
      } else if (errorResp.data === null) {
        errorData.message = "Error";
      } else if (errorResp.data.apiResult) {
        errorData = { ...errorResp.data.apiResult };
      } else {
        errorData = { ...errorResp.data };
      }
      return Promise.reject(errorData);
    }
    return Promise.reject(error);
  }
);
