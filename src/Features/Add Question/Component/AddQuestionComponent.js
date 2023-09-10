import React, { useEffect, useRef, useState } from 'react'
import { addNewQuestionApi, getAllCategoriesApi } from '../Service/AddQuestionApiHadler';
import { useLocation, useNavigate } from 'react-router-dom';
import JoditEditor, { Jodit } from 'jodit-react';


const AddQuestionComponent = () => {

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const [allCategories, setAllCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState();

    const [newQuestionDetails, setNewQuestionDetails] = useState({
        question : "",
        answer : ""
        //categoryId : ''
    });

    const [update, setUpdate] = useState(false);

    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState();

    const location = useLocation();

    const navigate = useNavigate();

    const navigateTo = () => {navigate("/all-questions")}

    function allCategoriesFunction() {
        getAllCategoriesApi().then((resp) => {
            setAllCategories(resp);
            console.log(allCategories);
        }).catch((error) => {
            console.log(error.response.data.message);
        })
    }

    useEffect(() => {
        allCategoriesFunction();
        console.log('Data1 - ', location.state);
    }, [])

    function addNewQuestion(categoryId, newQuestionData) {
        addNewQuestionApi(categoryId, newQuestionData).then((resp) => {
            console.log('Question Data - ');
            console.log(resp);
            navigateTo();
        }).catch((error) => {
            setIsError(true);
            console.log("Errors - ", error.response.data);
            setErrors({question:error.response.data.question, answer:error.response.data.answer});
            console.log(errors);
        })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewQuestionDetails({...newQuestionDetails, [name] : value});
        //console.log(newQuestionDetails);
    }

    const handleChangeCategory = (event) => {
        // const name = event.target.name;
        const value = event.target.value;
        console.log('CIdType - ', typeof(parseInt(value)));
        setSelectedCategory(parseInt(value));
        console.log('categoryId - ', value);
    }

    const handleJoditEditor = (data) => {
        setNewQuestionDetails({...newQuestionDetails, 'answer': data})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newQuestionDetails);
        console.log('CategoryId - ', selectedCategory);
        addNewQuestion(selectedCategory, newQuestionDetails);
        setContent('');
        setNewQuestionDetails({question : "", answer : ""});
        
        if(editor.current) {
            editor.current.value = '';
            console.log('Content - ', editor.current.value);
        }
        // Navigate to All Questions
        // if(!errors) {
        //     navigateTo();
        // }
    };

  return (
    <div>
      <h3 className="display-4">New Question</h3>

      <form className='pl-5 pr-5' onSubmit={handleSubmit}>
        <div className='form-group text-left'>
            <label htmlFor='questionText'><big>Question</big></label>
            <input className='form-control form-control-lg' type='text' id='questionText' placeholder='Write the question here...' name="question" value={newQuestionDetails.question} onChange={handleChange} />
            {isError ? <p className='text-danger pl-2'>{errors.question}</p> : null}
        </div>
        <div className='form-group text-left'>
            <label htmlFor='anwserTextAera'><big>Answer</big></label>
            {/* <textarea className='form-control from-control-lg' id='anwserTextArea' placeholder='Write your answer here...' rows='5' name='answer' value={newQuestionDetails.answer} onChange={handleChange}></textarea> */}
            <JoditEditor id='jodit' ref={editor} value={content} onChange={handleJoditEditor} height="200px" />
            {isError ? <p className='text-danger pl-2'>{errors.answer}</p> : null}
        </div>
        <div className='form-group text-left'>
            <label htmlFor='questionCategory'><big>Category</big></label>
            <select htmlFor='questionCategory' className='form-control' onChange={handleChangeCategory}>
                <option selected disabled>Select...</option>
                {
                    allCategories.map((ce, index) => {
                        return (
                            <option key={index} value={ce.categoryId}>{ce.categoryTitle}</option>
                            )
                    })
                }
            </select>
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>

    </div>
  )
}

export default AddQuestionComponent
