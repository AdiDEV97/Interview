import React, { useEffect, useState } from 'react'
import { deleteQuestionByIdApi, getAllQuestions, getQuestionById, getQuestionBySearchApi, getQuestionsByCategoryApi } from '../../Header/Service/ApiHandler'
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { getAllCategoriesApi } from '../../Add Question/Service/AddQuestionApiHadler';
import { toast } from 'react-toastify';
import { dark } from '@mui/material/styles/createPalette';

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

    const [searchBarFoucs, setSearchBarFocus] = useState(false);

    const [searchWord, setSearchWord] = useState("");

    const [questionsBySearch, setQuestionsBySearch] = useState([]);

    const [showError, setShowError] = useState(false);

    const [serachError, setSearchError] = useState('');

    const [questionsLength, setQuestionsLength] = useState(null);

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
        setSearchWord("");
        setShowError(false);
        setCategoryId(id);
        setSelectData(questionByCategory);
        getQuestionsByCategoryApi(id).then((resp) => {
          console.log(resp);
          console.log('Id - ', id);
          console.log('Response Length - ', resp.length);
          ////////////////
          setQuestionsLength(resp.length);
          ////////////////
          setQuestionsByCategory(resp);
          questionByCategory && console.log('QuestionsByCategory length - ', questionByCategory.length);
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
        toast.info("Press '/' to search", { position: toast.POSITION.BOTTOM_RIGHT ,icon: false, theme:"dark" });
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleSearchBox)
    }, [searchWord])


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

    const handleSearchBox = (event) => {
        if(event.key === "/"){
            document.getElementById('search-bar').focus();
        }
        if(document.getElementById("search-bar") && document.getElementById("search-bar").value.charAt(0)==="/"){
            document.getElementById("search-bar").value="";
        }
    }

    const handleOnChangeSearch = (event) => {
        setSearchWord(event.target.value);
        if(searchWord!==""){
            setShowError(false);
            setCategoryId(-1);
            console.log('Word - ', event.target.value);
            console.log('TypeOf - ' + typeof(event.target.value));
            searchWord && (getQuestionBySearchApi(event.target.value.toString()).then((resp) => {
                // console.log('resp - ', resp);
                setQuestionsBySearch(resp);
                console.log('Questions By Search - ');
                console.log(questionsBySearch);
                // console.log(resp);
            }).catch((err) => {
                setShowError(true);
                setCategoryId(0);
                console.log('error - ', err.response.data);
                console.log('error - ', err.response.status);
                setSearchError(err.response.data.message);
            }))
            
        }
        else if(searchWord===""){
            setCategoryId(0);
            setShowError(false);
        }
    }

    const handleSearchClick = () => {
        // if(searchWord!==""){
        //     setCategoryId(-1);
        //     console.log('Word - ', searchWord);
        //     searchWord && (getQuestionBySearchApi(searchWord).then((resp) => {
        //         // console.log('resp - ', resp);
        //         setQuestionsBySearch(resp);
        //         console.log('Questions By Search - ');
        //         console.log(questionsBySearch);
        //         // console.log(resp);
        //     }).catch((err) => {
        //         console.log('error - ', err.response.data);
        //         setSearchError(err.response.data.message);
        //     }))
            
        // }
        // else{
            
        //     console.log({error : "Search field should not be empty!!"});
        //     setCategoryId(null);
        // }
    }




  return (
    <div className='my-1'>
      <p className="display-4">Preperation</p>
      <Grid container spacing={2}>
        <Grid item xs={12}>

          <div>
            <nav className='navbars text-justify px-14'>
              <input type='search' className='searchField form-control navbar-brand my-3' id='search-bar' placeholder="click or hit '/' to search" value={searchWord} onChange={handleOnChangeSearch} autoComplete='off'/>
              {/* <button type='button' className='btn btn-outline-primary' onClick={() => handleSearchClick()}><span className="material-symbols-outlined">
search</span></button> */}
              <span className='navbar-brand' to="" onClick={() => {allQuestionsData();setCategoryId(0);setSearchWord("");setShowError(false);}}>All</span>
              {allCategories.map((ce, index) => {  
                return(
                  <span className='navbar-brand' to="" onClick={() => getQuestionsByCategory(ce.categoryId)} key={index}>{ce.categoryTitle}</span>
                )
              })}
              {/* <p className='navbar-brand'>AAAAAA</p>
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
              <p className='navbar-brand'>AAAAAA</p> */}
              
            </nav>
          </div>
        </Grid>
      <Grid className='table'>
      {showError ? <p className='display-4'>{serachError}</p> : null}
      <table className='tables'>
        
        {showError===false && allQuestions.length!==0 && questionByCategory.length !==0 && (
            <tr>
                <th>No</th>
                <th>Question</th>
                <th></th>
            </tr>
        )}
        
        
        {/* Looping through each question */}
        {
            showError===false && categoryId!==0 && categoryId!==-1 && questionByCategory.length!==0 ? questionByCategory.map((ce, index) => {
                <tr>
                    <th>No</th>
                    <th>Question</th>
                    <th></th>
                </tr>
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
             
                //: showError===true && questionByCategory.length===0 ? "Not FOUND!!"
             :
                showError===false && categoryId===0 && allQuestions.length!==0 || searchWord==='' ? allQuestions.map((ce, index1) => {
                <tr>
                    <th>No</th>
                    <th>Question</th>
                    <th></th>
                </tr>
                return (
                    <>
                        <tr className="headingRow" key={index1}>
                            <td className='col-md-1' style={{color:"brown"}}>{index1+1}</td>
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
                                    <td className={`answer col-md-10 pl-0`}>{showAnswer ? <p className="border-top-0" dangerouslySetInnerHTML={{__html:ce.answer}}></p> : null}</td>
                                    <td></td>
                                </tr>
                              :  null
                        }
                    </>
                )
            })
            :
            showError===false && categoryId===-1 && searchWord ? questionsBySearch.map((ce, index) => {
                <tr>
                    <th>No</th>
                    <th>Question</th>
                    <th></th>
                </tr>
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
                                    <td className={`answer col-md-10 pl-0`}>{showAnswer ? <p className="border-top-0" dangerouslySetInnerHTML={{__html:ce.answer}}></p> : null}</td>
                                    <td></td>
                                </tr>
                              : null
                        }
                    </>
                )
            })
            : null
            // questionsLength===0 || allQuestions.length===0 || questionByCategory.length===0 ? <p>No Questions Found...{console.log('length1 - ', categoryId + " --- " + questionByCategory.length)}</p> : null
                
        }
        
      </table>
      

      </Grid>
      </Grid>
    </div>
  )
}

export default AllQuestionsComponent
