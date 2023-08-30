import { BASE_URL, performApiRequest } from "../../../Service/CreateApi"

export const addCategoryApi = async (category) => {
    const resp = await performApiRequest.post(`${BASE_URL}/api/v1/category/new-category`, category);
    return resp.data;
}