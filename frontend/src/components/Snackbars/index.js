import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function OperationSnackbars(props) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
                {(() => {
                    switch (props.tag) {
                        case 'success':
                            return (
                                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                                    {props.msg}
                                </Alert>
                            );
                        case 'error':
                            return (
                                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                                    {props.msg}
                                </Alert>
                            );
                        case 'warning':
                            return (
                                <Alert onClose={handleClose} severity="warning" sx={{width: '100%'}}>
                                    {props.msg}
                                </Alert>
                            );
                        default:
                            return null;
                    }
                })()}
            </Snackbar>

            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}
        </Stack>
    );
}
