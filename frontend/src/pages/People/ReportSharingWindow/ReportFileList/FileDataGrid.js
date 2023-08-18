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
import {getCookie} from "../../../../utils";
import reportGenerator from "../../../Report/ReportGenerators";
import {Button, Menu, MenuItem} from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CloseIcon from "@mui/icons-material/Close";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}

export default function FileDataGrid({
                                         employerID,
                                         privilege,
                                         selectedFiles,
                                         setSelectedFiles,
                                     }) {
    const [fileList, setFileList] = useState([]);
    const [rows, setRows] = useState([]);
    const [mounted, setMounted] = useState(false);

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

    const columnWidth = 200;
    const columnLongWidth = 300;
    const columns = [
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

    return (
        <Paper style={{height: 'calc(3/4 * 5/6 * 100vh)', marginLeft: '16px', marginTop: '16px', overflow: 'auto'}}>
            <DataGrid
                columns={columns}
                rows={rows}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setSelectedFiles(newRowSelectionModel);
                }}
                rowSelectionModel={selectedFiles}
                slots={{
                    toolbar: () => <CustomToolbar/>,
                }}
                density="compact"
                localeText={{noRowsLabel: privilege.report_r ? "No rows" : "You don't have the privilege to access this data"}}
            />
        </Paper>
    );
}