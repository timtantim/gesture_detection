import React from 'react';
import { useEffect,useState } from 'react';
// import './App.css';
import './Css/GestureDetection.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import GestureDetectionCard from './GestureDetectionCard';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Comment from './pages/Comment';
import Analytics from './pages/Analytics';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import GestureDetection from './pages/GestureDetection';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import RNSystemSounds from '@dashdoc/react-native-system-sounds';



const API_KEY='4c341357';
const API_URL=`http://www.omdbapi.com/?apikey=${API_KEY}`;
const GESTURE_API_URL=`http://127.0.0.1:8000/api/`;

function App() {
  const [movies,setMovies] = useState([]);
  const [gestureDatas,setGesturesData] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');
  const searchMovie = async (title)=>{
    const response=await fetch(`${API_URL}&s=${title}`);
    const data= await response.json(); 
    setMovies(data.Search);
  }
  const notify = () => toast("Gesture Detect!!!");
  const searchGestureData=async()=>{
    const response=await fetch(`${GESTURE_API_URL}load_all_files`);
    const data= await response.json(); 
    console.log(data.results);
    setGesturesData(data.results);
  }
// alert(process.env.PUSHER_APP_KEY);
  useEffect(()=>{
    searchMovie('Spiderman');
    searchGestureData();
    const pusher = new Pusher("e8fb23345bb17524e72f", {
			cluster: 'ap3'
		})
		const channel1 = pusher.subscribe('python_aa820116');
		channel1.bind('HelpAlertEvent',function(data) {
        searchGestureData();
        //http://soundbible.com/mp3/front-desk-bells-daniel_simon.mp3
        //https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_vehicles_aircraft_call_bell_dual_tone_44562.mp3
        let newOrderSound = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_vehicles_aircraft_call_bell_dual_tone_44562.mp3');
        newOrderSound.play();
        // newOrderSound.pause();
        notify();
		});
    // return (() => {
		// 	pusher.unsubscribe('channel_name1')
		// });
  },[]);

  // return (
  //   <div className='app'>
  //     <h1>MovieLand</h1>

  //     <div className='search'>
  //         <input
  //           placeholder='Search for movies'
  //           value={searchTerm}
  //           onChange={(e)=>setSearchTerm(e.target.value)}
  //         />
  //         <img 
  //           src={SearchIcon}
  //           alt="search"
  //           onClick={()=>searchMovie(searchTerm)}
  //         />
  //     </div>
      
  //       {
  //         movies.length>0 ?(
  //           <div className='container'>
  //             {
  //               movies.map((movie)=>(
  //                 <MovieCard movie={movie}/>
  //               ))
  //             }
  //           </div>
  //         ):
  //         (
  //           <div className="empty">
  //             <h2>No movies found</h2>
  //           </div>
  //         )
  //       }
        
  //     </div>
    
  // );
  return (
    <>
    
    {/* <BrowserRouter>
      <Sidebar>
          <Routes>
              <Route path='/' element={<Dashboard/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/gestureDetection' element={<GestureDetection/>} />
              <Route path='/comment' element={<Comment/>} />
              <Route path='/analytics' element={<Analytics/>} />
              <Route path='/product' element={<Product/>} />
              <Route path='/productList' element={<ProductList/>} />
          </Routes>
      </Sidebar>
    </BrowserRouter> */}
     
    
  
    {/* <div className='app'>
      <h1>Gesture Detection</h1>

      <div className='search'>
          <input
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <img 
            src={SearchIcon}
            alt="search"
            onClick={()=>searchMovie(searchTerm)}
          />
      </div>
      
        {
          gestureDatas.length>0 ?(
            <div className='container'>
              {
                gestureDatas.map((gestureData)=>(
                  <GestureDetectionCard gestureData={gestureData}/>
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
        <ToastContainer />
      </div> */}
      <GestureDetection/>
    </>
    
  );
}

export default App;
