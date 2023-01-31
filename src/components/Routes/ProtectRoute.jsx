import {Navigate} from 'react-router-dom';
import { useEffect,useState,useMemo } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {
    setLoginTrue,
    setLoginFalse,
    setExpiresIn,
    setExpireTime,
    setRefreshToken,
    setUserAccount,
    setAccessToken,
    setTokenType

} from '../../redux/loginSlice';

  const ProtectedRoute = ({children}) => {
    const [authenticateStatus,setAuthenticateStatus]=useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [apiReturnStatus,setApiReturnStatus] = useState(false);
    const {
        loginState,
        expires_in,
        expires_time,
        refresh_token,
        user_account,
        access_token,
        token_type
    }=useSelector((state)=>state.login);
    const dispatch=useDispatch();
    const VerifyToken=(token)=>{
        
        const headers = {
            // "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization" : `Bearer ${token}`,
        }
        const options = {
            method: 'GET',
            headers:headers
        };
        return fetch(`${process.env.REACT_APP_SERVER_API_URL}validate_token`,options)  
        .then( response => response.status)
        .then( response => {
            return response;
        });
    }
    const RefreshToken=(refresh_token)=>{
        // const refresh_token=localStorage.getItem('refresh_token');
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
                setIsLoggedIn(true);
                setApiReturnStatus(true) 
            }else{
                
                setApiReturnStatus(true) 
                setIsLoggedIn(false);
            }
        }).catch(function(exc) {
            setApiReturnStatus(true) 
            setIsLoggedIn(false);
   
        });
    }

    useEffect( () => {
        
        // const token=localStorage.getItem('access_token');
        
        // if(token){
       
        //     VerifyToken(token).then(function(result) {
        //         setApiReturnStatus(true)
        //     //  return children;
        //     console.log('狀態'+result);
        //         if(result==200){
        //             dispatch(setLoginTrue());
        //             setIsLoggedIn(true);
        //         }else{
        //             dispatch(setLoginFalse());
        //             setIsLoggedIn(false);
        //         }
        //     });
        // }else{    
        //     setApiReturnStatus(true) 
        //     setIsLoggedIn(false);
        // }
        //檢查redux有無Token
        //沒Token 轉登入頁
        //如果有redux Token 驗證Token 是否正確
        //如果redux 沒Token 檢查localStorage 有無Refresh Token，重新獲取新Token，失敗轉至登入頁
      
        
        if(access_token){
            VerifyToken(access_token).then(function(result) {
                setApiReturnStatus(true)
            //  return children;
            console.log('狀態'+result);
                if(result==200){
                    dispatch(setLoginTrue());
                    setIsLoggedIn(true);
                }else{
                    dispatch(setLoginFalse());
                    setIsLoggedIn(false);
                }
            });
        }else{   
            //檢查localstorage 有無Refresh Token，如果沒有 
            const refresh_token=localStorage.getItem('refresh_token');
            if(refresh_token){
                RefreshToken(refresh_token);
            
            }else{
                setApiReturnStatus(true) 
                setIsLoggedIn(false);
            }
        }
    },[apiReturnStatus]);



    // alert(isLoggedIn);

    return(
        <>
        {
             (apiReturnStatus)?((isLoggedIn)?children:<Navigate to="/login" replace />):'' 
             //(isLoggedIn)? children:<Navigate to="/login" replace /> 
        }     
        </>
    ); 
    
  
  };
  export default ProtectedRoute;