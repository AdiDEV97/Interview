import React, { useEffect, useState } from 'react'
import { deleteQuestionByIdApi, getAllQuestions, getQuestionById, getQuestionsByCategoryApi } from '../../Header/Service/ApiHandler'
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { getAllCategoriesApi } from '../../Add Question/Service/AddQuestionApiHadler';

const AllQuestionsComponent = () => {

    const [allQuestions, setAllQuestions] = useState([]);

    const [allCategories, setAllCategories] = useState([]);

    const [categoryId, setCategoryId] = useState(0);

    const [questionByCategory, setQuestionsByCategory] = useState([]);

    const [selectData, setSelectData] = useState([]);

    const [showAnswer, setShowAnswer] = useState(false);

    const [expandId, setExpandId] = useState(null);

    const [buttonText, setButtonText] = useState("Reveal Answer")

    const [navigateData, setNavigateData] = useState();

    const navigate = useNavigate();

    function allQuestionsData() {
        getAllQuestions().then((resp) => {
            console.log('All Questions - ');
            setAllQuestions(resp)
            console.log(allQuestions);
        }).catch(err => {
            console.log(err)
        });
    }

    const getAllCategories = () => {
        getAllCategoriesApi().then((resp) => {
          setAllCategories(resp);
        }).catch((error) => {
          console.log(error);
        })
      }

      const getQuestionsByCategory = (id) => {
        setCategoryId(id);
        setSelectData(questionByCategory);
        getQuestionsByCategoryApi(id).then((resp) => {
          console.log(resp);
          setQuestionsByCategory(resp);
        }).catch((err) => {
          console.log('Error - ', err);
        })
      }

    // function questionById(id) {
    //     getQuestionById(id).then((resp) => {
    //         console.log(resp);
    //     }).catch(err => {
    //         console.log(err.response.data);
    //     })
    // }

    //allQuestionsData();

    // Get Data on load of the page
    useEffect(() => {
        allQuestionsData();
        getAllCategories();
        setSelectData(allQuestions);
        setCategoryId(0);
    }, [])


    const handleRevealAnswer = async (id) => {
        setExpandId(id);
        if(showAnswer === false) {
            setShowAnswer(true)
            setButtonText("Hide Answer")
        }
        else {
            setShowAnswer(false);
            setButtonText("Reveal Answer")
        }
    }

    function deleteQuestion (question_id) {
        var userConfirmation = window.confirm("One question deleted cannot be retrieved. Do you want to delete? Please confirm.");
        if(userConfirmation === true) {
            deleteQuestionByIdApi(question_id).then((resp) => {
                setAllQuestions(allQuestions.filter((ce) => {return(ce.id !== question_id)}));
                console.log(resp);
            }).catch((err) => {
                console.log(err.response.data);
            })
        }
        
    }

    const handleDeleteQuestion = (question_id) => {
        deleteQuestion(question_id)
    }

    const handleEditQuestion = (question) => {

        const data = {id: question.id, question: question.question, answer: question.answer, correct: question.correct, category: question.category}

        const navigateTo = () => navigate("/new-question", {state : question});

        //setNavigateData(data);
        console.log('Data to send - ', question);
        navigateTo();
    }




  return (
    <div className='my-1'>
      <p className="display-4">Preperation</p>
      <Grid container spacing={2}>
        <Grid item xs={12}>



          <div className='categoryTabs'>
            <nav className='navbars text-justify px-14'>
              <span className='navbar-brand' to="#" onClick={() => {setCategoryId(0)}}>All</span>
              {allCategories.map((ce, index) => {  
                return(
                  <span className='navbar-brand' to="#" onClick={() => getQuestionsByCategory(ce.categoryId)} key={index}>{ce.categoryTitle}</span>
                )
              })}
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              <p className='navbar-brand'>AAAAAA</p>
              
            </nav>
          </div>
        </Grid>
      <Grid className='table'>
      <table className='tables'>
        <tr>
            <th>No</th>
            <th>Question</th>
            <th></th>
        </tr>
        {/* Looping through each question */}
        {
            categoryId!==0 ? questionByCategory.map((ce, index) => {
                return (
                    <>
                        <tr className="headingRow" key={index}>
                            <td className='col-md-1' style={{color:"brown"}}>{index+1}</td>
                            <td className='col-md-10 border' style={{color:"brown"}}>{ce.question}</td>

                            <td className='btn-group dropright text-right'>
                                <div className='btn-group dropend'>
                                <button className="btn btn-outline-primary" type='button' onClick={() => handleRevealAnswer(ce.id)}>{expandId===ce.id ? (buttonText) : "Reveal Answer"}</button>

                                    <button type="button" className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="visually-hidden" />
                                    </button>
                                    <div className="dropdown-menu">
                                        {/* Dropdown menu links */}
                                        <button className='dropdown-item' type='button' onClick={() => handleDeleteQuestion(ce.id)}>Delete</button>
                                        <button className='dropdown-item' type='button' onClick={() => handleEditQuestion(ce)}>Edit</button>
                                    </div>
                                </div>

                                {/* ----------------- */}
                            </td>
                            
                        </tr>
                        {
                            expandId === ce.id && showAnswer ?
                                <tr>
                                    <td></td>
                                    <td className={`answer col-md-10 pl-0`}>{showAnswer ? <p dangerouslySetInnerHTML={{__html:ce.answer}}></p> : null}</td>
                                    <td></td>
                                </tr>
                              : null
                        }
                    </>
                )
            }) :
            allQuestions.map((ce, index) => {
                return (
                    <>
                        <tr className="headingRow" key={index}>
                            <td className='col-md-1' style={{color:"brown"}}>{index+1}</td>
                            <td className='col-md-10 border' style={{color:"brown"}}>{ce.question}</td>

                            <td className='btn-group dropright text-right'>
                                <div className='btn-group dropend'>
                                <button className="btn btn-outline-primary" type='button' onClick={() => handleRevealAnswer(ce.id)}>{expandId===ce.id ? (buttonText) : "Reveal Answer"}</button>

                                    <button type="button" className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="visually-hidden" />
                                    </button>
                                    <div className="dropdown-menu">
                                        {/* Dropdown menu links */}
                                        <button className='dropdown-item' type='button' onClick={() => handleDeleteQuestion(ce.id)}>Delete</button>
                                        <button className='dropdown-item' type='button' onClick={() => handleEditQuestion(ce)}>Edit</button>
                                    </div>
                                </div>

                                {/* ----------------- */}
                            </td>
                            
                        </tr>
                        {
                            expandId === ce.id && showAnswer ?
                                <tr>
                                    <td></td>
                                    <td className={`answer col-md-10 pl-0`}>{showAnswer ? <p dangerouslySetInnerHTML={{__html:ce.answer}}></p> : null}</td>
                                    <td></td>
                                </tr>
                              : null
                        }
                    </>
                )
            })
        }
      </table>
      

      </Grid>
      </Grid>
    </div>
  )
}

export default AllQuestionsComponent
