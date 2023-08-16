import {getCookie} from "../../utils";
import {Autocomplete, Button, Card, CardContent, Grid, Modal, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import OperationSnackbars from "../../components/Snackbars";
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

export default function ConnectionResponseForm(props) {
    const [requester, SetRequester] = useState(null);
    const [openForm, setOpenForm] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isWarning, setIsWarning] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const mid = searchParams.get('mid');
    const cpid = searchParams.get('cpid');

    async function RequesterUserGet(cpid) {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json",},
        };
        await fetch("/workflow/connection/requester/get/" + "?cpid=" + cpid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        SetRequester(data.data);
                    })
                }
            })
    }

    async function AcceptConnection(provider_id, requester_id, cpid, mid) {
        const apiData = {provider_id, requester_id, cpid, mid};
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
        try {
            const response = await fetch("/workflow/connection/approve/", requestOptions);
            const responseData = await response.json();

            if (response.ok) {
                setIsSuccess(true);
            } else if (responseData[Object.keys(responseData)[0]][0].includes("already exists")) {
                setIsFailed(true);
            }
            setOpenForm(false);
            setTimeout(() => {
                navigate("/people");
            }, 3000);

        } catch (error) {
            console.error("Failed to fetch", error);
        }
    }

    async function DeclineConnection(provider_id, requester_id, cpid, mid) {
        const apiData = {provider_id, requester_id, cpid, mid};
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
        try {
            const response = await fetch("/workflow/connection/reject/", requestOptions);
            const responseData = await response.json();

            if (response.ok) {
                setIsWarning(true);
            } else if (responseData[Object.keys(responseData)[0]][0].includes("already exists")) {
                setIsFailed(true);
            }
            setOpenForm(false);
            setTimeout(() => {
                navigate("/people");
            }, 3000);

        } catch (error) {
            console.error("Failed to fetch", error);
        }
    }

    useEffect(() => {
        RequesterUserGet(cpid);
    }, []);

    const successProps = {
        open: isSuccess,
        setOpen: setIsSuccess,
        msg: "Congratulation! You just built a new connection!",
        tag: "success"
    };

    const failedProps = {
        open: isFailed,
        setOpen: setIsFailed,
        msg: "The connection has already existed!",
        tag: "error"
    };

    const warningProps = {
        open: isWarning,
        setOpen: setIsWarning,
        msg: "You've declined the connection request!",
        tag: "warning"
    };

    return (
        <>
            <Modal
                open={openForm}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <Card sx={{width: 600}}>
                    <CardContent>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12} sx={{textAlign: 'center'}}>
                                <h1>Connect Request</h1>
                            </Grid>
                            <Grid item xs={12} sx={{textAlign: 'center', fontSize: '22px'}}>
                                <strong>Username: </strong>{requester?.username || ""}
                            </Grid>
                            <Grid item xs={12} sx={{textAlign: 'center', fontSize: '22px'}}>
                                <strong>Role: </strong>{requester ? `${requester.type} of ${requester.business_name}` : ""}
                            </Grid>
                            <Grid item xs={4} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                <Button variant="contained"
                                        onClick={() => {
                                            setOpenForm(false);
                                            navigate("/people");
                                        }}
                                >
                                    Later
                                </Button>
                            </Grid>
                            <Grid item xs={4} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                <Button variant="contained"
                                        color="secondary"
                                        disabled={!requester}
                                        onClick={() => DeclineConnection(props.employerID, requester.uid, cpid, mid)}
                                >
                                    Decline
                                </Button>
                            </Grid>
                            <Grid item xs={4} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                <Button variant="contained"
                                        color="success"
                                        disabled={!requester}
                                        onClick={() => AcceptConnection(props.employerID, requester.uid, cpid, mid)}
                                >
                                    Accept
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Modal>
            <OperationSnackbars  {...successProps}/>
            <OperationSnackbars  {...failedProps}/>
            <OperationSnackbars  {...warningProps}/>
        </>
    );
}
