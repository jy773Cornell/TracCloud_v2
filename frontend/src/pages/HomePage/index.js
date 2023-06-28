import * as React from 'react';
import {Card, CardContent, CardHeader, Grid, Link, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useLocation, useNavigate} from "react-router-dom";
import {Container} from "@mui/system";

const entry_list = [
    {
        id: "profile_page",
        name: "Profile",
        description: "Update your profile!",
        path: "/profile"
    },
    {
        id: "people_page",
        name: "People",
        description: "Organize your business!",
        path: "/people"
    },
    {
        id: "crop_page",
        name: "Crops",
        description: "Manage your crop information!",
        path: "/crop"
    },
    {
        id: "site_page",
        name: "Sites",
        description: "Manage your farming sites!",
        path: "/site"
    },
    {
        id: "chemical_page",
        name: "ChemTable",
        description: "Manage chemical usage and inventory!",
        path: "/chemical"
    },
    {
        id: "purchase_page",
        name: "Purchase",
        description: "Track your chemical purchases!",
        path: "/purchase"
    },
    {
        id: "equipment_page",
        name: "Equipment",
        description: "Manage your farming equipment!",
        path: "/equipment"
    },
    {
        id: "spraycard_page",
        name: "Spray",
        description: "Track your pesticide applications!",
        path: "/spray"
    },
    {
        id: "spray_page",
        name: "Spray Card",
        description: "Work with spray card process!",
        path: "/spraycard"
    },
    {
        id: "generate_report_page",
        name: "Generate Reports",
        description: "Create reports based on your business data!",
        path: "/report"
    },
];

function EntryCard({entry}) {
    const {name, description, path} = entry;
    const navigate = useNavigate();

    const hoverStyle = {
        backgroundColor: grey[300],
        transition: "all 0.3s",
    };

    return (
        <Link to={path} style={{textDecoration: "none"}}>
            <Card
                elevation={1}
                sx={{
                    margin: "15px",
                    backgroundColor: grey[50],
                    border: '1px solid #c8c8c8',
                    cursor: "pointer",
                    "&:hover": hoverStyle,
                }}
                onClick={() => navigate(path)}
            >
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
        <Container>
            <Grid container spacing={1}>
                {entry_list.map((entry) => {
                    return (
                        <Grid item xs={6} md={4} lg={3} key={entry.id}>
                            <EntryCard entry={entry}/>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}