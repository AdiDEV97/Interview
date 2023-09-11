import React, { useState, useEffect } from 'react'
import { getAllCategoriesApi } from '../../Add Question/Service/AddQuestionApiHadler';
import { getQuestionsByMultipleEntities } from '../../Header/Service/ApiHandler';

const InterviewRequisites = () => {

    const [allTopics, setAllTopics] = useState([]);

    const [myArray, setMyArray] = useState([]);

    const [topicStyle, setTopicStyle] = useState({
        backgroundColor: "White",
        color: "black"
    })

    const [requisite, setRequisute] = useState({
        name: "",
        companyName: "",
        selectedTopics: [],
        questionCount: "",
        time: ""
    });

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
        setRequisute({...requisite, [name]: value});
    }

    function getAllTopics() {
        getAllCategoriesApi().then(resp => {
            setAllTopics(resp)
            console.log(resp);
        }).catch(err => {
            console.log('Error in getting topics - ', err);
        })
    }

    function questionByCategories(categories) {
        getQuestionsByMultipleEntities(categories).then((resp) => {
            console.log('Questions - ', resp);
        }).catch((err) => {
            console.log('Error in questionByCategories - ', err);
        })
    }

    const handleStartInterview = (event) => {
        event.preventDefault();
        const getNameValue = document.getElementById("name").value;
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
        else{
            setShowError(false);
            setShowTopicError(false);
            console.log('Interview Started!!');
            console.log(requisite);
            questionByCategories(myArray);
            // setMyArray([]);
        }
        // else{
        //     setShowTopicError(false);
        //     setTopicValidation({message : ""});
        // }
        
    }

    useEffect(() => {
        getAllTopics();
    }, [])

    const handleSelectTopic = (id) => {
        console.log('Selected topic - ', id);
        if(myArray.includes(id)) {
            setMyArray(myArray.filter((ce) => ce!==id));
            console.log('Deleted - ', id);
        }
        else {
            setMyArray([...myArray, id]);
            console.log('Added - ', id);
        }
        console.log('SelectedTopic - ', myArray);
        
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
    
      {showError ? <p className='text-danger'>{validation.message}</p> : null}
      {showTopicError ? <p className='text-danger'>{topicValidation.message}</p> : null}

      <form className='requisite-from center' onSubmit={handleStartInterview}>
        <div className='form-group text-left'>
            <label htmlFor='name'><big>Name</big></label>
            <input type='text' className='form-control' id='name' placeholder='Your full name' name="name" value={requisite.name} onChange={handleRequisiteChange} />
        </div>
        <div className='form-group text-left'>
            <label htmlFor='company'><big>Company Name</big></label>
            <input type='text' className='form-control' id='company' placeholder='Your full name' name="companyName" value={requisite.companyName} onChange={handleRequisiteChange} />
        </div>
        <div className='form-group text-left'>
            <label htmlFor='topics'><big>Select topics</big></label>
            {/* All Topics */}
            <div className='topics-div border' id='topics'>
                {
                    allTopics.map((ce, index) => {
                        return(
                            <button type="button" className='all-topics m-2 p-1' id={ce.categoryId} onClick={() => handleSelectTopic(ce.categoryId)} style={myArray && {backgroundColor: myArray.includes(ce.categoryId) ? "rgb(70, 150, 253)" : "White"}} key={index}>{ce.categoryTitle}</button>
                        )
                    })
                }
            </div>
        </div>
        <div className='form-group text-left'>
            <label htmlFor='question-count'><big>Number of Questions</big></label>
            <input type='text' className='form-control' id='question-count' placeholder='Your full name' name="questionCount" value={requisite.questionCount} onChange={handleRequisiteChange} />
        </div>
        <div className='form-group text-left'>
            <label htmlFor='time'><big>Time for each question</big></label>
            <input type='text' className='form-control' id='time' placeholder='Your full name' name="time" value={requisite.time} onChange={handleRequisiteChange} />
        </div>
        <button type='submit' className='btn btn-outline-primary'>Start Interview</button>
      </form>
    </div>
  )
}

export default InterviewRequisites
