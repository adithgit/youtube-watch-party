import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

function DialogButton(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        value={props.roomId ? props.roomId : ''}
                        variant="standard"
                        InputProps={{
                            readOnly: props.readOnly
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {props.noChange ? "" : <Button onClick={handleClose}>Change</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogButton