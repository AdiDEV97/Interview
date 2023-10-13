import { colors } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const HeaderComponent = () => {

    const [mode, setMode] = useState("Dark Mode");

    const [modeProps, setModeProps] = useState({
        backgroundColor: "white",
        color: "black",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    })

    const [headerClass1, setHeaderClass1] = useState("navbar-light")

    const [headerClass2, setHeaderClass2] = useState("bg-light")

    const [selectedHeaderTab, setSelectedHeaderTab] = useState("All Questions")

    const [tabHilight, setTabHilight] = useState({
        fontWeight: "normal"
    })

    const navigate = useNavigate();

    const passData = () => navigate("/all-questions", {state : modeProps});

    const handleMode = () => {
        if(mode === "Dark Mode") {
            setMode("Lite Mode")

            setHeaderClass1("navbar-dark")
            setHeaderClass2("bg-dark")
            
            setModeProps({backgroundColor: "rgb(40, 40, 41)", color:"rgb(206, 206, 219)", boxShadow: "0 4px 8px 0 rgba(225, 225, 225, 0.2)"})
            document.body.style.backgroundColor = "rgb(40, 40, 41)"
            document.body.style.color = "rgb(206, 206, 219)"
        }
        else {
            setMode("Dark Mode")

            setHeaderClass1("navbar-light")
            setHeaderClass2("bg-light")

            setModeProps({backgroundColor: "white", color:"black",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"})
            document.body.style.backgroundColor = "white"
            document.body.style.color = "black"
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
    
    <nav className={`navbar navbar-expand-lg ${headerClass1} ${headerClass2}`} width={"100%"} style={{modeProps, fontWeight:"bold"}}>
        <div class="container-fluid">
            
            <div className='logo mr-5'>
                <h3>
                    <span className='display-4'><b>I</b></span><span className='display-6'>NTERVIEW</span><span className='display-4'><b>M</b></span><span className='display-6'>ASTER</span>
                </h3>
            </div>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                        
                    <Link className="nav-link mx-2" aria-current="page" id='all-questions' name={"All Questions"} to="/all-questions">All Questions</Link>
                                
                
                    <Link className="nav-link mx-2" id='add-questions' name={"Add Question"} to="/new-question">Add Question</Link>
                
                                
                    <Link className="nav-link mx-2" id='category' name={"Category"} to="/categories">Category</Link>
                
                
                    <Link className="nav-link mx-2" id='interview' name={"Interview"} to="/interview-requisites">Interview</Link>
                

                    <Link className="nav-link mx-2" id='interview' name={"Interview"} to="#">About</Link>


                    <Link className="nav-link modeLink mx-2 pr-0" onClick={handleMode}>{mode}</Link>

                </div>   
            </div>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>

  )
}

export default HeaderComponent
