import React, { useEffect, useState } from 'react';
//import './YourComponent.css'; // Import your CSS file

const InterviewComponent = () => {

  const [currentTime, setCurrentTime] = useState({
    hr: null,
    min: null,
    sec: null
  });

  const time = new Date();

  // console.log('time - ');
  // console.log(time);

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

  return (
    <div className="container">
      <p className='display-4'>Coming Soon...</p>
      <table className='timer'>
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
      </table>

      {/* <div className='circle my-5'></div> */}
    </div>
  );
};

export default InterviewComponent;