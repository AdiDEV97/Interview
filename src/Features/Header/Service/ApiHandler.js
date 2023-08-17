import { BASE_URL, performApiRequest } from "../../../Service/CreateApi"

export const getAllQuestions = async () => {
    const response = await performApiRequest.get(`${BASE_URL}/api/v1/prep/all-questions`);
    return response.data;
}

export const getQuestionById = async (question_id) => {
    const response = await performApiRequest.get(`${BASE_URL}/api/v1/prep/question/id-${question_id}`, question_id);
    return response.data;
}