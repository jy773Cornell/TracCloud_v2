import * as React from 'react';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {Autocomplete, Button, Card, CardContent, Grid, Modal, Popover, TextField, Typography} from "@mui/material";
import {AddButton} from "./styles";
import OperationSnackbars from "../../components/Snackbars";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import ConfirmPopover from "../../components/ConfirmPopover";

const columnWidth = 200;
const editWidth = 180;

const field_names = ["type", "name", "owner_name", "crop", "crop_year", "size", "size_unit", "gps", "gps_system"]

const end_site_types = ["Rows", "Hole Code#", "Section", ""]

const add_row_id = "create_add_row_data"

function createAPIData(data) {
    const {type: type_id, crop: crop_id, size_unit: size_unit_id, ...rest} = data;
    return {type_id, crop_id, size_unit_id, ...rest};
}

function createRowData(record) {
    return {
        "id": record.sid,
        "type": record.type,
        "name": record.name,
        "owner_name": record.owner_name,
        "crop": record.crop ? record.crop.crop + " (" + record.crop.variety + ", " + record.crop.growth_stage + ")" : "",
        "crop_year": record.crop_year,
        "size": record.size,
        "size_unit": record.size_unit,
        "gps": record.gps,
        "gps_system": record.gps_system,
        "children": record.children,
        "update_time": record.update_time,
    };
}

function createAddData() {
    return {
        "id": add_row_id,
        "type": "",
        "name": "",
        "owner_name": "",
        "crop": "",
        "crop_year": "",
        "size": "",
        "size_unit": "",
        "gps": "",
        "gps_system": "",
        "children": "",
        "update_time": "",
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

function AddSiteRecord({
                           fieldValues,
                           formData,
                           columns,
                           siteTypeOptions,
                           unitOptions,
                           handleInputChange,
                           showAddModal,
                           setShowAddModal,
                           setIsSave,
                           inputError,
                           updateInputError,
                           refreshRecord,
                           setRefreshRecord,
                       }) {

    async function SiteRecordSave() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/site/create/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setShowAddModal(false);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const handleSaveButtonPressed = () => {
        if ([fieldValues[field_names[0]], fieldValues[field_names[1]]].every(value => value !== "")) {
            SiteRecordSave();
        } else {
            updateInputError();
        }
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
                        <h1>Add Site Record</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={fieldValues[field_names[0]]}
                            options={siteTypeOptions}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[0]);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required variant="outlined" label={columns[1].headerName}
                                           error={inputError[field_names[0]]}/>)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={inputError[field_names[1]]}
                            required
                            fullWidth
                            variant="outlined"
                            label={columns[2].headerName}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[1]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={columns[3].headerName}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[2]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label={columns[6].headerName}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[5]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            value={fieldValues[field_names[6]]}
                            options={unitOptions}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[6]);
                            }}
                            renderInput={(params) => (<TextField
                                {...params}
                                variant="outlined"
                                label={columns[7].headerName}
                            />)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label={columns[8].headerName}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[7]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label={columns[9].headerName}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[8]);
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

