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

function ReportCard({report, setShowRecordModal, setReportID, privilege}) {
    const {id, name, description, link} = report;
    return (
        <Card elevation={1} style={{backgroundColor: grey[50], border: '1px solid #c8c8c8'}}>
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
                    disabled={!privilege.report_c}
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

export default function ReportGenerateList({report_list, setShowRecordModal, setReportID, privilege}) {
    return (
        <Card style={{height: 966, margin: '0px', overflow: 'auto', padding: '16px'}}
              sx={{border: '1px solid', borderColor: 'divider'}}>
            <Grid container spacing={2}>
                {report_list.map((report) => {
                    const props = {report, setShowRecordModal, setReportID, privilege};
                    return (
                        <Grid item xs={6} key={report.id}>
                            <ReportCard {...props} />
                        </Grid>
                    );
                })}
            </Grid>
        </Card>
    );
}