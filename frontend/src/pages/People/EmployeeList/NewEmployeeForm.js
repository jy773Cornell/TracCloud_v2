import {getCookie} from "../../../utils";
import {Autocomplete, Backdrop, Button, Card, CardContent, Grid, Modal, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import OperationSnackbars from "../../../components/Snackbars";
import CircularProgress from "@mui/material/CircularProgress";

const field_names = ["type_id", "first_name", "last_name", "email"]

export default function NewEmployeeForm({
                                            uid,
                                            employer_id,
                                            refreshRecord,
                                            setRefreshRecord,
                                            showAddModal,
                                            setShowAddModal
                                        }) {
    const [fieldValues, setFieldValues] = useState({});
    const [inputError, setInputError] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userTypes, setUserTypes] = useState([]);
    const [employeeTypeOptions, setEmployeeTypeOptions] = useState([]);

    async function EmployeeTypesGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/user/type/get/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const type_list = data.data;
                        setUserTypes(type_list);
                    })
                }
            })
    }

    async function NewEmployeeAdd(employer_id) {
        setIsLoading(true);
        const apiData = {employer_id: employer_id, added_by_id: uid, ...fieldValues};
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
        await fetch("/user_manage/employee/create/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsAdded(true);
                    setShowAddModal(false);
                    setRefreshRecord(~refreshRecord);
                }
                setIsLoading(false);
            })
    }

    const refreshEmployeeTypes = (userTypes) => {
        setEmployeeTypeOptions(userTypes.filter(item => item.relation_type === "Employee").map(item => ({
            label: item.name, id: item.utid
        })))
    };

    const checkInputs = () => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        let valid = true;

        field_names.forEach((field, index) => {
            let isFieldEmpty = fieldValues[field] === "";
            let isEmailInvalid = index === 3 && !regex.test(fieldValues[field]);

            if (isFieldEmpty || isEmailInvalid) {
                valid = false;
                setInputError((prevInputError) => ({
                    ...prevInputError,
                    [field]: true
                }));
            } else {
                setInputError((prevInputError) => ({
                    ...prevInputError,
                    [field]: false
                }));
            }
        });

        return valid;
    }

    const handleAddButtonPressed = () => {
        if (checkInputs()) {
            NewEmployeeAdd(employer_id);
        }
    };

    const handleInputChange = (event, value, field) => {
        setFieldValues({...fieldValues, [field]: value});
    };

    const clearInputError = () => {
        setInputError(Object.fromEntries(field_names.map(item => [item, false])));
    }

    useEffect(() => {
        EmployeeTypesGet();
    }, []);

    useEffect(() => {
        refreshEmployeeTypes(userTypes);
    }, [userTypes]);

    useEffect(() => {
        setFieldValues(Object.fromEntries(field_names.map(item => [item, ""])));
        clearInputError();
    }, [showAddModal]);

    const successProps = {
        open: isAdded,
        setOpen: setIsAdded,
        msg: "New employee has been added successfully! An activation email has already been sent to the new employee.",
        tag: "success"
    };

    return (
        <>
            <Modal
                open={showAddModal}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <div>
                    <Card sx={{width: 400}}>
                        <CardContent>
                            <Grid container justifyContent="center" spacing={2}>
                                <Grid item xs={12} sx={{textAlign: 'center'}}>
                                    <h1>Add New Employee</h1>
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        options={employeeTypeOptions || []}
                                        disableClearable={true}
                                        onChange={(event, value) => {
                                            handleInputChange(event, value.id, field_names[0]);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                fullWidth
                                                variant="outlined"
                                                label={"Employee Type"}
                                                error={inputError[field_names[0]]}/>)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="outlined"
                                        label={"First Name"}
                                        onChange={(event) => {
                                            handleInputChange(event, event.target.value, field_names[1]);
                                        }}
                                        error={inputError[field_names[1]]}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="outlined"
                                        label={"Last Name"}
                                        onChange={(event) => {
                                            handleInputChange(event, event.target.value, field_names[2]);
                                        }}
                                        error={inputError[field_names[2]]}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="outlined"
                                        label={"Email"}
                                        autoComplete="email"
                                        onChange={(event) => {
                                            handleInputChange(event, event.target.value, field_names[3]);
                                        }}
                                        error={inputError[field_names[3]]}
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                    <Button variant="contained" color="secondary"
                                            onClick={() => setShowAddModal(false)}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                    <Button variant="contained" color="success"
                                            onClick={() => handleAddButtonPressed()}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Backdrop
                        sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={isLoading}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                </div>
            </Modal>
            <OperationSnackbars  {...successProps}/>
        </>
    );
}