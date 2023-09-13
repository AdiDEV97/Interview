import React, { useState, useEffect } from 'react'
import { getAllCategoriesApi } from '../../Add Question/Service/AddQuestionApiHadler';
import { getQuestionsByMultipleEntities } from '../../Header/Service/ApiHandler';
import { useNavigate } from 'react-router-dom';

const InterviewRequisites = () => {

    const [allTopics, setAllTopics] = useState([]);

    const [myArray, setMyArray] = useState([]);

    const [topicStyle, setTopicStyle] = useState({
        backgroundColor: "White",
        color: "black"
    })

    const [requisite, setRequisite] = useState({
        name: "",
        companyName: "",
        selectedTopics: [],
        questionCount: "",
        time: ""
    });

    const navigate = useNavigate();
    const navigationPath = "/interview";

    const [categoryBasedQues, setCategoryBasedQues] = useState([]);

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

    const questionByCategories = async (categories) => {
        categoryBasedQues && getQuestionsByMultipleEntities(categories).then((resp) => {
            console.log('Questions req - ', resp);
            setCategoryBasedQues(resp);
            const newData = resp;
            setCategoryBasedQues(newData);
            categoryBasedQues && setRequisite({...requisite, "selectedTopics" : resp});
            console.log('CategoryBasedQues - ', categoryBasedQues);
        }).catch((err) => {
            console.log('Error in questionByCategories - ', err);
        })

        //setRequisite({...requisite, "selectedTopics" : categoryBasedQues});
    }

    const handleStartInterview = async (event) => {
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
        else {
            questionByCategories(myArray);
            setShowError(false);
            setShowTopicError(false);
            console.log('Interview Started!!');
            console.log("Requisite - ", requisite);
            navigate(navigationPath, {state: requisite});
            
        }
    }

    useEffect(() => {
        getAllTopics();
    }, [])

    const handleSelectTopic = (id) => {
        // console.log('Selected topic - ', id);
        if(myArray.includes(id)) {
            setMyArray(myArray.filter((ce) => ce!==id));
            // console.log('Deleted - ', id);
        }
        else {
            setMyArray([...myArray, id]);
            // console.log('Added - ', id);
        }
        // console.log('SelectedTopic - ', myArray);
        
        if(topicStyle.backgroundColor==="White") {
        setTopicStyle({backgroundColor: "rgb(90, 170, 253)", color: "white"})
        }
        else if(topicStyle.backgroundColor==="rgb(90, 170, 253)") {
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
            <div className='topics-div border' id='topics' style={{height:"100px", overflowY:"scroll"}}>
                {
                    allTopics.map((ce, index) => {
                        return(
                            <button type="button" className='all-topics m-2 p-1' id={ce.categoryId} onClick={() => handleSelectTopic(ce.categoryId)} style={myArray && {backgroundColor: myArray.includes(ce.categoryId) ? "rgb(90, 170, 253)" : "White"}} key={index}>{ce.categoryTitle}</button>
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
        {/* TESITNG */}
        <p>
            {requisite.name}
        </p>
        <div>
            {requisite.selectedTopics.map((ce) => {
                return (
                    <p>{ce.id}</p>
                )
            })}
        </div>
      </form>
    </div>
  )
}

export default InterviewRequisites
