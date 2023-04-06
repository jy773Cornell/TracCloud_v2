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

const field_names = [
    "crop", "site", "app_datetime", "target", "decision_support", "chemical", "operator", "equipment",
    "water_use", "water_unit", "application_rate", "rate_unit", "total_amount", "amount_unit", "total_cost",
    "applied_area", "area_unit", "wind_speed", "wind_direction", "average_temp", "customer"
]

function createAPIData(data) {
    const {
        crop: crop_id, site: site_id, target: target_id, decision_support: decision_support_id,
        chemical: chemical_id, equipment: equipment_id, water_unit: water_unit_id, rate_unit: rate_unit_id,
        amount_unit: amount_unit_id, area_unit: area_unit_id, ...rest
    } = data;
    return {
        crop_id,
        site_id,
        target_id,
        decision_support_id,
        chemical_id,
        equipment_id,
        water_unit_id,
        rate_unit_id,
        amount_unit_id,
        area_unit_id,
        ...rest
    };
}

function createRowData(record) {
    return {
        "id": record.arid,
        "crop": record.crop,
        "site": record.site,
        "app_datetime": record.app_datetime,
        "target": record.target,
        "decision_support": record.decision_support,
        "chemical": record.chemical,
        "operator": record.operator,
        "equipment": record.equipment,
        "water_use": record.water_use,
        "application_rate": record.application_rate,
        "total_amount": record.total_amount,
        "total_cost": record.total_cost,
        "applied_area": record.applied_area,
        "wind_speed": record.wind_speed,
        "wind_direction": record.wind_direction,
        "average_temp": record.average_temp,
        "customer": record.customer,
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

function AddSprayRecord({
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
                            inputError,
                            updateInputError,
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
        if (Object.values(fieldValues).every(value => value !== "")) {
            CropRecordSave();
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
                        <h1>Add Crop Record</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={fieldValues[field_names[0]]}
                            options={cropCategoryOptions}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[0]);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required variant="outlined" label={columns[1].headerName}
                                           error={inputError[field_names[0]]}/>)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={fieldValues[field_names[1]]}
                            options={cropVarietyOptions}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[1]);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required variant="outlined" label={columns[2].headerName}
                                           error={inputError[field_names[1]]}/>)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={fieldValues[field_names[2]]}
                            InputLabelProps={{
                                shrink: true, readOnly: true,
                            }}
                            variant="outlined"
                            label={columns[3].headerName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={fieldValues[field_names[3]]}
                            InputLabelProps={{
                                shrink: true, readOnly: true,
                            }}
                            variant="outlined"
                            label={columns[4].headerName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={fieldValues[field_names[4]]}
                            options={cropGrowthStageOptions}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[4]);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required variant="outlined" label={columns[5].headerName}
                                           error={inputError[field_names[4]]}/>)}
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

