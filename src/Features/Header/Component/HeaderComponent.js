import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const HeaderComponent = () => {

    const [mode, setMode] = useState("Dark Mode");

    const [modeProps, setModeProps] = useState({
        backgroundColor: "white",
        color: "black",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    })

    const handleMode = () => {
        if(mode == "Dark Mode") {
            setMode("Lite Mode")
            setModeProps({backgroundColor: "black", color:"white", boxShadow: "0 4px 8px 0 rgba(225, 225, 225, 0.2)"})
            document.body.style.backgroundColor = "black"
            document.body.style.color = "white"
            document.body.style.border = "1px solid white"
        }
        else {
            setMode("Dark Mode")
            setModeProps({backgroundColor: "white", color:"black",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"})
            document.body.style.backgroundColor = "white"
            document.body.style.color = "black"
            document.body.style.border = "1px solid black"
        }
    }

  return (
    <div>
      <nav className='main-nav' style={modeProps}>
        <div className='logo'>
            <h3>
                <span className='cap display-4'>I</span>NTERVIEW<span className='cap display-4'>M</span>ASTER
            </h3>
        </div>
        <div className='menu-links '>
            <ul>
                <li className='li1'>
                    <a href='#'>Home</a>
                </li>
                <li className='li2'>
                    <Link to='/all-questions'>All Questions</Link>
                </li >
                <li className='li3'>
                    <a href='#'>Category</a>
                </li>
                <li className='li4'>
                    <a href='#'>Interview</a>
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
