import React, { useState } from 'react';
import './Room.css';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Send from '@mui/icons-material/Send';
import { useEffect, useRef } from 'react';
function Chat() {
  const chatBox = useRef();
  const textField = useRef();

  const members = [
    '12212', 
    'qww', '12212',
    'qww', '12212',
    'qww', '12212',
    'qww', '12212',
    'qww', '12212',
    'qww', '12212',
    'qww', '12212',
    'qww'
  ]
  const [chat, setChat] = useState([]);

  const chatData = [
    { name: 'name1', message: 'Hey there' },
  ]

  useEffect(() => {
    setChat(chatData)
    // Get the scroll height of textField and scroll down using top option of scroll method along with smooth behavior

    textField.current.addEventListener('DOMNodeInserted', event => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    });
  }, [])
  const sendMessage = () => {
    setChat([...chat, { name: null, message: chatBox.current.value }])
  }
  return (
    <div className='chat-container'>
      <div className='chat-field'>
        <div className='member-field'>
          <span style={{ marginRight: '1rem' }}>MEMBERS</span>
          {
            members.map((member) => {
              return <span className='member'>
                {member}
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