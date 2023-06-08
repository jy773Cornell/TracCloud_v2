import * as React from "react";
import Paper from "@mui/material/Paper";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {StyledDataGrid} from "./styles";


function CustomToolbar() {
    return (<GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
    </GridToolbarContainer>);
}

export default function SprayCardDataGrid({
                                              uid,
                                              refreshRecord,
                                              sprayCardSelected,
                                              setSprayCardSelected
                                          }) {
    const [rows, setRows] = useState([]);
    const [mounted, setMounted] = useState(false);

    async function SprayCardListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/workflow/spraycard/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const record_list = data.data;
                        const record_row = record_list.map((record) => createRowData(record))
                        setRows(record_row);
                    })
                }
            })
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

    const handleStateClick = (record_id) => {
        setSprayCardSelected(record_id);
    };

    const columnWidth = 150;
    const columns = [{
        field: 'state', headerName: 'State', width: columnWidth, renderCell: (params) => (<Button
            variant="text"
            onClick={() => handleStateClick(params.row.id)}>
            {params.row.state}
        </Button>)
    }, {
        field: 'owner', headerName: 'Owner', width: columnWidth,
    }, {
        field: 'holder', headerName: 'Holder', width: columnWidth,
    }, {
        field: 'update_time', headerName: 'Update Time', width: 200,
    }, {
        field: 'create_time', headerName: 'Create Time', width: 200,
    },]

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([SprayCardListGet(uid)]);
        };

        fetchData();
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            SprayCardListGet(uid);
        }
    }, [refreshRecord]);

    return (
        <div>
            <Paper style={{height: 900}}>
                <StyledDataGrid
                    columns={columns}
                    rows={rows}
                    disableRowSelectionOnClick={true}
                    disableClickEdit={true}
                    rowSelection={false}
                    getRowClassName={(params) => params.id === sprayCardSelected ? `highlight` : null}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                />
            </Paper>
        </div>
    );
}