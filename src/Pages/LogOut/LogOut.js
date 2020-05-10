import React, { useState, useEffect } from 'react'
import './LogOut.css'
import { MDBCard, MDBCardTitle, MDBCardText, MDBProgress } from "mdbreact";
import { Redirect } from 'react-router-dom';
const LogOut = () => {
    const [progress, setProgress] = useState({bar:0,message:"Cleaning up the cache"});

    useEffect(()=>{
        setTimeout(()=>{setProgress({...progress,bar:25})},500);
        setTimeout(()=>{setProgress({...progress,bar:75})},1200);
        setTimeout(()=>{setProgress((preV)=>{return {bar:preV.bar,message:"Almost done"}})},1500);
        setTimeout(()=>{setProgress((preV)=>{return{message: preV.message,bar:100}})},1800);
        setTimeout(()=>{setProgress((preV)=>{return{message: preV.message,bar:150}})},3500);
    },[])


    if(progress.bar === 150){
       return <Redirect to="/login"/>
    }

    return (
        <div className="logout">
            <MDBCard className="card-body">
                <MDBCardTitle>Thank you for using our services</MDBCardTitle>
                <MDBCardText>
                   We're logging your cridentials out... 
                </MDBCardText>
                <div className="flex-row">
                    {progress.message}...
                </div>
                <MDBProgress material value={progress.bar} animated />
            </MDBCard>
        </div>
    );
}



export default LogOut;