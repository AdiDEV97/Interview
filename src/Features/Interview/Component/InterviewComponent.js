import React, { useState } from 'react';
//import './YourComponent.css'; // Import your CSS file

const InterviewComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container">
      <button onClick={toggleExpand}>Toggle Content</button>
      <div className={`content ${expanded ? 'expanded' : ''}`}>
        Your expandable content goes here.
      </div>
    </div>
  );
};

export default InterviewComponent;