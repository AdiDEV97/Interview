import React, { useState, useEffect } from 'react'
import { getAllCategoriesApi } from '../../Add Question/Service/AddQuestionApiHadler';

const InterviewRequisites = () => {

    const [allTopics, setAllTopics] = useState([]);

    const [topicStyle, setTopicStyle] = useState({
        backgroundColor: "White",
        color: "black"
    })

    const handleStartInterview = (event) => {
        event.preventDefault();
        console.log('Interview Started!!');
    }

    function getAllTopics() {
        getAllCategoriesApi().then(resp => {
            setAllTopics(resp)
            console.log(resp);
        }).catch(err => {
            console.log('Error in getting topics - ', err);
        })
    }

    useEffect(() => {
        getAllTopics();
    }, [])

    const handleSelectTopic = (id) => {
        console.log('Selected topic - ', id);

        // var topic = document.getElementById(id);
        // if(topic.style.backgroundColor==="White") {
        //     topic.style.backgroundColor("rgb(70, 150, 253)")
        //     topic.style.color("white")
        // }
        // else if(topic.style.backgroundColor==="rgb(70, 150, 253)") {
        //     topic.style.backgroundColor="White"
        //     topic.style.color="black"
        // }
        
        if(topicStyle.backgroundColor==="White") {
        setTopicStyle({backgroundColor: "rgb(70, 150, 253)", color: "white"})
        }
        else if(topicStyle.backgroundColor==="rgb(70, 150, 253)") {
            setTopicStyle({backgroundColor: "White", color: "black"})
        }
    }
    

  return (
    <div>
      <p className='display-4'>Requisites</p>

      <form className='requisite-from center' onSubmit={handleStartInterview}>
        <div className='form-group text-left'>
            <label htmlFor='name'><big>Name</big></label>
            <input type='text' className='form-control' id='name' placeholder='Your full name' />
        </div>
        <div className='form-group text-left'>
            <label htmlFor='company'><big>Company Name</big></label>
            <input type='text' className='form-control' id='company' placeholder='Your full name'/>
        </div>
        <div className='form-group text-left'>
            <label htmlFor='topics'><big>Select topics</big></label>
            {/* All Topics */}
            <div className='topics-div border' id='topics'>
                {
                    allTopics.map((ce, index) => {
                        return(
                            <button className='all-topics m-2 p-1' id={ce.categoryId} onClick={() => handleSelectTopic(ce.categoryId)} style={topicStyle}>{ce.categoryTitle}</button>
                        )
                    })
                }
            </div>
        </div>
        <div className='form-group text-left'>
            <label htmlFor='question-count'><big>Number of Questions</big></label>
            <input type='text' className='form-control' id='question-count' placeholder='Your full name' />
        </div>
        <div className='form-group text-left'>
            <label htmlFor='time'><big>Time for each question</big></label>
            <input type='text' className='form-control' id='time' placeholder='Your full name' />
        </div>
        <button type='submit' className='btn btn-outline-primary'>Start Interview</button>
      </form>
    </div>
  )
}

export default InterviewRequisites
