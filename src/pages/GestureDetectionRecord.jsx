import React from 'react'
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '../search.svg';
import styles from '../Css/GestureDetection_v1.css';
import {Navigate} from 'react-router-dom';
import GestureDetectionCard from '../components/Pages/GestureDetection/GestureDetectionCard';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector,useDispatch} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import {DeleteForeverIcon} from "../Icons/Sidebar/Icons";

function GestureDetectionRecord() {

    const {access_token}=useSelector((state)=>state.login);
    const [gestureDatas,setGesturesData] = useState([]);
    const [page,setPage]= useState(1);
    const [hasMore,setHasMore]= useState(true);
    const [tokenStatus,setTokenStatus] = useState(200);
    const [searchTerm,setSearchTerm] = useState('');
    // const notify = () => toast("Gesture Detect!!!",{
    //   toastId: 'gesture_detect'
    // });
    const searchGestureData=async()=>{
    //   const token=localStorage.getItem('access_token');
      const headers = {
          // "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization" : `Bearer ${access_token}`,
      }
      const options = {
          method: 'GET',
          headers:headers
      };  
      const response=await fetch(`${process.env.REACT_APP_SERVER_API_URL}load_all_files?page=${page}`,options);
      const data= await response.json(); 
      const status=await response.status;
      // console.log(status);
      // setTokenStatus(status);
      // setGesturesData(data);
      return {data,status};
    }

    const RemoveAllFIles=async()=>{
      const headers = {
        // "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization" : `Bearer ${access_token}`,
      }
      const options = {
          method: 'POST',
          headers:headers
      };  
      const response=await fetch(`${process.env.REACT_APP_SERVER_API_URL}delete_all_file`,options);
      const data= await response.json(); 
      const status=await response.status;
      if(status=='200'){
        toast.success('成功刪除偵測紀錄!', {
            position: toast.POSITION.TOP_RIGHT
        });
        setGesturesData([]);
      }else{
        toast.error('刪除偵測紀錄失敗!', {
            position: toast.POSITION.TOP_CENTER
        });
      }
    }

    const fetchData =async()=>{
      
      const {data,status}= await searchGestureData();
      setTokenStatus(status);
      const next_page_url=data.next_page_url;
      if(next_page_url==null){
        setHasMore(false);
      }else{
        setHasMore(true);
        setPage(page+1);
      }
      // console.log(data.data);
      setGesturesData([...gestureDatas,...data.data]);
    };
    useEffect(()=>{
        // searchGestureData();
        fetchData();
      },[]);
      //style={{"max-height":"100vh"}}
      // style={{"max-height":"100vh","overflow-y":"scroll"}}
  return (
    <>
    {
      (tokenStatus=='200')?
      <div className="gesture">
          <div className="app">
              <h1>Gesture Record</h1>
       
              {
                gestureDatas.length>0 ?(
                  <div className='container'>
                  <Button variant="outlined" onClick={RemoveAllFIles} startIcon={<DeleteForeverIcon />}>
                    Delete
                  </Button>
                  <InfiniteScroll
                      pageStart={0}
                      loadMore={fetchData}
                      hasMore={hasMore}
                      loader={<div className="loader" key={0}>Loading ...</div>}
                      className="container"
                  >
                      {
                      gestureDatas.map((gestureData,index)=>(
                        <GestureDetectionCard key={index}  gestureData={gestureData}/>
                      ))
                    }
                  </InfiniteScroll>
                    
                  </div>
                ):
                (
                  <div className="empty">
                    <h2>No gesture data found</h2>
                  </div>
                )
              }
          </div>
        </div>:(tokenStatus=='401')?<Navigate to="/login" replace />:toast('Server error!')
    }
    
        {/* <div className="gesture">
          <div className="app">
              <h1>Gesture Detection</h1>
              {
                gestureDatas.length>0 ?(
                  <div className='container'>
                    {
                      gestureDatas.map((gestureData,index)=>(
                        <GestureDetectionCard key={index}  gestureData={gestureData}/>
                      ))
                    }
                  </div>
                ):
                (
                  <div className="empty">
                    <h2>No gesture data found</h2>
                  </div>
                )
              }
          </div>
        </div> */}

    </>
  )
}

export default GestureDetectionRecord