import * as React from 'react';
import Button from '@mui/material/Button';
import {Popover, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";

export default function ConfirmPopover(props) {
    return (
        <Popover
            open={Boolean(props.anchorEl)}
            anchorEl={props.anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
            <Paper sx={{p: 1, maxWidth: 400}}>
                <Typography variant="body1">{props.msg}</Typography>
                <Button onClick={() => {
                    if (props.type === "delete") {
                        props.setAnchorEl(null);
                        props.onDeleteClicked(props.params);
                    } else if (props.type === "update") {
                        props.setAnchorEl(null);
                        props.onSaveClicked();
                    }
                }} color="primary">
                    Yes
                </Button>
                <Button onClick={() => props.setAnchorEl(null)} color="secondary">
                    No
                </Button>
            </Paper>
        </Popover>
    );
}
