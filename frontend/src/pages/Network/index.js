import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import {Autocomplete, Button, TextField} from "@mui/material";
import {AddButton, CancelButton} from "./styles";
import OperationSnackbars from "../../components/Snackbars";

const columns = [
    {id: 'crop', label: 'Crop', minWidth: 100},
    {id: 'variety', label: 'Variety', minWidth: 100},
    {id: 'crop_code', label: 'Crop Code', minWidth: 100,},
    {id: 'category', label: 'Category', minWidth: 100,},
    {id: 'growth_stage', label: 'Growth Stage', minWidth: 100,},
    {id: 'update_time', label: 'Update Time', minWidth: 100,},
    {id: 'operations', label: 'Operations', minWidth: 100,},
];

const field_names = ["crop_id", "variety_id", "crop_code", "category", "growth_stage_id"]

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

function AddCropRow({uid, setShowAddRow, setIsSave}) {
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [cropCategory, setCropCategory] = useState([]);
    const [cropVariety, setCropVariety] = useState([]);
    const [cropGrowthStage, setCropGrowthStage] = useState([]);
    const [CropCategoryOptions, setCropCategoryOptions] = useState([]);
    const [cropVarietyOptions, setCropVarietyOptions] = useState([]);
    const [CropGrowthStageOptions, setCropGrowthStageOptions] = useState([]);

    async function CropCategoryGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/category/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCropCategory(data.data);
                    })
                }
            })
    }

    async function CropVarietyGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/variety/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCropVariety(data.data);
                    })
                }
            })
    }

    async function CropGrowthStageGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/growthstage/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCropGrowthStage(data.data);
                    })
                }
            })
    }

    async function CropRecordSave() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        };
        await fetch("/api/crop/create/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setShowAddRow(false);
                }
            })
    }

    const CropCategoryOptionsFresh = () => {
        setCropCategoryOptions(cropCategory.map(item => ({
            label: item.name,
            id: item.ccid,
            crop_code: item.crop_code,
            category: item.category,
        })));
    };

    const CropVarietyOptionsFresh = (crop_id) => {
        setCropVarietyOptions(cropVariety.filter(item => item.crop === crop_id).map(item => ({
            label: item.name,
            id: item.cvid
        })))
    };

    const CropGrowthStageOptionsFresh = (crop_id) => {
        setCropGrowthStageOptions(cropGrowthStage.filter(item => item.crop === crop_id).map(item => ({
            label: item.name,
            id: item.cgsid
        })))
    };

    const handleInputChange = (event, value, field) => {
        console.log(value)
        if (field === field_names[0]) {
            setFieldValues({
                ...fieldValues,
                [field]: value.label,
                [field_names[1]]: "",
                [field_names[2]]: value.crop_code,
                [field_names[3]]: value.category,
                [field_names[4]]: "",
            });
            setFormData({
                    ...formData,
                    [field]: value.id, [field_names[1]]: null,
                    [field_names[4]]: null
                }
            );
            CropVarietyOptionsFresh(value.id);
            CropGrowthStageOptionsFresh(value.id);
        } else {
            setFieldValues({...fieldValues, [field]: value.label})
            setFormData({...formData, [field]: value.id});
        }
    };

    const handleSaveButtonPressed = () => {
        console.log(formData)
        CropRecordSave();
    };

    useEffect(() => {
        CropCategoryGet();
        CropVarietyGet();
        CropGrowthStageGet();
        setFormData({"user_id": uid});
        setFieldValues(Object.fromEntries(field_names.map(item => [item, ""])));
    }, []);

    useEffect(() => {
        CropCategoryOptionsFresh();
    }, [cropCategory]);

    return (
        <TableRow>
            <TableCell>
                <Autocomplete
                    options={CropCategoryOptions}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" sx={{width: 150}}/>
                    )}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[0])
                    }}
                />
            </TableCell>
            <TableCell>
                <Autocomplete
                    options={cropVarietyOptions}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" sx={{}}/>
                    )}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[1])
                    }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    disabled
                    value={fieldValues[field_names[2]]}
                    variant="standard"
                    sx={{width: 100}}
                />
            </TableCell>
            <TableCell>
                <TextField
                    disabled
                    value={fieldValues[field_names[3]]}
                    variant="standard"
                    sx={{width: 150}}
                />
            </TableCell>
            <TableCell>
                <Autocomplete
                    options={CropGrowthStageOptions}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" sx={{}}/>
                    )}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[4])
                    }}
                />
            </TableCell>
            <TableCell>

            </TableCell>
            <TableCell>
                <Button variant="contained" color="success" onClick={() => handleSaveButtonPressed()}>
                    Save
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default function Crop(props) {
    const [rows, setRows] = useState([]);
    const [showAddRow, setShowAddRow] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isSave, setIsSave] = useState(false);

    async function CropListGet(props) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/list/get/" + "?uid=" + props.uid, requestOptions)
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

    const handleChangePage = (event, newPage) => {

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        CropListGet(props);
    }, [showAddRow]);

    const uid = props.uid;
    const addRowProps = {uid, setShowAddRow, setIsSave};

    return (
        <div>
            {showAddRow ?
                <CancelButton
                    variant="contained"
                    startIcon={<CancelIcon/>}
                    onClick={() => setShowAddRow(false)}>
                    Cancel
                </CancelButton> :
                <AddButton
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => setShowAddRow(true)}>
                    Add Crop
                </AddButton>
            }

            <Paper sx={{overflow: 'hidden', margin: "0px 15px"}}>
                <TableContainer sx={{maxHeight: 640}}>
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
                            {showAddRow && <AddCropRow {...addRowProps}/>}
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        if (column.id === "operations") {
                                            return (<TableCell>
                                                    <IconButton aria-label="edit">
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton aria-label="delete">
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </TableCell>
                                            )
                                        }
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
            <OperationSnackbars isSave={isSave} setIsSave={setIsSave} msg="Crop record is uploaded successfully!"/>
        </div>
    );
}