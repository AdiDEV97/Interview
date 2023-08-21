import { BASE_URL, performApiRequest } from "../../../Service/CreateApi";

export const getAllCategories = async () => {
    const response = await performApiRequest.get(`${BASE_URL}/api/v1/category/all-categories`);
    return response.data;
}