import React, { useContext, useState } from 'react';
import './Room.css';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Send from '@mui/icons-material/Send';
import { useEffect, useRef } from 'react';
import { socketContext, userContext } from './App';

function Chat() {
  const chatBox = useRef();
  const textField = useRef();
  const user = useContext( userContext );
  const socket = useContext( socketContext );
  const [chat, setChat] = useState([]);

  // Update user list when a user joins the room
  socket.on('user-list',( data )=>{
    user.updateUsers( data )
  })

  socket.on('message-recieve', ( data )=>{
    if( data.name === socket.userName ) return;
    console.log(data);
    setChat([ ...chat, data ])
  })

  useEffect(() => {

    console.log(socket.id);
    // Get the scroll height of textField and scroll down using top option of scroll method along with smooth behavior
    textField.current.addEventListener('DOMNodeInserted', event => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  const sendMessage = () => {
    console.log(socket.roomId);
    const message = chatBox.current.value;
    socket.emit( 'message-sent', {name: socket.userName, message, roomId: socket.roomId });
    console.log('message sent');
    setChat([...chat, { name: null, message: chatBox.current.value }])
  }

  return (
    <div className='chat-container'>
      <div className='chat-field'>
        <div className='member-field'>
          <span style={{ marginRight: '1rem' }}>MEMBERS</span>
          {
            user.users.map((member) => {
              return <span className='member'>
                {member.name}
              </span>
            })
          }
        </div>
        <div className='text-field' ref={textField}>
          {
            chat.map((message) => {
              return message.name ? <div className='left-message'><div className="name">{message.name}</div><div className="message">{message.message}</div></div> :
                <div className='right-message'><div className="message">{message.message}</div></div>;
            })
          }
        </div>
        <div className='input-field'>
            <FormControl id='filled-basic' variant='filled' sx={{ width: '90%', input: { color: 'white' } }} >
            <Input
              placeholder='Enter your message here'
              inputRef={chatBox}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    color='primary'
                  >
                    <Send sx={{ color: 'white' }} onClick={sendMessage} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default Chat