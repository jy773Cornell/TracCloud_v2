import React, {lazy, useEffect, useState} from 'react';
import {AddButton} from "./styles";
import AddIcon from "@mui/icons-material/Add";

const EmployeeDataGrid = lazy(() => import('./EmployeeDataGrid'))

export default function EmployeeList(props) {
    const uid = props.uid;
    const privilege = props.privilege;

    return (
        <div>
            <AddButton
                variant="contained"
                startIcon={<AddIcon/>}
                // onClick={() => onAddClicked()}
                disabled={!privilege.account_create}
            >
                Add Employee
            </AddButton>
            <EmployeeDataGrid uid={uid}/>
        </div>
    );
}