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

        width: "10vmin",
        height: "10vmin",
        borderRadius: "50%",
        background: `radial-gradient(closest-side, white 85%, transparent 95% 80%), conic-gradient(${scoreColor} ${percent}%, pink 0)`,
        position: "relative",
        botton: "200px"
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
        <p className='display-5'>Result</p>
        <Grid container spacing={0}>
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
            <Grid item xs={2} className="borders pb-5">
                <div className='mt-0 borders mr-3 p-4' style={{"backgroundColor":"#c0c0c0", "borderRadius":"20px", "width":"43vmin"}}>
                    <Grid container spacing={0} className='borders'>
                        <Grid item xs={6} className='borders'>
                            <span className='resultBoard borders' style={{"fontSize":"4rem"}}>
                                <span style={{"color":scoreColor, fontSize:"8vmin"}}>{location.state.correct}</span><span style={{"color":"green", fontSize:"8vmin"}}>/</span><span style={{"color":"green", fontSize:"8vmin"}}>{location.state.data.length}</span>
                            </span>
                        </Grid>
                        <Grid item xs={6} className='borders p-0'>
                            <span className='resultBoard borders' style={{"marginLeft": "15%"}}>
                                <span className="displays-4" style={{"marginLeft": "15%", "color": scoreColor, "fontSize":"180%"}}>
                                    <span className='progressBar' style={progressIcon}>
                                        <progress value={percent} min="0" max="100" style={{"visibility":"hidden", "height":0,"width":0}}></progress>
                                        <span style={{fontSize:"3vmin"}}>{percent}%</span>
                                    </span>
                                </span>
                            </span>
                        </Grid>
                        <p className="mt-5 ml-3 pb-0 text-center" style={{"color": scoreColor, "fontSize":"2.3vmin", height:"10px"}}>{percent<75 ? "Hard Luck!! Need more Practice!!" : "Great Work!! keep Practicing."}</p>
                    </Grid>
                    
                </div>
                <div className='mr-3 mt-1 p-0'>
            
                <table className='scoreTable p-0 mt-2' style={{"backgroundColor":"#c0c0c0", "borderRadius":"10px"}}>
                    <tr>
                        <th className='text-center' style={{width:"33.33%", fontSize:"2vmin"}}>Correct <span className='circle' style={{backgroundColor:"Green"}}></span></th>
                        <th className='text-center' style={{width:"33.33%", fontSize:"2vmin"}}>Wrong <span className='circle' style={{backgroundColor:"Red"}}></span></th>
                        <th className='text-center' style={{width:"33.33%", fontSize:"2vmin"}}>NA <span className='circle' style={{backgroundColor:"#8c8989"}}></span></th>
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