import React, {lazy, useEffect, useState} from 'react';
import {
    Backdrop,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Grid,
    Modal,
    TextField
} from "@mui/material";
import {getCookie} from "../../../utils";
import OperationSnackbars from "../../../components/Snackbars";
import CircularProgress from "@mui/material/CircularProgress";


const PrivilegeTransferList = lazy(() => import('./PrivilegeTransferList'))

const PrivilegeNameList = {
    "employee_c": "Create Employee",
    "employee_r": "Access Employee",
    "employee_d": "Delete Employee",
    "client_add": "Add Client",
    "client_r": "Access Client",
    "client_d": "Delete Client",
    "privilege_set": "Set Privilege",
    "crop_c": "Create Crop",
    "crop_r": "Access Crop",
    "crop_u": "Update Crop",
    "crop_d": "Delete Crop",
    "site_c": "Create Site",
    "site_r": "Access Site",
    "site_u": "Update Site",
    "site_d": "Delete Site",
    "chem_c": "Create Chemical",
    "chem_r": "Access Chemical",
    "chem_u": "Update Chemical",
    "chem_d": "Delete Chemical",
    "purchase_c": "Create Purchase",
    "purchase_r": "Access Purchase",
    "purchase_u": "Update Purchase",
    "purchase_d": "Delete Purchase",
    "equip_c": "Create Equipment",
    "equip_r": "Access Equipment",
    "equip_u": "Update Equipment",
    "equip_d": "Delete Equipment",
    "spray_r": "Access Spray Record",
    "spray_u": "Update Spray Record",
    "spraycard_c": "Create Spray Card",
    "spraycard_a": "Assign Spray Card",
};


export default function EmployeeSettingForm({
                                                privilege,
                                                employer_id,
                                                refreshRecord,
                                                setRefreshRecord,
                                                settingFormOpen,
                                                setSettingFormOpen,
                                                selectedEmployee
                                            }) {
    const [privilegeList, setPrivilegeList] = useState(false);
    const [left, setLeft] = React.useState([]); // Unavailable privileges
    const [right, setRight] = React.useState([]); // Available privileges

    const [isDeleted, setIsDeleted] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function EmployeePrivilegeGet(employee_id) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/user_manage/privilege/get/" + "?uid=" + employee_id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setPrivilegeList(data.data);
                    })
                }
            })
    }

    async function EmployeePrivilegeUpdate(employee_id) {
        const newPrivilege = reformatPrivilege();
        const apiData = {user_id: employee_id, ...newPrivilege};
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
        await fetch("/user_manage/privilege/update/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsUpdated(true);
                }
            })
    }

    async function DeleteEmployee(employer_id, employee_id) {
        setIsLoading(true);
        const apiData = {employer_id: employer_id, employee_id: employee_id,};
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
        await fetch("/user_manage/employee/delete/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setSettingFormOpen(false);
                    setIsDeleted(true);
                    setRefreshRecord(~refreshRecord);
                }
                setIsLoading(false);
            })
    }

    const handleUpdateButtonPressed = async () => {
        await EmployeePrivilegeUpdate(selectedEmployee.uid);
        EmployeePrivilegeGet(selectedEmployee.uid);
    }

    const handleDeleteConfirm = () => {
        DeleteEmployee(employer_id, selectedEmployee.uid);
        setOpenDialog(false);
    }

    const sortPrivilege = () => {
        let leftTemp = []
        let rightTemp = []

        Object.keys(PrivilegeNameList).map(
            privilege => {
                privilegeList[privilege] ? rightTemp.push(PrivilegeNameList[privilege]) : leftTemp.push(PrivilegeNameList[privilege])
            }
        )

        setLeft(leftTemp);
        setRight(rightTemp);
    }

    const reformatPrivilege = () => {
        let newPrivilege = {}

        left.map(
            privilege => {
                newPrivilege[Object.keys(PrivilegeNameList).find(key => PrivilegeNameList[key] === privilege)] = false;
            }
        )

        right.map(
            privilege => {
                newPrivilege[Object.keys(PrivilegeNameList).find(key => PrivilegeNameList[key] === privilege)] = true;
            }
        )

        return newPrivilege;
    }

    useEffect(() => {
        if (selectedEmployee) {
            EmployeePrivilegeGet(selectedEmployee.uid);
        }
    }, [selectedEmployee]);

    useEffect(() => {
        if (privilegeList) {
            sortPrivilege();
        }
    }, [privilegeList, settingFormOpen]);

    const deleteProps = {
        open: isDeleted,
        setOpen: setIsDeleted,
        msg: "The employee has already been deleted from your business.",
        tag: "success"
    };

    const updateProps = {
        open: isUpdated,
        setOpen: setIsUpdated,
        msg: "The privilege setting for this employee has been updated.",
        tag: "success"
    };

    const transferListProps = {
        left,
        setLeft,
        right,
        setRight,
        privilege
    };

    return (
        <>
            <Modal
                open={settingFormOpen}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <div>
                    <Card sx={{width: 800}}>
                        <CardContent>
                            <Grid container justifyContent="center" spacing={2}>
                                <Grid item xs={12} sx={{textAlign: 'center'}}>
                                    <h1 style={{marginBottom: '0'}}>Employee Setting </h1>
                                    <h3 style={{marginTop: '5px'}}>
                                        {selectedEmployee?.user} ({selectedEmployee?.first_name} {selectedEmployee?.last_name})
                                    </h3>
                                </Grid>
                                <Grid item xs={12} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                    <PrivilegeTransferList {...transferListProps}/>
                                </Grid>
                                <Grid item xs={4} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                    <Button variant="contained" color="secondary"
                                            onClick={() => setSettingFormOpen(false)}>
                                        Close
                                    </Button>
                                </Grid>
                                <Grid item xs={4} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleUpdateButtonPressed()}
                                        disabled={!privilege.privilege_set}
                                    >
                                        Update
                                    </Button>
                                </Grid>
                                <Grid item xs={4} sx={{justifyContent: 'center', textAlign: 'center'}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setOpenDialog(true)}
                                        disabled={!privilege.employee_d}
                                    >
                                        Delete
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
            <Dialog
                open={openDialog}
            >
                <DialogTitle>
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this employee?
                        All the related contents will be removed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <OperationSnackbars  {...deleteProps}/>
            <OperationSnackbars  {...updateProps}/>
        </>
    );
}