import React, { useState,useEffect }  from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Button from '@mui/material/Button';
import Moment from 'moment';
import { toast } from 'react-toastify';
import {Navigate} from 'react-router-dom';
import {
    setLoginTrue,
    setExpiresIn,
    setExpireTime,
    setRefreshToken,
    setUserAccount,
    setAccessToken,
    setTokenType
} from '../../redux/loginSlice';
function TokenExpireTimeCounter() {
    const dispatch=useDispatch();
    const {expires_time}=useSelector((state)=>state.login);
    const countDownDate = new Date(expires_time).getTime();
    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );
    const RefreshToken=()=>{
        const refresh_token=localStorage.getItem('refresh_token');
        const headers = {
            // "Content-Type": "application/json",
            "Accept": "application/json",
            "Refreshtoken" : refresh_token,
        }
        const options = {
            method: 'POST',
            headers:headers
        };  
        fetch( `${process.env.REACT_APP_SERVER_API_URL}refresh_oauth_token`,options)
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => {
            if(obj.status=='200'){
                let current_datetime=new Date();
                current_datetime=current_datetime.setSeconds(current_datetime.getSeconds() + parseInt(obj.body.expires_in));
                // localStorage.setItem('access_token',obj.body.access_token);
                localStorage.setItem("refresh_token", obj.body.refresh_token);
                // localStorage.setItem("token_type", obj.body.token_type);
                // localStorage.setItem("expires_in", obj.body.expires_in);
                localStorage.setItem("user_account", obj.body.user_account);
                // localStorage.setItem("expires_time", new Date(current_datetime));

                dispatch(setExpiresIn(obj.body.expires_in));
                dispatch(setExpireTime(new Date(current_datetime).toString()));
                dispatch(setRefreshToken(obj.body.refresh_token));
                dispatch(setUserAccount(obj.body.user_account));
                dispatch(setAccessToken(obj.body.access_token));
                dispatch(setTokenType(obj.body.token_type));
                dispatch(setLoginTrue());
                
            }else{
                
                toast.error(obj.body.message , {
                     position: toast.POSITION.TOP_CENTER
                });
            }
        }).catch(function(exc) {
            
            toast.error(exc.message , {
                position: toast.POSITION.TOP_CENTER
            });
          });
    }

    const getReturnValues = (countDown) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
      
        return [days, hours, minutes, seconds];
    };

    useEffect(() => {
        const interval = setInterval(() => {
          setCountDown(countDownDate - new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [countDownDate]);    

    const [days, hours, minutes, seconds]=getReturnValues(countDown);

    return (
        <>
            <h4 style={(days==0 && hours==0 && minutes<10)?{'color':'red'}:{'color':'black'}}>Token 剩餘時間:<br/>{days}天:{hours}時:{minutes}分:{seconds}秒</h4>
            {


                (days==0 && hours==0 && minutes==0)?<Navigate to="/login" replace />:
                (days==0 && hours==0 && minutes<10)?
                <Button variant="outlined" onClick={RefreshToken} size="large">
                            Refresh Token
                </Button>
                :''
             
            }
        </>
    );
}

//(days==0 && hours==0 && minutes<10)?
//<Button variant="outlined" onClick={RefreshToken} size="large">
//           Refresh Token
//</Button>
//:'' 

//<Navigate to="/login" replace />
export default TokenExpireTimeCounter