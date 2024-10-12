import React, { useState, useEffect } from 'react'
import { getAllCategoriesApi } from '../../Add Question/Service/AddQuestionApiHadler';
import { getQuestionsByMultipleEntities } from '../../Header/Service/ApiHandler';
import { useNavigate } from 'react-router-dom';

// Interview Requisite Component

const InterviewRequisites = () => {

    const [allTopics, setAllTopics] = useState([]);

    const [myArray, setMyArray] = useState([]);

    const arr = [];

    const [topicStyle, setTopicStyle] = useState({
        backgroundColor: "White",
        color: "black"
    })

    const [requisite, setRequisite] = useState({
        interviewerName: "",
        companyName: "",
        selectedTopics: [],
        questionCount: "",
        time: ""
    });

    const navigate = useNavigate();
    const navigationPath = "/interview";

    const [showError, setShowError] = useState(false);

    const [validation, setValidation] = useState({
        message : ""
    })

    const [showTopicError, setShowTopicError] = useState(false);

    const [topicValidation, setTopicValidation] = useState({
        message : ""
    })

    const handleRequisiteChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setRequisite({...requisite, [name]: value});
    }

    function getAllTopics() {
        getAllCategoriesApi().then(resp => {
            setAllTopics(resp)
            console.log(resp);
        }).catch(err => {
            console.log('Error in getting topics - ', err);
        })
    }

    const questionByCategories = async (data) => {
        //console.log('DATA TO SEND - ', data);
        getQuestionsByMultipleEntities(data).then((resp) => {
            console.log('Resp -->', resp);
            //navigate(navigationPath, {state: {"response": resp, "req": requisite}});
            navigate(navigationPath, {state: resp});
            
        }).catch((err) => {
            console.log('Error in questionByCategories - ', err);
        })
    }

    const handleStartInterview = async (event) => {
        event.preventDefault();
        const getNameValue = document.getElementById("interviewerName").value;
        const getCompanyNameValue = document.getElementById("company").value;
        const getQuestionsValue = document.getElementById("question-count").value;
        const getTimeValue = document.getElementById("time").value;
        console.log(getNameValue + " - " + getCompanyNameValue + " - " + getQuestionsValue + " - " + getTimeValue);
        if(getQuestionsValue==="" || getCompanyNameValue==="" || getNameValue==="" || getTimeValue===""){
            setShowError(true);
            setValidation({message : "*Make sure none of the field is blank"})
        }
        
        else if(myArray.length==0) {
            setShowTopicError(true)
            setTopicValidation({message : "*Select atleast one topic!!"});
        }
        else {
            questionByCategories(requisite)
            setShowError(false);
            setShowTopicError(false);
            console.log('Interview Started!!');
            console.log("Requisite - ", requisite);
            //console.log('ARRRRRRRRR - ', [1,2,3,4,5,6]);
        }
    }

    useEffect(() => {
        getAllTopics();
    }, [])

    const handleSelectTopic = (id) => {
        if(myArray.includes(id)) {
            setMyArray(myArray.filter((ce) => ce!==id));
            console.log("Selected Categories - ", myArray);
            arr.push(myArray.filter((ce) => ce!==id))
            console.log("ARR - ", arr);
            
        }
        else {
            setMyArray([...myArray, id]);
            arr.push(...myArray, id);
            console.log("ARR - ", arr);
            //setRequisite({...requisite, 'selectedTopics':[...myArray, id]})
            //setRequisite({...requisite.selectedTopics, ['selectedTopics']: id});
            console.log("Selected Categories - ", myArray);
            setRequisite({...requisite, 'selectedTopics':arr});
        }
        
        if(topicStyle.backgroundColor==="White") {
        setTopicStyle({backgroundColor: "rgb(90, 170, 253)", color: "white"})
        }
        else if(topicStyle.backgroundColor==="rgb(90, 170, 253)") {
            setTopicStyle({backgroundColor: "White", color: "black"})
        }
    }
    

  return (
    <div>
      <p className='display-5'>Requisites</p>
    
      {showError ? <p className='text-danger'>{validation.message}</p> : null}
      {showTopicError ? <p className='text-danger'>{topicValidation.message}</p> : null}

      <form className='requisite-from center2' onSubmit={handleStartInterview}>
        <div className='form-group text-left'>
            <label htmlFor='interviewerName'><big>Name</big></label>
            <input type='text' className='form-control' id='interviewerName' placeholder='Your full name' name="interviewerName" value={requisite.interviewerName} onChange={handleRequisiteChange} />
        </div>
        <div className='form-group text-left'>
            <label htmlFor='company'><big>Company Name</big></label>
            <input type='text' className='form-control' id='company' placeholder='Your company name' name="companyName" value={requisite.companyName} onChange={handleRequisiteChange} />
        </div>
        <div className='form-group text-left'>
            <label htmlFor='topics'><big>Select topics</big></label>
            {/* All Topics */}
            <div className='topics-div border' id='topics' style={{height:"100px", overflowY:"scroll"}}>
                {
                    allTopics.map((ce, index) => {
                        return(
                            <button type="button" className='btn all-topics m-2 p-1' id={ce.categoryId} onClick={() => handleSelectTopic(ce.categoryId)} style={myArray && {backgroundColor: myArray.includes(ce.categoryId) ? "rgb(90, 170, 253)" : "White"}} key={index}>{ce.categoryTitle}</button>
                        )
                    })
                }
            </div>
        </div>
        <div className='form-group text-left'>
            <label htmlFor='question-count'><big>Number of Questions</big></label>
            <input type='text' className='form-control' id='question-count' placeholder='No of questions' name="questionCount" value={requisite.questionCount} onChange={handleRequisiteChange} />
        </div>
        <div className='form-group text-left'>
            <label htmlFor='time'><big>Time for each question</big></label>
            <input type='text' className='form-control' id='time' placeholder='Time in seconds' name="time" value={requisite.time} onChange={handleRequisiteChange} />
        </div>
        <button type='submit' className='btn btn-outline-primary'>Start Interview</button>
      </form>
    </div>
  )
}

export default InterviewRequisites
