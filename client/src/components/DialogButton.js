import React, { useRef } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { socket } from './Connection';

function DialogButton(props) {
    const [open, setOpen] = React.useState(false);

    const videoInput = useRef();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeVideo = ()=>{
        const videoUrl = videoInput.current.value || '';
        console.log(videoUrl);
        try{
            const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const videoId = videoUrl.match(VID_REGEX)[1];
            console.log(videoId);
            if( videoId === '' ){
                throw 'invalidInputException';
            }
            const roomId = socket.id;
            socket.emit('video-change', {roomId, videoId});
            setOpen(false);
        }
        catch(err){
            console.log(err);
            alert('Invalid Youtube Link.');
            return;
        }
    }


    return (
        <div>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', margin: '1rem' }} onClick={handleClickOpen}>
                {props.title}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.dialog}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={props.label}
                        type="text"
                        fullWidth
                        value={props.roomId}
                        variant="standard"
                        InputProps={{
                            readOnly: props.readOnly
                        }}
                        inputRef = { videoInput }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {props.noChange ? "" : <Button onClick={changeVideo}>Change</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogButton