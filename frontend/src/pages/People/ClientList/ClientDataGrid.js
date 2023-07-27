import * as React from "react";
import Paper from "@mui/material/Paper";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {useEffect, useState} from "react";


function CustomToolbar() {
    return (<GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
    </GridToolbarContainer>);
}

export default function ClientDataGrid({
                                           employer_id,
                                           privilege,
                                           refreshRecord,
                                           setRefreshRecord
                                       }) {
    const [clientList, setClientList] = useState([]);
    const [rows, setRows] = useState([]);
    const [mounted, setMounted] = useState(false);

    async function ClientListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        // await fetch("/workflow/spraycard/list/get/" + "?uid=" + uid, requestOptions)
        //     .then((response) => {
        //         if (response.ok) {
        //             response.json().then((data) => {
        //                 const record_list = data.data;
        //                 setSprayCardRecords(record_list);
        //                 const record_row = record_list.map((record) => createRowData(record))
        //                 setRows(record_row);
        //             })
        //         }
        //     })
    }

    const createRowData = (record) => {
        for (let key in record) {
            if (record[key] === null) {
                record[key] = "";
            }
        }

        return {
            "id": record.scpid,
            "state": record.state,
            "owner": record.owner,
            "holder": record.holder,
            "update_time": record.update_time,
            "create_time": record.create_time,
        };
    }

    const columnWidth = 150;
    const columns = [
        {
            field: 'user',
            headerName: 'Client User',
            width: columnWidth,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: columnWidth,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: columnWidth,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: columnWidth,
        },
        {
            field: 'cell',
            headerName: 'Cell Phone',
            width: columnWidth,
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([ClientListGet(employer_id)]);
        };

        fetchData();
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            ClientListGet(employer_id);
        }
    }, [refreshRecord]);

    return (
        <div>
            <Paper style={{height: 900}}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    disableRowSelectionOnClick={true}
                    disableClickEdit={true}
                    rowSelection={false}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    density="compact"
                    localeText={{noRowsLabel: privilege.client_r ? "No rows" : "You don't have the privilege to access this data"}}
                />
            </Paper>
        </div>
    );
}