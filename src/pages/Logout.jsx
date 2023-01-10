// import React from 'react'
import React,{ useEffect,useState } from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {
    setLoginFalse,
    setExpiresIn,
    setExpireTime,
    setRefreshToken,
    setUserAccount,
    setAccessToken,
    setTokenType
} from '../../src/redux/loginSlice';

function Logout() {
    
    const [logoutStatus,setLogoutStatus]=useState(false);
    const {access_token}=useSelector((state)=>state.login);
    const dispatch=useDispatch();
    const VerifyToken=(token)=>{
        
        const headers = {
            // "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization" : `Bearer ${token}`,
        }
        const options = {
            method: 'POST',
            headers:headers
        };
        return fetch(`${process.env.REACT_APP_SERVER_API_URL}revoke_token`,options)  
        .then( response => response.status)
        .then( response => {
            return response;          
        });
    }


    useEffect(() => {
        // const token=localStorage.getItem('access_token');
        if(access_token){
       
            VerifyToken(access_token).then(function(result) {
            //  return children;
                if(result==200){
                    localStorage.clear();
                    dispatch(setExpiresIn(null));
                    dispatch(setExpireTime(null));
                    dispatch(setRefreshToken(null));
                    dispatch(setUserAccount(null));
                    dispatch(setAccessToken(null));
                    dispatch(setTokenType(null));
                    setLogoutStatus(true);
                    dispatch(setLoginFalse());
                }else{
                    setLogoutStatus(false);
                }
            });
        }
    },[]);

    return (logoutStatus)?<Navigate to="/login" replace />:'';
}

export default Logout