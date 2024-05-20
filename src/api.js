import axios from 'axios';
export default axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true
});