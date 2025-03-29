import axios from "axios";

// Corrigir a URL do backend
const api = axios.create({
  baseURL: "https://estoque-springboot.onrender.com/api",
});

export default api;
