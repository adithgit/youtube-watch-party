import React, { useContext, useState } from 'react';
import './Room.css';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Send from '@mui/icons-material/Send';
import { useEffect, useRef } from 'react';
import { socketContext } from './App';
import { userContext } from './UserContext';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Chat() {
  const paramObj = useParams();
  const chatBox = useRef();
  const textField = useRef();
  const user = useContext(userContext);
  const socket = useContext(socketContext);
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState({message:'Something went wrong.', state: false });

  // Update user list when a user joins the room
  socket.on('user-list', (data) => {
    console.log('User list updated.');
    user.updateUsers(data);
    setOpen({message:`${data[data.length-1].name} joined the room.`,state:true});
  })

  socket.on('message-recieve', (data) => {
    if (data.name === socket.userName) return;
    setChat([...chat, data]);
  })

  socket.on('closed', (socketId) => {
    user.updateUsers(user.users.filter((socket) => {
      if( socket.id != socketId ){
        return socket
      }
      setOpen({ message: `${socket.name} left the room`, state: true });
    }));
  })

  useEffect(() => {
    async function fetchUsers() {
      console.log(paramObj.roomId);
      const response = await fetch(`https://ytube-watch-party.herokuapp.com/getUsers/${paramObj.roomId}`);
      const responseData = await response.json();
      user.updateUsers(responseData);
      console.log("Users fetched succesfullly");
    }
    fetchUsers();

    // Get the scroll height of textField and scroll down using top option of scroll method along with smooth behavior
    textField.current.addEventListener('DOMNodeInserted', event => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  const sendMessage = () => {
    console.log(socket.roomId);
    const message = chatBox.current.value;
    socket.emit('message-sent', { name: socket.userName, message, roomId: socket.roomId });
    console.log('message sent');
    setChat([...chat, { name: null, message: chatBox.current.value }])
  }

  const handleClose = () => {
    setOpen({state:false});
  }

  return (
    <div className='chat-container'>
      <Snackbar open={open.state} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {open.message}
        </Alert>
      </Snackbar>
      <div className='chat-field'>
        <div className='member-field'>
          <span style={{ marginRight: '1rem' }}>MEMBERS</span>
          {
            user.users?user.users.map((member) => {
              return <span className='member'>
                {member.name}
              </span>
            }):""
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