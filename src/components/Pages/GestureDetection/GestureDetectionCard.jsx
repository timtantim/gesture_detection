import React from "react";
import LazyLoad from 'react-lazy-load';
// import custom_styles from './Css/GestureDetection.module.css';
const GestureDetectionCard=({gestureData})=>{
    return (
        <div className="movie">
            <div>
                <p>{gestureData.created_at}</p>
            </div>
            <div>
            {/* <LazyLoad height={762} width={400} threshold={0.95}> */}
                <img src={gestureData.path!=='N/A'? `${process.env.REACT_APP_SERVER_HOST_URL}${gestureData.path}`:'https://via.placeholder.com/400'} alt={gestureData.name}/>
            {/* </LazyLoad> */}
            </div>
            {/* <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div> */}
        </div>
    );
};

export default GestureDetectionCard;