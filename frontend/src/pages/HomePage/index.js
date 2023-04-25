import * as React from 'react';
import {Card, CardContent, CardHeader, Grid, Link, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useLocation, useNavigate} from "react-router-dom";

const entry_list = [
    {
        id: "profile_page",
        name: "Profile",
        description: "Update your profile!",
        path: "/profile"
    },
]

function EntryCard({entry}) {
    const {name, description, path} = entry;

    return (
        <Link to={path} style={{textDecoration: "none"}}>
            <Card
                elevation={1}
                sx={{margin: "15px"}}
                style={{backgroundColor: grey[50], border: '1px solid #c8c8c8'}
                }>
                <CardHeader
                    title={name}
                />
                <CardContent>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
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