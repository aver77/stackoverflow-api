import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackMsg({text, alertType}) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(true);
    },[])

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
export default SnackMsg;