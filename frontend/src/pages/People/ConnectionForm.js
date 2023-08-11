import {getCookie} from "../../utils";
import {Autocomplete, Button, Card, CardContent, Grid, Modal, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import OperationSnackbars from "../../components/Snackbars";

export default function ConnectionForm({
                                           employerID,
                                           privilege,
                                           refreshRecord,
                                           setRefreshRecord,
                                           openForm,
                                           setOpenForm,
                                       }) {
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientOptions, setClientOptions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [fieldError, setFieldError] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    async function ClientUserListGet(inputUsername) {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json",},
        };
        await fetch("/user_manage/client/search/" + "?search_username=" + inputUsername + "&request_user_id=" + employerID, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setClientOptions(CreateClientOptions(data.data));
                    })
                }
            })
    }

    async function RequestConnection(requester_id, provider_id) {
        const apiData = {requester_id: requester_id, "provider_id": provider_id};
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
            const response = await fetch("/workflow/connection/initiate/", requestOptions);
            const responseData = await response.json();

            if (response.ok) {
                setIsSend(true);
                setOpenForm(false);
            } else if (responseData[Object.keys(responseData)[0]][0].includes("already exists")) {
                setIsFailed(true);
                setFieldError(true);
            }
            console.log(responseData)
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    }

    const CreateClientOptions = (optionData) => {
        return optionData.map(item => {
            let newObj = {
                ...item,
                id: item.uid,
                label: `${item.user} (${item.type} of ${item.business_name})`,
            };
            delete newObj.uid;
            return newObj;
        });
    }

    const handleSendButtonPressed = async () => {
        if (!selectedClient) {
            setFieldError(true);
        } else {
            await RequestConnection(employerID, selectedClient);
        }
    }

    useEffect(() => {
        if (searchValue) {
            ClientUserListGet(searchValue);
        }
    }, [searchValue]);

    useEffect(() => {
        setClientOptions([]);
    }, [openForm]);

    const sendProps = {
        open: isSend,
        setOpen: setIsSend,
        msg: "Connection request has been sent!",
        tag: "success"
    };

    const failedProps = {
        open: isFailed,
        setOpen: setIsFailed,
        msg: "The connection has already existed!",
        tag: "error"
    };

    return (
        <>
            <Modal
                open={openForm}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <Card sx={{width: 400}}>
                    <CardContent>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12} sx={{textAlign: 'center'}}>
                                <h1>Connect A Client</h1>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={clientOptions || []}
                                    disableClearable={true}
                                    onChange={(event, value) => {
                                        setSelectedClient(value.id);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required variant="outlined"
                                            label={"Search Username"}
                                            onChange={(event) => {
                                                setSearchValue(event.target.value);
                                            }}
                                            error={fieldError}
                                        />)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                <Button variant="contained"
                                        color="secondary"
                                        onClick={() => setOpenForm(false)}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                <Button variant="contained"
                                        color="success"
                                        onClick={() => handleSendButtonPressed()}>
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Modal>
            <OperationSnackbars  {...sendProps}/>
            <OperationSnackbars  {...failedProps}/>
        </>
    );
}
