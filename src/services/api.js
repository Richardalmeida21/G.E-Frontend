import axios from "axios";

const api = axios.create({
  baseURL: "https://estoque-springboot-production.up.railway.app/api",
});


export default api;
