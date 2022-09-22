import axios from "axios";
import { API_BASE_URL } from "../../config";

import "react-toastify/dist/ReactToastify.min.css";

let axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

axiosInstance.interceptors.request.use(
  // async (config) => {
  //   console.log("config", config);
  //   return config;
  // },
  // (error) => {
  //   console.log("error//////", error);
  //   return Promise.reject(error);
  // }
  (config) => {
    config.headers['authorization'] = `Bearer ${localStorage.getItem('token')}`;
    // config.headers["token"] = localStorage.getItem("token");
    console.log("config", config);
    return config;
  },
  (error) => {
    // console.log("error//////", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("response!!!!", response);
    return response.data;
  },
  (error) => {
    // console.log("error...", error, error.response, error.response.status);
    // const xhr = axiosRetry(error);
    // if (xhr) return xhr;

    if (error && error.response && error.response.status == 404) {
      return Promise.reject("bad url");
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
