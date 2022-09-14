import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AffirmDialog() {
    const [open, setOpen] = React.useState(false);
    const [dialog, setDialog] = React.useState('');

    React.useEffect(()=>{
        const getAffirm = async ()=>{
            let initialAffirm = await fetch('https://dulce-affirmations-api.herokuapp.com/affirmation')
            .then(res=>res.json());

            setDialog(initialAffirm[0]['phrase']);
        };

        getAffirm();
    },[]);

    const handleClickOpen = () => {
        fetch('https://dulce-affirmations-api.herokuapp.com/affirmation')
            .then(res => res.json())
            .then((msg) => {
                const newAffirm = msg[0]['phrase'];
                setDialog(newAffirm);
            })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} sx={{
                borderColor: "#63c1b7",
                color: "#63c1b7",
                '&:hover': {
                    color: '#42978e',
                    borderColor:'#347e76',
                    backgroundColor:'#c6fff9'
                },
            }}>
                Energize Yourself
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ color: "#adddd8" }}>Remind Yourself</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "#42978e" }} id="alert-dialog-slide-description">
                        {dialog}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: "#85aaa6" }} onClick={handleClose}>I Understand</Button>
                    <Button sx={{ color: "#85aaa6" }} onClick={handleClose}>I Will Continue On</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
