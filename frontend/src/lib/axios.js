import axios from "axios"

// in prodution there is nothing called localhost so this should be dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"
const api=axios.create({
    baseURL: BASE_URL,
})

export default api;