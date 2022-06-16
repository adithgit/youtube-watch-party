import React from 'react';
import './Room.css';
import FormControl  from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import  Input from '@mui/material/Input';
import IconButton  from '@mui/material/IconButton';
import  Send  from '@mui/icons-material/Send';


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
        <FormControl  id='filled-basic'  variant='filled' sx={{ width:'90%', input: { color: 'white' }}} >
          <Input
          placeholder='Enter your message here'
          
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  color='primary'
      
                >
                 <Send  sx={{ color: 'white'}}  />
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