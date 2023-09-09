import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
  })

  const [id, setId] = useState();

  const time = new Date();

  // console.log('time - ');
  // console.log(time);

  const statusArray = []

  for(let i=0; i<10; i++){
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
    var seconds = 10;
    const countDown = setInterval(stopWatch, 1000);
    
    function stopWatch(){
      
      if(seconds!==0){
        seconds--;
        setSecondsData(seconds);
      }
      if(seconds<3) {
        var sound = new Audio("beep-07a.wav");
        sound.volume = 0.01;
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

        <div className='containers my-5'>
          <Grid container spacing={2} className='border'>
            <Grid item xs={10} className='border'>
              <div className='card border'>
                <div className='cardHeading border'>Heading</div>
                <div className='cardQuestion border'>Question</div>
              </div>
            </Grid>
            <Grid container item xs={2} className='border'>
              {
                statusArray.map((ce) => {
                  return (
                    // <div className='question-status-chart'>
                    <Grid item xs={3} className='borders'><div className='question-icon' style={showStatusStyle} onClick={()=>{console.log('id - ', ce);}}>{ce+1}</div></Grid>
                    // </div>
                  )
                })
              }
              {/* <Grid item xs={4} className='border'><div className='question-icon' style={showStatusStyle}>1</div></Grid>
              <Grid item xs={4} className='border'><div className='question-icon' style={showStatusStyle}>2</div></Grid>
              <Grid item xs={4} className='border'><div className='question-icon' style={showStatusStyle}>3</div></Grid> */}
            
            
            </Grid>
          </Grid>
        </div>
        <button type='button' className='btn btn-outline-primary mx-3' onClick={ handleCorrect}>Correct</button>
        <button type='button' className='btn btn-outline-warning mx-3' onClick={handleWrong}>Wrong</button>


        <button type='button' className='btn btn-outline-secondary' onClick={nextQuestion}>Next</button>


      {/* <div className='circle my-5'></div> */}
    </div>
  );
};

export default InterviewComponent;