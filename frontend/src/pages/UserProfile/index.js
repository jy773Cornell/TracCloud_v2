import React from "react";
import {Paper, Typography} from "@mui/material";

function UserProfilePage() {
    return (
        <Paper>
            <Typography variant="h5" component="h3">
                User Profile
            </Typography>
            <Typography component="p">
                Name: John Doe
            </Typography>
            <Typography component="p">
                Email: john.doe@example.com
            </Typography>
        </Paper>
    );
}

export default UserProfilePage;
