import React from 'react'
import ReactHlsPlayer from 'react-hls-player';

function LiveStream() {

    // const playerRef = React.useRef();

    // function playVideo() {
    //     playerRef.current.play();
    // }

    // function pauseVideo() {
    //     playerRef.current.pause();
    // }

    // function toggleControls() {
    //     playerRef.current.controls = !playerRef.current.controls;
    // }
  //http://localhost:80/tmp_hls/camera/index.m3u8
  return (

    <ReactHlsPlayer
    src="http://localhost:80/tmp_hls/camera/index.m3u8"
    autoPlay={true}
    controls={true}
    width="100%"
    height="auto"
  />

  );
}


export default LiveStream
