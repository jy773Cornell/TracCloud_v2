import React, {lazy, useEffect, useState} from 'react';
import {Button, Grid, Modal} from "@mui/material";
import Paper from "@mui/material/Paper";

const ReportFileList = lazy(() => import('./ReportFileList'))
const SharingHistoryList = lazy(() => import('./SharingHistoryList'))

export default function ReportSharingWindow(props) {
    const [refreshRecord, setRefreshRecord] = useState(false);

    const handleSendButtonPressed = () => {
        console.log("send")
    }

    const buttonRender = () => {
        return (
            <>
                <Grid item xs={4} sx={{justifyContent: 'center', textAlign: 'center'}}>
                    <Button variant="contained" color="secondary" onClick={() => props.setOpenFileWindow(false)}>
                        Close
                    </Button>
                </Grid>
                {props.relationType !== "Client" &&
                    <Grid item xs={4} sx={{justifyContent: 'center', textAlign: 'center'}}>
                        <Button variant="contained" color="success" onClick={() => handleSendButtonPressed()}>
                            Send Reports
                        </Button>
                    </Grid>}
            </>
        );
    }

    const dataGridProps = {
        ...props,
        refreshRecord,
        setRefreshRecord,
    }

    const historyProps = {
        ...props,
        refreshRecord,
        setRefreshRecord,
    }
    const OwnerEmployeeWindowRender = () => {
        return (
            <Paper style={{height: 'calc(3/4 * 100vh)', width: 'calc(2/3 * 100vw)'}}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={8}>
                        <ReportFileList {...dataGridProps}/>
                    </Grid>
                    <Grid item xs={4}>
                        <SharingHistoryList {...historyProps}/>
                    </Grid>
                    {buttonRender()}
                </Grid>
            </Paper>
        );
    }

    const ClientWindowRender = () => {
        return (
            <Paper style={{height: 'calc(3/4 * 100vh)', width: 'calc(2/3 * 1/3 * 100vw)'}}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <SharingHistoryList {...historyProps}/>
                    </Grid>
                    {buttonRender()}
                </Grid>
            </Paper>
        );
    }

    return (
        <div>
            <Modal
                open={props.openFileWindow}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                {props.relationType === "Client" ? ClientWindowRender() : OwnerEmployeeWindowRender()}
            </Modal>
        </div>
    );
}