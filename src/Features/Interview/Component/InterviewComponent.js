import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
//import './YourComponent.css'; // Import your CSS file

const InterviewComponent = () => {

  const [currentTime, setCurrentTime] = useState({
    hr: null,
    min: null,
    sec: null
  });

  const [secondsData, setSecondsData] = useState(0);

  const [timeup, setTimeup] = useState("");

  const [showStatusStyle, setShowStatusStyle] = useState({
    background: "rgb(211, 211, 211)"
  });

  const location = useLocation();

  const [id, setId] = useState();

  const time = new Date();

  // console.log('time - ');
  // console.log(time);

  const statusArray = []

  for(let i=0; i<30; i++){
    statusArray.push(i);
  }

  useEffect(() => {
    setTimeup("");

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

  useEffect(() => {
    let num = Math.floor((Math.random()*56))
    console.log('Random - ', num);
    console.log('Location - ', location);
  }, [])

  const handleCorrect = (id) => {
    let num = Math.floor((Math.random()*56))
    console.log('Random - ', num);
    setShowStatusStyle({background: "rgb(150, 200, 255)"})
  }

  const handleWrong = (id) => {
    setShowStatusStyle({background: "rgb(211, 100, 100)"})
  }

  //const sound = new Audio("D:\My Projects\interview_master\public\beep-07a.wav");

  function nextQuestion() {
    
    setTimeup("");
    var seconds = parseInt(location.state.req.time);
    const countDown = setInterval(stopWatch, 1000);
    
    function stopWatch(){
      
      if(seconds!==0){
        seconds--;
        setSecondsData(seconds);
      }
      if(seconds<3) {
        var sound = new Audio("beep-07a.wav");
        sound.volume = 0.05;
        sound.play().catch((err) => {console.log('Error - ', err);});
      }
      if(seconds===0) {
        clearInterval(countDown);
        setTimeup("TIME UP");
        let num = Math.floor((Math.random()*56))
        console.log('Random - ', num);
      }
    }
    
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
        <p className='borders'>{timeup}</p>

        <div className='containers borders my-5'>
          <Grid container spacing={2} className='borders'>
            <Grid item xs={10} className='Grid1 borders'>
              <div className='card borders'>
                <div className='cardHeading border'>Heading</div>
                <div className='cardQuestion border'>Question</div>
              </div>
            </Grid>
            <Grid container item xs={2} className='borders'>
              <div className='question-status-chart text-left m-0 border' style={{height:"300px", overflowY:"scroll"}}>
              {
                location.state.response.map((ce, index) => {
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
        <button type='button' className='btn btn-outline-primary mx-3' onClick={ handleCorrect}>Correct</button>
        <button type='button' className='btn btn-outline-warning mx-3' onClick={handleWrong}>Wrong</button>


        <button type='button' className='btn btn-outline-secondary' onClick={nextQuestion}>Next</button>


      {/* <div className='circle my-5'></div> */}
    </div>
  );
};

export default InterviewComponent;