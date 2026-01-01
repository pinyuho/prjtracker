import axios from "axios";

const agent = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // 讓 cookie 會跟著 request
});

export default agent;
