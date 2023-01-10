import { Routes, Route } from "react-router-dom";
import { useEffect,useState } from 'react';
// import { DynamicItem, Sidebar, dummyData } from "./components";
import {SIDEBAR_DATA as dummyData}  from "./data/Sidebar/Data";
import {default as Sidebar} from "./components/Sidebar/index";
import {DynamicItem} from "./components/Routes/[item]";

import { ToastContainer, toast } from 'react-toastify';
import GestureDetection from "./pages/GestureDetection";
import ProtectedRoute from "./components/Routes/ProtectRoute";
import "./App.css";

function App() {
  // const [authenticateStatus,setAuthenticateStatus]=useState(false);
  // const VerifyToken=(token)=>{
        
  //   const headers = {
  //       // "Content-Type": "application/json",
  //       "Accept": "application/json",
  //       "Authorization" : `Bearer ${token}`,
  //   }
  //   const options = {
  //       method: 'GET',
  //       headers:headers
  //   };
  //   return fetch(`${process.env.REACT_APP_SERVER_API_URL}validate_token`,options)  
  //   .then( response => response.status)
  //   .then( response => {
  //       return response;
  //   });
  // }
  // useEffect(() => {
  //   const token=localStorage.getItem('access_token');
  //   if(token){
   
  //       VerifyToken(token).then(function(result) {
  //       //  return children;
  //           if(result==200){
  //               // console.log(children);
  //               setAuthenticateStatus(true);
  //               // return children;
  //           }else{
  //               // return <Navigate to="/login" replace />;
  //               setAuthenticateStatus(false);
  //           }
  //       });
  //   }
  // },[]);
  return (
    <div id="main">
      {/* <Sidebar>
        <Routes>
          <Route path="/" element={<DynamicItem page="homepage" />} />
          {dummyData &&
            dummyData.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<DynamicItem page={item.name} />}
              />
            ))}
        </Routes>
      </Sidebar> */}

      
      <Sidebar>
        <Routes>
          <Route path="/" element={<GestureDetection/>} />
          {dummyData &&
            dummyData.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={(item.private)?<ProtectedRoute>{item.element}</ProtectedRoute>:item.element}
              />
            ))}
        </Routes>
      </Sidebar>
      <ToastContainer autoClose={500}/>
    </div>
  );
}

export default App;