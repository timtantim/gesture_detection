import React from 'react'
// import { ReactFlvPlayer } from "@asurraa/react-ts-flv-player";
import {ReactFlvPlayer} from 'react-flv-player'

function FlvLiveStream() {
  const url = "http://localhost:8000/live/camera.flv";
  
  return (
    <ReactFlvPlayer
    url = {url}
    heigh = "800px"
    width = "800px"
    isMuted={true}
  />
  );
}


export default FlvLiveStream
