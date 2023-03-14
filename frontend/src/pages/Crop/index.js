import * as React from 'react';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {Autocomplete, Button, Card, CardContent, Grid, Modal, Popover, TextField, Typography} from "@mui/material";
import {AddButton} from "./styles";
import OperationSnackbars from "../../components/Snackbars";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import ConfirmPopover from "../../components/ConfirmPopover";

const columnWidth = 200;
const editWidth = 180;

const field_names = ["crop", "variety", "crop_code", "category", "growth_stage"]

function createAPIData(data) {
    const {crop: crop_id, variety: variety_id, growth_stage: growth_stage_id, ...rest} = data;
    return {crop_id, variety_id, growth_stage_id, ...rest};
}

function createRowData(record) {
    return {
        "id": record.cid,
        "crop": record.crop,
        "variety": record.variety,
        "crop_code": record.crop_code,
        "category": record.category,
        "growth_stage": record.growth_stage,
        "update_time": record.update_time
    };
}

function CustomToolbar() {
    return (<GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
    </GridToolbarContainer>);
}

function AddCropRecord({
                           fieldValues,
                           formData,
                           columns,
                           cropCategoryOptions,
                           cropVarietyOptions,
                           cropGrowthStageOptions,
                           handleInputChange,
                           showAddModal,
                           setShowAddModal,
                           setIsSave,
                           refreshRecord,
                           setRefreshRecord,
                       }) {

    async function CropRecordSave() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/crop/create/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setShowAddModal(false);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const handleSaveButtonPressed = () => {
        CropRecordSave();
    };

    return (<Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
    >
        <Card sx={{width: 400}}>
            <CardContent>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <h1>Add Crop Record</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={cropCategoryOptions}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label={columns[1].headerName}/>)}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[0])
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={cropVarietyOptions}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label={columns[2].headerName}/>)}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[1])
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={fieldValues[field_names[2]]}
                            InputLabelProps={{
                                shrink: true,
                                readOnly: true,
                            }}
                            variant="outlined"
                            label={columns[3].headerName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={fieldValues[field_names[3]]}
                            InputLabelProps={{
                                shrink: true,
                                readOnly: true,
                            }}
                            variant="outlined"
                            label={columns[4].headerName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={cropGrowthStageOptions}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label={columns[5].headerName}/>)}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[4])
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                        <Button variant="contained" color="success" onClick={() => handleSaveButtonPressed()}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                        <Button variant="contained" color="secondary" onClick={() => setShowAddModal(false)}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Modal>);
}

