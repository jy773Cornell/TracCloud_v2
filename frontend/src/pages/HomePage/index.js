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
        id: "network_page",
        name: "Network",
        description: "Connect with other professionals!",
        path: "/network"
    },
    {
        id: "crop_page",
        name: "Crop",
        description: "Manage your crop information!",
        path: "/crop"
    },
    {
        id: "site_page",
        name: "Site",
        description: "Manage your farming sites!",
        path: "/site"
    },
    {
        id: "chemical_page",
        name: "Chemical",
        description: "Manage chemical usage and inventory!",
        path: "/chemical"
    },
    {
        id: "equipment_page",
        name: "Equipment",
        description: "Track your farming equipment!",
        path: "/equipment"
    },
    {
        id: "spray_record_page",
        name: "Spray Record",
        description: "Document pesticide and herbicide applications!",
        path: "/record/spray"
    },
    {
        id: "harvest_record_page",
        name: "Harvest Record",
        description: "Record your harvest information!",
        path: "/record/harvest"
    },
    {
        id: "purchase_record_page",
        name: "Purchase Record",
        description: "Track your chemical purchases!",
        path: "/record/purchase"
    },
    {
        id: "generate_report_page",
        name: "Generate Report",
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