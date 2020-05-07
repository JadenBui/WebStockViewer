import React, { useState, useEffect } from 'react'
import BackDrop from '../BackDrop/BackDrop'
import './ErrorHandler.css'
import AxiosErrorHandler from '../AxiosErrorHandler/AxiosErrorHandler'
const ErrorHandler = (ChildComponent) => {
    return (props) => {
        const [error, clearError] = AxiosErrorHandler();
        return (
            <div>
                <BackDrop show={error} clickHandler = {clearError}>
                    <h1 className="alert-danger message">There's something wrong with API requests: {error? error.message : null}</h1>
                </BackDrop>
                <ChildComponent {...props} />
            </div>
        );
    }
}

export default ErrorHandler;