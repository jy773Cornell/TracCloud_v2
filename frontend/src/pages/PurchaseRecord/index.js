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
import ConfirmPopover from "../../components/ConfirmPopover";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const columnWidth = 200;
const columnMidWidth = 250;

const field_names = [
    "chemical",
    "cost_per_unit",
    "amount",
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
                               addChemicalOptions,
                               handleInputChange,
                               showAddModal,
                               setShowAddModal,
                               setIsSave,
                               inputError,
                               updateInputError,
                               refreshRecord,
                               setRefreshRecord,
                           }) {

    async function PurchaseRecordSave() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/operation/purchase/create/", requestOptions)
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
            PurchaseRecordSave();
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
            <Card sx={{width: 800}}>
                <CardContent>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <h1>Add Chemical Purchase Record</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                value={fieldValues[field_names[0]]}
                                options={addChemicalOptions}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[0]);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} required
                                               variant="outlined"
                                               placeholder={"EPA NO.  |  Trade Name  |  Active Ingredient  |  REI  |  PHI  |  Application Unit"}
                                               label={"Chemical"}
                                               error={inputError[field_names[0]]}/>)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                type="number"
                                inputProps={{
                                    step: 0.01,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    endAdornment:
                                        <InputAdornment
                                            position="end">{`per ${fieldValues["unit"]}`}
                                        </InputAdornment>,
                                }}
                                label={columns[8].headerName}
                                error={inputError[field_names[1]]}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[1]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                type="number"
                                inputProps={{
                                    step: 0.01,
                                }}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment
                                            position="end">{`${fieldValues["unit"]}`}
                                        </InputAdornment>,
                                }}
                                label={columns[9].headerName}
                                error={inputError[field_names[2]]}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[2]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={fieldValues[field_names[3]]}
                                label={columns[10].headerName}
                                InputLabelProps={{
                                    shrink: true,
                                    readOnly: true,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    variant="outlined"
                                    label={columns[11].headerName}
                                    value={dayjs(fieldValues[field_names[4]])}
                                    onChange={(event) => {
                                        handleInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[4]);
                                    }}
                                    sx={{width: '100%'}}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                label={columns[12].headerName}
                                error={inputError[field_names[5]]}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[5]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                label={columns[13].headerName}
                                error={inputError[field_names[6]]}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[6]);
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
        </Modal>
    );
}

