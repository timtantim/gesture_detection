import React from 'react'
import { useEffect,useState } from 'react';
import SearchIcon from '../search.svg';
import styles from '../Css/GestureDetection_v1.css';
import {Navigate} from 'react-router-dom';
import GestureDetectionCard from '../components/Pages/GestureDetection/GestureDetectionCard';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector,useDispatch} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

function GestureDetection() {

    const {access_token}=useSelector((state)=>state.login);
    const [gestureDatas,setGesturesData] = useState([]);
    const [tokenStatus,setTokenStatus] = useState(200);
    const [searchTerm,setSearchTerm] = useState('');
    const notify = () => toast("Gesture Detect!!!",{
      toastId: 'gesture_detect'
    });
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
      const response=await fetch(`${process.env.REACT_APP_SERVER_API_URL}load_all_files`,options);
      const data= await response.json(); 
      const status=await response.status;
      console.log(status);
      setTokenStatus(status);
      setGesturesData(data.results);
    }
    useEffect(()=>{
        searchGestureData();
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
                cluster: 'ap3'
            })
            const channel1 = pusher.subscribe('python_aa820116');
            channel1.bind('HelpAlertEvent',function(data) {
            searchGestureData();
            //http://soundbible.com/mp3/front-desk-bells-daniel_simon.mp3
            //https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_vehicles_aircraft_call_bell_dual_tone_44562.mp3
            let newOrderSound = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_vehicles_aircraft_call_bell_dual_tone_44562.mp3');
            newOrderSound.play();
            notify();
            });
      },[]);
  return (
    <>
    {
      (tokenStatus=='200')?
      <div className="gesture">
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

export default GestureDetection