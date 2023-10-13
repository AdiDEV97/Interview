import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllQuestions from '../Features/AllQuestions/Container/AllQuestions'
import Interview from '../Features/Interview/Container/Interview'
import AddQuestion from '../Features/Add Question/Container/AddQuestion'
import QuestionsByCategories from '../Features/Categories/Container/QuestionsByCategories'
import InterviewRequisites from '../Features/Interview/Component/InterviewRequisites'
import TestApi from '../Features/Interview/Component/TestApi'
import Result from '../Features/Interview/Component/Result'
import About from '../Features/About/Container/About'

const Routers = () => {
  return (
    <Routes>
        {/* <Route path="/" element="#" /> */}
        <Route path="/all-questions" element={<AllQuestions />} />
        <Route path="interview-requisites" element={<InterviewRequisites/>} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/new-question" element={<AddQuestion />} />
        <Route path="/categories" element={<QuestionsByCategories />} />
        <Route path="/result" element={<Result />} />
        <Route path="/about" element={<About />} />
        <Route path="/testapi" element={<TestApi />} />
    </Routes>
  )
}

export default Routers
