import React from 'react'
import BackDrop from '../BackDrop/BackDrop'
import './ErrorHandler.css'
const ErrorHandler = (props) => {
        return (
            <div>
                <BackDrop show={props.error} clickHandler = {props.confirmHandler}>
                    <h1 className="alert-danger message">There's something wrong with API requests: {props.error? props.error.message : null}</h1>
                </BackDrop>
                {props.children}
            </div>
        );
    }

export default ErrorHandler;