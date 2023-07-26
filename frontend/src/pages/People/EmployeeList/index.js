import React, {lazy, useEffect, useState} from 'react';
import {AddButton} from "./styles";
import AddIcon from "@mui/icons-material/Add";

const EmployeeDataGrid = lazy(() => import('./EmployeeDataGrid'))
const NewEmployeeForm = lazy(() => import('./NewEmployeeForm'))

export default function EmployeeList(props) {
    const uid = props.uid;
    const employer_id = props.employerID;
    const privilege = props.privilege;

    const [refreshRecord, setRefreshRecord] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const dataGridProps = {
        employer_id,
        privilege,
        refreshRecord,
        setRefreshRecord
    }

    const formProps = {
        uid,
        employer_id,
        refreshRecord,
        setRefreshRecord,
        showAddModal,
        setShowAddModal
    }

    return (
        <div>
            <AddButton
                variant="contained"
                startIcon={<AddIcon/>}
                onClick={() => setShowAddModal(true)}
                disabled={!privilege.employee_c}
            >
                New Employee
            </AddButton>
            <EmployeeDataGrid {...dataGridProps}/>
            <NewEmployeeForm {...formProps}/>
        </div>
    );
}