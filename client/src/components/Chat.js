import React from 'react';
import './Room.css';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import SendIcon from '@mui/icons-material/Send';
import { Send } from '@mui/icons-material';
function Chat() {
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
  return (
    <div className='chat-container'>
      <div className='chat-field'>
        <div className='member-field'>
          {
            members.map((member) => {
              return <span className='member'>
                {member}
              </span>
            })
          }
        </div>
        <div className='text-field'>

        </div>
        <div className='input-field'>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-hidden-label-normal">Enter message to send</InputLabel>
            <FilledInput
              id="filled-hidden-label-normal"
              color='white'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                  >
                    <SendIcon color='white' />
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