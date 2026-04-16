import axios from "axios";

// 🔹 Creamos una instancia de axios
const api = axios.create({
  baseURL: "http://localhost:5000",
});

// 🔹 Exportamos para usar en toda la app
export default api;
