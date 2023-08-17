import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllQuestions from '../Features/AllQuestions/Container/AllQuestions'

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element="#" />
        <Route path="/all-questions" element={<AllQuestions />} />
    </Routes>
  )
}

export default Routers
