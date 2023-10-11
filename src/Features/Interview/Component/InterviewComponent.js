import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import './YourComponent.css'; // Import your CSS file

const InterviewComponent = () => {

  const [currentTime, setCurrentTime] = useState({
    hr: null,
    min: null,
    sec: null
  });

  const [secondsData, setSecondsData] = useState(0);

  const [showStatusStyle, setShowStatusStyle] = useState({
    background: "rgb(211, 211, 211)"
  });

  const location = useLocation();

  const [currentIndex, setCurrentIndex] = useState(0);

  //let currentIndex = 0;

  const [count, setCount] = useState(0);

  const [btn, setBtn] = useState("Next")

  const [isDisable, setIsDisable] = useState(false)

  const [resultData, setResultData] = useState([]);

  var data = [];

  const arrSize = location.state.questions.length

  const navigate = useNavigate();
  const navigationPath = "/result";

  const time = new Date();

  const statusArray = []

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  for(let i=0; i<30; i++){
    statusArray.push(i);
  }

  useEffect(() => {

    const intervalId = setInterval(() => {
      const time = new Date()
      setCurrentTime({
      hr : time.getHours(),
      min: time.getMinutes(),
      sec: time.getSeconds()
    })
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [])

  // useEffect(() => {
  //   let num = Math.floor((Math.random()*56))
  //   console.log('Random - ', num);
  //   console.log('Location - ', location);
  // }, [])

  const handleCorrect = (question) => {
    setCorrect(correct+1);
    setResultData([...resultData, {"question":question, "status":true}])
    console.log('Correct id - ', question.id);
    setShowStatusStyle({background: "rgb(150, 200, 255)"})
  }

  const handleWrong = (question) => {
    setWrong(wrong+1);
    setResultData([...resultData, {"question":question, "status":false}])
    console.log('Wrong id - ', question.id);
    setShowStatusStyle({background: "rgb(211, 100, 100)"})
  }


  function nextQuestion() {

    setIsDisable(true);
  
    var seconds = parseInt(location.state.info.time);
    const countDown = setInterval(stopWatch, 1000);

    function stopWatch(){
      if(seconds!==0){
        seconds--;
        setSecondsData(seconds);
      }
      if(seconds<3) {
        if(btn === "Next") {
          var sound = new Audio("beep-07a.wav");
          sound.volume = 0.05;
          sound.play().catch((err) => {console.log('Error - ', err);});
        }
      }
      if(seconds===0) {
        clearInterval(countDown);
        setCount(count+1);
        setIsDisable(false)
      }

    }

    
    if(currentIndex+1 <= arrSize-1) {
      setCurrentIndex(currentIndex+1)
    }
    if(currentIndex+1 === arrSize-1){
      console.log("That's all folks");
      setBtn("Result")
    }

    if(btn==="Result") {
      console.log('ResultData - ', resultData);
      console.log('ResultData11 - ', data);
      navigate(navigationPath, {state: {"data": resultData, "correct":correct, "wrong":wrong}});
    }
    console.log('ResultData11 - ', data);
    
    //console.log("CurrentIndex = ", currentIndex, " || arrSize = ", arrSize-1, " ==== ", currentIndex===arrSize-1);
    //console.log('Length - ', arrSize);
    
  };

  return (
    <div className="container">
      <p className='display-4'>Interview</p>
      <small><table className='timer'>
        <tr className='borders'>
          <th className='border p-2'>Hr</th>
          <th className='border p-2'>Min</th>
          <th className='border p-2'>Sec</th>
        </tr>
        <tr className='borders'>
          <td className='hr_  border rounded-5 p-2' style={{color: "blue"}}>{currentTime.hr}</td>
          <td className='min_ border p-2' style={{color: "green"}}>{currentTime.min}</td>
          <td className='sec_ border p-2' style={{color: "red"}}>{currentTime.sec}</td>
        </tr>
      </table></small>
      
      <div className='sec_ countDown-circle move-top-right text-center' style={{color: "red", fontWeight: 'bold'}}>{secondsData}</div>

        <div className='containers borders my-5'>
          <Grid container spacing={2} className='borders'>
            <Grid item xs={10} className='Grid1 borders'>
              <div className='card borders'>
                <div className='cardHeading text-center border'>
                  <Grid className='cardHeading border' container spacing={0} height={100}>
                    <Grid item xs={6}><big><p className="text-left mx-4 my-4">Candidate Name - {location.state.info.interviewerName}</p></big></Grid>
                    <Grid item xs={6}><big><p className="text-right mx-4 my-4">Company - {location.state.info.companyName}</p></big></Grid>
                  </Grid>
                </div>
                <div className='cardQuestion border'>
                    <p className="text-center my-4" style={{fontSize:'30px'}}>{location.state.questions[currentIndex].question}</p>
                </div>
              </div>
            </Grid>
            <Grid container item xs={2} className='borders'>
              <div className='question-status-chart text-left m-0 border' style={{height:"300px", overflowY:"scroll"}}>
              {
                location.state.questions.map((ce, index) => {
                  return (
                    // <div className='question-status-chart'>
                    <span className='text-center borders m-1'><div className='btn m-1 question-icon' style={showStatusStyle} onClick={()=>{console.log('id - ', ce.id);}}>{index+1}</div></span>
                    // </div>
                  )
                })
              }
            </div>
            </Grid>
          </Grid>
        </div>
        {/* <div>{location.questions.map((ce) => {
          return (
            <p>{ce.id}</p>
          )
        })}</div> */}
        <button type='button' className='btn btn-outline-primary mx-3' onClick={() => handleCorrect(location.state.questions[currentIndex])}>Correct</button>
        <button type='button' className='btn btn-outline-warning mx-3' onClick={() => handleWrong(location.state.questions[currentIndex])}>Wrong</button>


        <button type='button' className='btn btn-outline-secondary mx-3' onClick={nextQuestion} disabled={isDisable}>{btn}</button>


      {/* <div className='circle my-5'></div> */}
    </div>
  );
};

export default InterviewComponent;