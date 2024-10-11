import { BASE_URL, performApiRequest } from "../../../Service/CreateApi"

// Header API Handler

export const getAllQuestions = async () => {
    const response = await performApiRequest.get(`${BASE_URL}/api/v1/prep/all-questions`);
    return response.data;
}

export const getQuestionsByCategoryApi = async (categoryId) => {
    const response = await performApiRequest.get(`${BASE_URL}/api/v1/prep/byCategory/id-${categoryId}`, categoryId);
    return response.data;
}

export const getQuestionById = async (question_id) => {
    const response = await performApiRequest.get(`${BASE_URL}/api/v1/prep/question/id-${question_id}`, question_id);
    return response.data;
}

export const deleteQuestionByIdApi = async (question_id) => {
    const response = await performApiRequest.delete(`${BASE_URL}/api/v1/prep/delete/id-${question_id}`, question_id);
    return response.data;
}

export const getQuestionBySearchApi = async (keyword) => {
    const response = await performApiRequest.get(`${BASE_URL}/api/v1/prep/search/verdict=${keyword}`, keyword);
    return response.data;
}

export const getQuestionsByMultipleEntities = async (data) => {
    console.log('Data from API HANDLER - ', data);

    const response = await performApiRequest.get(`${BASE_URL}/api/v1/prep/questions-by-selected-topics?interviewerName=${data.interviewerName}&companyName=${data.companyName}&selectedTopics=${data.selectedTopics}&questionCount=${data.questionCount}&time=${data.time}`);

    return {info: data, questions: response.data};
    //return response

}

export const changeQuestionStatus = async (question_id, data) => {
    console.log('Status --> ', data);

    const response = await performApiRequest.put(`${BASE_URL}/api/v1/prep/update-status/id-${question_id}`, data, {headers: {'Content-Type': 'text/plain'}});

    console.log('RESPONSE FROM STATUS ----------- ', response);

    return response
}
