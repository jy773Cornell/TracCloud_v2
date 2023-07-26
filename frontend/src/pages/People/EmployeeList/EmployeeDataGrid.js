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

export default function EmployeeDataGrid({
                                             employer_id,
                                             privilege,
                                             refreshRecord,
                                             setRefreshRecord
                                         }) {
    const [employeeList, setEmployeeList] = useState([]);
    const [rows, setRows] = useState([]);

    const [mounted, setMounted] = useState(false);

    async function EmployeeListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        if (privilege.employee_r) {
            await fetch("/user_manage/employee/list/get/" + "?employer_id=" + uid, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            const record_list = data.data;
                            setEmployeeList(record_list);
                            const record_row = record_list.map((record) => createRowData(record))
                            setRows(record_row);
                        })
                    }
                })
        }
    }

    const createRowData = (record) => {
        return {
            "id": record.uid,
            "user": record.user,
            "name": `${record.first_name} ${record.last_name}`,
            "type": record.type,
            "email": record.email,
            "cell_phone": record.cell_phone,
            "pesticide_applicator_no": record.pesticide_applicator_no,
            "pesticide_expire_date": record.pesticide_expire_date,
            "added_by": record.added_by,
        };
    }

    const columnWidth = 150;
    const columnMiddleWidth = 250;
    const columnLongWidth = 300;
    const columns = [
        {
            field: 'user',
            headerName: 'Employee User',
            width: columnWidth,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: columnWidth,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: columnMiddleWidth,
        },
        {
            field: 'cell_phone',
            headerName: 'Cell Phone',
            width: columnWidth,
        },
        {
            field: 'pesticide_applicator_no',
            headerName: 'Pesticide Certification I.D.',
            width: columnLongWidth,
        },
        {
            field: 'pesticide_expire_date',
            headerName: 'Pesticide Certification Expire Date',
            width: columnLongWidth,
        },
        {
            field: 'added_by',
            headerName: 'Added By',
            width: columnWidth,
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([EmployeeListGet(employer_id)]);
        };

        fetchData();
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            EmployeeListGet(employer_id);
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
                    localeText={{noRowsLabel: privilege.employee_r ? "No rows" : "You don't have the privilege to access this data"}}
                />
            </Paper>
        </div>
    );
}