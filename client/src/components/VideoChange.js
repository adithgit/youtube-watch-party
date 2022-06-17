import React from 'react'
import { Button, Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions} from '@mui/material';
function VideoChange() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" sx={{ color:'white', borderColor:'white'}} onClick={handleClickOpen}>
                Change Video
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter the YouTube video link to play.</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="YouTube Link"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Change</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default VideoChange