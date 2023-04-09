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
import {a} from "@react-spring/web";

const columnWidth = 200;
const columnMidWidth = 250;
const columnLongWidth = 350;

const field_names = [
    "crop", "site", "applied_area", "area_unit", "app_datetime", "operator", "target", "decision_support",
    "chemical", "equipment", "water_use", "water_unit", "application_rate",
    "rate_unit", "total_amount", "amount_unit", "total_cost", "customer", "wind_speed", "wind_direction", "average_temp",
]

const end_site_types = ["Row", "Hole Code#", "Section", "Block"]

const windDirections = [
    {label: 'North', id: 0},
    {label: 'Northeast', id: 1},
    {label: 'East', id: 2},
    {label: 'Southeast', id: 3},
    {label: 'South', id: 4},
    {label: 'Southwest', id: 5},
    {label: 'West', id: 6},
    {label: 'Northwest', id: 7}
];

function createAddAPIData(data) {
    const {
        crop: crop_id,
        site: site_list,
        target: target_id,
        decision_support: decision_support_id,
        chemical: chemical_id,
        equipment: equipment_id,
        water_unit: water_unit_id,
        rate_unit: rate_unit_id,
        amount_unit: amount_unit_id,
        area_unit: area_unit_id,
        ...rest
    } = data;
    return {
        crop_id,
        site_list,
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

function createAPIData(data) {
    const {
        site: site_id,
        target: target_id,
        decision_support: decision_support_id,
        chemical: chemical_id,
        equipment: equipment_id,
        water_unit: water_unit_id,
        rate_unit: rate_unit_id,
        amount_unit: amount_unit_id,
        area_unit: area_unit_id,
        ...rest
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
        area_unit_id, ...rest
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
                            chemicalOptions,
                            equipmentOptions,
                            chemicalUnitOptions,
                            windDirectionOptions,
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

    async function OperationApplicationRecordSave() {
        const apiData = createAddAPIData(formData);
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
        if (Object.keys(fieldValues)
            .filter(key => !field_names.slice(17, 21).includes(key))
            .filter(key => fieldValues[key].length === 0).length === 0) {
            OperationApplicationRecordSave();
        } else {
            updateInputError();
        }
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
    const checkedIcon = <CheckBoxIcon fontSize="small"/>;

    return (<Modal
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
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="outlined"
                                label={columns[4].headerName}
                                value={dayjs(fieldValues[field_names[4]])}
                                onChange={(event) => {
                                    handleAddInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[4]);
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
                            error={inputError[field_names[5]]}
                            onChange={(event) => {
                                handleAddInputChange(event, event.target.value, field_names[5]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            value={fieldValues[field_names[6]]}
                            options={applicationTargetOptions}
                            onChange={(event, value) => {
                                handleAddInputChange(event, value, field_names[6]);
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
                                handleAddInputChange(event, value, field_names[7]);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required variant="outlined" label={columns[7].headerName}
                                           error={inputError[field_names[7]]}/>)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={fieldValues[field_names[8]]}
                            options={chemicalOptions}
                            onChange={(event, value) => {
                                handleAddInputChange(event, value, field_names[8]);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required
                                           variant="outlined"
                                           placeholder={"EPA NO.  |  Trade Name  |  Active Ingredient  |  REI  |  PHI  |  Application Unit"}
                                           label={"Chemical"}
                                           error={inputError[field_names[8]]}/>)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            value={fieldValues[field_names[9]]}
                            options={equipmentOptions}
                            onChange={(event, value) => {
                                handleAddInputChange(event, value, field_names[9]);
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                           required
                                           variant="outlined"
                                           placeholder={"Equipment (Owner, Code)"}
                                           label={columns[14].headerName}
                                           error={inputError[field_names[9]]}/>)}
                        />
                    </Grid>
                    <Grid item xs={3.5}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            type="number"
                            inputProps={{
                                step: 0.01,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment
                                    position="end">{`per ${fieldValues[field_names[13]]}`}</InputAdornment>,
                            }}
                            label={columns[15].headerName}
                            error={inputError[field_names[10]]}
                            onChange={(event) => {
                                handleAddInputChange(event, event.target.value, field_names[10]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Autocomplete
                            value={fieldValues[field_names[11]]}
                            options={chemicalUnitOptions}
                            onChange={(event, value) => {
                                handleAddInputChange(event, value, field_names[11]);
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                           required
                                           variant="outlined"
                                           label={"Water Unit"}
                                           error={inputError[field_names[11]]}/>)}
                        />
                    </Grid>
                    <Grid item xs={3.5}>
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
                                    <InputAdornment position="end">
                                        {`${fieldValues[field_names[15]]} per ${fieldValues[field_names[13]]}`}
                                    </InputAdornment>,
                            }}
                            label={columns[16].headerName}
                            error={inputError[field_names[12]]}
                            onChange={(event) => {
                                handleAddInputChange(event, event.target.value, field_names[12]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={fieldValues[field_names[14]]}
                            label={columns[17].headerName}
                            InputLabelProps={{
                                shrink: true,
                                readOnly: true,
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        {`${fieldValues[field_names[15]]}`}
                                    </InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={fieldValues[field_names[16]]}
                            label={columns[18].headerName}
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
                        <TextField
                            variant="outlined"
                            fullWidth
                            label={columns[19].headerName}
                            onChange={(event) => {
                                handleAddInputChange(event, event.target.value, field_names[17]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label={columns[20].headerName}
                            onChange={(event) => {
                                handleAddInputChange(event, event.target.value, field_names[18]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            value={fieldValues[field_names[19]]}
                            options={windDirectionOptions}
                            onChange={(event, value) => {
                                handleAddInputChange(event, value, field_names[19]);
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                           variant="outlined"
                                           label={columns[21].headerName}
                                />)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label={columns[22].headerName}
                            onChange={(event) => {
                                handleAddInputChange(event, event.target.value, field_names[20]);
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

export default function SprayRecord(props) {
    const uid = props.uid;
    const [sprayApplicationList, setSprayApplicationList] = useState([]);
    const [cropList, setCropList] = useState([]);
    const [siteList, setSiteList] = useState([]);
    const [chemicalList, setChemicalList] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]);
    const [cropCategory, setCropCategory] = useState([]);
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
                        const sprayList = data.data.filter(item => item.type === "Spray")
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
        await fetch("/api/operation/application/delete/", requestOptions)
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

    const createExpandedRowData = (record) => {
        const crop = cropList.find(item => item.cid === record.crop);
        const chemical = chemicalList.find(item => item.chemid === record.chemical);
        const equipment = equipmentList.find(item => item.eid === record.equipment);

        let site = siteList.find(item => item.sid === record.site);
        let siteStr = site.name;
        while (site.parent) {
            site = siteList.find(item => item.sid === site.parent)
            siteStr = `${site.name} - ${siteStr}`;
        }

        return {
            "id": record.arid,
            "crop": `${crop.crop} (${crop.variety}, ${crop.growth_stage})`,
            "site": siteStr,
            "applied_area": `${record.applied_area} ${record.area_unit}`,
            "app_datetime": record.app_datetime,
            "operator": record.operator,
            "target": record.target,
            "decision_support": record.decision_support,
            "epa_reg_no": chemical.epa_reg_no,
            "trade_name": chemical.trade_name,
            "active_ingredient": chemical.active_ingredient,
            "percent_ai": chemical.percent_ai,
            "rei": chemical.rei,
            "phi": chemical.phi,
            "equipment": equipment.name,
            "water_use": `${record.water_use} ${record.water_unit} per ${record.area_unit}`,
            "application_rate": `${record.application_rate} ${chemical.unit} per ${record.area_unit}`,
            "total_amount": `${record.total_amount} ${chemical.unit}`,
            "total_cost": `\$ ${record.total_cost}`,
            "customer": record.customer,
            "wind_speed": record.wind_speed,
            "wind_direction": record.wind_direction,
            "average_temp": record.average_temp,
            "update_time": record.update_time
        };
    }

    const updateRowData = () => {
        if (isExpended) {
            setRows(sprayApplicationList.map((record) => createExpandedRowData(record)));
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
        const application = sprayApplicationList.find(item => item.arid === params.id);
        setFormData({
            "arid": params.id,
            "crop": application.crop,
        });
        setFieldValues(params.row);
        setEditRowId(params.id);
        clearInputError();
    };

    const onDeleteClicked = async (params) => {
        await ApplicationRecordDelete(params.id);
        const index = rows.findIndex(item => item.id === params.id);
        setRows([...rows.slice(0, index), ...rows.slice(index + 1),]);
    };

    const onAddClicked = () => {
        setFormData({
            "user_id": uid,
            "type_id": applicationType.find(item => item.name === "Spray").atid,
            [field_names[4]]: dayjs().format('YYYY-MM-DD')
        });
        setFieldValues(Object.fromEntries(field_names.map((item, index) =>
            [item, index === 1 ? [] : (index === 4 ? dayjs().format('YYYY-MM-DD') : ""),])));
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
                [field_names[6]]: "",
            });
            setFormData({
                ...formData,
                [field]: value.id,
                [field_names[1]]: [],
                [field_names[6]]: null,
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
                [field_names[13]]: value.label,
            });
            setFormData({
                ...formData,
                [field]: value.id,
                [field_names[13]]: value.id,
            });
        } else if (field === field_names[8]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
                [field_names[15]]: value.unit,
            });
            setFormData({
                ...formData,
                [field]: value.id,
                [field_names[15]]: chemicalUnitOptions.find(item => item.label === value.unit).id,
            });
        } else if (field === field_names[19]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
            });
            setFormData({
                ...formData,
                [field]: value.label,
            });
        } else if ([
            field_names[2],
            field_names[4],
            field_names[5],
            field_names[10],
            field_names[12],
            field_names[17],
            field_names[18],
            field_names[20]
        ].includes(field)) {
            setFieldValues({...fieldValues, [field]: value});
            setFormData({...formData, [field]: value});
        } else {
            setFieldValues({...fieldValues, [field]: value});
            setFormData({...formData, [field]: value.id});
        }
    };

    const handleEditInputChange = (event, value, field) => {
        if (field === field_names[0]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
                [field_names[1]]: "",
                [field_names[6]]: "",
            });
            setFormData({
                ...formData,
                [field]: value.id,
                [field_names[1]]: null,
                [field_names[6]]: null,
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
                [field_names[13]]: value.label,
            });
            setFormData({
                ...formData,
                [field]: value.id,
                [field_names[13]]: value.id,
            });
        } else if (field === field_names[8]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
                [field_names[15]]: value.unit,
            });
            setFormData({
                ...formData,
                [field]: value.id,
                [field_names[15]]: chemicalUnitOptions.find(item => item.label === value.unit).id,
            });
        } else if (field === field_names[19]) {
            setFieldValues({
                ...fieldValues,
                [field]: value,
            });
            setFormData({
                ...formData,
                [field]: value.label,
            });
        } else if ([
            field_names[2],
            field_names[4],
            field_names[5],
            field_names[10],
            field_names[12],
            field_names[17],
            field_names[18],
            field_names[20]
        ].includes(field)) {
            setFieldValues({...fieldValues, [field]: value});
            setFormData({...formData, [field]: value});
        } else {
            setFieldValues({...fieldValues, [field]: value});
            setFormData({...formData, [field]: value.id});
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

    const ApplicationTargeOptionsFresh = (cid) => {
        const crop = cropList.find(item => item.cid === cid)
        if (crop) {
            setApplicationTargetOptions(applicationTarget.filter(item => {
                return (
                    item.crop_id === cropCategory.find(variety => variety.name === crop.crop).ccid ||
                    item.crop_id === null
                );
            }).map(item => {
                return {
                    label: item.name,
                    id: item.attid
                };
            }));
        }
    };

    const DecisionSupportOptionsFresh = () => {
        setDecisionSupportOptions(decisionSupport.map(item => ({
            label: item.name, id: item.dsid
        })))
    };

    const ChemicalOptionsFresh = () => {
        setChemicalOptions(chemicalList.map(item => ({
            label: `${item.epa_reg_no}  |  ${item.trade_name}  |  ${item.active_ingredient}  |  ${item.rei}  |  ${item.phi}  |  ${item.unit}`,
            epa_reg_no: item.epa_reg_no,
            trade_name: item.trade_name,
            active_ingredient: item.active_ingredient,
            rei: item.rei,
            phi: item.phi,
            unit: item.unit,
            id: item.chemid,
        })))
    };

    const EquipmentOptionsFresh = () => {
        setEquipmentOptions(equipmentList.map(item => ({
            label: `${item.name} (${item.owner}, ${item.code})`,
            id: item.eid
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
            field: 'applied_area',
            headerName: 'Applied Area',
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
                        value={fieldValues[field_names[2]]}
                        sx={{width: columnWidth - 20}}
                        onChange={(event) => {
                            handleEditInputChange(event, event.target.value, field_names[2]);
                        }}
                        error={inputError[field_names[2]]}/>)
            },
        },
        {
            field: 'app_datetime',
            headerName: 'Application Datetime',
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
                            sx={{width: columnWidth - 20}}
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                },
                            }}
                            onChange={(event) => {
                                handleEditInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[4]);
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
                        sx={{width: columnWidth - 20}}
                        onChange={(event) => {
                            handleEditInputChange(event, event.target.value, field_names[5]);
                        }}
                        error={inputError[field_names[5]]}
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
                    value={editRowId === rowID ? fieldValues[field_names[6]] : params.value}
                    onChange={(event, value) => {
                        handleEditInputChange(event, value, field_names[6]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ?
                            <TextField
                                {...params} variant="standard"
                                InputProps={{disableUnderline: true}}
                                sx={{width: columnWidth}}/> :
                            <TextField
                                {...params} variant="standard" sx={{width: columnWidth - 20}}
                                error={inputError[field_names[6]]}/>)
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
                    options={applicationTargetOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues[field_names[7]] : params.value}
                    onChange={(event, value) => {
                        handleEditInputChange(event, value, field_names[7]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ?
                            <TextField
                                {...params} variant="standard"
                                InputProps={{disableUnderline: true}}
                                sx={{width: columnWidth}}/> :
                            <TextField
                                {...params} variant="standard" sx={{width: columnWidth - 20}}
                                error={inputError[field_names[7]]}/>)
                    }}
                />),
        },
        {
            field: 'epa_reg_no',
            headerName: 'EPA Registration No.',
            sortable: false,
            width: columnMidWidth,
            renderCell: (params, rowID = params.id) => (
                <Autocomplete
                    options={chemicalOptions}
                    disableClearable
                    readOnly={editRowId !== rowID}
                    value={editRowId === rowID ? fieldValues['epa_reg_no'] : params.value}
                    onChange={(event, value) => {
                        handleEditInputChange(event, value, field_names[8]);
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
                                error={inputError[field_names[8]]}/>)
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
            field: 'equipment',
            headerName: 'Equipment',
            sortable: false,
            width: columnWidth,
            renderCell: (params, rowID = params.id) => (<Autocomplete
                options={equipmentOptions}
                disableClearable
                readOnly={editRowId !== rowID}
                value={editRowId === rowID ? fieldValues[field_names[9]] : params.value}
                onChange={(event, value) => {
                    handleEditInputChange(event, value, field_names[9]);
                }}
                renderInput={(params) => {
                    return (editRowId !== rowID ?
                        <TextField
                            {...params} variant="standard"
                            InputProps={{disableUnderline: true}}
                            sx={{width: columnWidth}}/> :
                        <TextField
                            {...params} variant="standard"
                            sx={{width: columnWidth - 20}}
                            error={inputError[field_names[9]]}/>)
                }}
            />),
        },
        {
            field: 'water_use',
            headerName: 'Water Use',
            sortable: false,
            width: columnMidWidth,
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
                        value={fieldValues[field_names[10]]}
                        sx={{width: columnMidWidth - 20}}
                        onChange={(event) => {
                            handleEditInputChange(event, event.target.value, field_names[10]);
                        }}
                        error={inputError[field_names[10]]}
                    />)
            },
        },
        {
            field: 'application_rate',
            headerName: 'Application Rate',
            sortable: false,
            width: columnMidWidth,
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
                        value={fieldValues[field_names[12]]}
                        sx={{width: columnMidWidth - 20}}
                        onChange={(event) => {
                            handleEditInputChange(event, event.target.value, field_names[12]);
                        }}
                        error={inputError[field_names[12]]}
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
            field: 'customer',
            headerName: 'Customer',
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
                        value={fieldValues[field_names[17]]}
                        sx={{width: columnWidth - 20}}
                        onChange={(event) => {
                            handleEditInputChange(event, event.target.value, field_names[17]);
                        }}
                    />)
            },
        },
        {
            field: 'wind_speed',
            headerName: 'Wind Speed',
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
                        value={fieldValues[field_names[18]]}
                        sx={{width: columnWidth - 20}}
                        onChange={(event) => {
                            handleEditInputChange(event, event.target.value, field_names[18]);
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
                    value={editRowId === rowID ? fieldValues[field_names[19]] : params.value}
                    onChange={(event, value) => {
                        handleEditInputChange(event, value, field_names[19]);
                    }}
                    renderInput={(params) => {
                        return (editRowId !== rowID ?
                            <TextField
                                {...params} variant="standard"
                                InputProps={{disableUnderline: true}}
                                sx={{width: columnWidth}}/> :
                            <TextField
                                {...params} variant="standard" sx={{width: columnWidth - 20}}
                                error={inputError[field_names[19]]}/>)
                    }}
                />),
        },
        {
            field: 'average_temp',
            headerName: 'Average Temperature',
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
                        value={fieldValues[field_names[20]]}
                        sx={{width: columnWidth - 20}}
                        onChange={(event) => {
                            handleEditInputChange(event, event.target.value, field_names[20]);
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
        chemicalOptions,
        equipmentOptions,
        chemicalUnitOptions,
        windDirectionOptions,
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

    const saveProps = {open: isSave, setOpen: setIsSave, msg: "Crop record is uploaded successfully!", tag: "success"};

    const deleteProps = {open: isDelete, setOpen: setIsDelete, msg: "Crop record has been deleted!", tag: "success"};

    useEffect(() => {
        CropCategoryGet();
        ApplicationTypeGet();
        ApplicationTargetGet();
        DecisionSupportGet();
        UnitGet();
        CropListGet(uid);
        SiteListGet(uid);
        ChemicalListGet(uid);
        EquipmentListGet(uid);
        SprayApplicationListGet();
        clearInputError();
        setMounted(true);
    }, []);

    useEffect(() => {
        CropOptionsFresh();
    }, [cropList]);

    useEffect(() => {
        SiteOptionsFresh(formData[field_names[0]]);
        ApplicationTargeOptionsFresh(formData[field_names[0]]);
    }, [formData[field_names[0]]]);

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
        if (mounted) {
            SprayApplicationListGet();
        }
    }, [refreshRecord]);

    useEffect(() => {
        const dummy_chem_cost = "1";
        if (formData[field_names[2]] && formData[field_names[8]] && formData[field_names[12]]) {
            const total_amount = Number(formData[field_names[2]]) * Number(formData[field_names[12]]);
            const total_cost = Number(formData[field_names[2]]) * Number(dummy_chem_cost) * Number(formData[field_names[12]]);
            setFieldValues({...fieldValues, [field_names[14]]: total_amount, [field_names[16]]: total_cost});
            setFormData({...formData, [field_names[14]]: total_amount, [field_names[16]]: total_cost});
        } else if (formData[field_names[2]] && formData[field_names[12]]) {
            const total_amount = Number(formData[field_names[2]]) * Number(formData[field_names[12]]);
            setFieldValues({...fieldValues, [field_names[14]]: total_amount});
            setFormData({...formData, [field_names[14]]: total_amount});
        }
    }, [formData[field_names[2]], formData[field_names[8]], formData[field_names[12]]]);

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