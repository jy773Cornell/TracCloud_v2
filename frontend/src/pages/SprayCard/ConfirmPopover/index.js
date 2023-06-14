import * as React from 'react';
import {Button, Popover, Box, Typography} from '@mui/material';

const ConfirmPopover = ({id, open, anchorEl, onClose, action, buttonText}) => {
    const handleConfirm = () => {
        action();
        onClose();
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Box p={2}>
                <Typography variant="body1">{buttonText}</Typography>
                <Box
                    display="flex"
                    justifyContent="center"
                    mt={1}
                >
                    <Button onClick={handleConfirm} color="primary">Yes</Button>
                    <Button onClick={onClose} color="secondary">No</Button>
                </Box>
            </Box>
        </Popover>
    )
}

export default ConfirmPopover;