export default function Site(props) {
    const uid = props.uid;
    const [siteType, setSiteType] = useState([]);
    const [cropList, setCropList] = useState([]);
    const [unit, setUnit] = useState([]);

    const [rows, setRows] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [siteTypeOptions, setSiteTypeOptions] = useState([]);
    const [cropOptions, setCropOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [inputError, setInputError] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverRowId, setPopoverRowId] = useState(null);
    const [refreshRecord, setRefreshRecord] = useState(false);

    async function SiteListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/site/list/get/" + "?uid=" + uid, requestOptions)
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

    async function SiteTypeGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/site/type/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setSiteType(data.data);
                    })
                }
            })
    }

    async function CropListGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCropList(data.data);
                    })
                }
            })
    }

    async function UnitGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/unit/?usage=site", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setUnit(data.data);
                    })
                }
            })
    }

    async function SiteRecordUpdate() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/site/update/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setEditRowId(null);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    async function SiteRecordDelete(sid) {
        const apiData = {"user": uid, "sid": sid}
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/site/delete/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsDelete(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const clearInputError = () => {
        setInputError(Object.fromEntries(field_names.map(item => [item, false])));
    }

    const updateInputError = () => {
        Object.keys(fieldValues).forEach(key => {
            if (fieldValues[key] === "") {
                setInputError((prevInputError) => ({
                    ...prevInputError, [key]: true
                }));
            } else {
                setInputError((prevInputError) => ({
                    ...prevInputError, [key]: false
                }));
            }
        });
    }

    const onSaveClicked = () => {
        if (Object.values(fieldValues).every(value => value !== "")) {
            SiteRecordUpdate();
            const index = rows.findIndex(item => item.id === fieldValues.id);
            setRows([...rows.slice(0, index), fieldValues, ...rows.slice(index + 1),]);
        } else {
            updateInputError();
        }
    };

    const onCancelClicked = (params) => {
        if (params.id === add_row_id) {
            deleteAddRow(params.id);
        }
        setEditRowId(null);
        clearInputError();
    }

    const onEditClicked = (params) => {
        setFormData({"sid": params.id});
        setFieldValues(params.row);
        setEditRowId(params.id);
        clearInputError();
    };

    const onExpandClicked = (params) => {
        const {id, children} = params.row;
        const index = rows.findIndex(item => item.id === id);
        const newExpandedRows = {...expandedRows};
        newExpandedRows[id] = children.map((child) => child.sid);
        setExpandedRows(newExpandedRows);

        setRows([
            ...rows.slice(0, index + 1),
            ...children.map((child) => createRowData(child)),
            ...rows.slice(index + 1)
        ])
    };

    const deleteExpandedChildren = (id) => {
        if (!expandedRows[id]) {
            return;
        }

        const newExpandedRows = {...expandedRows};
        newExpandedRows[id].forEach((childId) => {
            deleteExpandedChildren(childId);
            setRows((prevRows) => prevRows.filter((item) => item.id !== childId));
        });
        delete newExpandedRows[id];
        setExpandedRows(newExpandedRows);
    };

    const onExpandLessClicked = (params) => {
        deleteExpandedChildren(params.id);
    };

    const deleteAddRow = (id) => {
        const index = rows.findIndex(item => item.id === id);
        setRows([...rows.slice(0, index), ...rows.slice(index + 1),]);
    }

    const onSubSiteAddClicked = (params) => {
        const addDataIndex = rows.findIndex(item => item.id === add_row_id);
        if (addDataIndex !== -1) {
            const noneAddRows = [...rows.filter((item, idx) => idx !== addDataIndex)];
            const index = noneAddRows.findIndex(item => item.id === params.id);
            const newRows = [
                ...noneAddRows.slice(0, index + 1),
                createAddData(),
                ...noneAddRows.slice(index + 1),
            ];

            setRows(newRows);
        } else {
            const index = rows.findIndex(item => item.id === params.id);
            const newRows = [
                ...rows.slice(0, index + 1),
                createAddData(),
                ...rows.slice(index + 1),
            ];
            setRows(newRows);
        }
        setEditRowId(add_row_id);
    };


    const onDeleteClicked = (params) => {
        SiteRecordDelete(params.id);
        const index = rows.findIndex(item => item.id === params.id);
        setRows([...rows.slice(0, index), ...rows.slice(index + 1),]);
    };

    const onAddClicked = () => {
        setFormData({"user_id": uid,});
        setFieldValues(Object.fromEntries(field_names.map(item => [item, ""])));
        setEditRowId(null);
        setShowAddModal(true);
        clearInputError();
    };

    const SiteTypeOptionsFresh = (level) => {
        setSiteTypeOptions(siteType.filter(item => item.level === level).map(item => ({
            label: item.name, id: item.stid
        })))
    };

    const CropOptionsFresh = () => {
        setCropOptions(cropList.map(item => ({
            label: item.crop + " (" + item.variety + ", " + item.growth_stage + ")", id: item.cid,
        })));
    };

    const UnitOptionsFresh = () => {
        setUnitOptions(unit.map(item => ({
            label: item.name, id: item.unitid,
        })));
    };

    const handleInputChange = (event, value, field) => {
        if ([field_names[0], field_names[3], field_names[6]].includes(field)) {
            setFieldValues({
                ...fieldValues, [field]: value.label,
            });
            setFormData({
                ...formData, [field]: value.id,
            });
        } else {
            setFieldValues({...fieldValues, [field]: value});
            setFormData({...formData, [field]: value});
        }
    };

    const columns = [
        {
            field: 'operations',
            headerName: 'Operations',
            sortable: false,
            width: 200,
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
                        {!end_site_types.includes(params.row.type) && (
                            <IconButton>
                                <AddCircleIcon onClick={() => onSubSiteAddClicked(params)}/>
                            </IconButton>
                        )}
                        {params.row.children.length > 0 && (
                            !(params.id in expandedRows) ? (
                                <IconButton>
                                    <ExpandMoreIcon onClick={() => onExpandClicked(params)}/>
                                </IconButton>) : (
                                <IconButton>
                                    <ExpandLessIcon onClick={() => onExpandLessClicked(params)}/>
                                </IconButton>
                            ))
                        }
                        {popoverRowId === params.id && <ConfirmPopover anchorEl={anchorEl}
                                                                       setAnchorEl={setAnchorEl}
                                                                       onDeleteClicked={onDeleteClicked}
                                                                       params={params}
                                                                       msg="Delete this record?"
                                                                       type="delete"
                        />}
                    </>);
                } else {
                    return (<>
                        <IconButton onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                            setPopoverRowId(params);
                        }}>
                            <SaveIcon/>
                        </IconButton>
                        <IconButton onClick={() => onCancelClicked(params)}>
                            < CancelIcon/>
                        </IconButton>
                        {popoverRowId === params.id && <ConfirmPopover anchorEl={anchorEl}
                                                                       setAnchorEl={setAnchorEl}
                                                                       onSaveClicked={onSaveClicked}
                                                                       params={params}
                                                                       msg="Update this record?"
                                                                       type="update"
                        />}
                    </>)
                }
            },
        },
        {
            field: 'type',
            headerName: 'Site Type',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (<Autocomplete
                options={siteTypeOptions}
                disableClearable
                readOnly={editRowId !== rowID}
                value={editRowId === rowID ? fieldValues[field_names[0]] : params.value}
                onChange={(event, value) => {
                    handleInputChange(event, value, field_names[0]);
                }}
                renderInput={(params) => {
                    return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                             InputProps={{disableUnderline: true}}
                                                             sx={{width: columnWidth}}/> :
                        <TextField {...params} variant="standard" error={inputError[field_names[0]]}
                                   sx={{width: editWidth}}
                        />)
                }}
            />),
        },
        {
            field: 'name',
            headerName: 'Site Name',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ? <TextField
                    variant="standard"
                    value={params.value}
                    InputProps={{
                        disableUnderline: true, readOnly: true,
                    }}
                    sx={{width: columnWidth}}/> : <TextField
                    variant="standard"
                    value={fieldValues[field_names[1]]}
                    error={inputError[field_names[1]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[1]);
                    }}
                />)
            },
        },
        {
            field: 'owner_name',
            headerName: 'Owner Name',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ? <TextField
                    variant="standard"
                    value={params.value}
                    InputProps={{
                        disableUnderline: true, readOnly: true,
                    }}
                    sx={{width: columnWidth}}/> : <TextField
                    variant="standard"
                    value={fieldValues[field_names[2]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[2]);
                    }}
                />)
            },
        },
        {
            field: 'crop',
            headerName: 'Crop',
            sortable: false,
            width: 300,
            renderCell: (params, rowID = params.id) => (<Autocomplete
                options={cropOptions}
                disableClearable
                readOnly={editRowId !== rowID}
                value={editRowId === rowID ? fieldValues[field_names[3]] : params.value}
                onChange={(event, value) => {
                    handleInputChange(event, value, field_names[3]);
                }}
                renderInput={(params) => {
                    return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                             InputProps={{disableUnderline: true}}
                                                             sx={{width: 300}}/> :
                        <TextField {...params} variant="standard" error={inputError[field_names[3]]}
                                   sx={{width: 280}}
                        />)
                }}
            />),
        },
        {
            field: 'crop_year',
            headerName: 'Crop Year',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ? <TextField
                    variant="standard"
                    value={params.value}
                    InputProps={{
                        disableUnderline: true, readOnly: true,
                    }}
                    sx={{width: columnWidth}}/> : <TextField
                    variant="standard"
                    value={fieldValues[field_names[4]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[4]);
                    }}
                />)
            },
        },
        {
            field: 'size',
            headerName: 'Size',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ? <TextField
                    variant="standard"
                    value={params.value}
                    InputProps={{
                        disableUnderline: true, readOnly: true,
                    }}
                    sx={{width: columnWidth}}/> : <TextField
                    variant="standard"
                    value={fieldValues[field_names[5]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[5]);
                    }}
                />)
            },
        },
        {
            field: 'size_unit',
            headerName: 'Size Unit',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (<Autocomplete
                options={unitOptions}
                disableClearable
                readOnly={editRowId !== rowID}
                value={editRowId === rowID ? fieldValues[field_names[6]] : params.value}
                onChange={(event, value) => {
                    handleInputChange(event, value, field_names[6]);
                }}
                renderInput={(params) => {
                    return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                             InputProps={{disableUnderline: true}}
                                                             sx={{width: columnWidth}}/> :
                        <TextField {...params} variant="standard"
                                   sx={{width: editWidth}}
                        />)
                }}
            />),
        },
        {
            field: 'gps',
            headerName: 'GPS',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ? <TextField
                    variant="standard"
                    value={params.value}
                    InputProps={{
                        disableUnderline: true, readOnly: true,
                    }}
                    sx={{width: columnWidth}}/> : <TextField
                    variant="standard"
                    value={fieldValues[field_names[7]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[7]);
                    }}
                />)
            },
        },
        {
            field: 'gps_system',
            headerName: 'GPS System',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ? <TextField
                    variant="standard"
                    value={params.value}
                    InputProps={{
                        disableUnderline: true, readOnly: true,
                    }}
                    sx={{width: columnWidth}}/> : <TextField
                    variant="standard"
                    value={fieldValues[field_names[8]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[8]);
                    }}
                />)
            },
        },
        {
            field: 'update_time',
            headerName: 'Update Time',
            sortable: false,
            width: columnWidth,
        },
    ];

    const addProps = {
        fieldValues,
        formData,
        columns,
        siteTypeOptions,
        unitOptions,
        handleInputChange,
        showAddModal,
        setShowAddModal,
        setIsSave,
        inputError,
        updateInputError,
        refreshRecord,
        setRefreshRecord,
    };

    const saveProps = {open: isSave, setOpen: setIsSave, msg: "Site record is uploaded successfully!"};

    const deleteProps = {open: isDelete, setOpen: setIsDelete, msg: "Site record has been deleted!"};

    useEffect(() => {
        SiteTypeGet();
        CropListGet();
        UnitGet();
        clearInputError();
    }, []);

    useEffect(() => {
        SiteTypeOptionsFresh(1);
        CropOptionsFresh();
        UnitOptionsFresh();
    }, [siteType, cropList, unit]);

    useEffect(() => {
        SiteListGet(uid)
    }, [refreshRecord]);

    return (<div>
        <AddButton
            variant="contained"
            startIcon={<AddIcon/>}
            onClick={() => onAddClicked()}>
            Add Site
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
        <AddSiteRecord {...addProps}/>
        <OperationSnackbars  {...saveProps}/>
        <OperationSnackbars  {...deleteProps}/>
    </div>);
}