import {Navigate} from 'react-router-dom';
export const VerifyToken=()=>{
    let token=localStorage.getItem('ApiToken');
    if(token){
        const response= fetch(`${process.env.REACT_APP_SERVER_API_URL}load_all_files`);
        if(response.status=='200'){
            return true;
        }else{
            return <Navigate to="/login" replace />;
        }
        // const data= response.json(); 
        // console.log(data.results);
    }else{
        return <Navigate to="/login" replace />;
        
    }
}