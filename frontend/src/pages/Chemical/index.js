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
    "epa_reg_no",
    "trade_name",
    "restricted_use",
    "company",
    "active_ingredient",
    "percent_ai",
    "type",
    "unit",
    "rei",
    "phi",
    "labeled_crops",
    "label_image",
    "imported_from",
    "validated_by",
    "entered_year",
]

function createAPIData(data) {
    const {unit: unit_id, ...rest} = data;
    return {unit_id, ...rest};
}

function createRowData(record) {
    return {
        "id": record.chemid,
        "epa_reg_no": record.epa_reg_no,
        "trade_name": record.trade_name,
        "restricted_use": record.restricted_use,
        "company": record.company,
        "active_ingredient": record.active_ingredient,
        "percent_ai": record.percent_ai,
        "type": record.type,
        "unit": record.unit,
        "rei": record.rei,
        "phi": record.phi,
        "labeled_crops": record.labeled_crops,
        "label_image": record.label_image,
        "imported_from": record.imported_from,
        "validated_by": record.validated_by,
        "entered_year": record.entered_year,
        "update_time": record.update_time,
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

function AddChemicalRecord({
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

    return (
        <Modal
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
        </Modal>
    );
}

export default function Chemical(props) {
    const [unit, setUnit] = useState([]);
    const [chemicalProductBase, setChemicalProductBase] = useState([]);

    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [unitOptions, setUnitOptions] = useState([]);
    const [chemicalProductBaseOptions, setChemicalProductBaseOptions] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [inputError, setInputError] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverRowId, setPopoverRowId] = useState(null);
    const [refreshRecord, setRefreshRecord] = useState(false);

    async function ChemicalListGet(props) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/chemical/list/get/" + "?uid=" + props.uid, requestOptions)
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

    async function ChemicalProductBaseGet(reg_no) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/chemical/product_base/" + "?reg_no=" + reg_no, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setChemicalProductBase(data.data);
                    })
                }
            })
    }


    async function ChemicalRecordUpdate() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/chemical/update/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setEditRowId(null);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    async function ChemicalRecordDelete(chemid) {
        const apiData = {"user": props.uid, "chemid": chemid}
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/chemical/delete/", requestOptions)
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
        const crop = cropCategoryOptions.find(item => item.label === params.row.crop);
        setFormData({"cid": params.id, "crop": crop.id});
        setFieldValues(params.row);
        setEditRowId(params.id);
        clearInputError();
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
        clearInputError();
    };

    const UnitOptionsFresh = () => {
        setUnitOptions(unit.map(item => ({
            label: item.name, id: item.unitid,
        })));
    };

    const chemicalProductBaseOptionsFresh = () => {
        setChemicalProductBaseOptions(chemicalProductBase.map(item => ({
            label: item.epa_reg_no_dec, id: item.chempbid, ...rest,
        })));
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
        }
    };

    const handleEPANOChange = (event, value) => {
        if (value.length >= 4) {
            ChemicalProductBaseGet(value);
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: columnWidth
        },
        {
            field: 'epa_reg_no',
            headerName: 'EAP REG NO.',
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={chemicalProductBaseOptions}
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
                                           onChange={(event, value) => {
                                               handleEPANOChange(event, value);
                                           }}
                                />
                        )
                    }}
                />),
        },
        {
            field: 'trade_name',
            headerName: 'Trade Name',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[1]] : params.value)
            },
        },
        {
            field: 'restricted_use',
            headerName: 'Restricted Use',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[2]] : params.value)
            },
        },
        {
            field: 'company',
            headerName: 'Company',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[3]] : params.value)
            },
        },
        {
            field: 'active_ingredient',
            headerName: 'Active Ingredient',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[4]] : params.value)
            },
        },
        {
            field: 'percent_ai',
            headerName: 'Active Ingredient Percent',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[5]] : params.value)
            },
        },
        {
            field: 'type',
            headerName: 'Product Type',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[6]] : params.value)
            },
        },
        {
            field: 'unit',
            headerName: 'Application Unit',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[7]] : params.value)
            },
        },
        {
            field: 'rei',
            headerName: 'REI',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[8]] : params.value)
            },
        },
        {
            field: 'phi',
            headerName: 'PHI',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[9]] : params.value)
            },
        },
        {
            field: 'labeled_crops',
            headerName: 'Labeled Crops',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[10]] : params.value)
            },
        },
        {
            field: 'label_image',
            headerName: 'Labeled Image',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[11]] : params.value)
            },
        },
        {
            field: 'imported_from',
            headerName: 'Imported From',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[12]] : params.value)
            },
        },
        {
            field: 'validated_by',
            headerName: 'Validated By',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[13]] : params.value)
            },
        },
        {
            field: 'entered_year',
            headerName: 'Entered Year',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[14]] : params.value)
            },
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
        },];

    const addProps = {
        fieldValues,
        formData,
        columns,
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
        ChemicalListGet();
        UnitGet();
        clearInputError();
    }, []);

    useEffect(() => {
        UnitOptionsFresh();
    }, [unit]);

    useEffect(() => {
        chemicalProductBaseOptionsFresh();
    }, [chemicalProductBase]);

    useEffect(() => {
        CropVarietyOptionsFresh(formData.crop);
        CropGrowthStageOptionsFresh(formData.crop);
    }, [formData.crop]);

    useEffect(() => {
        ChemicalListGet(props);
    }, [refreshRecord]);

    return (<div>
        <AddButton
            variant="contained"
            startIcon={<AddIcon/>}
            onClick={() => onAddClicked()}>
            Add Chemical
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
        <AddChemicalRecord {...addProps}/>
        <OperationSnackbars  {...saveProps}/>
        <OperationSnackbars  {...deleteProps}/>
    </div>);
}