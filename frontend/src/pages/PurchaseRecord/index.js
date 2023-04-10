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
    "chemical",
    "amount",
    "cost_per_unit",
    "total_cost",
    "pur_datetime",
    "operator",
    "vendor",
]

function createAPIData(data) {
    const {chemical: chemical_id, ...rest} = data;
    return {chemical_id, ...rest};
}

function CustomToolbar() {
    return (<GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
    </GridToolbarContainer>);
}

function AddPurchaseRecord({
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

export default function PurchaseRecord(props) {
    const uid = props.uid;
    const [purchaseList, setPurchaseList] = useState([]);
    const [chemicalList, setChemicalList] = useState([]);

    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [chemicalOptions, setChemicalOptions] = useState([]);

    const [mounted, setMounted] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [inputError, setInputError] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverRowId, setPopoverRowId] = useState(null);
    const [refreshRecord, setRefreshRecord] = useState(false);

    async function PurchaseListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/operation/purchase/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setPurchaseList(data.data);
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

    async function PurchaseRecordUpdate() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/operation/purchase/update/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setEditRowId(null);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    async function PurchaseRecordDelete(prid) {
        const apiData = {"user": uid, "prid": prid}
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/operation/purchase/delete/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsDelete(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const createRowData = (record) => {
        const chemical = chemicalList.find(item => item.chemid === record.chemical);

        return {
            "id": record.prid,
            "chemical": chemical.epa_reg_no,
            "trade_name": chemical.trade_name,
            "active_ingredient": chemical.active_ingredient,
            "percent_ai": chemical.percent_ai,
            "rei": chemical.rei,
            "phi": chemical.phi,
            "unit": chemical.unit,
            "amount": record.amount,
            "cost_per_unit": record.cost_per_unit,
            "total_cost": record.total_cost,
            "pur_datetime": record.pur_datetime,
            "operator": record.operator,
            "vendor": record.vendor,
        };
    }

    const clearInputError = () => {
        setInputError(Object.fromEntries(field_names.map(item => [item, false])));
    }

    const updateInputError = () => {
        Object.keys(fieldValues).forEach(key => {
            if (fieldValues[key] === "") {
                setInputError((prevInputError) => ({
                    ...prevInputError,
                    [key]: true
                }));
            } else {
                setInputError((prevInputError) => ({
                    ...prevInputError,
                    [key]: false
                }));
            }
        });
    }

    const onSaveClicked = () => {
        if (Object.values(fieldValues).every(value => value !== "")) {
            CropRecordUpdate();
            const index = rows.findIndex(item => item.id === fieldValues.id);
            setRows([
                ...rows.slice(0, index),
                fieldValues,
                ...rows.slice(index + 1),
            ]);
        } else {
            updateInputError();
        }
    };

    const onCancelClicked = () => {
        setEditRowId(null);
        clearInputError();
    }

    const onEditClicked = (params) => {
        setFormData({"prid": params.id});
        setFieldValues(params.row);
        setEditRowId(params.id);
        clearInputError();
    };

    const onDeleteClicked = (params) => {
        PurchaseRecordDelete(params.id);
        const index = rows.findIndex(item => item.id === params.id);
        setRows([
            ...rows.slice(0, index),
            ...rows.slice(index + 1),
        ]);
    };

    const onAddClicked = () => {
        setFormData({"user_id": uid,});
        setFieldValues(Object.fromEntries(field_names.map(item => [item, ""])));
        setEditRowId(null);
        setShowAddModal(true);
        clearInputError();
    };

    const ChemicalOptionsFresh = () => {
        setChemicalOptions(chemicalList.map(item => ({
            label: item.epa_reg_no,
            trade_name: item.trade_name,
            active_ingredient: item.active_ingredient,
            percent_ai: item.percent_ai,
            rei: item.rei,
            phi: item.phi,
            unit: item.unit,
            id: item.chemid,
        })))
    };

    const handleInputChange = (event, value, field) => {
        if (field === field_names[0]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
                ["trade_name"]: value.trade_name,
                ["active_ingredient"]: value.active_ingredient,
                ["percent_ai"]: value.percent_ai,
                ["rei"]: value.rei,
                ["phi"]: value.phi,
                ["unit"]: value.unit,
            });
            setFormData({
                ...formData,
                [field]: value.id,
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
                            <IconButton onClick={() => onCancelClicked()}>
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
        },
        {
            field: 'crop',
            headerName: 'Crop',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={cropCategoryOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[0]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[0]);
                    }}
                    renderInput={(params) => {
                        return (
                            editRowId !== rowID ?
                                <TextField {...params} variant="standard"
                                           InputProps={{disableUnderline: true}}
                                           sx={{width: columnWidth}}/> :
                                <TextField {...params} variant="standard" error={inputError[field_names[0]]}
                                           sx={{width: editWidth}}
                                />
                        )
                    }}
                />),
        },
        {
            field: 'variety',
            headerName: 'Variety',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={cropVarietyOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[1]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[1]);
                    }}
                    renderInput={(params) => {
                        return (
                            editRowId !== rowID ?
                                <TextField {...params} variant="standard"
                                           InputProps={{disableUnderline: true}}
                                           sx={{width: columnWidth}}/> :
                                <TextField {...params} variant="standard" sx={{width: editWidth}}
                                           error={inputError[field_names[1]]}/>
                        )
                    }}
                />),
        },
        {
            field: 'crop_code',
            headerName: 'Crop Code',
            sortable: false,
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[2]] : params.value)
            },
        },
        {
            field: 'category',
            headerName: 'Category',
            sortable: false,
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[3]] : params.value)
            },
        },
        {
            field: 'growth_stage',
            headerName: 'Growth Stage',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={cropGrowthStageOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[4]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[4]);
                    }}
                    renderInput={(params) => {
                        return (
                            editRowId !== rowID ?
                                <TextField {...params} variant="standard"
                                           InputProps={{disableUnderline: true}}
                                           sx={{width: columnWidth}}/> :
                                <TextField {...params} variant="standard" sx={{width: editWidth}}
                                           error={inputError[field_names[4]]}/>
                        )
                    }}
                />),
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
        chemicalOptions,
        handleInputChange,
        showAddModal,
        setShowAddModal,
        setIsSave,
        inputError,
        updateInputError,
        refreshRecord,
        setRefreshRecord,
    };

    const saveProps = {
        open: isSave,
        setOpen: setIsSave,
        msg: "Purchase record is uploaded successfully!",
        tag: "success"
    };

    const deleteProps = {
        open: isDelete,
        setOpen: setIsDelete,
        msg: "Purchase record has been deleted!",
        tag: "success"
    };

    useEffect(() => {
        ChemicalListGet();
        PurchaseListGet();
        clearInputError();
        setMounted(true);
    }, []);

    useEffect(() => {
        CropCategoryOptionsFresh();
    }, [cropCategory]);

    useEffect(() => {
        CropVarietyOptionsFresh(formData.crop);
        CropGrowthStageOptionsFresh(formData.crop);
    }, [formData.crop]);

    useEffect(() => {
        CropListGet(uid);
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
        <AddPurchaseRecord {...addProps}/>
        <OperationSnackbars  {...saveProps}/>
        <OperationSnackbars  {...deleteProps}/>
    </div>);
}