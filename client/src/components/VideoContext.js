import React from 'react'
import { useState } from 'react';

export const videoContext = React.createContext();

function VideoContext(props) {

    const [videoId, setVideoId] = useState('ewJOtbG6G_g');


    return (
            <videoContext.Provider value={{ videoId, setVideoId }}>
                {props.children}
            </videoContext.Provider>
    )
}

export default VideoContext