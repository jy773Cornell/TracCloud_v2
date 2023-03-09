import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import {useEffect} from "react";
import {StyledButton} from "./styles";

const columns = [
    {id: 'crop', label: 'Crop', minWidth: 100},
    {id: 'variety', label: 'Variety', minWidth: 100},
    {id: 'crop_code', label: 'Crop Code', minWidth: 100,},
    {id: 'category', label: 'Category', minWidth: 100,},
    {id: 'growth_stage', label: 'Growth Stage', minWidth: 100,},
    {id: 'update_time', label: 'Update Time', minWidth: 100,},
    {id: 'operations', label: 'Operations', minWidth: 100,},
];

function createRowData(record) {
    return {
        "cid": record.cid,
        "crop": record.crop,
        "variety": record.variety,
        "crop_code": record.crop_code,
        "category": record.category,
        "growth_stage": record.growth_stage,
        "update_time": record.update_time
    };
}

export default function Crop(props) {
    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    async function CropListGet(props) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/list/get/" + "?uid=" + props.uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const record_list = data.data;
                        console.log(record_list)
                        const record_row = record_list.map((record) => createRowData(record))
                        setRows(record_row);
                    })
                }
            })
    }

    useEffect(() => {
        CropListGet(props);
    }, []);

    return (
        <div>
            <StyledButton variant="contained" startIcon={<AddIcon/>}>Add Crop</StyledButton>
            <Paper sx={{overflow: 'hidden', margin: "0px 15px"}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (<TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth, backgroundColor: '#f5f5f5', color: 'black'}}
                                >
                                    {column.label}
                                </TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (<TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>);
                                        })}
                                    </TableRow>);
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}