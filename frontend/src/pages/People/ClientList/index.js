import React, {lazy, useEffect, useState} from 'react';
import {AddButton} from "./styles";
import AddIcon from "@mui/icons-material/Add";

const ClientDataGrid = lazy(() => import('./ClientDataGrid'))
const ConnectionForm = lazy(() => import('../ConnectionRequestForm'))

export default function ClientList(props) {
    const uid = props.uid;
    const employerID = props.employerID;
    const privilege = props.privilege;

    const [refreshRecord, setRefreshRecord] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    const dataGridProps = {
        employerID,
        privilege,
        refreshRecord,
        setRefreshRecord
    }


    const formProps = {
        employerID,
        privilege,
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
                disabled={!privilege.client_add}
            >
                New Client
            </AddButton>
            <ClientDataGrid {...dataGridProps}/>
            <ConnectionForm {...formProps}/>
        </div>
    );
}