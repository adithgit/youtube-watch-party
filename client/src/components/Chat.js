import React from 'react';
import './Room.css';
import { TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import InputAdornment from '@mui/material';
import IconButton from '@mui/material';
function Chat() {
  const members = [
    '12212',
    'qww','12212',
    'qww','12212',
    'qww','12212',
    'qww','12212',
    'qww','12212',
    'qww','12212',
    'qww','12212',
    'qww'
  ]
  return (
    <div className='chat-container'>
     <div className='chat-field'>
       <div className='member-field'>
        {
          members.map((member)=>{
            return <span className='member'>
            {member}
            </span>
          })
        }
       </div>
       <div className='text-field'>

       </div>
       <div className='input-field'>
       <TextField
       fullWidth
  hiddenLabel
  id="filled-hidden-label-normal"
  defaultValue="Send a message"
  variant="filled"
  color='white'
/>
       </div>
     </div>
    </div>
  )
}

export default Chat