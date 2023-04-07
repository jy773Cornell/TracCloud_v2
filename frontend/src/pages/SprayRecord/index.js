import * as React from 'react';
import {format} from 'date-fns';
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
    Autocomplete,
    Button,
    Card,
    CardContent,
    Checkbox,
    Grid,
    Modal,
    TextField,
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

const columnWidth = 200;

const editWidth = 180;

const field_names = [
    "crop", "site", "applied_area", "area_unit", "app_datetime", "operator", "target", "decision_support", "chemical", "equipment",
    "water_use", "water_unit", "application_rate", "rate_unit", "total_amount", "amount_unit", "total_cost",
    "wind_speed", "wind_direction", "average_temp", "customer"
]

const end_site_types = ["Row", "Hole Code#", "Section", "Block"]

const windDirections = [
    'North',
    'Northeast',
    'East',
    'Southeast',
    'South',
    'Southwest',
    'West',
    'Northwest'
];

function createAPIData(data) {
    const {
        site: site_id, target: target_id, decision_support: decision_support_id,
        chemical: chemical_id, equipment: equipment_id, water_unit: water_unit_id, rate_unit: rate_unit_id,
        amount_unit: amount_unit_id, area_unit: area_unit_id, ...rest
    } = data;
    return {
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
        "applied_area": record.applied_area,
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
                            cropOptions,
                            siteOptions,
                            siteUnitOptions,
                            applicationTargetOptions,
                            decisionSupportOptions,
                            chemicalUnitOptions,
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
                        }) {

    async function OperationApplicationRecordSave() {
        const apiData = createAPIData(formData);
        console.log(apiData);
        const requestOptions = {
            method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(apiData),
        };
        await fetch("/api/operation/application/create/", requestOptions)
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
            OperationApplicationRecordSave();
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
            <Card sx={{width: 1000}}>
                <CardContent>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <h1>Add Spray Record</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                readOnly
                                multiple
                                getOptionLabel={(option) => option.label}
                                value={fieldValues[field_names[0]]}
                                options={cropOptions}
                                disableCloseOnSelect
                                renderInput={(params) => (
                                    <TextField {...params} required variant="outlined" label={columns[1].headerName}
                                               error={inputError[field_names[0]]}/>)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                multiple
                                getOptionLabel={(option) => option.label}
                                value={fieldValues[field_names[1]]}
                                options={siteOptions}
                                disableCloseOnSelect
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[1]);
                                }}
                                renderOption={(props, option, {selected}) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{marginRight: 8}}
                                            checked={selected}
                                        />
                                        {option.label}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} required variant="outlined" label={columns[2].headerName}
                                               error={inputError[field_names[1]]}/>)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                label={columns[3].headerName}
                                value={fieldValues[field_names[2]]}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[2]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                value={fieldValues[field_names[3]]}
                                options={siteUnitOptions}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[3]);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} required variant="outlined" label={"Area Unit"}
                                               error={inputError[field_names[3]]}/>)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    variant="outlined"
                                    label={columns[4].headerName}
                                    onChange={(event) => {
                                        handleInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[4]);
                                    }}
                                    sx={{width: '100%'}}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                label={columns[5].headerName}
                                value={fieldValues[field_names[5]]}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[5]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                value={fieldValues[field_names[6]]}
                                options={applicationTargetOptions}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[6]);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} required variant="outlined" label={columns[6].headerName}
                                               error={inputError[field_names[6]]}/>)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                value={fieldValues[field_names[7]]}
                                options={decisionSupportOptions}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[7]);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} required variant="outlined" label={columns[7].headerName}
                                               error={inputError[field_names[7]]}/>)}
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
    )
        ;
}

