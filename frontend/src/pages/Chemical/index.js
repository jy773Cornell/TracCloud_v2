import * as React from 'react';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    Autocomplete,
    Button,
    Card,
    CardContent,
    Grid,
    InputAdornment,
    Modal,
    Popover,
    TextField,
    Typography
} from "@mui/material";
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
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import ConfirmPopover from "../../components/ConfirmPopover";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {getCookie} from "../../utils";

const columnWidth = 200;
const editWidth = 180;

const field_names = [
    "trade_name",
    "epa_reg_no",
    "unit",
    "restricted_use",
    "active_ingredient",
    "percent_ai",
    "rei",
    "phi",
    "type",
    "company",
    "labeled_crops",
    "label_image",
]

function createAPIData(data) {
    const {unit: unit_id, ...rest} = data;
    return {unit_id, ...rest};
}

function createRowData(record) {
    for (let key in record) {
        if (record[key] === null) {
            record[key] = "";
        }
    }

    return {
        "id": record.chemid,
        "trade_name": record.trade_name,
        "epa_reg_no": record.epa_reg_no,
        "unit": record.unit,
        "restricted_use": record.restricted_use,
        "active_ingredient": record.active_ingredient,
        "percent_ai": record.percent_ai,
        "rei": record.rei,
        "phi": record.phi,
        "type": record.type,
        "company": record.company,
        "labeled_crops": record.labeled_crops,
        "label_image": record.label_image,
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
                               unitOptions,
                               chemicalProductBaseOptions,
                               handleInputChange,
                               handleEPANOChange,
                               showAddModal,
                               setShowAddModal,
                               setIsSave,
                               inputError,
                               updateInputError,
                               refreshRecord,
                               setRefreshRecord,
                           }) {

    async function ChemicalRecordSave() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
        };
        await fetch("/api/chemical/create/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setShowAddModal(false);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const handleSaveButtonPressed = () => {
        if (Object.keys(fieldValues)
            .filter(key => field_names.slice(0, 10).includes(key))
            .filter(key => fieldValues[key] === "").length === 0) {
            ChemicalRecordSave();
        } else {
            updateInputError();
        }
    };

    return (
        <Modal
            open={showAddModal}
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
        >
            <Card sx={{width: 1000}}>
                <CardContent>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <h1>Add Chemical Record</h1>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={fieldValues[field_names[0]]}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    readOnly: true,
                                }}
                                variant="outlined"
                                label={columns[1].headerName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete
                                value={fieldValues[field_names[1]]}
                                options={chemicalProductBaseOptions}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[1]);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        variant="outlined"
                                        fullWidth
                                        label={columns[2].headerName}
                                        error={inputError[field_names[1]]}
                                        onChange={(event) => {
                                            handleEPANOChange(event);
                                        }}
                                    />)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete
                                value={fieldValues[field_names[2]]}
                                options={unitOptions}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[2]);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        variant="outlined"
                                        fullWidth
                                        label={columns[3].headerName}
                                        error={inputError[field_names[2]]}/>)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={fieldValues[field_names[3]]}
                                InputLabelProps={{
                                    shrink: true,
                                    readOnly: true,
                                }}
                                variant="outlined"
                                fullWidth
                                label={columns[4].headerName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={fieldValues[field_names[4]]}
                                InputLabelProps={{
                                    shrink: true,
                                    readOnly: true,
                                }}
                                variant="outlined"
                                fullWidth
                                label={columns[5].headerName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={fieldValues[field_names[5]]}
                                InputLabelProps={{
                                    shrink: true,
                                    readOnly: true,
                                }}
                                variant="outlined"
                                fullWidth
                                label={columns[6].headerName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                error={inputError[field_names[6]]}
                                required
                                variant="outlined"
                                fullWidth
                                type="number"
                                inputProps={{
                                    step: 0.1,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment
                                        position="end">hours</InputAdornment>,
                                }}
                                label={columns[7].headerName}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[6]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                error={inputError[field_names[7]]}
                                required
                                variant="outlined"
                                fullWidth
                                type="number"
                                inputProps={{
                                    step: 0.1,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment
                                        position="end">days</InputAdornment>,
                                }}
                                label={columns[8].headerName}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[7]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={fieldValues[field_names[8]]}
                                InputLabelProps={{
                                    shrink: true,
                                    readOnly: true,
                                }}
                                variant="outlined"
                                fullWidth
                                label={columns[9].headerName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                value={fieldValues[field_names[9]]}
                                InputLabelProps={{
                                    shrink: true,
                                    readOnly: true,
                                }}
                                variant="outlined"
                                fullWidth
                                label={columns[10].headerName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label={columns[11].headerName}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[10]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label={columns[12].headerName}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[11]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                            <Button variant="contained" color="secondary" onClick={() => setShowAddModal(false)}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                            <Button variant="contained" color="success" onClick={() => handleSaveButtonPressed()}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Modal>
    );
}

export default function Chemical(props) {
    const uid = props.uid;
    const employerID = props.employerID;
    const privilege = props.privilege;

    const [unit, setUnit] = useState([]);
    const [chemicalProductBase, setChemicalProductBase] = useState([]);

    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [unitOptions, setUnitOptions] = useState([]);
    const [chemicalProductBaseOptions, setChemicalProductBaseOptions] = useState([]);

    const [mounted, setMounted] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [inputError, setInputError] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverRowId, setPopoverRowId] = useState(null);
    const [refreshRecord, setRefreshRecord] = useState(false);

    async function ChemicalListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        if (privilege.chem_r) {
            await fetch("/api/chemical/list/get/" + "?uid=" + uid, requestOptions)
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
    }

    async function UnitGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/unit/?usage=chemical", requestOptions)
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
        await fetch("/api/chemical/productbase/" + "?reg_no=" + reg_no, requestOptions)
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
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
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
        const apiData = {"user": employerID, "chemid": chemid}
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
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
        if (Object.values(fieldValues).slice(0, 10).every(value => value !== "")) {
            ChemicalRecordUpdate();
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
        const unit = unitOptions.find(item => item.label === params.row.unit);
        setFormData({"chemid": params.id, "unit": unit.id});
        setFieldValues(params.row);
        setEditRowId(params.id);
        clearInputError();
    };

    const onDeleteClicked = (params) => {
        ChemicalRecordDelete(params.id);
        const index = rows.findIndex(item => item.id === params.id);
        setRows([
            ...rows.slice(0, index),
            ...rows.slice(index + 1),
        ]);
    };

    const onAddClicked = () => {
        setFormData({"user_id": employerID,});
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
            label: item.epa_reg_no_dec,
            id: item.chempbid,
            ...item,
        })));
    };

    const handleInputChange = (event, value, field) => {
        if (field === field_names[1]) {
            setFieldValues({
                ...fieldValues,
                [field]: value.label,
                [field_names[0]]: value.product_name_dec,
                [field_names[3]]: value.restricted_use_dec,
                [field_names[4]]: value.pc_name_dec,
                [field_names[5]]: value.pc_pt_dec,
                [field_names[8]]: value.product_type_dec,
                [field_names[9]]: value.company_name_dec,
            });
            setFormData({
                ...formData,
                [field]: value.label,
                [field_names[0]]: value.product_name_dec,
                [field_names[3]]: value.restricted_use_dec,
                [field_names[4]]: value.pc_name_dec,
                [field_names[5]]: value.pc_pt_dec,
                [field_names[8]]: value.product_type_dec,
                [field_names[9]]: value.company_name_dec,
            });
        } else if (field === field_names[2]) {
            setFieldValues({...fieldValues, [field]: value.label});
            setFormData({...formData, [field]: value.id});
        } else {
            setFieldValues({...fieldValues, [field]: value});
            setFormData({...formData, [field]: value});
        }
    };

    const handleEPANOChange = (event) => {
        if (event.target.value.length >= 4) {
            ChemicalProductBaseGet(event.target.value);
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
                        <IconButton
                            onClick={() => onEditClicked(params)}
                            disabled={!privilege.chem_u}
                        >
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                                setPopoverRowId(params.id);
                            }}
                            disabled={!privilege.chem_d}
                        >
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
                            <IconButton onClick={() => onCancelClicked()}>
                                < CancelIcon/>
                            </IconButton>
                            <IconButton onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                                setPopoverRowId(params.id);
                            }}>
                                <SaveIcon/>
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
            field: 'trade_name',
            headerName: 'Trade Name',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[0]] : params.value)
            },
        },
        {
            field: 'epa_reg_no',
            headerName: 'EPA REG NO.',
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={chemicalProductBaseOptions}
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
                                <TextField {...params} variant="standard" error={inputError[field_names[1]]}
                                           sx={{width: editWidth}}
                                           onChange={(event) => {
                                               handleEPANOChange(event);
                                           }}
                                />
                        )
                    }}
                />),
        },
        {
            field: 'unit',
            headerName: 'Applied Unit',
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={unitOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[2]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[2]);
                    }}
                    renderInput={(params) => {
                        return (
                            editRowId !== rowID ?
                                <TextField {...params} variant="standard"
                                           InputProps={{disableUnderline: true}}
                                           sx={{width: columnWidth}}/> :
                                <TextField {...params} variant="standard" error={inputError[field_names[2]]}
                                           sx={{width: editWidth}}
                                />
                        )
                    }}
                />),
        },
        {
            field: 'restricted_use',
            headerName: 'Restricted Use',
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
            headerName: '% A.I.',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[5]] : params.value)
            },
        },
        {
            field: 'rei',
            headerName: 'REI-Hrs',
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (
                    editRowId !== rowID ?
                        <TextField
                            variant="standard"
                            value={params.value}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                            }}
                            sx={{width: columnWidth}}/> :
                        <TextField
                            variant="standard"
                            value={fieldValues[field_names[6]]}
                            error={inputError[field_names[6]]}
                            sx={{width: editWidth}}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[6]);
                            }}
                        />
                )
            },
        },
        {
            field: 'phi',
            headerName: 'PHI-Days',
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (
                    editRowId !== rowID ?
                        <TextField
                            variant="standard"
                            value={params.value}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                            }}
                            sx={{width: columnWidth}}/> :
                        <TextField
                            variant="standard"
                            value={fieldValues[field_names[7]]}
                            error={inputError[field_names[7]]}
                            sx={{width: editWidth}}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[7]);
                            }}
                        />
                )
            },
        },
        {
            field: 'type',
            headerName: 'Product Type',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[8]] : params.value)
            },
        },
        {
            field: 'company',
            headerName: 'Company',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[9]] : params.value)
            },
        },
        {
            field: 'labeled_crops',
            headerName: 'Labeled Crops',
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (
                    editRowId !== rowID ?
                        <TextField
                            variant="standard"
                            value={params.value}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                            }}
                            sx={{width: columnWidth}}/> :
                        <TextField
                            variant="standard"
                            value={fieldValues[field_names[10]]}
                            sx={{width: editWidth}}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[10]);
                            }}
                        />
                )
            },
        },
        {
            field: 'label_image',
            headerName: 'Labeled Image',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (
                    editRowId !== rowID ?
                        <TextField
                            variant="standard"
                            value={params.value}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                            }}
                            sx={{width: columnWidth}}/> :
                        <TextField
                            variant="standard"
                            value={fieldValues[field_names[11]]}
                            sx={{width: editWidth}}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[11]);
                            }}
                        />
                )
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
        unitOptions,
        chemicalProductBaseOptions,
        handleInputChange,
        handleEPANOChange,
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
        msg: "Chemical record is uploaded successfully!",
        tag: "success"
    };

    const deleteProps = {
        open: isDelete,
        setOpen: setIsDelete,
        msg: "Chemical record has been deleted!",
        tag: "success"
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([UnitGet(), ChemicalListGet(employerID)]);
        };

        fetchData();
        clearInputError();
        setMounted(true);
    }, []);

    useEffect(() => {
        UnitOptionsFresh();
    }, [unit]);

    useEffect(() => {
        chemicalProductBaseOptionsFresh();
    }, [chemicalProductBase]);

    useEffect(() => {
        if (mounted) {
            ChemicalListGet(employerID);
        }
    }, [refreshRecord]);

    return (
        <div>
            <AddButton
                variant="contained"
                startIcon={<AddIcon/>}
                onClick={() => onAddClicked()}
                disabled={!privilege.chem_c}
            >
                Add Chemical
            </AddButton>
            <Paper style={{height: 900, margin: '0px 15px', width: 'calc(100% - 30px)', overflow: 'auto'}}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    disableRowSelectionOnClick={true}
                    disableClickEdit={true}
                    rowSelection={false}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    localeText={{noRowsLabel: privilege.chem_r ? "No rows" : "You don't have the privilege to access this data"}}
                />
            </Paper>
            <AddChemicalRecord {...addProps}/>
            <OperationSnackbars  {...saveProps}/>
            <OperationSnackbars  {...deleteProps}/>
        </div>
    );
}