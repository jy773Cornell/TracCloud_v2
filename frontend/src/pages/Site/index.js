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
import ParkIcon from '@mui/icons-material/Park';
import {Autocomplete, Button, Card, CardContent, Grid, Modal, Popover, TextField, Typography} from "@mui/material";
import {AddButton, StyledContainer, StyledDataGrid, TreeButton} from "./styles";
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
import SiteTreeView from "../../components/SiteTreeView";

const columnWidth = 200;
const editWidth = 180;

const field_names = ["type", "name", "owner_name", "crop", "crop_year", "size", "size_unit", "gps", "gps_system"]

const end_site_types = ["Row", "Hole Code#", "Section", ""]

const crop_level_type = ["Row", "Hole Code#", "Section", "Blocks"]

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
                           SiteRecordSave,
                           refreshRecord,
                           setRefreshRecord,
                       }) {


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
    const [siteList, setSiteList] = useState([]);
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
    const [showTree, setShowTree] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isSaveWarning, setIsSaveWarning] = useState(false);
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
                        setSiteList(record_list);
                        const record_row = record_list.map((record) => createRowData(record))
                        updateRowData(record_row);
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

    const setExpandedData = (record_row) => {
        let newRows = record_row;
        for (let expandID in expandedRows) {
            const index = newRows.findIndex(item => item.id === expandID)
            if (index !== -1) {
                const children = newRows[index].children
                newRows = [
                    ...newRows.slice(0, index + 1),
                    ...children.map((child) => createRowData(child)),
                    ...newRows.slice(index + 1),
                ];
            }
        }
        setRows(newRows);

        const newExpandedRows = Object.keys(expandedRows).reduce((result, expandID) => {
            const row = newRows.find(item => item.id === expandID);
            if (row) {
                result[expandID] = row.children.map(child => child.sid);
            }
            return result;
        }, {});
        setExpandedRows(newExpandedRows);

    }

    const updateRowData = (record_row) => {
        if (Object.keys(expandedRows).length === 0) {
            setRows(record_row);
        } else {
            setExpandedData(record_row);
        }
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
        if ([fieldValues[field_names[0]], fieldValues[field_names[1]]].every(value => value !== "")) {
            if (!("sid" in formData)) {
                SiteRecordSave();
                setRows((prevRows) => prevRows.filter((item) => item.id !== add_row_id))
            } else {
                SiteRecordUpdate();
                const index = rows.findIndex(item => item.id === fieldValues.id);
                setRows([...rows.slice(0, index), fieldValues, ...rows.slice(index + 1),]);
            }
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
        if (rows.find(item => item.id === add_row_id)) {
            setIsSaveWarning(true);
        } else {
            setFormData({"sid": params.id});
            setFieldValues(params.row);
            setEditRowId(params.id);
            SiteTypeOptionsFresh(siteType.find(item => item.name === params.row.type).level)
            clearInputError();
        }
    };

    const onExpandClicked = (params) => {
        const {id, children} = params.row;
        const index = rows.findIndex(item => item.id === id);
        const newExpandedRows = {...expandedRows};
        newExpandedRows[id] = children.map((child) => child.sid);
        setExpandedRows(newExpandedRows);

        setRows((prevRows) => [
            ...prevRows.slice(0, index + 1),
            ...children.map((child) => createRowData(child)),
            ...prevRows.slice(index + 1)
        ])
    };

    const deleteExpandedChildren = (id) => {
        let newExpandedRows = {...expandedRows};
        let newRows = [...rows];

        const deleteChildren = (id) => {
            if (!newExpandedRows[id]) {
                return;
            }

            newExpandedRows[id].forEach((childId) => {
                deleteChildren(childId);
                newRows = newRows.filter((item) => item.id !== childId);
            });
            delete newExpandedRows[id];
        };

        deleteChildren(id);

        setExpandedRows(newExpandedRows);
        setRows(newRows);
    };

    function searchAddRow(rowID) {
        const index = rows.findIndex(item => item.id === rowID);
        if (index + 1 < rows.length && rows[index + 1].id === add_row_id) {
            return true;
        }
        if (rowID in expandedRows) {
            for (let i = 0; i < expandedRows[rowID].length; i++) {
                if (searchAddRow(expandedRows[rowID][i])) {
                    return true;
                }
            }
        }
        return false;
    }

    const onExpandLessClicked = (params) => {
        if (searchAddRow(params.id)) {
            setIsSaveWarning(true);
            return;
        }
        deleteExpandedChildren(params.id);
    };

    const deleteAddRow = (id) => {
        const index = rows.findIndex(item => item.id === id);
        setRows([...rows.slice(0, index), ...rows.slice(index + 1),]);
    }

    const onSubSiteAddClicked = (params) => {
        const {id, children} = params.row;
        let index = rows.findIndex(item => item.id === id);
        let prevRows = [];

        if (rows.find(item => item.id === add_row_id)) {
            setIsSaveWarning(true);
            return;
        }

        const newExpandedRows = (id in expandedRows) ?
            expandedRows : {...expandedRows, [id]: [...children.map((child) => child.sid)]};
        setExpandedRows(newExpandedRows);

        prevRows = (id in expandedRows) ?
            [...rows] : [
                ...rows.slice(0, index + 1),
                ...children.map((child) => createRowData(child)),
                ...rows.slice(index + 1)
            ]

        index = prevRows.findIndex(item => item.id === id);
        const newRows = [
            ...prevRows.slice(0, index + 1),
            createAddData(),
            ...prevRows.slice(index + 1),
        ];
        setRows(newRows);

        const site_type = siteType.find(item => item.name === params.row.type)
        SiteTypeOptionsFresh(site_type.level + 1)

        setFormData({"user_id": uid, "parent_id": id});
        setFieldValues(Object.fromEntries(field_names.map(item => [item, ""])));
        setEditRowId(add_row_id);
        clearInputError();
    };

    const onDeleteClicked = (params) => {
        if (rows.find(item => item.id === add_row_id)) {
            setIsSaveWarning(true);
            return;
        }

        SiteRecordDelete(params.id);
    };

    const onAddClicked = () => {
        setFormData({"user_id": uid,});
        setFieldValues(Object.fromEntries(field_names.map(item => [item, ""])));
        setEditRowId(null);
        setShowAddModal(true);
        SiteTypeOptionsFresh(1);
        clearInputError();
    };

    const onTreeClicked = () => {
        setShowTree(prevState => !prevState);
    }

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
                    return (
                        <>
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
                                <IconButton onClick={() => {
                                    onSubSiteAddClicked(params);
                                }}>
                                    <AddCircleIcon/>
                                </IconButton>
                            )}
                            {params.row.children.length > 0 && (
                                !(params.id in expandedRows) ? (
                                    <IconButton onClick={() => onExpandClicked(params)}>
                                        <ExpandMoreIcon/>
                                    </IconButton>) : (
                                    <IconButton onClick={() => onExpandLessClicked(params)}>
                                        <ExpandLessIcon/>
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
                    return (
                        <>
                            <IconButton onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                                setPopoverRowId(params.id);
                            }}>
                                <SaveIcon/>
                            </IconButton>
                            <IconButton onClick={() => onCancelClicked(params)}>
                                < CancelIcon/>
                            </IconButton>
                            {
                                popoverRowId === params.id &&
                                <ConfirmPopover anchorEl={anchorEl}
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
                disabled={(editRowId === rowID) && !(siteTypeOptions.some(value => crop_level_type.includes(value.label)))}
                value={editRowId === rowID ? fieldValues[field_names[3]] : params.value}
                onChange={(event, value) => {
                    handleInputChange(event, value, field_names[3]);
                }}
                renderInput={(params) => {
                    return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                             InputProps={{disableUnderline: true}}
                                                             sx={{width: 300}}/> :
                        <TextField {...params}
                                   variant="standard"
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
                        disableUnderline: true,
                        readOnly: true,
                    }}
                    sx={{width: columnWidth}}/> : <TextField
                    variant="standard"
                    disabled={(editRowId === rowID) && !(siteTypeOptions.some(value => crop_level_type.includes(value.label)))}
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
        SiteRecordSave,
        refreshRecord,
        setRefreshRecord,
    };

    const saveProps = {open: isSave, setOpen: setIsSave, msg: "Site record is uploaded successfully!", tag: "success"};

    const deleteProps = {open: isDelete, setOpen: setIsDelete, msg: "Site record has been deleted!", tag: "success"};

    const alertProps = {
        open: isSaveWarning,
        setOpen: setIsSaveWarning,
        msg: "Please complete the sub-site adding!",
        tag: "warning"
    };

    useEffect(() => {
        SiteTypeGet();
        CropListGet();
        UnitGet();
        clearInputError();
    }, []);

    useEffect(() => {
        CropOptionsFresh();
        UnitOptionsFresh();
    }, [siteType, cropList, unit]);

    useEffect(() => {
        SiteListGet(uid)
    }, [refreshRecord]);

    return (
        <div>
            <TreeButton
                variant="contained"
                startIcon={<ParkIcon/>}
                onClick={() => onTreeClicked()}>
                Tree Structure
            </TreeButton>
            <AddButton
                variant="contained"
                startIcon={<AddIcon/>}
                onClick={() => onAddClicked()}>
                Add Site
            </AddButton>
            <StyledContainer>
                {
                    showTree && (<SiteTreeView siteList={siteList}/>)
                }
                <Paper style={{height: 900, margin: '0px 15px'}}>
                    <StyledDataGrid
                        columns={columns}
                        rows={rows}
                        disableRowSelectionOnClick={true}
                        disableClickEdit={true}
                        rowSelection={false}
                        getRowClassName={(params) => `site-type-level--${siteType.find(item => item.name === params.row.type).level}`}
                        slots={{
                            toolbar: CustomToolbar,
                        }}
                    />
                </Paper>
            </StyledContainer>
            <AddSiteRecord {...addProps}/>
            <OperationSnackbars  {...saveProps}/>
            <OperationSnackbars  {...deleteProps}/>
            <OperationSnackbars  {...alertProps}/>
        </div>);
}