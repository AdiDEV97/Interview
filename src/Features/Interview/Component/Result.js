import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Result = () => {

    const location = useLocation();

    const [scoreColor, setScoreColor] = useState("blue");

    const [percent, setPercent] = useState(0);

    const progressIcon = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: "75%",
        height: "105px",
        borderRadius: "50%",
        background: `radial-gradient(closest-side, white 85%, transparent 95% 80%), conic-gradient(${scoreColor} ${percent}%, pink 0)` 
    }

    useEffect(() => {
        console.log('Location Data - ', location.state);
        var per = (location.state.correct*100) / location.state.data.length;
        var roundedPer = Math.round(per * 10) / 10;
        setPercent(roundedPer);
        if(roundedPer < 75) {
            setScoreColor("Red");
        }
        else {
            setScoreColor("Green");
        }
    }, [])
  return (
    <div>
        <p className='display-4'>Result</p>
        <Grid container spacing={2}>
            <Grid item xs={9} className="borders">

            <table class="table table-striped">
            <tbody>
                {
                    location.state.data.map((ce, index) => {
                        return (
                            <tr>
                                <th scope="row" key={index}>{index+1}</th>
                                <td style={ce.status==="true" ? {"color":"green"} : (ce.status==="false" ? {"color":"red"} : {"color":"#8c8989"})}>{ce.question}</td>
                            </tr>
                        )})
                }
                
            </tbody>
            </table>

            </Grid>
            <Grid item xs={3} className="borders">
                <div className='mt-5 border mr-3' style={{"backgroundColor":"#c0c0c0", "borderRadius":"20px"}}>
                    <span className='resultBoard borders m-0' style={{"fontSize":"4rem"}}>{}<span style={{"color":scoreColor}}>{location.state.correct}</span>{}<span style={{"color":"green"}}>/</span>{}<span style={{"color":"green"}}>{location.state.data.length}</span>{}</span>
                    <span className='resultBoard borders my-2' style={{"marginLeft": "15%"}}><span className="displays-4" style={{"marginLeft": "15%", "color": scoreColor, "fontSize":"180%"}}>
                        <span className='progressBar' style={progressIcon}><progress value={percent} min="0" max="100" style={{"visibility":"hidden", "height":0,"width":0}}></progress>{percent}%</span>
                    </span></span>
                    <p className="my-5" style={{"color": scoreColor, "fontSize":"1.5rem"}}>{percent<75 ? "Hard Luck!! Need more Practice!!" : "Great Work!! keep Practicing."}</p>
                </div>
                <div className='mr-3 mt-1 p-0'>
                <table className='aa' style={{"backgroundColor":"#c0c0c0", "borderRadius":"10px"}} width="100%">
                    <tr>
                        <th className='text-center' width="33.33%">Correct <span className='circle' style={{backgroundColor:"Green"}}></span></th>
                        <th className='text-center' width="33.33%">Wrong <span className='circle' style={{backgroundColor:"Red"}}></span></th>
                        <th className='text-center' width="33.33%">NA <span className='circle' style={{backgroundColor:"#8c8989"}}></span></th>
                    </tr>
                    <tr>
                        <td><b>{location.state.correct}</b></td>
                        <td><b>{location.state.wrong}</b></td>
                        <td><b>{location.state.notAttempted}</b></td>
                    </tr>
                </table>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Result