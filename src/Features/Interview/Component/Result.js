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

        width: "125px",
        height: "125px",
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
            <table className='center1 borders text-left my-5' width={"80%"}>
            {
                location.state.data.map((ce, index) => {
                    return(
                        <tr className='borders' key={index} width={"30%"}>
                            <td className='border p-2'>{index+1}</td>
                            <td className='border pl-4' style={ce.status ? {"color":"green"} : {"color":"red"}}>{ce.question.question}</td>
                        </tr>
                    )
                })
            }
            </table>
            </Grid>
            <Grid item xs={3} className="borders">
                <div className='my-5 border m-3' style={{"backgroundColor":"#c0c0c0", "borderRadius":"20px"}}>
                    <span className='resultBoard borders' style={{"fontSize":"4rem"}}>{}<span style={{"color":scoreColor}}>{location.state.correct}</span>{}<span style={{"color":"green"}}>/</span>{}<span style={{"color":"green"}}>{location.state.data.length}</span>{}</span>
                    <span className='resultBoard borders my-2' style={{"marginLeft": "15%"}}><span className="displays-4" style={{"marginLeft": "15%", "color": scoreColor, "fontSize":"2rem"}}>
                        <span className='progressBar' style={progressIcon}><progress value={percent} min="0" max="100" style={{"visibility":"hidden", "height":0,"width":0}}></progress>{percent}%</span>
                    </span></span>
                    <p className="my-5" style={{"color": scoreColor, "fontSize":"1.5rem"}}>{percent<75 ? "Hard Luck!! Need more Practice!!" : "Great Work!! keep Practicing."}</p>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Result