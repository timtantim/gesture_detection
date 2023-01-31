import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import {Navigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import { useEffect,useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {
    setLoginTrue,
    setExpiresIn,
    setExpireTime,
    setRefreshToken,
    setUserAccount,
    setAccessToken,
    setTokenType
} from '../../src/redux/loginSlice';


function Login() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setloginStatus] = useState(false);
    // const {loginState}=useSelector((state)=>state.login);
    const dispatch=useDispatch();
    /* Custom Function */
    const login=async()=>{
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        const params = {
            email: account,
            password: password
        };
        // body: JSON.stringify( params )
        const options = {
            method: 'POST',
            headers:headers,
            body: JSON.stringify( params )
        };
  
        fetch( `${process.env.REACT_APP_SERVER_API_URL}authentication`,options)
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
                setloginStatus(true);
            }else{
                setloginStatus(false);
                toast.error(obj.body.message , {
                     position: toast.POSITION.TOP_CENTER
                });
            }
        }).catch(function(exc) {
            setloginStatus(false);
            toast.error(exc.message , {
                position: toast.POSITION.TOP_CENTER
            });
          });
    }

    // useEffect(() => {
       
    //     if(loginStatus){
    //         return <Navigate to="/gestureDetection" replace />;
    //     }
    // },[loginStatus]);

    /* Event Handler */
    function handleAccountChange(e){
        setAccount(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function loginClick(e){
        e.preventDefault();
        login();
    }

  return (
    
        
            (loginStatus==false)?
            (
                <>
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={6}>
                        <TextField id="account" value={account} label="Account" onChange={handleAccountChange} variant="standard" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="password" value={password} label="Password" onChange={handlePasswordChange} variant="standard" type="password"/>
                    </Grid>
                    <Grid item xs={6} mt={6}>
                        <Button variant="outlined" onClick={loginClick} size="large">
                            Login
                        </Button>
                    </Grid>
                </Grid>
                </>
            ):(<><Navigate to="/gestureDetection" replace /></>)
        
        
       
    
  )
}

export default Login