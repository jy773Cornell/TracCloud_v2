import * as React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import {grey} from '@mui/material/colors';
import {Container} from "@mui/system";

const report_list = [
    {
        id: "central_posting",
        name: "Central Posting",
        description: "This is the description for Central Posting report",
        link: ""
    },
    {
        id: "applicator_report_26",
        name: "Applicator Report-26",
        description: "This is the description for Applicator Report-26 report",
        link: ""
    },
    {
        id: "applicators_26a",
        name: "Applicators-26A",
        description: "This is the description for Applicators-26A report",
        link: ""
    },
    {
        id: "record_keeping_26",
        name: "RecordKeeping-26",
        description: "This is the description for RecordKeeping-26 report",
        link: ""
    },
    {
        id: "priv_app_record",
        name: "PrivAppRecord",
        description: "This is the description for PrivAppRecord report",
        link: ""
    },
    {id: "generic_form", name: "GenericForm", description: "This is the description for GenericForm report", link: ""},
    {
        id: "motts_and_yonder_distr",
        name: "Mott's&YonderDistr.",
        description: "This is the description for Mott's&YonderDistr. report",
        link: ""
    },
    {
        id: "birds_eye_and_others",
        name: "BirdsEye&Others",
        description: "This is the description for BirdsEye&Others report",
        link: ""
    },
    {id: "beech_nut", name: "BeechNut", description: "This is the description for BeechNut report", link: ""},
    {id: "knouse", name: "Knouse", description: "This is the description for Knouse report", link: ""},
    {id: "globalgap", name: "GLOBALGAP", description: "This is the description for GLOBALGAP report", link: ""},
    {id: "ecoapple", name: "EcoApple", description: "This is the description for EcoApple report", link: ""},
    {
        id: "carriage_house",
        name: "CarriageHouse",
        description: "This is the description for CarriageHouse report",
        link: ""
    },
    {
        id: "constellation",
        name: "Constellation",
        description: "This is the description for Constellation report",
        link: ""
    },
    {
        id: "cliffstar_and_westfield_maid",
        name: "Cliffstar&WestfieldMaid",
        description: "This is the description for Cliffstar&WestfieldMaid report",
        link: ""
    },
    {id: "growers_coop", name: "GrowersCoop", description: "This is the description for GrowersCoop report", link: ""},
    {id: "meiers", name: "Meier's", description: "This is the description for Meier's report", link: ""},
    {id: "mogen_david", name: "MogenDavid", description: "This is the description for MogenDavid report", link: ""},
    {
        id: "national_grape",
        name: "NationalGrape",
        description: "This is the description for NationalGrape report",
        link: ""
    }

]

function ReportCard({report, setShowRecordModal, setReportID}) {
    const {id, name, description, link} = report;
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
            <CardActions style={{display: 'flex', gap: '10px'}}>
                <Button
                    variant="outlined"
                    size="small"
                    color="success"
                    onClick={() => {
                        setShowRecordModal(true);
                        setReportID(id);
                    }}
                >
                    Generate
                </Button>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                    <Button variant="outlined" size="small">
                        Learn More
                    </Button>
                </a>
            </CardActions>
        </Card>
    );
}

export default function ReportCardList({setShowRecordModal, setReportID}) {
    return (
        <Container>
            <Grid container spacing={1}>
                {report_list.map((report) => {
                    const props = {report, setShowRecordModal, setReportID};
                    return (
                        <Grid item xs={6} md={4} lg={3} key={report.id}>
                            <ReportCard {...props} />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}