export default function PurchaseRecord(props) {
    const uid = props.uid;
    const [purchaseList, setPurchaseList] = useState([]);
    const [chemicalList, setChemicalList] = useState([]);

    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [addChemicalOptions, setAddChemicalOptions] = useState([]);
    const [editChemicalOptions, setEditChemicalOptions] = useState([]);

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

    const extractDecimal = (str) => {
        if (typeof str !== 'string') {
            return null;
        }
        const match = str.match(/(\d+\.\d+)|(\d+)/);
        if (match) {
            return match[0];
        } else {
            return null;
        }
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
            "cost_per_unit": `\$${record.cost_per_unit} per ${chemical.unit}`,
            "amount": `${record.amount} ${chemical.unit}`,
            "total_cost": `\$${record.total_cost}`,
            "pur_datetime": record.pur_datetime,
            "operator": record.operator,
            "vendor": record.vendor,
            "update_time": record.update_time,
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
            PurchaseRecordUpdate();
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
        setFormData({
            "user_id": uid,
            [field_names[4]]: dayjs().format('YYYY-MM-DD'),
        });
        setFieldValues(Object.fromEntries(field_names.map((item, index) =>
            [item, index === 4 ? dayjs().format('YYYY-MM-DD') : ""])));
        setFieldValues(prevState => ({
            ...prevState,
            unit: ""
        }));

        setEditRowId(null);
        setShowAddModal(true);
        clearInputError();
    };

    const ChemicalOptionsFresh = () => {
        setAddChemicalOptions(chemicalList.map(item => ({
            label: `${item.epa_reg_no}  |  ${item.trade_name}  |  ${item.active_ingredient}  |  ${item.rei}  |  ${item.phi}  |  ${item.unit}`,
            trade_name: item.trade_name,
            active_ingredient: item.active_ingredient,
            percent_ai: item.percent_ai,
            rei: item.rei,
            phi: item.phi,
            unit: item.unit,
            id: item.chemid,
        })))

        setEditChemicalOptions(chemicalList.map(item => ({
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
            field: 'chemical',
            headerName: 'EPA Registration No.',
            sortable: false,
            width: columnMidWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={editChemicalOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[0]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[0]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ?
                            <TextField
                                {...params} variant="standard"
                                InputProps={{disableUnderline: true}}
                                sx={{width: columnMidWidth}}/> :
                            <TextField
                                {...params} variant="standard"
                                sx={{width: columnMidWidth - 20}}
                                error={inputError[field_names[0]]}/>)
                    }}
                />),
        },
        {
            field: 'trade_name',
            headerName: 'Trade Name',
            sortable: false,
            width: columnMidWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['trade_name'] : params.value)
            },
        },
        {
            field: 'active_ingredient',
            headerName: 'Active Ingredient',
            sortable: false,
            width: columnMidWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['active_ingredient'] : params.value)
            },
        },
        {
            field: 'percent_ai',
            headerName: 'Active Ingredient Percent',
            sortable: false,
            width: columnMidWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['percent_ai'] : params.value)
            },
        },
        {
            field: 'rei',
            headerName: 'REI',
            sortable: false,
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['rei'] : params.value)
            },
        },
        {
            field: 'phi',
            headerName: 'PHI',
            sortable: false,
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['phi'] : params.value)
            },
        },
        {
            field: 'unit',
            headerName: 'Unit',
            sortable: false,
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['unit'] : params.value)
            },
        },
        {
            field: 'cost_per_unit',
            headerName: 'Cost Per Unit',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ?
                        <TextField
                            variant="standard"
                            value={params.value}
                            InputProps={{
                                disableUnderline: true, readOnly: true,
                            }}
                            sx={{width: columnWidth}}/> :
                        <>
                            <TextField
                                variant="standard"
                                value={extractDecimal(fieldValues[field_names[1]])}
                                type="number"
                                inputProps={{
                                    step: 0.01,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                sx={{width: columnWidth / 2}}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[1]);
                                }}
                                error={inputError[field_names[1]]}
                            />
                            <TextField
                                variant="standard"
                                value={`per ${fieldValues["unit"]}`}
                                sx={{width: columnWidth / 2}}
                                InputLabelProps={{
                                    readOnly: true,
                                }}
                            />
                        </>
                )
            },
        },
        {
            field: 'amount',
            headerName: 'Amount',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ?
                        <TextField
                            variant="standard"
                            value={params.value}
                            InputProps={{
                                disableUnderline: true, readOnly: true,
                            }}
                            sx={{width: columnWidth}}/> :
                        <>
                            <TextField
                                variant="standard"
                                value={extractDecimal(fieldValues[field_names[2]])}
                                type="number"
                                inputProps={{
                                    step: 0.01,
                                }}
                                sx={{width: columnWidth / 2}}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[2]);
                                }}
                                error={inputError[field_names[2]]}
                            />
                            <TextField
                                variant="standard"
                                value={`${fieldValues["unit"]}`}
                                sx={{width: columnWidth / 2}}
                                InputLabelProps={{
                                    readOnly: true,
                                }}
                            />
                        </>
                )
            },
        },
        {
            field: 'total_cost',
            headerName: 'Total Cost',
            sortable: false,
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? `\$${fieldValues[field_names[3]]}` : params.value)
            },
        },
        {
            field: 'pur_datetime',
            headerName: 'Purchase Datetime',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ?
                    <TextField
                        variant="standard"
                        value={params.value}
                        InputProps={{
                            disableUnderline: true, readOnly: true,
                        }}
                        sx={{width: columnWidth}}/> :
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            variant="standard"
                            value={dayjs(fieldValues[field_names[4]])}
                            sx={{width: columnWidth}}
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                },
                            }}
                            onChange={(event) => {
                                handleInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[4]);
                            }}/>
                    </LocalizationProvider>)
            },
        },
        {
            field: 'operator',
            headerName: 'Operator',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ?
                    <TextField
                        variant="standard"
                        value={params.value}
                        InputProps={{
                            disableUnderline: true, readOnly: true,
                        }}
                        sx={{width: columnWidth}}/> :
                    <TextField
                        variant="standard"
                        value={fieldValues[field_names[5]]}
                        sx={{width: columnWidth}}
                        onChange={(event) => {
                            handleInputChange(event, event.target.value, field_names[5]);
                        }}
                        error={inputError[field_names[5]]}
                    />)
            },
        },
        {
            field: 'vendor',
            headerName: 'Vendor',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ?
                    <TextField
                        variant="standard"
                        value={params.value}
                        InputProps={{
                            disableUnderline: true, readOnly: true,
                        }}
                        sx={{width: columnWidth}}/> :
                    <TextField
                        variant="standard"
                        value={fieldValues[field_names[6]]}
                        sx={{width: columnWidth}}
                        onChange={(event) => {
                            handleInputChange(event, event.target.value, field_names[6]);
                        }}
                        error={inputError[field_names[6]]}
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
        addChemicalOptions,
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
        const fetchData = async () => {
            await ChemicalListGet(uid);
            await PurchaseListGet(uid);
        };

        fetchData();
        clearInputError();
        setMounted(true);
    }, []);

    useEffect(() => {
        ChemicalOptionsFresh();
    }, [chemicalList]);

    useEffect(() => {
        setRows(purchaseList.map((record) => createRowData(record)));
    }, [purchaseList]);

    useEffect(() => {
        if (mounted) {
            PurchaseListGet(uid);
        }
    }, [refreshRecord]);

    useEffect(() => {
        const cost_per_unit = extractDecimal(fieldValues[field_names[1]]);
        const amount = extractDecimal(fieldValues[field_names[2]]);
        if (cost_per_unit && amount) {
            const total_cost = Number(cost_per_unit) * Number(amount);
            setFieldValues({...fieldValues, [field_names[3]]: total_cost});
            setFormData({...formData, [field_names[3]]: total_cost});
        }
    }, [fieldValues[field_names[1]], fieldValues[field_names[2]]]);

    return (<div>
        <AddButton
            variant="contained"
            startIcon={<AddIcon/>}
            onClick={() => onAddClicked()}>
            Add Purchase Record
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