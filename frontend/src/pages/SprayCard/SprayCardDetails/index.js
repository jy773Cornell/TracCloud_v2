import * as React from "react";
import {Card, CardContent, Collapse, Grid, IconButton} from "@mui/material";
import {lazy} from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StateStepper = lazy(() => import('../StateStepper'));
const AssignHistoryDiagram = lazy(() => import('../AssignHistoryDiagram'));
const SprayCardContent = lazy(() => import('../SprayCardContent'));

export default function Index({
                                  uid,
                                  sprayData,
                                  sprayCardSelected,
                                  sprayOptions,
                                  setAssignSprayCard,
                                  refreshRecord,
                                  setRefreshRecord,
                                  privilege
                              }) {

    const [overviewExpanded, setOverviewExpanded] = React.useState(true);
    const [historyExpanded, setHistoryExpanded] = React.useState(false);
    const [sprayCardExpanded, setSprayCardExpanded] = React.useState(false);

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
                <Grid container alignItems="center">
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <h1>Overview
                            <IconButton
                                onClick={() => setOverviewExpanded(!overviewExpanded)}
                                aria-expanded={overviewExpanded}
                                aria-label="show more"
                            >
                                {overviewExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            </IconButton>
                        </h1>
                        <em>{sprayCardSelected?.scpid}</em>
                    </Grid>
                </Grid>
                <Collapse in={overviewExpanded} timeout="auto">
                    <CardContent>
                        <Grid container justifyContent="center" spacing={2}>
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
                </Collapse>
            </Card>
        )
            ;
    }

    const SprayCardAssignmentHistoryRender = () => {
        return (
            <Card sx={{width: '90%', border: '1px solid', borderColor: 'divider', m: 'auto', marginTop: '24px'}}>
                <Grid container alignItems="center">
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <h1>Assignment History
                            <IconButton
                                onClick={() => setHistoryExpanded(!historyExpanded)}
                                aria-expanded={historyExpanded}
                                aria-label="show more"
                            >
                                {historyExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            </IconButton>
                        </h1>
                    </Grid>
                </Grid>
                <Collapse in={historyExpanded} timeout="auto">
                    <CardContent>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12} sx={{textAlign: 'center'}}>
                                <AssignHistoryDiagram sprayCardSelected={sprayCardSelected}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }

    const contentProps = {
        uid,
        sprayData,
        sprayCardSelected,
        sprayOptions,
        setAssignSprayCard,
        refreshRecord,
        setRefreshRecord,
        privilege
    }
    const SprayCardContentRender = () => {
        return (
            <Card sx={{
                width: '90%',
                border: '1px solid',
                borderColor: 'divider',
                m: 'auto',
                marginTop: '24px',
                marginBottom: '24px'
            }}>
                <Grid container alignItems="center">
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <h1>Spray Card
                            <IconButton
                                onClick={() => setSprayCardExpanded(!sprayCardExpanded)}
                                aria-expanded={sprayCardExpanded}
                                aria-label="show more"
                            >
                                {sprayCardExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            </IconButton>
                        </h1>
                    </Grid>
                </Grid>
                <Collapse in={sprayCardExpanded} timeout="auto">
                    <CardContent>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12} sx={{textAlign: 'center'}}>
                                <SprayCardContent {...contentProps}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
    const SprayCardDetailRender = () => {
        return (
            <Card style={{height: 898, overflow: 'auto'}} sx={{border: '1px solid', borderColor: 'divider'}}>
                {SprayCardOverviewRender()}
                {SprayCardAssignmentHistoryRender()}
                {SprayCardContentRender()}
            </Card>
        );
    }

    return (
        <>
            <div style={{display: sprayCardSelected ? 'block' : 'none'}}>
                {SprayCardDetailRender()}
            </div>
            <div style={{display: sprayCardSelected ? 'none' : 'block'}}>
                {SprayCardHintRender()}
            </div>
        </>
    );
}