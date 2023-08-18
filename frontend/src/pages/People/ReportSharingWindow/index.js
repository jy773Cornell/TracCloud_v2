import React, {lazy, useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Modal,
    TextField
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {getCookie} from "../../../utils";
import OperationSnackbars from "../../../components/Snackbars";
import {useLocation, useNavigate} from "react-router-dom";

const ReportFileList = lazy(() => import('./ReportFileList'))
const SharingHistoryList = lazy(() => import('./SharingHistoryList'))

export default function ReportSharingWindow(props) {
    const [refreshRecord, setRefreshRecord] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [subjectContent, setSubjectContent] = useState("");
    const [subjectError, setSubjectError] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isNonSelected, setIsNonSelected] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    async function SendReports(author_id, recipient_id, selected_reports, subject) {
        const apiData = {author_id, recipient_id, selected_reports, subject};
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
        await fetch("/media/reports/send/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSend(true);
                    setDialogOpen(false);
                    setSelectedFiles([]);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    async function MessageGet(mid) {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json",},
        };
        await fetch("/message/get" + "?mid=" + mid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        props.setSelectedUser(data.data.author)
                    })
                }
            })
    }

    const handleSendButtonPressed = () => {
        if (subjectContent === "") {
            setSubjectError(true);
        } else {
            SendReports(props.employerID, props.selectedUser, selectedFiles, subjectContent);
        }
    }

    const subjectDialog = () => {
        return (
            <Dialog open={dialogOpen}>
                <DialogTitle>Subject</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please input the subject for the reports sharing.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="subject"
                        fullWidth
                        variant="standard"
                        error={subjectError}
                        onChange={(event) => {
                            setSubjectContent(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleSendButtonPressed()}>Send</Button>
                </DialogActions>
            </Dialog>
        );
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
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                if (selectedFiles.length > 0) {
                                    setDialogOpen(true)
                                } else {
                                    setIsNonSelected(true);
                                }
                            }}>
                            Send Reports
                        </Button>
                    </Grid>
                }
            </>
        );
    }

    const dataGridProps = {
        ...props,
        refreshRecord,
        setRefreshRecord,
        selectedFiles,
        setSelectedFiles,
    }

    const historyProps = {
        ...props,
        refreshRecord,
        setRefreshRecord,
    }

    useEffect(() => {
        if (searchParams.get('mid') && searchParams.get('reportHistory')) {
            props.setOpenFileWindow(true);
            MessageGet(searchParams.get('mid'));
        }
    }, []);

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
                    {subjectDialog()}
                </Grid>
            </Paper>
        );
    }

    const ClientWindowRender = () => {
        return (
            <Paper style={{height: 'calc(3/4 * 100vh)', width: 'calc(2/3 * 2/3 * 100vw)'}}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <SharingHistoryList {...historyProps}/>
                    </Grid>
                    {buttonRender()}
                </Grid>
            </Paper>
        );
    }

    useEffect(() => {
        setSubjectContent("");
        setSubjectError(false);
    }, [dialogOpen]);

    useEffect(() => {
        setSelectedFiles([]);
    }, [props.openFileWindow]);

    const sendProps = {open: isSend, setOpen: setIsSend, msg: "Selected reports have been sent!", tag: "success"};

    const nonSelectedProps = {
        open: isNonSelected,
        setOpen: setIsNonSelected,
        msg: "Please select at least one report to send!",
        tag: "warning"
    };

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
            <OperationSnackbars  {...sendProps}/>
            <OperationSnackbars  {...nonSelectedProps}/>
        </div>
    );
}