import React from 'react';
import './Room.css';
import { TextField } from '@mui/material';
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
  defaultValue="Normal"
  variant="filled"
  color='white'
/>
       </div>
     </div>
    </div>
  )
}

export default Chat