export default function Crop(props) {
    const [cropCategory, setCropCategory] = useState([]);
    const [cropVariety, setCropVariety] = useState([]);
    const [cropGrowthStage, setCropGrowthStage] = useState([]);

    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [cropCategoryOptions, setCropCategoryOptions] = useState([]);
    const [cropVarietyOptions, setCropVarietyOptions] = useState([]);
    const [cropGrowthStageOptions, setCropGrowthStageOptions] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [editRowId, setEditRowId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverRowId, setPopoverRowId] = useState(null);
    const [refreshRecord, setRefreshRecord] = useState(false);

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

    async function CropRecordUpdate() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/crop/update/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setEditRowId(null);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    async function CropRecordDelete(cid) {
        const apiData = {"user": props.uid, "cid": cid}
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/crop/delete/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsDelete(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const onSaveClicked = () => {
        CropRecordUpdate();
        const index = rows.findIndex(item => item.id === fieldValues.id);
        setRows([
            ...rows.slice(0, index),
            fieldValues,
            ...rows.slice(index + 1),
        ]);
    };

    const onEditClicked = (params) => {
        const crop = cropCategoryOptions.find(item => item.label === params.row.crop);
        setFormData({"cid": params.id, "crop": crop.id});
        setFieldValues(params.row);
        setEditRowId(params.id);
    };

    const onDeleteClicked = (params) => {
        CropRecordDelete(params.id);
        const index = rows.findIndex(item => item.id === params.id);
        setRows([
            ...rows.slice(0, index),
            ...rows.slice(index + 1),
        ]);
    };

    const onAddClicked = () => {
        setFormData({"user_id": props.uid,});
        setFieldValues(Object.fromEntries(field_names.map(item => [item, ""])));
        setEditRowId(null);
        setShowAddModal(true);
    };

    const CropCategoryOptionsFresh = () => {
        setCropCategoryOptions(cropCategory.map(item => ({
            label: item.name, id: item.ccid, crop_code: item.crop_code, category: item.category,
        })));
    };

    const CropVarietyOptionsFresh = (crop_id) => {
        setCropVarietyOptions(cropVariety.filter(item => item.crop === crop_id).map(item => ({
            label: item.name, id: item.cvid
        })))
    };

    const CropGrowthStageOptionsFresh = (crop_id) => {
        setCropGrowthStageOptions(cropGrowthStage.filter(item => item.crop === crop_id).map(item => ({
            label: item.name, id: item.cgsid
        })))
    };

    const handleInputChange = (event, value, field) => {
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
                ...formData, [field]: value.id, [field_names[1]]: null, [field_names[4]]: null
            });
        } else {
            setFieldValues({...fieldValues, [field]: value.label})
            setFormData({...formData, [field]: value.id});
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: columnWidth
        },
        {
            field: 'crop',
            headerName: 'Crop',
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={cropCategoryOptions}
                    freeSolo
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues.crop : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[0]);
                    }}

                    renderInput={(params) => {
                        return (
                            editRowId !== rowID ?
                                <TextField {...params} variant="standard"
                                           InputProps={{disableUnderline: true}}
                                           sx={{width: columnWidth}}/> :
                                <TextField {...params} variant="standard" sx={{width: editWidth}}/>
                        )
                    }}
                />),
        },
        {
            field: 'variety',
            headerName: 'Variety',
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={cropVarietyOptions}
                    freeSolo
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues.variety : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[1]);
                    }}

                    renderInput={(params) => {
                        return (
                            editRowId !== rowID ?
                                <TextField {...params} variant="standard"
                                           InputProps={{disableUnderline: true}}
                                           sx={{width: columnWidth}}/> :
                                <TextField {...params} variant="standard" sx={{width: editWidth}}/>
                        )
                    }}
                />),
        },
        {
            field: 'crop_code',
            headerName: 'Crop Code',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues.crop_code : params.value)
            },
        },
        {
            field: 'category',
            headerName: 'Category',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues.category : params.value)
            },
        },
        {
            field: 'growth_stage',
            headerName: 'Growth Stage',
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={cropGrowthStageOptions}
                    freeSolo
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues.growth_stage : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[4]);
                    }}

                    renderInput={(params) => {
                        return (
                            editRowId !== rowID ?
                                <TextField {...params} variant="standard"
                                           InputProps={{disableUnderline: true}}
                                           sx={{width: columnWidth}}/> :
                                <TextField {...params} variant="standard" sx={{width: editWidth}}/>
                        )
                    }}
                />),
        },
        {
            field: 'update_time',
            headerName: 'Update Time',
            width: columnWidth,
        },
        {
            field: 'operations',
            headerName: 'Operations',
            sortable: false,
            width: columnWidth,
            disableColumnMenu: true,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                if (editRowId !== params.id) {
                    return (<>
                        <IconButton onClick={() => onEditClicked(params)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                            setPopoverRowId(params.id);
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                        {popoverRowId === params.id &&
                            <ConfirmPopover anchorEl={anchorEl}
                                            setAnchorEl={setAnchorEl}
                                            onDeleteClicked={onDeleteClicked}
                                            params={params}
                                            msg="Delete this record?"
                                            type="delete"
                            />
                        }
                    </>);
                } else {
                    return (
                        <>
                            <IconButton onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                                setPopoverRowId(params.id);
                            }}>
                                <SaveIcon/>
                            </IconButton>
                            <IconButton onClick={() => setEditRowId(null)}>
                                < CancelIcon/>
                            </IconButton>
                            {popoverRowId === params.id &&
                                <ConfirmPopover anchorEl={anchorEl}
                                                setAnchorEl={setAnchorEl}
                                                onSaveClicked={onSaveClicked}
                                                params={params}
                                                msg="Update this record?"
                                                type="update"
                                />
                            }
                        </>
                    )
                }
            },
        },];

    const addProps = {
        fieldValues,
        formData,
        columns,
        cropCategoryOptions,
        cropVarietyOptions,
        cropGrowthStageOptions,
        handleInputChange,
        showAddModal,
        setShowAddModal,
        setIsSave,
        refreshRecord,
        setRefreshRecord,
    };

    const saveProps = {open: isSave, setOpen: setIsSave, msg: "Crop record is uploaded successfully!"};

    const deleteProps = {open: isDelete, setOpen: setIsDelete, msg: "Crop record has been deleted!"};

    useEffect(() => {
        CropCategoryGet();
        CropVarietyGet();
        CropGrowthStageGet();
    }, []);

    useEffect(() => {
        CropCategoryOptionsFresh();
    }, [cropCategory]);

    useEffect(() => {
        CropVarietyOptionsFresh(formData.crop);
        CropGrowthStageOptionsFresh(formData.crop);
    }, [formData.crop]);

    useEffect(() => {
        CropListGet(props);
    }, [refreshRecord]);

    return (<div>
        <AddButton
            variant="contained"
            startIcon={<AddIcon/>}
            onClick={() => onAddClicked()}>
            Add Crop
        </AddButton>
        <Paper style={{height: 900, margin: '0px 15px'}}>
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
        <AddCropRecord {...addProps}/>
        <OperationSnackbars  {...saveProps}/>
        <OperationSnackbars  {...deleteProps}/>
    </div>);
}