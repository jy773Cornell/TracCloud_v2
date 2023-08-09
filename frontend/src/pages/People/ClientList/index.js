import React, {lazy, useEffect, useState} from 'react';
import {AddButton} from "./styles";
import AddIcon from "@mui/icons-material/Add";

const ClientDataGrid = lazy(() => import('./ClientDataGrid'))

export default function ClientList(props) {
    const uid = props.uid;
    const employerID = props.employerID;
    const privilege = props.privilege;

    const [refreshRecord, setRefreshRecord] = useState(false);

    const dataGridProps = {
        employerID,
        privilege,
        refreshRecord,
        setRefreshRecord
    }

    return (
        <div>
            <AddButton
                variant="contained"
                startIcon={<AddIcon/>}
                // onClick={() => onAddClicked()}
                disabled={!privilege.client_add}
            >
                New Client
            </AddButton>
            <ClientDataGrid {...dataGridProps}/>
        </div>
    );
}