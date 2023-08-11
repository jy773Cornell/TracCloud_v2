import * as React from 'react';
import {lazy, useEffect, useState} from "react";
import OperationSnackbars from "../../components/Snackbars";
import {getCookie} from "../../utils";
import {Container} from "@mui/system";
import ProfileForm from "./ProfileForm";
import {omit, pick} from "lodash";

const Loading = lazy(() => import('../../components/Loading'))

const field_names = [
    "type", "first_name", "last_name", "pesticide_applicator_no", "pesticide_expire_date",
    "business_name", "address_line1", "address_line2", "city", "state", "zipcode", "county", "country",
    "cell_phone", "email", "relation_type"]

const fieldsToReplace = [
    field_names[5], field_names[6], field_names[7], field_names[8],
    field_names[9], field_names[10], field_names[11], field_names[12]
];

export default function UserProfile(props) {
    const uid = props.uid;
    const employerID = props.employerID;
    const privilege = props.privilege;
    const relationType = props.relationType
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
        const response = await fetch("/api/user/get/" + "?uid=" + uid, requestOptions);

        if (response.ok) {
            const data = await response.json();
            return Object.fromEntries(
                Object.entries(data.data).map(([key, value]) => [key, value === null ? "" : value])
            );
        } else {
            throw new Error('Failed to fetch profile');
        }
    }

    async function UserProfileDataSet(uid, employerID) {
        const [userProfile, employerProfile] = await Promise.all([
            ProfileGet(uid),
            ProfileGet(employerID)
        ]);

        fieldsToReplace.forEach(field => {
            if (employerProfile.hasOwnProperty(field)) {
                userProfile[field] = employerProfile[field];
            }
        });

        setProfile(userProfile);
        setFieldValues(userProfile);
        setLoading(false);
    }

    async function ProfileUpdate(apiData) {
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

    async function userProfileUpdate() {
        // pick replaceable fields from formData to form apiData for employer
        const employerData = pick(formData, fieldsToReplace);
        employerData.uid = employerID;
        await ProfileUpdate(employerData);

        // use the rest of the items from formData to form apiData for user
        const userData = omit(formData, fieldsToReplace);
        if (Object.keys(userData).length > 0) {
            userData.uid = uid;
            await ProfileUpdate(userData);
        }
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
        setFormData({});
        setFieldValues(Object.fromEntries(field_names.map(item => [item, profile[item]])));
        setIsEdit(true);
        clearInputError();
    };

    const handleSaveButtonPressed = () => {
        if ([fieldValues[field_names[1]], fieldValues[field_names[2]], fieldValues[field_names[5]], fieldValues[field_names[6]], fieldValues[field_names[14]]].every(value => value)) {
            userProfileUpdate();
            setIsEdit(false);
        } else {
            updateInputError();
        }
    };

    const formProps = {
        relationType,
        privilege,
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
            await Promise.all([UserProfileDataSet(uid, employerID)]);
        };

        fetchData();
        clearInputError();
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            UserProfileDataSet(uid, employerID);
        }
    }, [refreshRecord]);

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            p: 2,
        }}>
            {loading ? <Loading/> : <ProfileForm {...formProps}/>}
            <OperationSnackbars  {...saveProps}/>
        </Container>
    );
}
