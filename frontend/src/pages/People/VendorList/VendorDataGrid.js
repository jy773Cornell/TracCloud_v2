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
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmPopover from "../../../components/ConfirmPopover";


function CustomToolbar() {
    return (<GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
    </GridToolbarContainer>);
}

export default function VendorDataGrid({
                                           employerID,
                                           privilege,
                                           refreshRecord,
                                           setRefreshRecord
                                       }) {
    const [vendorList, setVendorList] = useState([]);
    const [rows, setRows] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverRowId, setPopoverRowId] = useState(null);

    async function VendorListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/user_manage/client_or_vendor/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const record_list = data.data;
                        setVendorList(record_list);
                        const record_row = record_list.map((record) => createRowData(record))
                        setRows(record_row);
                    })
                }
            })
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
                            <CallReceivedIcon/>
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
                                // onDeleteClicked={onDeleteClicked}
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
            await Promise.all([VendorListGet(employerID)]);
        };

        fetchData();
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            VendorListGet(employerID);
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