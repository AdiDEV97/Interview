import axios from "axios";

// Main APIs

// Base URL
//export const BASE_URL = "http://localhost:8082"
export const BASE_URL = "http://16.171.192.96:8082"
//export const BASE_URL = "http://localhost:5001"

// ApiRequests for public URLs
export const performApiRequest = axios.create({
    baseUrl : BASE_URL
});
