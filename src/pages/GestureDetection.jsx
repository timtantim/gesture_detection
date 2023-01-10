import React from 'react'
import { useEffect,useState } from 'react';
import SearchIcon from '../search.svg';
import styles from '../Css/GestureDetection_v1.css';
// import '../Css/GestureDetection.css';
// import MovieCard from './MovieCard';
// import GestureDetectionCard from '../GestureDetectionCard';
import GestureDetectionCard from '../components/Pages/GestureDetection/GestureDetectionCard';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector,useDispatch} from 'react-redux';
function GestureDetection() {

    const {access_token}=useSelector((state)=>state.login);
    const [gestureDatas,setGesturesData] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    const notify = () => toast("Gesture Detect!!!");
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
      console.log(data.results);
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
        <div className="gesture">
        {/* <Helmet>
            <style>{'body { background-color: #212426; } font-family:{var(--font-roboto);}'}</style>
        
        </Helmet> */}
      
            
    
        <div className="app">
      <h1>Gesture Detection</h1>

      {/* <div className='search'>
          <input
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <img 
            src={SearchIcon}
            alt="search"
            onClick={()=>{}}
          />
      </div> */}
      
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
        {/* <ToastContainer autoClose={500}/> */}
      </div>
       
        </div>

    </>
  )
}

export default GestureDetection