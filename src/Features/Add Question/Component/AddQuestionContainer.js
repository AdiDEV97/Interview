import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../Service/CategoriesApiHadler';

const AddQuestionContainer = () => {

    const [allCategories, setAllCategories] = useState([]);

    const [newQuestionDetails, setNewQuestionDetails] = useState({
        question : '',
        answer : '',
        categoryId : ''
    });

    function allCategoriesFunction() {
        getAllCategories().then((resp) => {
            setAllCategories(resp);
            console.log(allCategories);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        allCategoriesFunction();
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewQuestionDetails({...newQuestionDetails, [name] : value});
        //console.log(newQuestionDetails);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newQuestionDetails);
    }

  return (
    <div>
      <h3 className="display-4">New Question</h3>

      <form onSubmit={handleSubmit}>
        <div className='form-group text-left p-3'>
            <label htmlFor='questionText'><big>Question</big></label>
            <input className='form-control form-control-lg' type='text' id='questionText' placeholder='Write the question here...' name="question" value={newQuestionDetails.question} onChange={handleChange} />
        </div>
        <div className='form-group text-left p-3'>
            <label htmlFor='anwserTextAera'><big>Answer</big></label>
            <textarea className='form-control from-control-lg' id='anwserTextArea' placeholder='Write your answer here...' rows='5' name='answer' value={newQuestionDetails.answer} onChange={handleChange}></textarea>
        </div>
        <div className='form-group text-left p-3'>
            <label htmlFor='questionCategory'><big>Category</big></label>
            <select htmlFor='questionCategory' className='form-control' name='categoryId' onChange={handleChange}>
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

export default AddQuestionContainer
