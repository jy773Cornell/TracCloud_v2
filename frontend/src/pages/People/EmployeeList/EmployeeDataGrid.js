import * as React from "react";
import Paper from "@mui/material/Paper";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {lazy, useEffect, useState} from "react";
import {Button} from "@mui/material";
import {StyledDataGrid} from "../styles";

const EmployeeSettingForm = lazy(() => import('./EmployeeSettingForm'))

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
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [rows, setRows] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [settingFormOpen, setSettingFormOpen] = useState(false);

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
        for (let key in record) {
            if (record[key] === null) {
                record[key] = "";
            }
        }

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

    const handleUserClick = (employee) => {
        setSelectedEmployee(employee);
        setSettingFormOpen(true);
    }

    const columnWidth = 150;
    const columnMiddleWidth = 250;
    const columnLongWidth = 300;
    const columns = [
        {
            field: 'user',
            headerName: 'Employee User',
            width: columnWidth,
            renderCell: (params) => {
                return (
                    <Button
                        variant="text"
                        onClick={() => handleUserClick(employeeList.find(employees => employees.uid === params.row.id))}>
                        {params.row.user}
                    </Button>
                );
            }
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

    const settingProps = {
        privilege,
        employer_id,
        refreshRecord,
        setRefreshRecord,
        settingFormOpen,
        setSettingFormOpen,
        selectedEmployee
    }

    return (
        <div>
            <Paper style={{height: 900}}>
                <StyledDataGrid
                    columns={columns}
                    rows={rows}
                    disableRowSelectionOnClick={true}
                    disableClickEdit={true}
                    rowSelection={false}
                    getRowClassName={(params) => params.id === selectedEmployee?.uid ? `highlight` : null}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    localeText={{noRowsLabel: privilege.employee_r ? "No rows" : "You don't have the privilege to access this data"}}
                />
            </Paper>
            <EmployeeSettingForm {...settingProps}/>
        </div>
    );
}