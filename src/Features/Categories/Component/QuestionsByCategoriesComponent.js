import React, { useEffect, useState } from 'react'
import { getAllCategoriesApi } from '../../Add Question/Service/AddQuestionApiHadler';
import { getQuestionsByCategoryApi } from '../../Header/Service/ApiHandler';
import { Grid } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const QuestionsByCategoriesComponent = () => {

  const [allCategories, setAllCategories] = useState([]);

  const [categoryId, setCategoryId] = useState(0);

  const [questionByCategory, setQuestionsByCategory] = useState([]);

  const location = useLocation();



  const getAllCategories = () => {
    getAllCategoriesApi().then((resp) => {
      setAllCategories(resp);
    }).catch((error) => {
      console.log(error);
    })
  }

  const getQuestionsByCategory = (id) => {
    getQuestionsByCategoryApi(id).then((resp) => {
      console.log(resp);
      setQuestionsByCategory(resp);
    }).catch((err) => {
      console.log('Error - ', err);
    })
  }

  useEffect(() => {
    console.log('passed Data - ');
    console.log(location.state);
    getAllCategories();
    
  }, [location]);

  return (
    <div>
      {/* <h3 className='display-4'>Categories</h3> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>



          <div className='categoryTabs'>
            <nav className='navbars text-justify px-5'>
              {allCategories.map((ce, index) => {
                return(
                  <Link className='navbar-brand' to="#" onClick={() => getQuestionsByCategory(ce.categoryId)}>{ce.categoryTitle}</Link>
                )
              })}
            </nav>
          </div>



        </Grid>
        <Grid item xs={12}>
          <table className='table'>
            <tr>
              <th>No</th>
              <th>Question</th>
              <th></th>
            </tr>
            {
              questionByCategory.map((ce, index) => {
                return(
                  <tr>
                    <td>{index+1}</td>
                    <td>{ce.question}</td>
                    <td><button type='button' className='btn btn-outline-primary'>Reveal Answer</button></td>
                  </tr>
                )
              })
            }
          </table>
        </Grid>
      </Grid>
    </div>
  )
}

export default QuestionsByCategoriesComponent
