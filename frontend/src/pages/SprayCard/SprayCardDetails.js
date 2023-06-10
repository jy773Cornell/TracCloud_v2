import * as React from "react";
import Paper from "@mui/material/Paper";
import {Card, CardContent, Grid, Typography} from "@mui/material";

export default function SprayCardDetails({
                                             uid,
                                             sprayCardSelected,
                                         }) {

    const SprayCardHintRender = () => {
        return (
            <Card style={{height: '900px'}} sx={{
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography gutterBottom variant="h6" component="div">
                    Please select a process to view its detailed information.
                </Typography>
            </Card>
        );
    }

    const SprayCardOverviewRender = () => {
        return (
            <Card sx={{width: '90%', border: '1px solid', borderColor: 'divider', m: 'auto', marginTop: '24px'}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
                        Spray Card Process
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{textAlign: 'center'}}>
                        {sprayCardSelected?.scpid}
                    </Typography>
                    <Typography variant="body1" sx={{textAlign: 'center'}}>
                        Owner: {sprayCardSelected?.owner}
                    </Typography>
                    <Typography variant="body1" sx={{textAlign: 'center'}}>
                        Holder: {sprayCardSelected?.holder}
                    </Typography>
                    <Typography variant="body1" sx={{textAlign: 'center'}}>
                        Create Time: {sprayCardSelected?.create_time}
                    </Typography>
                    <Typography variant="body1" sx={{textAlign: 'center'}}>
                        Update Time: {sprayCardSelected?.update_time}
                    </Typography>
                    <Typography variant="body1" sx={{textAlign: 'center'}}>
                        State: {sprayCardSelected?.state}
                    </Typography>
                    <Typography variant="body1" sx={{textAlign: 'center'}}>
                        Active: {sprayCardSelected?.is_active ? "Yes" : "No"}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const SprayCardAssignmentHistoryRender = () => {
        return (
            <Card sx={{width: '90%', border: '1px solid', borderColor: 'divider', m: 'auto', marginTop: '24px'}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
                        Assignment History
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const SprayCardContentRender = () => {
        return (
            <Card sx={{width: '90%', border: '1px solid', borderColor: 'divider', m: 'auto', marginTop: '24px'}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
                        Spray Card
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const SprayCardDetailRender = () => {
        return (
            <Card style={{height: 900}} sx={{border: '1px solid', borderColor: 'divider'}}>
                {SprayCardOverviewRender()}
                {SprayCardAssignmentHistoryRender()}
                {SprayCardContentRender()}
            </Card>
        );

    }

    return sprayCardSelected ? SprayCardDetailRender() : SprayCardHintRender();
}