export default function SprayRecord(props) {
    const uid = props.uid;
    const [sprayApplicationList, setSprayApplicationList] = useState([]);
    const [cropList, setCropList] = useState([]);
    const [siteList, setSiteList] = useState([]);
    const [chemicalList, setChemicalList] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]);
    const [siteType, setSiteType] = useState([]);
    const [applicationType, setApplicationType] = useState([]);
    const [applicationTarget, setApplicationTarget] = useState([]);
    const [decisionSupport, setDecisionSupport] = useState([]);
    const [unit, setUnit] = useState([]);

    const [cropOptions, setCropOptions] = useState([]);
    const [siteOptions, setSiteOptions] = useState([]);
    const [applicationTargetOptions, setApplicationTargetOptions] = useState([]);
    const [decisionSupportOptions, setDecisionSupportOptions] = useState([]);
    const [chemicalOptions, setChemicalOptions] = useState([]);
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [windDirectionOptions] = useState(windDirections);
    const [siteUnitOptions, setSiteUnitOptions] = useState([]);
    const [chemicalUnitOptions, setChemicalUnitOptions] = useState([]);

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
                        setSiteList(flatten(data.data));
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
        await fetch("/api/operation/application/type/", requestOptions)
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
        await fetch("/api/operation/application/target/", requestOptions)
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
        await fetch("/api/operation/application/desicisionsupport/", requestOptions)
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
                        const sprayList = data.data.filter(item => item.type === applicationType.find(item => item.name === "Spray").atid)
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

    const updateRowData = () => {
        if (isExpended) {
            setRows(createRowData(sprayApplicationList));
        } else {
            console.log(1);
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
            ApplicationRecordUpdate();
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
        ApplicationRecordDelete(params.id);
        const index = rows.findIndex(item => item.id === params.id);
        setRows([...rows.slice(0, index), ...rows.slice(index + 1),]);
    };

    const onAddClicked = () => {
        setFormData({"user_id": uid,});
        setFieldValues(Object.fromEntries(
            field_names.map((item, index) => [
                item,
                index === 0 || index === 1 ? [] : "",
            ])
        ));
        setEditRowId(null);
        setShowAddModal(true);
        clearInputError();
    };

    const handleInputChange = (event, value, field) => {
        if (field === field_names[1]) {
            setFieldValues({
                ...fieldValues,
                [field_names[0]]: value.reduce((acc, site) => {
                    const foundCrop = cropOptions.find(crop => crop.id === site.cid);
                    if (foundCrop && !acc.some(crop => crop.id === foundCrop.id)) {
                        acc.push({...foundCrop});
                    }
                    return acc;
                }, []),
                [field]: value,
            });
            setFormData({
                ...formData, ["site_list"]: value.map(item => item.id),
            });
        } else {
            setFieldValues({...fieldValues, [field]: value.label});
            setFormData({...formData, [field]: value.id});
        }
    };

    const SiteOptionsFresh = () => {
        const endSiteList = siteList.filter(item => end_site_types.includes(item.type))
        let options = [];
        endSiteList.map(item => {
            let site = item;
            let optionStr = site.name;
            const sid = site.sid;
            const cid = site.crop.cid;
            while (site.parent) {
                site = siteList.find(item => item.sid === site.parent)
                optionStr = `${site.name} - ${optionStr}`;
            }
            options.push({label: optionStr, cid: cid, id: sid});
        })
        setSiteOptions(options);
    };

    const CropOptionsFresh = () => {
        let options = [];
        cropList.map(item => {
            let optionStr = `${item.crop} (${item.variety}, ${item.growth_stage})`;
            options.push({label: optionStr, id: item.cid})
        })
        setCropOptions(options);
    }

    const ApplicationTargeOptionsFresh = () => {
        setApplicationTargetOptions(applicationTarget.map(item => ({
            label: item.name, id: item.attid
        })))
    };

    const DecisionSupportOptionsFresh = () => {
        setDecisionSupportOptions(decisionSupport.map(item => ({
            label: item.name, id: item.dsid
        })))
    };

    const ChemicalOptionsFresh = () => {
        setChemicalOptions(chemicalList.map(item => ({
            label: item.trade_name, id: item.chemid
        })))
    };

    const EquipmentOptionsFresh = () => {
        setEquipmentOptions(equipmentList.map(item => ({
            label: item.name, id: item.eid
        })))
    };

    const UnitOptionsFresh = () => {
        setSiteUnitOptions(unit.filter(item => item.usage === "site").map(item => ({
            label: item.name, id: item.unitid
        })));
        setChemicalUnitOptions(unit.filter(item => item.usage === "chemical").map(item => ({
            label: item.name, id: item.unitid
        })));
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
                        <IconButton>
                            <AddCircleIcon/>
                        </IconButton>
                        {popoverRowId === params.id &&
                            <ConfirmPopover anchorEl={anchorEl}
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
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[0]] : params.value)
            }
        },
        {
            field: 'site',
            headerName: 'Site',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (<Autocomplete
                options={siteOptions}
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
        },
        {
            field: 'applied_area',
            headerName: 'Applied Area',
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
            field: 'app_datetime',
            headerName: 'Application Datetime',
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="standard"
                                sx={{width: editWidth}}
                                views={["year"]}
                                slotProps={{
                                    textField: {
                                        variant: "standard",
                                        placeholder: fieldValues[field_names[2]],
                                    },
                                }}
                                onChange={(event) => {
                                    handleInputChange(event, event.$y, field_names[2]);
                                }}
                            />
                        </LocalizationProvider>
                )
            },
        },
        {
            field: 'operator',
            headerName: 'Operator',
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
            field: 'target',
            headerName: 'Application Target',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={applicationTargetOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[5]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[5]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                                 InputProps={{disableUnderline: true}}
                                                                 sx={{width: columnWidth}}/> :
                            <TextField {...params} variant="standard" sx={{width: editWidth}}
                                       error={inputError[field_names[5]]}/>)
                    }}
                />),
        },
        {
            field: 'decision_support',
            headerName: 'Decision Support',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={decisionSupportOptions}
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
                            <TextField {...params} variant="standard" sx={{width: editWidth}}
                                       error={inputError[field_names[6]]}/>)
                    }}
                />),
        },
        {
            field: 'chemical',
            headerName: 'Chemical',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={chemicalOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[7]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[7]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                                 InputProps={{disableUnderline: true}}
                                                                 sx={{width: columnWidth}}/> :
                            <TextField {...params} variant="standard" sx={{width: editWidth}}
                                       error={inputError[field_names[7]]}/>)
                    }}
                />),
        },
        {
            field: 'equipment',
            headerName: 'Equipment',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={equipmentOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[9]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[9]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                                 InputProps={{disableUnderline: true}}
                                                                 sx={{width: columnWidth}}/> :
                            <TextField {...params} variant="standard" sx={{width: editWidth}}
                                       error={inputError[field_names[9]]}/>)
                    }}
                />),
        },
        {
            field: 'water_use',
            headerName: 'Water Use',
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
                    value={fieldValues[field_names[10]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[10]);
                    }}
                />)
            },
        },
        {
            field: 'application_rate',
            headerName: 'Application Rate',
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
                    value={fieldValues[field_names[12]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[12]);
                    }}
                />)
            },
        },
        {
            field: 'total_amount',
            headerName: 'Total Amount',
            sortable: false,
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[14]] : params.value)
            },
        },
        {
            field: 'total_cost',
            headerName: 'Total Cost',
            sortable: false,
            width: columnWidth,
            valueGetter: (params) => {
                return (editRowId === params.id ? fieldValues[field_names[16]] : params.value)
            },
        },
        {
            field: 'wind_speed',
            headerName: 'Wind Speed',
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
                    value={fieldValues[field_names[17]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[17]);
                    }}
                />)
            },
        },
        {
            field: 'wind_direction',
            headerName: 'Wind Direction',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={windDirectionOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[18]] : params.value}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[18]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ? <TextField {...params} variant="standard"
                                                                 InputProps={{disableUnderline: true}}
                                                                 sx={{width: columnWidth}}/> :
                            <TextField {...params} variant="standard" sx={{width: editWidth}}
                                       error={inputError[field_names[18]]}/>)
                    }}
                />),
        },
        {
            field: 'average_temp',
            headerName: 'Average Temperature',
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
                    value={fieldValues[field_names[19]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[19]);
                    }}
                />)
            },
        },
        {
            field: 'customer',
            headerName: 'Customer',
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
                    value={fieldValues[field_names[20]]}
                    sx={{width: editWidth}}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[20]);
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
        applicationTargetOptions,
        decisionSupportOptions,
        chemicalUnitOptions,
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
        CropListGet(uid);
        SiteListGet(uid);
        ChemicalListGet(uid);
        EquipmentListGet(uid);
        SiteTypeGet();
        ApplicationTypeGet();
        ApplicationTargetGet();
        DecisionSupportGet();
        UnitGet();
        clearInputError();
    }, []);

    useEffect(() => {
        CropOptionsFresh();
    }, [cropList]);

    useEffect(() => {
        SiteOptionsFresh();
    }, [siteList]);

    useEffect(() => {
        ApplicationTargeOptionsFresh();
    }, [applicationTarget]);

    useEffect(() => {
        DecisionSupportOptionsFresh();
    }, [decisionSupport]);

    useEffect(() => {
        ChemicalOptionsFresh();
    }, [chemicalList]);

    useEffect(() => {
        EquipmentOptionsFresh();
    }, [equipmentList]);

    useEffect(() => {
        UnitOptionsFresh();
    }, [unit]);

    useEffect(() => {
        updateRowData();
    }, [sprayApplicationList]);

    useEffect(() => {
        if (Object.keys(applicationType).length !== 0) {
            SprayApplicationListGet();
        }
    }, [refreshRecord, applicationType]);

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
        <AddSprayRecord {...addProps}/>
        <OperationSnackbars  {...saveProps}/>
        <OperationSnackbars  {...deleteProps}/>
    </div>);
}