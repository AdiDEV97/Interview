import React from 'react'

const AboutComponent = () => {
  return (
    <div>
        <p className='display-5'>About Us</p>
        <div className='text-justify px-4' style={{fontSize:"2vmin"}}>
            <p>Welcome to InterviewMaster, your one-stop destination for interview preparation and practice. At InterviewMaster, we understand the importance of being well-prepared for interviews, whether you are seeking your dream job, preparing for a career change, or simply looking to refine your interview skills. Our platform is designed to help you do just that, and more.</p>

            <br/><h4 style={{fontSize:"4vmin"}}>Our Mission</h4>

            <p>Our mission is simple yet impactful: to empower you with the knowledge, confidence, and skills needed to ace your interviews. We know that each interview is a unique opportunity to showcase your abilities, and we want to make sure you're ready for every question that comes your way.</p>

            <br/><h4 style={{fontSize:"4vmin"}}>What Sets Us Apart</h4>

            <big>Categorized Question Bank:</big> <p>InterviewMaster offers an extensive question bank meticulously sorted into topic wise categories. Whether you're preparing for a technical interview, a behavioral assessment, or any other type of interview, we have you covered. Our categories span across various industries and roles, from software development and marketing to healthcare and finance.</p>

            <br/><big>Add New Questions and Categories:</big> <p>We understand that interviews evolve, and so do their questions. That's why InterviewMaster allows users to contribute and add new questions, as well as create new categories. Your input enriches our database and ensures that we stay up-to-date with the latest industry trends and interview styles.</p>

            <br/><big>Customized Interview Practice:</big> <p>Not all interviews are the same, and neither should your preparation be. Our platform allows you to select questions according to specific job roles, industries, and interview types. Tailor your practice sessions to meet the requirements of the job you're targeting.</p>

            <br/><big>Interviewer's Perspective:</big> <p>At InterviewMaster, we appreciate the fact that interviews are a two-way street. We also offer a feature that simulates the interviewer's role. Practice conducting interviews, ask questions, and evaluate responses to improve your interviewing skills from both sides of the table.</p>

            <br/><h4 className='heading' style={{fontSize:"4vmin"}}>Contact Us</h4>
            <p className='content'>If you hve any questions or comments or want to add new category as per your need, please feel free to mail us at <a href="/about">queryline1@gmail.com</a>. We would love to hear from you!</p>

            <br/><h4 style={{fontSize:"4vmin"}}>Start Your Journey with InterviewMaster</h4>

            <p>Whether you're a fresh graduate, a seasoned professional, or someone exploring new career opportunities, InterviewMaster is your trusted partner in interview preparation. Let's embark on this journey together, and we're confident you'll be ready to face any interview with confidence and competence. Your success is our success.</p>

            <p>Join InterviewMaster today, and let's get you interview-ready!</p>
        </div>
    </div>
  )
}

export default AboutComponent