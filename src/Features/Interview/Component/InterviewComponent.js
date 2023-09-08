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

  const time = new Date();

  // console.log('time - ');
  // console.log(time);

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
    
  }, [])

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
      }
    }
    
  };

  return (
    <div className="container">
      <p className='display-4'>Coming Soon...</p>
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
        <button type='button' className='btn btn-outline-secondary' onClick={nextQuestion}>Next</button>


      {/* <div className='circle my-5'></div> */}
    </div>
  );
};

export default InterviewComponent;