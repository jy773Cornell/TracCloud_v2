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
import {getCookie} from "../../utils";

const columnWidth = 200;
const columnMidWidth = 250;
const columnLongWidth = 300;

const field_names = [
    "pur_datetime",
    "amount",
    "total_cost",
    "cost_per_unit",
    "chemical",
    "note"
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
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
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
        if (Object.values(fieldValues).slice(0, 4).every(value => value !== "")) {
            PurchaseRecordSave();
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
            <Card sx={{width: 800}}>
                <CardContent>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <h1>Add Chemical Purchase Record</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                value={fieldValues[field_names[4]]}
                                options={addChemicalOptions || []}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[4]);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                               required
                                               variant="outlined"
                                               placeholder={"EPA NO.  |  Trade Name  |  Active Ingredient  |  REI  |  PHI  |  Applied Unit"}
                                               label={"Chemical"}
                                               error={inputError[field_names[4]]}/>)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    variant="outlined"
                                    label={columns[1].headerName}
                                    value={dayjs(fieldValues[field_names[0]])}
                                    onChange={(event) => {
                                        handleInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[0]);
                                    }}
                                    sx={{width: '100%'}}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
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
                                label={columns[3].headerName}
                                error={inputError[field_names[1]]}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[1]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                label={columns[4].headerName}
                                type="number"
                                inputProps={{
                                    step: 0.01,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                error={inputError[field_names[2]]}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[2]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={fieldValues[field_names[3]]}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                    readOnly: true,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    endAdornment:
                                        <InputAdornment
                                            position="end">{`per ${fieldValues["unit"]}`}
                                        </InputAdornment>,
                                }}
                                label={columns[5].headerName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                multiline
                                fullWidth
                                label={columns[11].headerName}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[5]);
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

export default function PurchaseRecord(props) {
    const uid = props.uid;
    const privilege = props.privilege;

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
        if (privilege.purchase_r) {
            await fetch("/api/operation/purchase/list/get/" + "?uid=" + uid, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            setPurchaseList(data.data);
                        })
                    }
                })
        }
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
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
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
        const apiData = {"user_id": uid, "prid": prid}
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
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
        for (let key in record) {
            if (record[key] === null) {
                record[key] = "";
            }
        }

        const chemical = chemicalList.find(item => item.chemid === record.chemical);

        return {
            "id": record.prid,
            "pur_datetime": record.pur_datetime,
            "trade_name": chemical.trade_name,
            "amount": `${record.amount} ${chemical.unit}`,
            "total_cost": `\$${record.total_cost}`,
            "cost_per_unit": `\$${record.cost_per_unit} per ${chemical.unit}`,
            "chemical": chemical.epa_reg_no,
            "active_ingredient": chemical.active_ingredient,
            "rei": chemical.rei,
            "phi": chemical.phi,
            "company": chemical.company,
            "unit": chemical.unit,
            "note": record.note,
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
        if (Object.entries(fieldValues).every(([key, value]) => key === field_names[5] ? true : value !== "")) {
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
            [field_names[0]]: dayjs().format('YYYY-MM-DD'),
        });
        setFieldValues(Object.fromEntries(field_names.map((item, index) =>
            [item, index === 0 ? dayjs().format('YYYY-MM-DD') : ""])));
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
            label: `${item.epa_reg_no}  |  ${item.trade_name}  |  ${item.active_ingredient}  |  ${item.rei} hours  |  ${item.phi} days  |  ${item.unit}`,
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
        if (field === field_names[4]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
                ["trade_name"]: value.trade_name,
                ["active_ingredient"]: value.active_ingredient,
                ["rei"]: value.rei,
                ["phi"]: value.phi,
                ["company"]: value.company,
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
                    return (
                        <>
                            <IconButton
                                onClick={() => onEditClicked(params)}
                                disabled={!privilege.purchase_u}
                            >
                                <EditIcon/>
                            </IconButton>
                            <IconButton
                                onClick={(event) => {
                                    setAnchorEl(event.currentTarget);
                                    setPopoverRowId(params.id);
                                }}
                                disabled={!privilege.purchase_d}
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
                        </>
                    );
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
            field: 'pur_datetime',
            headerName: 'Date Purchased',
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
                            value={dayjs(fieldValues[field_names[0]])}
                            sx={{width: columnWidth}}
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                },
                            }}
                            onChange={(event) => {
                                handleInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[0]);
                            }}/>
                    </LocalizationProvider>)
            },
        },
        {
            field: 'trade_name',
            headerName: 'Trade Name',
            width: columnMidWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['trade_name'] : params.value)
            },
        },
        {
            field: 'amount',
            headerName: 'Amount Purchased',
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
                                sx={{width: columnWidth / 2}}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[1]);
                                }}
                                error={inputError[field_names[1]]}
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
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                sx={{width: columnWidth}}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[2]);
                                }}
                                error={inputError[field_names[2]]}
                            />
                        </>
                )
            },
        },
        {
            field: 'cost_per_unit',
            headerName: 'Cost Per Applied Unit',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? `${fieldValues[field_names[3]]} per ${fieldValues["unit"]}` : params.value)
            },
        },
        {
            field: 'chemical',
            headerName: 'EPA REG NO.',
            width: columnMidWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={editChemicalOptions || []}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[4]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[4]);
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
                                error={inputError[field_names[4]]}/>)
                    }}
                />),
        },
        {
            field: 'active_ingredient',
            headerName: 'Active Ingredient',
            width: columnMidWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['active_ingredient'] : params.value)
            },
        },
        {
            field: 'rei',
            headerName: 'REI-Hrs',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['rei'] : params.value)
            },
        },
        {
            field: 'phi',
            headerName: 'PHI-Days',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['phi'] : params.value)
            },
        },
        {
            field: 'company',
            headerName: 'Company',
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues['company'] : params.value)
            },
        },
        {
            field: 'note',
            headerName: 'Note',
            width: columnLongWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ?
                    <TextField
                        variant="standard"
                        value={params.value}
                        InputProps={{
                            disableUnderline: true, readOnly: true,
                        }}
                        sx={{width: columnLongWidth}}/> :
                    <TextField
                        variant="standard"
                        value={fieldValues[field_names[5]]}
                        sx={{width: columnWidth}}
                        onChange={(event) => {
                            handleInputChange(event, event.target.value, field_names[5]);
                        }}
                    />)
            },
        },
        {
            field: 'update_time',
            headerName: 'Update Time',
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
        const amount = extractDecimal(fieldValues[field_names[1]]);
        const total_cost = extractDecimal(fieldValues[field_names[2]]);
        if (amount && total_cost) {
            const cost_per_unit = (Number(total_cost) / Number(amount)).toFixed(2);
            setFieldValues({...fieldValues, [field_names[3]]: cost_per_unit});
            setFormData({...formData, [field_names[3]]: cost_per_unit});
        }
    }, [fieldValues[field_names[1]], fieldValues[field_names[2]]]);

    return (
        <div>
            <AddButton
                variant="contained"
                startIcon={<AddIcon/>}
                onClick={() => onAddClicked()}
                disabled={!privilege.purchase_c}
            >
                Add Purchase Record
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
                    localeText={{noRowsLabel: privilege.purchase_r ? "No rows" : "You don't have the privilege to access this data"}}
                />
            </Paper>
            <AddPurchaseRecord {...addProps}/>
            <OperationSnackbars  {...saveProps}/>
            <OperationSnackbars  {...deleteProps}/>
        </div>
    );
}