import * as React from "react";
import Paper from "@mui/material/Paper";
import {Box} from "@mui/system";

export default function SprayCardDetails(props) {
    return (
        <div>
            <Paper style={{height: 900}}>
                <Box bgcolor="info.main" height="100px">Spray Card Process Details</Box>
            </Paper>
        </div>
    );
}