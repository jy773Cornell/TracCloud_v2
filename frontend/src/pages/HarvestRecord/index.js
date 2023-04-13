import * as React from 'react';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
    Autocomplete, Button, Card, CardContent, Checkbox, Grid, InputAdornment, Modal, TextField,
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

const columnWidth = 200;
const columnMidWidth = 250;
const columnLongWidth = 350;

const field_names = [
    "crop", "site", "hr_area", "area_unit", "rows",
    "planting_date", "bloom_date", "har_datetime",
    "operator", "tracing_no",
]

const end_site_types = ["Row", "Hole Code#", "Section", "Block"]

function createAddAPIData(data) {
    const {
        crop: crop_id,
        site: site_list,
        area_unit: area_unit_id,
        ...rest
    } = data;
    return {
        crop_id,
        site_list,
        area_unit_id,
        ...rest
    };
}

function createEditAPIData(data) {
    const {
        crop: crop_id,
        site: site_id,
        area_unit: area_unit_id,
        ...rest
    } = data;
    return {
        crop_id,
        site_id,
        area_unit_id,
        ...rest
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

function AddHarvestRecord({
                              cropOptions,
                              siteOptions,
                              siteUnitOptions,
                              fieldValues,
                              formData,
                              columns,
                              handleAddInputChange,
                              showAddModal,
                              setShowAddModal,
                              setIsSave,
                              inputError,
                              updateInputError,
                              refreshRecord,
                              setRefreshRecord,
                          }) {

    async function OperationHarvestRecordSave() {
        const apiData = createAddAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/operation/harvest/create/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setShowAddModal(false);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const handleSaveButtonPressed = () => {
        const isFormValid = Object.keys(fieldValues)
            .filter(key => key !== field_names[4] && key !== field_names[9])
            .filter(key => fieldValues[key].length === 0).length === 0;
        if (isFormValid) {
            OperationHarvestRecordSave();
        } else {
            updateInputError();
        }
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
    const checkedIcon = <CheckBoxIcon fontSize="small"/>;

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
                            <h1>Add Harvest Record</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                value={fieldValues[field_names[0]]}
                                options={cropOptions}
                                onChange={(event, value) => {
                                    handleAddInputChange(event, value, field_names[0]);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        variant="outlined"
                                        placeholder={"Crop (Variety, Growth Stage)"}
                                        label={columns[1].headerName}
                                        error={inputError[field_names[0]]}
                                    />)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                multiple
                                value={fieldValues[field_names[1]]}
                                getOptionLabel={(option) => option.label}
                                options={siteOptions}
                                disableCloseOnSelect
                                onChange={(event, value) => {
                                    handleAddInputChange(event, value, field_names[1]);
                                }}
                                renderOption={(props, option, {selected}) => (<li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{marginRight: 8}}
                                        checked={selected}
                                    />
                                    {option.label}
                                </li>)}
                                renderInput={(params) => (
                                    <TextField {...params} required variant="outlined" label={columns[2].headerName}
                                               error={inputError[field_names[1]]}/>)}
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
                                label={columns[3].headerName}
                                error={inputError[field_names[2]]}
                                onChange={(event) => {
                                    handleAddInputChange(event, event.target.value, field_names[2]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete
                                value={fieldValues[field_names[3]]}
                                options={siteUnitOptions}
                                onChange={(event, value) => {
                                    handleAddInputChange(event, value, field_names[3]);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} required variant="outlined" label={"Area Unit"}
                                               error={inputError[field_names[3]]}/>)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                type="number"
                                fullWidth
                                label={columns[4].headerName}
                                onChange={(event) => {
                                    handleAddInputChange(event, event.target.value, field_names[4]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    variant="outlined"
                                    label={columns[5].headerName}
                                    value={dayjs(fieldValues[field_names[5]])}
                                    onChange={(event) => {
                                        handleAddInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[5]);
                                    }}
                                    sx={{width: '100%'}}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    variant="outlined"
                                    label={columns[6].headerName}
                                    value={dayjs(fieldValues[field_names[6]])}
                                    onChange={(event) => {
                                        handleAddInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[6]);
                                    }}
                                    sx={{width: '100%'}}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    variant="outlined"
                                    label={columns[7].headerName}
                                    value={dayjs(fieldValues[field_names[7]])}
                                    onChange={(event) => {
                                        handleAddInputChange(event, dayjs(event).format('YYYY-MM-DD HH:mm'), field_names[7]);
                                    }}
                                    sx={{width: '100%'}}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label={columns[8].headerName}
                                error={inputError[field_names[8]]}
                                onChange={(event) => {
                                    handleAddInputChange(event, event.target.value, field_names[8]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label={columns[9].headerName}
                                onChange={(event) => {
                                    handleAddInputChange(event, event.target.value, field_names[9]);
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

export default function HarvestRecord(props) {
    const uid = props.uid;
    const [harvestList, setHarvestList] = useState([]);
    const [cropList, setCropList] = useState([]);
    const [siteList, setSiteList] = useState([]);
    const [unit, setUnit] = useState([]);

    const [cropOptions, setCropOptions] = useState([]);
    const [siteOptions, setSiteOptions] = useState([]);
    const [siteUnitOptions, setSiteUnitOptions] = useState([]);

    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});

    const [mounted, setMounted] = useState(false);
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
                        setSiteList(flatten(data.data));
                    })
                }
            })
    }

    async function HarvestListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/operation/harvest/list/get/?" + "uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setHarvestList(data.data);
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

    async function HarvestRecordUpdate() {
        const apiData = createEditAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/operation/harvest/update/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setEditRowId(null);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    async function HarvestRecordDelete(arid) {
        const apiData = {"user": uid, "arid": arid}
        console.log(apiData);
        const requestOptions = {
            method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/operation/harvest/delete/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsDelete(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const flatten = (data) => {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj = {...data[i]};
            delete obj.children;
            result.push(obj);
            if (data[i].children) {
                result = result.concat(flatten(data[i].children));
            }
        }
        return result;
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

    const createExpandedRowData = (record) => {
        const crop = cropList.find(item => item.cid === record.crop);

        let site = siteList.find(item => item.sid === record.site);
        let siteStr = site.name;
        while (site.parent) {
            site = siteList.find(item => item.sid === site.parent)
            siteStr = `${site.name} - ${siteStr}`;
        }

        return {
            "id": record.hrid,
            "crop": `${crop.crop} (${crop.variety}, ${crop.growth_stage})`,
            "site": siteStr,
            "hr_area": `${record.hr_area} ${record.area_unit}`,
            "rows": record.rows,
            "planting_date": record.planting_date,
            "bloom_date": record.bloom_date,
            "har_datetime": record.har_datetime,
            "operator": record.operator,
            "tracing_no": record.tracing_no,
            "update_time": record.update_time
        };
    }

    const updateRowData = () => {
        if (isExpended) {
            setRows(harvestList.map((record) => createExpandedRowData(record)));
        } else {
            console.log(1);
        }
    }

    const clearInputError = () => {
        setInputError(Object.fromEntries(field_names.map(item => [item, false])));
    }

    const updateInputError = () => {
        Object.keys(fieldValues).forEach(key => {
            if (fieldValues[key].length === 0) {
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
        const isFormValid = Object.keys(fieldValues)
            .filter(key => key !== field_names[4] && key !== field_names[9])
            .filter(key => fieldValues[key].length === 0).length === 0;

        if (isFormValid) {
            HarvestRecordUpdate();
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
        const harvest = harvestList.find(item => item.hrid === params.id);
        const updatedRow = Object.keys(params.row).reduce((acc, key) => {
            acc[key] = params.row[key] === null ? "" : params.row[key];
            return acc;
        }, {});

        setFormData({
            "hrid": params.id,
            "crop": harvest.crop,
        });
        setFieldValues({
            ...updatedRow,
            [field_names[3]]: harvest.area_unit,
        });
        setEditRowId(params.id);
        clearInputError();
    };

    const onDeleteClicked = (params) => {
        HarvestRecordDelete(params.id);
        const index = rows.findIndex(item => item.id === params.id);
        setRows([...rows.slice(0, index), ...rows.slice(index + 1),]);
    };

    const onAddClicked = () => {
        setFormData({
            "user_id": uid,
            [field_names[5]]: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
            [field_names[6]]: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
            [field_names[7]]: dayjs().format('YYYY-MM-DD HH:mm')
        });
        setFieldValues((prevValues) => ({
            ...Object.fromEntries(field_names.map((item, index) => [item, index === 1 ? [] : ""])),
            [field_names[5]]: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
            [field_names[6]]: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
            [field_names[7]]: dayjs().format('YYYY-MM-DD HH:mm')
        }));

        setEditRowId(null);
        setShowAddModal(true);
        clearInputError();
    };

    const handleAddInputChange = (event, value, field) => {
        if (field === field_names[0]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
                [field_names[1]]: [],
            });
            setFormData({
                ...formData,
                [field]: value.id,
                [field_names[1]]: [],
            });
        } else if (field === field_names[1]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
            });
            setFormData({
                ...formData,
                [field]: value.map(item => item.id),
            });
        } else if (field === field_names[3]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
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

    const handleEditInputChange = (event, value, field) => {
        if (field === field_names[0]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
                [field_names[1]]: "",
            });
            setFormData({
                ...formData,
                [field]: value.id,
                [field_names[1]]: null,
            });
        } else if ([field_names[1], field_names[3]].includes(field)) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
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

    const SiteOptionsFresh = (cid) => {
        const endSiteList = siteList.filter(item => end_site_types.includes(item.type))
        let options = [];
        endSiteList.filter(item => item.crop.cid === cid).map(item => {
            let site = item;
            let optionStr = site.name;
            const sid = site.sid;
            while (site.parent) {
                site = siteList.find(item => item.sid === site.parent)
                optionStr = `${site.name} - ${optionStr}`;
            }
            options.push({label: optionStr, cid: cid, id: sid});
        })
        setSiteOptions(options);
    };

    const CropOptionsFresh = () => {
        setCropOptions(cropList.map(item => ({
            label: `${item.crop} (${item.variety}, ${item.growth_stage})`,
            id: item.cid
        })));
    }

    const UnitOptionsFresh = () => {
        setSiteUnitOptions(unit.filter(item => item.usage === "site").map(item => ({
            label: item.name, id: item.unitid
        })));
    };

    const columns = [
        {
            field: 'operations',
            headerName: 'Operations',
            sortable: false,
            width: 100,
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
        },
        {
            field: 'crop',
            headerName: 'Crop',
            sortable: false,
            width: columnLongWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={cropOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[0]] : params.value}
                    onChange={(event, value) => {
                        handleEditInputChange(event, value, field_names[0]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ?
                            <TextField
                                {...params} variant="standard"
                                InputProps={{disableUnderline: true}}
                                sx={{width: columnLongWidth}}/> :
                            <TextField
                                {...params} variant="standard"
                                sx={{width: columnLongWidth - 20}}
                                error={inputError[field_names[0]]}/>)
                    }}
                />),
        },
        {
            field: 'site',
            headerName: 'Site',
            sortable: false,
            width: columnLongWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={siteOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[1]] : params.value}
                    onChange={(event, value) => {
                        handleEditInputChange(event, value, field_names[1]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ?
                            <TextField
                                {...params} variant="standard"
                                InputProps={{disableUnderline: true}}
                                sx={{width: columnLongWidth}}/> :
                            <TextField
                                {...params} variant="standard"
                                sx={{width: columnLongWidth - 20}}
                                error={inputError[field_names[1]]}/>)
                    }}
                />),
        },
        {
            field: 'hr_area',
            headerName: 'Harvest Area',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ?
                        <TextField
                            variant="standard"
                            value={params.value}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                            }}
                            sx={{width: columnWidth}}/> :
                        <>
                            <TextField
                                variant="standard"
                                value={extractDecimal(fieldValues[field_names[2]])}
                                sx={{width: columnWidth / 3}}
                                type="number"
                                inputProps={{
                                    step: 0.01,
                                }}
                                onChange={(event) => {
                                    handleEditInputChange(event, event.target.value, field_names[2]);
                                }}
                                error={inputError[field_names[2]]}/>
                            <Autocomplete
                                options={siteUnitOptions}
                                disableClearable
                                value={fieldValues[field_names[3]]}
                                onChange={(event, value) => {
                                    handleAddInputChange(event, value, field_names[3]);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} required variant="standard"
                                               sx={{width: 2 * columnWidth / 3}}
                                               error={inputError[field_names[3]]}/>)}
                            />
                        </>
                )
            },
        },
        {
            field: 'rows',
            headerName: 'Rows',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => {
                return (editRowId !== rowID ?
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
                            value={extractDecimal(fieldValues[field_names[4]])}
                            sx={{width: columnWidth}}
                            type="number"
                            onChange={(event) => {
                                handleEditInputChange(event, event.target.value, field_names[4]);
                            }}
                            error={inputError[field_names[4]]}/>
                )
            },
        },
        {
            field: 'planting_date',
            headerName: 'Planting Date',
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
                            value={dayjs(fieldValues[field_names[5]])}
                            sx={{width: columnWidth - 20}}
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                },
                            }}
                            onChange={(event) => {
                                handleEditInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[5]);
                            }}/>
                    </LocalizationProvider>)
            },
        },
        {
            field: 'bloom_date',
            headerName: 'Bloom Date',
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
                            value={dayjs(fieldValues[field_names[6]])}
                            sx={{width: columnWidth - 20}}
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                },
                            }}
                            onChange={(event) => {
                                handleEditInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[6]);
                            }}/>
                    </LocalizationProvider>)
            },
        },
        {
            field: 'har_datetime',
            headerName: 'Harvest Datetime',
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
                        <DateTimePicker
                            variant="standard"
                            value={dayjs(fieldValues[field_names[7]])}
                            sx={{width: columnWidth - 20}}
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                },
                            }}
                            onChange={(event) => {
                                handleEditInputChange(event, dayjs(event).format('YYYY-MM-DD HH:mm'), field_names[7]);
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
                        value={fieldValues[field_names[8]]}
                        sx={{width: columnWidth}}
                        onChange={(event) => {
                            handleEditInputChange(event, event.target.value, field_names[8]);
                        }}
                        error={inputError[field_names[8]]}
                    />)
            },
        },
        {
            field: 'tracing_no',
            headerName: 'Tracking No.',
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
                        value={fieldValues[field_names[9]]}
                        sx={{width: columnWidth}}
                        onChange={(event) => {
                            handleEditInputChange(event, event.target.value, field_names[9]);
                        }}
                    />)
            },
        },
        {
            field: 'update_time', headerName: 'Update Time', sortable: false, width: columnWidth,
        },
    ]

    const addProps = {
        cropOptions,
        siteOptions,
        siteUnitOptions,
        fieldValues,
        formData,
        columns,
        handleAddInputChange,
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
        msg: "Harvest record is uploaded successfully!",
        tag: "success"
    };

    const deleteProps = {open: isDelete, setOpen: setIsDelete, msg: "Harvest record has been deleted!", tag: "success"};

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                UnitGet(),
                CropListGet(uid),
                SiteListGet(uid),
            ]);
            await HarvestListGet(uid);
        };

        fetchData();
        clearInputError();
        setMounted(true);
    }, []);

    useEffect(() => {
        CropOptionsFresh();
    }, [cropList]);

    useEffect(() => {
        SiteOptionsFresh(formData[field_names[0]]);
    }, [formData[field_names[0]]]);

    useEffect(() => {
        UnitOptionsFresh();
    }, [unit]);

    useEffect(() => {
        updateRowData();
    }, [harvestList]);

    useEffect(() => {
        if (mounted) {
            HarvestListGet(uid);
        }
    }, [refreshRecord]);

    return (<div>
        <AddButton
            variant="contained"
            startIcon={<AddIcon/>}
            onClick={() => onAddClicked()}>
            Add Harvest Record
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
        <AddHarvestRecord {...addProps}/>
        <OperationSnackbars  {...saveProps}/>
        <OperationSnackbars  {...deleteProps}/>
    </div>);
}