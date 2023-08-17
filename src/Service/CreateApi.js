import axios from "axios";

// Base URL
export const BASE_URL = "http://localhost:8082"

// ApiRequests for public URLs
export const performApiRequest = axios.create({
    baseUrl : BASE_URL
});