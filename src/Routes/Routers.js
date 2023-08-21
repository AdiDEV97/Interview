import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllQuestions from '../Features/AllQuestions/Container/AllQuestions'
import Interview from '../Features/Interview/Container/Interview'
import AddQuestion from '../Features/Add Question/Container/AddQuestion'

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element="#" />
        <Route path="/all-questions" element={<AllQuestions />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/new-question" element={<AddQuestion />} />
    </Routes>
  )
}

export default Routers
