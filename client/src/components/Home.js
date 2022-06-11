import React, { useContext } from 'react'
import { Button, TextField } from '@mui/material';
import Typewriter from 'typewriter-effect';
import { socketContext } from './App';

function Home(props) {
    const socket = useContext( socketContext )
    console.log( socket );
    return (
        <div className='app-container flex'>
            <div className="youtube-section flex">
                <div className="youtube-image flex">
                    <img className='youtube-thumbnail' src="youtube-dark.jpg" alt="Youtube Screenshot" />
                </div>
                <div className="youtube-text flex">
                    <span >Watch YouTube videos with <Typewriter
                        options={{
                            strings: ["your friends.", 'your family.', 'your colleagues.'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                    </span>

                </div>
            </div>
            <div className="input-section">
                <div className="get-started">
                    <span>Get Started</span>
                </div>
                <div className="name-name">
                    <TextField inputRef={props.name} id="outlined-basic" required sx={{ input: { color: 'white' }, 'margin-top': '3rem' }} label="Enter your name " focused variant="outlined" />
                </div>
                <div className="input-group flex">
                    <div className="host-room flex flex-column">
                        <TextField inputRef={props.videoURL} id="outlined-basic" sx={{ input: { color: 'white' }, margin: '1rem' }} label="Youtube Video URL" focused variant="outlined" />
                        <Button sx={{ width: "80%", color: "white", margin: 'auto' }} variant='outlined' onClick={props.hostRoom} > "Host Room" </Button>
                    </div>
                    <div className="join-room flex flex-column">
                        <TextField inputRef={props.roomInput} id="outlined-basic" label="Room ID" sx={{ input: { color: 'white' }, margin: '1rem' }} focused variant="outlined" />
                        <Button sx={{ width: "80%", color: "white", margin: 'auto' }} variant='outlined' onClick={props.joinRoom}> Join a Room </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home