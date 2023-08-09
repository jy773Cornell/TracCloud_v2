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
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmPopover from "../../../components/ConfirmPopover";
import {getCookie} from "../../../utils";


function CustomToolbar() {
    return (<GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
    </GridToolbarContainer>);
}

export default function FileDataGrid({
                                         employerID,
                                         privilege,
                                         refreshRecord,
                                         setRefreshRecord,
                                         setIsDownload,
                                         setIsDelete
                                     }) {
    const [fileList, setFileList] = useState([]);
    const [rows, setRows] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverRowId, setPopoverRowId] = useState(null);

    async function FileListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        if (privilege.report_r) {
            await fetch("/media/report/list/get/" + "?employer_id=" + uid, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            const record_list = data.data;
                            setFileList(record_list);
                            const record_row = record_list.map((record) => createRowData(record))
                            setRows(record_row);
                        })
                    }
                })
        }
    }

    async function ReportDownload(user_id, rid) {
        const apiData = {user_id, rid};
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
        };

        try {
            const response = await fetch("/media/report/download/", requestOptions);

            if (!response.ok) {
                throw new Error("Server response was not ok.");
            }

            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'downloaded_file';
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            const reportFile = await response.arrayBuffer();
            const blob = new Blob([reportFile]);
            const downloadUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    }

    async function ReportDelete(user_id, rid) {
        const apiData = {"user_id": user_id, "rid": rid}
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
        };
        await fetch("/media/report/delete/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsDelete(true);
                    setRefreshRecord(~refreshRecord);
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
            "id": record.rid,
            "name": record.name,
            "author": record.author,
            "create_time": record.create_time,
        };
    }

    const onDownloadClicked = async (params) => {
        await ReportDownload(employerID, params.id);
        setIsDownload(true);
    }

    const onDeleteClicked = async (params) => {
        await ReportDelete(employerID, params.id);
    };

    const columnWidth = 200;
    const columnLongWidth = 300;
    const columns = [
        {
            field: 'operations',
            headerName: 'Operations',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton
                            onClick={() => onDownloadClicked(params)}
                        >
                            <DownloadIcon/>
                        </IconButton>
                        <IconButton
                            onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                                setPopoverRowId(params.id);
                            }}
                            disabled={!privilege.report_d}
                        >
                            <DeleteIcon/>
                        </IconButton>
                        {popoverRowId === params.id &&
                            <ConfirmPopover
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                onDeleteClicked={onDeleteClicked}
                                params={params}
                                msg="Delete this report?"
                                type="delete"
                            />
                        }
                    </>
                );
            }
        },
        {
            field: 'name',
            headerName: 'File Name',
            width: columnLongWidth,
        },
        {
            field: 'author',
            headerName: 'Created By',
            width: columnWidth,
        },
        {
            field: 'create_time',
            headerName: 'Created Time',
            width: columnWidth,
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([FileListGet(employerID)]);
        };

        fetchData();
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            FileListGet(employerID);
        }
    }, [refreshRecord]);

    return (
        <Paper style={{height: 1000, margin: '0px', overflow: 'auto'}}>
            <DataGrid
                columns={columns}
                rows={rows}
                disableRowSelectionOnClick={true}
                disableClickEdit={true}
                rowSelection={false}
                slots={{
                    toolbar: CustomToolbar,
                }}
                localeText={{noRowsLabel: privilege.report_r ? "No rows" : "You don't have the privilege to access this data"}}
            />
        </Paper>
    );
}