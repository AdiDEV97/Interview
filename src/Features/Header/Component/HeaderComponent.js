import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const HeaderComponent = () => {

    const [mode, setMode] = useState("Dark Mode");

    const [modeProps, setModeProps] = useState({
        backgroundColor: "white",
        color: "black",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    })

    const [selectedHeaderTab, setSelectedHeaderTab] = useState("All Questions")

    const [tabHilight, setTabHilight] = useState({
        fontWeight: "normal"
    })

    const navigate = useNavigate();

    const passData = () => navigate("/all-questions", {state : modeProps});

    const handleMode = () => {
        if(mode === "Dark Mode") {
            setMode("Lite Mode")
            setModeProps({backgroundColor: "rgb(40, 40, 41)", color:"rgb(206, 206, 219)", boxShadow: "0 4px 8px 0 rgba(225, 225, 225, 0.2)"})
            document.body.style.backgroundColor = "rgb(40, 40, 41)"
            document.body.style.color = "rgb(206, 206, 219)"
            // document.body.style.border = "1px solid white"
        }
        else {
            setMode("Dark Mode")
            setModeProps({backgroundColor: "white", color:"black",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"})
            document.body.style.backgroundColor = "white"
            document.body.style.color = "black"
            // document.body.style.border = "1px solid black"
        }
    }

    const handleHeaderTabs = (event) => {
            console.log('selected - ', event.target.name);
            setSelectedHeaderTab(event.target.name)
            var currentTab = document.getElementById(event.target.id);
            console.log('Current Tab - ', currentTab);
            currentTab.style.fontWeight="bold";
        }
        

    useEffect(() => {
        passData();
    }, [])

  return (
    <div style={modeProps}>
      <nav className='main-nav'>
        <div className='logo'>
            <h3>
                <span className='cap display-4'>I</span>NTERVIEW<span className='cap display-4'>M</span>ASTER
            </h3>
        </div>
        <div className='menu-links'>
            <ul>
                <li className='li1'>
                    <Link to='/all-questions' id='all-questions' name={"All Questions"}>All Questions</Link>
                </li >
                <li className='li2'>
                    <Link to='/new-question' id='add-questions' name={"Add Question"}>Add Question</Link>
                </li>
                <li className='li3'>
                    <Link to='/categories' id='category' name={"Category"}>Category</Link>
                </li>
                <li className='li4'>
                    <Link to='/interview-requisites' id='interview' name={"Interview"}>Interview</Link>
                </li>
            </ul>
        </div>
        <div className='about'>
            <span>About</span>
        </div>
        {/* <div className='mode'> */}
        <span className="mode" onClick={handleMode}>{mode}</span>
        {/* </div> */}
      </nav>
    </div>
  )
}

export default HeaderComponent
