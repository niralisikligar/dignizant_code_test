// import axios from "axios";
// import { API_BASE_URL } from "./config";

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) =>
//     Promise.reject(
//       (error.response && error.response.data) || "Something went wrong!"
//     )
// );

// export default axiosInstance;

import axios from "axios";
// import NetInfo from "@react-native-community/netinfo";

export const host =
  "http://ec2-52-66-67-174.ap-south-1.compute.amazonaws.com:3107";

let axiosInstance = axios.create({
  baseURL: host,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

const value = false;

// function network() {
//   return new Promise((resolve, reject) => {
//     NetInfo.fetch().then((state) => {
//       console.log("state.isConnected", state.isConnected);
//       resolve(state.isConnected);
//     });
//   });
// }

axiosInstance.interceptors.request.use(
  async (config) => {
    // console.log("config", config);
    // if (await network()) {
    return config;
    // } else {
    //   // return config;
    //   return Promise.reject("Please connect internet");
    // }
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
