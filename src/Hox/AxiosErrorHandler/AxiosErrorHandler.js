import { useState, useEffect } from 'react'
import axios from 'axios'
const AxiosErrorHandler = () =>{
    const [error,setError] = useState(null);
    const requestIntercep = axios.interceptors.request.use(req=>{
        setError(null);
        return req;
    });

    const responseIntercep = axios.interceptors.response.use(res=>res,err=>setError(err));

    useEffect(()=>{
        return ()=>{
            axios.interceptors.request.eject(requestIntercep);
            axios.interceptors.response.eject(responseIntercep);
        }
    },[requestIntercep,responseIntercep])

    const clearError = ()=>setError(null);

    return [error,clearError];
}

export default AxiosErrorHandler;