export default function SprayRecord(props) {
    const uid = props.uid;
    const [sprayApplicationList, setSprayApplicationList] = useState({});
    const [cropList, setCropList] = useState([]);
    const [siteList, setSiteList] = useState([]);
    const [chemicalList, setChemicalList] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]);
    const [cropCategory, setCropCategory] = useState([]);
    const [cropVariety, setCropVariety] = useState([]);
    const [cropGrowthStage, setCropGrowthStage] = useState([]);
    const [siteType, setSiteType] = useState([]);
    const [applicationType, setApplicationType] = useState([]);
    const [applicationTarget, setApplicationTarget] = useState([]);
    const [decisionSupport, setDecisionSupport] = useState([]);
    const [unit, setUnit] = useState([]);

    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});

    const [showAddModal, setShowAddModal] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isExpended, setIsExpended] = useState(true);
    const [inputError, setInputError] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverRowId, setPopoverRowId] = useState(null);
    const [refreshRecord, setRefreshRecord] = useState(false);

    async function CropListGet(uid) {
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

    async function SiteListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/site/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setSiteList(data.data);
                    })
                }
            })
    }

    async function ChemicalListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/chemical/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setChemicalList(data.data);
                    })
                }
            })
    }

    async function EquipmentListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/equipment/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setEquipmentList(data.data);
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

    async function ApplicationTypeGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/application/type/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setApplicationType(data.data);
                    })
                }
            })
    }

    async function ApplicationTargetGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/application/target/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setApplicationTarget(data.data);
                    })
                }
            })
    }

    async function DecisionSupportGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/application/desicisionsupport/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setDecisionSupport(data.data);
                    })
                }
            })
    }

    async function UnitGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/unit/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setUnit(data.data);
                    })
                }
            })
    }

    async function SprayApplicationListGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/operation/application/list/get/?" + "uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const sprayList = data.data.filter(item => item[0].type === applicationType.find(item => item.name === "Spray").atid)
                        setSprayApplicationList(sprayList);
                    })
                }
            })
    }

    async function ApplicationRecordUpdate() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/application/update/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setEditRowId(null);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    async function ApplicationRecordDelete(arid) {
        const apiData = {"user": uid, "arid": arid}
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/application/delete/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsDelete(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const updateRowData = () => {
        if (isExpended) {

        } else {

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
        if (Object.values(fieldValues).every(value => value !== "")) {
            CropRecordUpdate();
            const index = rows.findIndex(item => item.id === fieldValues.id);
            setRows([...rows.slice(0, index), fieldValues, ...rows.slice(index + 1),]);
        } else {
            updateInputError();
        }
    };

    const onCancelClicked = () => {
        setEditRowId(null);
        clearInputError();
    }

    const onEditClicked = (params) => {
        const crop = cropCategoryOptions.find(item => item.label === params.row.crop);
        setFormData({"cid": params.id, "crop": crop.id});
        setFieldValues(params.row);
        setEditRowId(params.id);
        clearInputError();
    };

    const onDeleteClicked = (params) => {
        CropRecordDelete(params.id);
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
            setFieldValues({...fieldValues, [field]: value.label});
            setFormData({...formData, [field]: value.id});
        }
    };

    const columns = [{
        field: 'operations',
        headerName: 'Operations',
        sortable: false,
        width: 150,
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
                        setPopoverRowId(params.id);
                    }}>
                        <SaveIcon/>
                    </IconButton>
                    <IconButton onClick={() => onCancelClicked()}>
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
    }, {
        field: 'crop',
        headerName: 'Crop',
        sortable: false,
        width: columnWidth,
        renderCell: (params, rowID = params.id) => (<Autocomplete
            options={cropCategoryOptions}
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
    }, {
        field: 'variety',
        headerName: 'Variety',
        sortable: false,
        width: columnWidth,
        renderCell: (params, rowID = params.id) => (<Autocomplete
            options={cropVarietyOptions}
            disableClearable
            readOnly={editRowId !== rowID}
            value={editRowId === rowID ? fieldValues[field_names[1]] : params.value}
            onChange={(event, value) => {
                handleInputChange(event, value, field_names[1]);
            }}
            renderInput={(params) => {
                return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                         InputProps={{disableUnderline: true}}
                                                         sx={{width: columnWidth}}/> :
                    <TextField {...params} variant="standard" sx={{width: editWidth}}
                               error={inputError[field_names[1]]}/>)
            }}
        />),
    }, {
        field: 'crop_code', headerName: 'Crop Code', sortable: false, width: columnWidth, valueGetter: (params) => {
            return (editRowId === params.id ? fieldValues[field_names[2]] : params.value)
        },
    }, {
        field: 'category', headerName: 'Category', sortable: false, width: columnWidth, valueGetter: (params) => {
            return (editRowId === params.id ? fieldValues[field_names[3]] : params.value)
        },
    }, {
        field: 'growth_stage',
        headerName: 'Growth Stage',
        sortable: false,
        width: columnWidth,
        renderCell: (params, rowID = params.id) => (<Autocomplete
            options={cropGrowthStageOptions}
            disableClearable
            readOnly={editRowId !== rowID}
            value={editRowId === rowID ? fieldValues[field_names[4]] : params.value}
            onChange={(event, value) => {
                handleInputChange(event, value, field_names[4]);
            }}
            renderInput={(params) => {
                return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                         InputProps={{disableUnderline: true}}
                                                         sx={{width: columnWidth}}/> :
                    <TextField {...params} variant="standard" sx={{width: editWidth}}
                               error={inputError[field_names[4]]}/>)
            }}
        />),
    }, {
        field: 'update_time', headerName: 'Update Time', sortable: false, width: columnWidth,
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
        inputError,
        updateInputError,
        refreshRecord,
        setRefreshRecord,
    };

    const saveProps = {open: isSave, setOpen: setIsSave, msg: "Crop record is uploaded successfully!"};

    const deleteProps = {open: isDelete, setOpen: setIsDelete, msg: "Crop record has been deleted!"};

    useEffect(() => {
        CropListGet(uid);
        SiteListGet(uid);
        ChemicalListGet(uid);
        EquipmentListGet(uid);
        CropCategoryGet();
        CropVarietyGet();
        CropGrowthStageGet();
        SiteTypeGet();
        ApplicationTypeGet();
        ApplicationTargetGet();
        DecisionSupportGet();
        UnitGet();
        clearInputError();
    }, []);

    useEffect(() => {
    }, [formData.crop]);

    useEffect(() => {
        SprayApplicationListGet();
    }, [refreshRecord]);

    return (<div>
        <AddButton
            variant="contained"
            startIcon={<AddIcon/>}
            onClick={() => onAddClicked()}>
            Add Spray Record
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
        {/*<AddSprayRecord {...addProps}/>*/}
        <OperationSnackbars  {...saveProps}/>
        <OperationSnackbars  {...deleteProps}/>
    </div>);
}