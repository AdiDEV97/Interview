import { BASE_URL, performApiRequest } from "../../../Service/CreateApi";

export const addNewQuestionApi = async (categoryId, newQuestionData) => {

    const response = await performApiRequest.post(`${BASE_URL}/api/v1/prep/add-question/categoryId-${categoryId}`, newQuestionData);
    return response.data;
}

export const getAllCategoriesApi = async () => {
    const response = await performApiRequest.get(`${BASE_URL}/api/v1/category/all-categories`);
    return response.data;
}