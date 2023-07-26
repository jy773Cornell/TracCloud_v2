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

export default function EmployeeDataGrid({uid}) {
    const [employeeList, setEmployeeList] = useState([]);
    const [rows, setRows] = useState([]);
    const [refreshRecord, setRefreshRecord] = useState(false);
    const [mounted, setMounted] = useState(false);

    async function EmployeeListGet(uid) {
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
            headerName: 'User',
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
        {
            field: 'pesticide_certification_id',
            headerName: 'Pesticide Certification I.D.',
            width: 200,
        },
        {
            field: 'pesticide_certification_expire_date',
            headerName: 'Pesticide Certification Expire Date',
            width: 250,
        },
        {
            field: 'privilege',
            headerName: 'Privilege',
            width: columnWidth,
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([EmployeeListGet(uid)]);
        };

        fetchData();
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            EmployeeListGet(uid);
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
                />
            </Paper>
        </div>
    );
}