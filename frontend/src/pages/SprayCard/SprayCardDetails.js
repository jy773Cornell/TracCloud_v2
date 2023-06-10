import * as React from "react";
import {Card, CardContent, Grid} from "@mui/material";
import {lazy} from "react";

const StateStepper = lazy(() => import('./StateStepper'))

export default function SprayCardDetails({
                                             uid,
                                             sprayCardSelected,
                                         }) {

    const SprayCardHintRender = () => {
        return (
            <Card style={{height: '898px'}} sx={{
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h3>Please select a process to view its detailed information.</h3>
            </Card>
        );
    }

    const SprayCardOverviewRender = () => {
        return (
            <Card sx={{width: '90%', border: '1px solid', borderColor: 'divider', m: 'auto', marginTop: '24px'}}>
                <CardContent>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <h1>Spray Card Process</h1>
                            <em>{sprayCardSelected?.scpid}</em>
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={5} sx={{textAlign: 'center'}}>
                            <strong>State: </strong>{sprayCardSelected?.state}
                        </Grid>
                        <Grid item xs={5} sx={{textAlign: 'center'}}>
                            <strong>Active: </strong>{sprayCardSelected?.is_active ? "Yes" : "No"}
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={1}/>
                        <Grid item xs={5} sx={{textAlign: 'center'}}>
                            <strong>Owner: </strong>{sprayCardSelected?.owner}
                        </Grid>
                        <Grid item xs={5} sx={{textAlign: 'center'}}>
                            <strong>Holder: </strong>{sprayCardSelected?.holder}
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={1}/>
                        <Grid item xs={5} sx={{textAlign: 'center'}}>
                            <strong>Update Time: </strong>{sprayCardSelected?.update_time}
                        </Grid>
                        <Grid item xs={5} sx={{textAlign: 'center'}}>
                            <strong>Create Time: </strong>{sprayCardSelected?.create_time}
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <StateStepper state={sprayCardSelected?.state}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    const SprayCardAssignmentHistoryRender = () => {
        return (
            <Card sx={{width: '90%', border: '1px solid', borderColor: 'divider', m: 'auto', marginTop: '24px'}}>
                <CardContent>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <h1>Assignment History</h1>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    const SprayCardContentRender = () => {
        return (
            <Card sx={{width: '90%', border: '1px solid', borderColor: 'divider', m: 'auto', marginTop: '24px'}}>
                <CardContent>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <h1>Spray Card</h1>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    const SprayCardDetailRender = () => {
        return (
            <Card style={{height: 898}} sx={{border: '1px solid', borderColor: 'divider'}}>
                {SprayCardOverviewRender()}
                {SprayCardAssignmentHistoryRender()}
                {SprayCardContentRender()}
            </Card>
        );

    }

    return sprayCardSelected ? SprayCardDetailRender() : SprayCardHintRender();
}