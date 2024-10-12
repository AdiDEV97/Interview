import React from 'react'
import { getQuestionsByMultipleEntities } from '../../Header/Service/ApiHandler'
import axios from 'axios';

// Test Api Component

const TestApi = () => {

  function handleMultipleEntities() {
    const data = {
        interviewerName: "aaaa",
        companyName: "bbbb",
        selectedTopics: [1, 2, 3],
        questionCount: "12",
        time: "10"
    }
    getQuestionsByMultipleEntities(data).then((resp) => {
        console.log('RESP - ', resp);
    }).catch((err) => {console.log("ERR - ", err)});

    axios.get("http://localhost:8082/api/v1/prep/test").then((resp) => {
        console.log(resp);
    }).catch((err) => {
        console.log('Error - ', err);
    })
  }

  return (
    <div>
        <h3>Test API</h3>

        <button onClick= {handleMultipleEntities}>Call getQuestionsByMultipleEntities Api</button>
    </div>
  )
}

export default TestApi
