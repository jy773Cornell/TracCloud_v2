import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Card, CardContent, Grid, Modal} from "@mui/material";
import {lazy, useState} from "react";
import OperationSnackbars from "../../../components/Snackbars";
import {getCookie} from "../../../utils";

const UserTreeView = lazy(() => import('../UserTreeView'))

export default function Index({
                                  uid,
                                  sprayData,
                                  assignSprayCard,
                                  setAssignSprayCard,
                                  sprayCardSelected,
                                  refreshRecord,
                                  setRefreshRecord
                              }) {
    const [selectedAssignee, setSelectedAssignee] = useState("");
    const [successSnackbar, setSuccessSnackbar] = useState(false);

    async function SprayCardAssign(spray_card_id, assigner_id, assignee_id) {
        const apiData = {"spray_card_id": spray_card_id, "assigner_id": assigner_id, "assignee_id": assignee_id};
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(apiData),
        };
        await fetch("/workflow/spraycard/assign/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setAssignSprayCard(false)
                    setSuccessSnackbar(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const assignRender = () => {
        return (
            <>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <UserTreeView {...userTreeProps}/>
                </Grid>
                <Grid item xs={4}/>
            </>
        );
    }

    const assignStepRender = () => {
        return (
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <h1>Assign Spray Card Process</h1>
                </Grid>
                {assignRender()}
            </Grid>);
    }

    const userTreeProps = {
        sprayData,
        selectedAssignee,
        setSelectedAssignee
    };

    const assignSuccessProps = {
        open: successSnackbar,
        setOpen: setSuccessSnackbar,
        msg: "Spray Card Process Assigned Successfully.",
        tag: "success"
    };

    return (
        <>
            <Modal
                open={assignSprayCard}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}>
                <Card sx={{width: 1250}}>
                    <CardContent>
                        <Box sx={{width: '100%', flexGrow: 1}}>
                            <Box sx={{width: '100%', minHeight: 400, maxHeight: 800, overflow: 'auto'}}>
                                {assignStepRender()}
                            </Box>
                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    onClick={() => setAssignSprayCard(false)}
                                    color="inherit"
                                    sx={{mr: 1}}>
                                    Later
                                </Button>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button
                                    disabled={selectedAssignee === ""}
                                    onClick={() => SprayCardAssign(sprayCardSelected.scpid, uid, selectedAssignee)}
                                    color={"success"}
                                    sx={{mr: 1}}>
                                    Assign
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
            <OperationSnackbars  {...assignSuccessProps}/>
        </>
    );
}