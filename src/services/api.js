import axios from "axios";

// Criando a instância do axios
const api = axios.create({
  baseURL: "https://estoque-springboot-production.up.railway.app/api", // URL base do seu backend
});

export default api;
