import React, {lazy, useEffect, useState} from 'react';
import {AddButton} from "./styles";
import AddIcon from "@mui/icons-material/Add";

const ClientVendorDataGrid = lazy(() => import('./ClientVendorDataGrid'))
const ConnectionForm = lazy(() => import('../ConnectionRequestForm'))
const ReportSharingWindow = lazy(() => import('../ReportSharingWindow'))

export default function ClientVendorList(props) {
    const [refreshRecord, setRefreshRecord] = useState(false);
    const [openFileWindow, setOpenFileWindow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openForm, setOpenForm] = useState(false);

    const dataGridProps = {
        ...props,
        openFileWindow,
        setOpenFileWindow,
        refreshRecord,
        setRefreshRecord,
        selectedUser,
        setSelectedUser,
    }

    const reportWindowProps =
        {
            ...props,
            openFileWindow,
            setOpenFileWindow,
            selectedUser,
            setSelectedUser,
        }


    const formProps = {
        ...props,
        refreshRecord,
        setRefreshRecord,
        openForm,
        setOpenForm,
    }

    return (
        <div>
            <AddButton
                variant="contained"
                startIcon={<AddIcon/>}
                onClick={() => setOpenForm(true)}
                disabled={!props.privilege.client_add}
            >
                New {props.relationType === "Client" ? "Vendor" : "Client"}
            </AddButton>
            <ClientVendorDataGrid {...dataGridProps}/>
            <ReportSharingWindow {...reportWindowProps}/>
            <ConnectionForm {...formProps}/>
        </div>
    );
}