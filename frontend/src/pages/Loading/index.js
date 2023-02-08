import React from 'react';
import {Typography} from "@mui/material";
import './index.scss'

function Loading() {
    return (
        <div className="loading">
            <Typography varient="h4" component="h4">
                Loading...
            </Typography>
        </div>
    )
}

export default Loading