// src/utils/request.ts
import axios from "axios";

const request = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com/", 测试todo
  baseURL: "http://127.0.0.1:8000/api/v1/books",
  timeout: 8000,
});

// 请求拦截器（可添加 token）
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器（统一处理错误）
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("请求出错:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default request;
