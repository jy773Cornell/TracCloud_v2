import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";


const entry_list = [
    {
        id: "profile_page",
        name: "Profile",
        description: "Update your profile!",
        path: "/profile"
    },
]

function EntryCard({entry}) {
    const {id, name, description, path} = entry;

    return (
        <Card elevation={1} sx={{margin: "15px"}} style={{backgroundColor: grey[50], border: '1px solid #c8c8c8'}}>
            <CardHeader
                title={name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default function HomePage() {
    return (
        <Grid container spacing={1}>
            {entry_list.map((entry) => {
                return (
                    <Grid item xs={6} md={4} lg={3} key={entry.id}>
                        <EntryCard entry={entry}/>
                    </Grid>
                );
            })}
        </Grid>
    );
}