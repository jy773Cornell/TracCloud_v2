import * as React from 'react';
import {lazy, useEffect, useState} from "react";
import {Button, Card, CardContent, Grid, TextField} from "@mui/material";
import {EditButton} from "./styles";
import OperationSnackbars from "../../components/Snackbars";
import {getCookie} from "../../utils";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {Container} from "@mui/system";

const Loading = lazy(() => import('../../components/Loading'))
const field_names = ["type", "name", "business_name", "registration_license_no", "license_expire_date", "address", "city", "county", "state", "zipcode", "country", "phone", "cell", "email",]

function ProfileForm({
                         profile,
                         fieldValues,
                         isEdit,
                         setIsEdit,
                         inputError,
                         onEditClicked,
                         handleInputChange,
                         handleSaveButtonPressed,
                     }) {


    return (
        <Card sx={{width: 600}}>
            <CardContent>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <h1>{profile.username}</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Type"
                            variant="outlined"
                            value={profile[field_names[0]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {isEdit ? <TextField
                            label="Name"
                            variant="outlined"
                            required={true}
                            value={fieldValues[field_names[1]]}
                            error={inputError[field_names[1]]}
                            autoComplete="name"
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[1]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="Name"
                            variant="outlined"
                            value={profile[field_names[1]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={12}>
                        {isEdit ? <TextField
                            label="Business Name"
                            variant="outlined"
                            value={fieldValues[field_names[2]]}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[2]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="Business Name"
                            variant="outlined"
                            value={profile[field_names[2]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        {isEdit ? <TextField
                            label="Registration NO."
                            variant="outlined"
                            value={fieldValues[field_names[3]]}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[3]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="Registration NO."
                            variant="outlined"
                            value={profile[field_names[3]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        {isEdit ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="outlined"
                                label="Registration Expiration Date"
                                value={dayjs(fieldValues[field_names[4]])}
                                onChange={(event) => {
                                    handleInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[4]);
                                }}
                                sx={{width: '100%'}}
                            />
                        </LocalizationProvider> : <TextField
                            label="Registration Expiration Date"
                            variant="outlined"
                            value={profile[field_names[4]]}
                            InputProps={{readOnly: true,}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        {isEdit ? <TextField
                            label="Address"
                            variant="outlined"
                            value={fieldValues[field_names[5]]}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[5]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="Address"
                            variant="outlined"
                            value={profile[field_names[5]]}
                            InputProps={{readOnly: true,}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        {isEdit ? <TextField
                            label="City"
                            variant="outlined"
                            value={fieldValues[field_names[6]]}
                            autoComplete="address-level2"
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[6]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="City"
                            variant="outlined"
                            value={profile[field_names[6]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        {isEdit ? <TextField
                            label="County"
                            variant="outlined"
                            value={fieldValues[field_names[7]]}
                            autoComplete="address-level2"
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[7]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="County"
                            variant="outlined"
                            value={profile[field_names[7]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        {isEdit ? <TextField
                            label="State"
                            variant="outlined"
                            value={fieldValues[field_names[8]]}
                            autoComplete="address-level1"
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[8]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="State"
                            variant="outlined"
                            value={profile[field_names[8]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        {isEdit ? <TextField
                            label="Zip Code"
                            variant="outlined"
                            value={fieldValues[field_names[9]]}
                            autoComplete="postal-code"
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[9]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="Zip Code"
                            variant="outlined"
                            value={profile[field_names[9]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        {isEdit ? <TextField
                            label="Country"
                            variant="outlined"
                            value={fieldValues[field_names[10]]}
                            autoComplete="country"
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[10]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="Country"
                            variant="outlined"
                            value={profile[field_names[10]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    {isEdit ? <>
                        <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                            <Button variant="contained" color="success" onClick={() => handleSaveButtonPressed()}>
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                            <Button variant="contained" color="secondary" onClick={() => setIsEdit(false)}>
                                Cancel
                            </Button>
                        </Grid>
                    </> : <Grid item xs={12} sx={{justifyContent: 'center', textAlign: 'center'}}>
                        <EditButton variant="contained" color="secondary" onClick={() => onEditClicked()}>
                            Edit
                        </EditButton>
                    </Grid>}
                </Grid>
            </CardContent>
        </Card>);
}

export default function UserProfile(props) {
    const uid = props.uid;
    const [profile, setProfile] = useState([]);

    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});

    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [inputError, setInputError] = useState([]);
    const [refreshRecord, setRefreshRecord] = useState(false);

    async function ProfileGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/user/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const profileData = Object.fromEntries(Object.entries(data.data).map(([key, value]) => [key, value === null ? "" : value]));
                        setProfile(profileData);
                        setFieldValues(profileData);
                        setLoading(false);
                    })
                }
            })
    }

    async function ProfileUpdate() {
        const apiData = formData;
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
        };
        await fetch("/api/user/profile/update/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const clearInputError = () => {
        setInputError(Object.fromEntries(field_names.map(item => [item, false])));
    }

    const updateInputError = () => {
        Object.keys(fieldValues).forEach(key => {
            if (fieldValues[key] === "") {
                setInputError((prevInputError) => ({
                    ...prevInputError, [key]: true
                }));
            } else {
                setInputError((prevInputError) => ({
                    ...prevInputError, [key]: false
                }));
            }
        });
    }

    const handleInputChange = (event, value, field) => {
        setFieldValues({...fieldValues, [field]: value});
        setFormData({...formData, [field]: value});
    };

    const onEditClicked = () => {
        setFormData({"uid": uid,});
        setFieldValues(Object.fromEntries(field_names.map(item => [item, profile[item]])));
        setIsEdit(true);
        clearInputError();
    };

    const handleSaveButtonPressed = () => {
        if ([fieldValues[field_names[1]]].every(value => value !== "")) {
            ProfileUpdate();
            setIsEdit(false);
        } else {
            updateInputError();
        }
    };


    const formProps = {
        profile, fieldValues, isEdit, setIsEdit, inputError, onEditClicked, handleInputChange, handleSaveButtonPressed,
    };

    const saveProps = {open: isSave, setOpen: setIsSave, msg: "Profile is uploaded successfully!", tag: "success"};

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([ProfileGet(uid)]);
        };

        fetchData();
        clearInputError();
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            ProfileGet(uid);
        }
    }, [refreshRecord]);

    return (<Container sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 2,
    }}>
        {loading ? <Loading/> : <ProfileForm {...formProps}/>}
        <OperationSnackbars  {...saveProps}/>
    </Container>);
}
