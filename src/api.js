import axios from 'axios';
console.log(import.meta.env.API_URL);
export default axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true
});