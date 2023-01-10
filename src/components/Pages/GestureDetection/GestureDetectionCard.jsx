import React from "react";
// import custom_styles from './Css/GestureDetection.module.css';
const GestureDetectionCard=({gestureData})=>{
    return (
        <div className="movie">
            <div>
                <p>{gestureData.created_at}</p>
            </div>
            <div>
                <img src={gestureData.path!=='N/A'? `http://127.0.0.1:8000${gestureData.path}`:'https://via.placeholder.com/400'} alt={gestureData.name}/>
            </div>
            {/* <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div> */}
        </div>
    );
};

export default GestureDetectionCard;