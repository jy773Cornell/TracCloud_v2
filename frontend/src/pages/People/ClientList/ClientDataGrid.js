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
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmPopover from "../../../components/ConfirmPopover";
import {getCookie} from "../../../utils";
import OperationSnackbars from "../../../components/Snackbars";
import {useLocation} from "react-router-dom";


function CustomToolbar() {
    return (<GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
    </GridToolbarContainer>);
}

export default function ClientDataGrid({
                                           employerID,
                                           privilege,
                                           refreshRecord,
                                           setRefreshRecord
                                       }) {
    const [clientList, setClientList] = useState([]);
    const [rows, setRows] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverRowId, setPopoverRowId] = useState(null);

    const location = useLocation();

    async function ClientListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };

        if (privilege.client_r) {
            await fetch("/user_manage/client_or_vendor/list/get/" + "?uid=" + uid, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            const record_list = data.data;
                            setClientList(record_list);
                            const record_row = record_list.map((record) => createRowData(record))
                            setRows(record_row);
                        })
                    }
                })
        }
    }

    async function ConnectionDelete(requester_id, client_vendor_id) {
        const apiData = {requester_id, client_vendor_id}
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
        };
        await fetch("/user_manage/client_or_vendor/connection/delete/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsDelete(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const onDeleteClicked = async (params) => {
        ConnectionDelete(employerID, params.id);
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
            "business_name": record.business_name,
            "name": `${record.first_name} ${record.last_name}`,
            "type": record.type,
            "email": record.email,
            "cell_phone": record.cell_phone,
        };
    }

    const columnWidth = 150;
    const columnMiddleWidth = 250;
    const columns = [
        {
            field: 'operations',
            headerName: 'Operations',
            width: columnWidth,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton
                            // onClick={() => onDownloadClicked(params)}
                        >
                            <SendIcon/>
                        </IconButton>
                        <IconButton
                            onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                                setPopoverRowId(params.id);
                            }}
                            disabled={!privilege.client_d}
                        >
                            <DeleteIcon/>
                        </IconButton>
                        {popoverRowId === params.id &&
                            <ConfirmPopover
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                onDeleteClicked={onDeleteClicked}
                                params={params}
                                msg="Delete this connection?"
                                type="delete"
                            />
                        }
                    </>
                );
            }
        },
        {
            field: 'user',
            headerName: 'Client User',
            width: columnWidth,
        },
        {
            field: 'business_name',
            headerName: 'Business Name',
            width: columnMiddleWidth,
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
    ]

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([ClientListGet(employerID)]);
        };

        fetchData();
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            ClientListGet(employerID);
        }
    }, [refreshRecord]);

    useEffect(() => {
        // Toggle the flag whenever the location (URL) changes
        setRefreshRecord(prev => !prev);
    }, [location.pathname]);

    const deleteProps = {
        open: isDelete,
        setOpen: setIsDelete,
        msg: "The connection is deleted!",
        tag: "success"
    };

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
                    localeText={{noRowsLabel: privilege.client_r ? "No rows" : "You don't have the privilege to access this data"}}
                />
            </Paper>
            <OperationSnackbars  {...deleteProps}/>
        </div>
    );
}