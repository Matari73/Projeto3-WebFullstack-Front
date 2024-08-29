import axios from "axios";

const BASE_URL =  "http://localhost:3001";

export function login(data) {
    const response = axios.post(`${BASE_URL}/login`, data);
    return response
}