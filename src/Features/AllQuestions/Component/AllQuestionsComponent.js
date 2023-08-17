import React, { useEffect, useState } from 'react'
import { getAllQuestions, getQuestionById } from '../../Header/Service/ApiHandler'
import { Button } from 'reactstrap';

const AllQuestionsComponent = () => {

    const [allQuestions, setAllQuestions] = useState([]);

    const [showAnswer, setShowAnswer] = useState(false);

    const [getQuestion, setGetQuestion] = useState("");

    const [expandId, setExpandId] = useState(null);

    const [buttonText, setButtonText] = useState("Reveal Answer")

    function allQuestionsData() {
        getAllQuestions().then((resp) => {
            console.log('All Questions - ');
            setAllQuestions(resp)
            console.log(allQuestions);
        }).catch(err => {
            console.log(err)
        });
    }

    //allQuestionsData();

    // Get Data on load of the page
    useEffect(() => {
        allQuestionsData();
    }, [])


    const handleRevealAnswer = async (id) => {
        setExpandId(id);
        if(showAnswer == false) {
            setShowAnswer(true)
            setButtonText("Hide Answer")
        }
        else {
            setShowAnswer(false);
            setButtonText("Reveal Answer")
        }
    }




  return (
    <div className='my-1'>
      <p className="display-4">All Questions</p>
      <table className='table'>
        <tr>
            <th>No</th>
            <th>Question</th>
            <th></th>
        </tr>
        {/* Looping through each question */}
        {
            allQuestions.map((ce, index) => {
                return (
                    <>
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td className='border'>{ce.question}</td>
                            <td className='text-right'><Button color="primary" onClick={() => handleRevealAnswer(ce.id)}>{expandId===ce.id ? (buttonText) : "Reveal Answer"}</Button></td>
                            
                        </tr>
                        {
                            expandId === ce.id && showAnswer ? 
                                <tr className='answer border'>
                                    <td className='borders'></td> 
                                    <td>{showAnswer ? ce.answer : null}</td>
                                    <td></td>
                                </tr>
                              : null
                        }
                    </>
                )
            })
        }
      </table>
      
    </div>
  )
}

export default AllQuestionsComponent
