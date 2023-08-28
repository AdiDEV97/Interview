import React, { useEffect, useState } from 'react'

const QuestionsByCategoriesComponent = () => {

  const [category, setCategory] = useState({
    categoryTitle : "",
    categoryDescription : ""
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setCategory({...category, [name] : value});

    console.log('Category Details - ');
    console.log(category);

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Getting Category Details');
    console.log(category);
  }


  return (
    <div>
      <span className='display-4'>Add New Categories</span>
      <form className='p-5' onSubmit={handleSubmit}>
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
