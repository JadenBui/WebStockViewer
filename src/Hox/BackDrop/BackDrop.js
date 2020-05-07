import React from 'react'
import './BackDrop.css'

const BackDrop = (props) =>{
    return (
        props.show ? 
        <div className="backdrop" onClick = {props.clickHandler}>
            {props.children}
        </div> : null
    )
}

export default BackDrop;