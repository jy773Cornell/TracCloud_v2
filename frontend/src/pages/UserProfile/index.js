import * as React from 'react';
import {lazy, useEffect, useState} from "react";
import OperationSnackbars from "../../components/Snackbars";
import {getCookie} from "../../utils";
import {Container} from "@mui/system";
import ProfileForm from "./ProfileForm";

const Loading = lazy(() => import('../../components/Loading'))

const field_names = [
    "type", "first_name", "last_name", "pesticide_applicator_no", "pesticide_expire_date",
    "business_name", "address_line1", "address_line2", "city", "state", "zipcode", "county", "country", "phone",
    "cell", "email",]

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
        if ([fieldValues[field_names[1]], fieldValues[field_names[2]], fieldValues[field_names[6]]].every(value => value)) {
            ProfileUpdate();
            setIsEdit(false);
        } else {
            updateInputError();
        }
    };

    const formProps = {
        field_names,
        profile,
        fieldValues,
        isEdit,
        setIsEdit,
        inputError,
        onEditClicked,
        handleInputChange,
        handleSaveButtonPressed,
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        p: 2,
    }}>
        {loading ? <Loading/> : <ProfileForm {...formProps}/>}
        <OperationSnackbars  {...saveProps}/>
    </Container>);
}
