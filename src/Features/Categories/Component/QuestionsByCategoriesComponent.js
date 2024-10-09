import React, { useEffect, useState } from 'react'
import { addCategoryApi } from '../Service/CategoryApiHandler';

// QuestionsByCategoriesComponent

const QuestionsByCategoriesComponent = () => {

  const [category, setCategory] = useState({
    categoryTitle : "",
    categoryDescription : ""
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setCategory({...category, [name] : value});

  }

  function addCategory(categoryData) {
    addCategoryApi(categoryData).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err.response.data);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addCategory(category);
  }


  return (
    <div>
      <span className='display-5'>Add New Categories</span>
      <form className='center p-5' style={{width:"120vmin"}} onSubmit={handleSubmit}>
        <div className='form-group text-left'>
          <label htmlFor='categoryTitle'><big>Title</big></label>
          <input type='text' className='form-control' id='categoryTitle' name='categoryTitle' value={category.categoryTitle} onChange={handleOnChange} />
        </div>

        <div className='form-group text-left'>
          <label htmlFor='categoryDescription'><big>Description</big></label>
          <textarea type='text' className='form-control' id='categoryDescription' rows='5' name='categoryDescription' value={category.categoryDescription} onChange={handleOnChange} />
        </div>

        <button className='btn btn-outline-primary' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default QuestionsByCategoriesComponent
