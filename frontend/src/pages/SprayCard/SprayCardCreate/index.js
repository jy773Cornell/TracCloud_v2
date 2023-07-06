import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
    Autocomplete,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    InputAdornment,
    Modal,
    TextField
} from "@mui/material";
import {lazy, useEffect, useState} from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {GroupHeader, GroupItems} from "./styles";
import OperationSnackbars from "../../../components/Snackbars";
import {getCookie} from "../../../utils";

const ModalStepper = lazy(() => import('../ModalStepper'))
const SiteTreeView = lazy(() => import('../SiteTreeView'))
const UserTreeView = lazy(() => import('../UserTreeView'))

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

const steps = ['Select Chemicals', 'Select Crops', 'Select Sites', 'Responsible Person'];

const field_names = [
    "chemical_purchase",
    "decision_support",
    "crop",
    "target",
    "site",
    "assign_to",
    "applied_area",
    "gallons_water_rate",
    "application_rate",
    "partial_treatment",
    "alt_row_middle",
    "responsible_person"
]

const end_site_types = ["Row", "Hole Code#", "Section", "Block"]

export default function SprayCardCreate({
                                            uid,
                                            addSprayCard,
                                            setAddSprayCard,
                                            sprayData,
                                            sprayOptions,
                                            refreshRecord,
                                            setRefreshRecord,
                                            setAssignSprayCard,
                                            setSprayCardSelected
                                        }) {

    const initialFieldValues = field_names.reduce((acc, cur) => {
        if ([field_names[5], field_names[11]].includes(cur)) {
            acc[cur] = "";
        } else {
            acc[cur] = {};
        }
        return acc;
    }, {});

    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    const [fieldErrors, setFieldErrors] = useState({});

    const [selectedResponsible, setSelectedResponsible] = useState("");
    const [applicationTargetOptions, setApplicationTargetOptions] = useState([]);
    const [siteOptions, setSiteOptions] = useState([]);
    const [nodes, setNodes] = useState([]);

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({0: false, 1: false, 2: false, 3: false});
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);

    async function SprayCardCreate() {
        const apiData = reformatSubmitData();
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(apiData),
        };
        const response = await fetch("/workflow/spraycard/create/", requestOptions)
        if (response.ok) {
            const data = await response.json()
            return data.data;
        } else {
            return null;
        }
    }

    async function SprayCardInitiate(opid) {
        const apiData = {"spray_record_id": opid};
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(apiData),
        };
        const response = await fetch("/workflow/spraycard/initiate/", requestOptions)
        if (response.ok) {
            const data = await response.json();
            setSprayCardSelected(data.data);
            setAddSprayCard(false);
            setAssignSprayCard(true);
            setSuccessSnackbar(true);
            setRefreshRecord(~refreshRecord);
        }
    }

    const reformatSubmitData = () => {
        const getKey = (dict, val) => {
            for (let key in dict) {
                if ((dict[key]).id === val) {
                    return key;
                }
            }
        }

        let submitData = [];
        for (let chemical_key in Object.keys(formData[field_names[0]])) {
            for (let site_key of Object.keys(formData[field_names[4]])) {
                let applicationRecord = {};
                applicationRecord["user_id"] = uid;
                applicationRecord["crop_id"] = (formData[field_names[4]][site_key]).cid;
                applicationRecord["site_id"] = (formData[field_names[4]][site_key]).id;
                applicationRecord["applied_area"] = formData[field_names[6]][site_key];
                applicationRecord["area_unit_id"] = sprayOptions["siteUnitOptions"].find(item => item.label === (formData[field_names[4]][site_key]).unit).id;
                applicationRecord["partial_treatment"] = formData[field_names[9]][site_key];
                applicationRecord["alt_row_middle"] = formData[field_names[10]][site_key];
                applicationRecord["chemical_purchase_id"] = (formData[field_names[0]][chemical_key]).id;
                applicationRecord["decision_support_id"] = (formData[field_names[1]][chemical_key]).id;
                applicationRecord["target_id"] = (formData[field_names[3]][getKey(formData[field_names[2]], (formData[field_names[4]][site_key]).cid)]).id;
                applicationRecord["gallons_water_rate"] = formData[field_names[7]][chemical_key];
                applicationRecord["application_rate"] = formData[field_names[8]][chemical_key];
                applicationRecord["total_amount"] = parseFloat(formData[field_names[6]][site_key]) * parseFloat(formData[field_names[8]][chemical_key]);
                applicationRecord["amount_unit_id"] = sprayOptions["chemicalUnitOptions"].find(item => item.label === (formData[field_names[0]][chemical_key]).unit).id;
                applicationRecord["total_cost"] = parseFloat(formData[field_names[6]][site_key]) * parseFloat(formData[field_names[8]][chemical_key]) * parseFloat((formData[field_names[0]][chemical_key]).cost);
                applicationRecord["rate_unit_id"] = sprayOptions["chemicalUnitOptions"].find(item => item.label === (formData[field_names[0]][chemical_key]).unit).id;
                applicationRecord["responsible_person_id"] = formData[field_names[11]]
                submitData.push(applicationRecord);
            }
        }
        return submitData
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

    const handleInputChange = (event, value, field, index = null) => {
        let fieldObj;
        if (index) {
            fieldObj = fieldValues[field] || {};
            fieldObj[index] = value;
        } else {
            fieldObj = value;
        }

        // update field values

        if (field === field_names[2]) {
            ApplicationTargeOptionsFresh(value.id, index)
            const newSiteObj = cropsToSites(fieldObj);
            const [newAppliedAreaObj, newPartialTreatment, newAltRowMiddle] = newSiteInfo(newSiteObj);
            setFieldValues({
                ...fieldValues,
                [field]: fieldObj,
                [field_names[4]]: newSiteObj,
                [field_names[6]]: newAppliedAreaObj,
                [field_names[9]]: newPartialTreatment,
                [field_names[10]]: newAltRowMiddle,
            });
            refreshSiteErrors();
        } else if (field === field_names[4]) {
            const [newCropObj, newApplicationTargetObj] = sitesToCrops(fieldObj);
            const [newAppliedAreaObj, newPartialTreatment, newAltRowMiddle] = newSiteInfo(fieldObj);
            setFieldValues({
                ...fieldValues,
                [field]: fieldObj,
                [field_names[2]]: newCropObj,
                [field_names[3]]: newApplicationTargetObj,
                [field_names[6]]: newAppliedAreaObj,
                [field_names[9]]: newPartialTreatment,
                [field_names[10]]: newAltRowMiddle,
            });
            refreshSiteErrors();
        } else if (field === field_names[5]) {
            setFieldValues({
                ...fieldValues,
                [field]: fieldObj,
            });
            setFormData({
                ...formData,
                [field]: fieldObj,
            });
        } else if (field === field_names[9]) {
            let newAppliedArea = {...fieldValues[field_names[6]]}
            if (!fieldObj[index] && !fieldValues[field_names[10]][index]) {
                newAppliedArea[index] = fieldValues[field_names[4]][index].area
            }

            setFieldValues({
                ...fieldValues,
                [field]: fieldObj,
                [field_names[6]]: newAppliedArea,
            });
        } else if (field === field_names[10]) {
            let newAppliedArea = {...fieldValues[field_names[6]]}
            if (!fieldObj[index] && !fieldValues[field_names[9]][index]) {
                newAppliedArea[index] = fieldValues[field_names[4]][index].area
            }

            setFieldValues({
                ...fieldValues,
                [field]: fieldObj,
                [field_names[6]]: newAppliedArea,
            });
        } else {
            setFieldValues({
                ...fieldValues, [field]: fieldObj,
            });
        }

        if ([field_names[0], field_names[1], field_names[7], field_names[8]].includes(field)) {
            updateCompleted(0);
        }
        if ([field_names[2], field_names[4]].includes(field)) {
            updateCompleted(1);
            updateCompleted(2);
        }
        if ([field_names[3]].includes(field)) {
            updateCompleted(1);
        }
        if ([field_names[6], field_names[9], field_names[10]].includes(field)) {
            updateCompleted(2);
        }
    };

    const handleAddField = (field) => {
        const fieldObj = fieldValues[field] || {};
        const nextKey = Object.keys(fieldObj).length;
        fieldObj[nextKey] = '';

        if (field === field_names[0]) {
            const decisionSupportObj = fieldValues[field_names[1]] || {};
            decisionSupportObj[nextKey] = '';
            const gallonsWaterObj = fieldValues[field_names[7]] || {};
            gallonsWaterObj[nextKey] = '';
            const applicationRate = fieldValues[field_names[8]] || {};
            applicationRate[nextKey] = '';

            setFieldValues({
                ...fieldValues,
                [field]: fieldObj,
                [field_names[1]]: decisionSupportObj,
                [field_names[7]]: gallonsWaterObj,
                [field_names[8]]: applicationRate,
            });
        } else if (field === field_names[2]) {
            const applicationTargetObj = fieldValues[field_names[3]] || {};
            applicationTargetObj[nextKey] = '';

            setFieldValues({
                ...fieldValues, [field]: fieldObj, [field_names[3]]: applicationTargetObj
            });
        }
    };

    const refreshSiteErrors = () => {
        setFieldErrors(
            {
                ...fieldErrors,
                [field_names[6]]: {},
            }
        );
    };

    const deleteConnectedFields = (dataField, fields, index) => {
        let fieldObjs = fields.reduce((acc, field) => {
            acc[field] = {...dataField[field]};
            return acc;
        }, {});

        Object.values(fieldObjs).map(value => {
            delete value[index];
        })

        let newFieldObjs = Object.keys(fieldObjs).reduce((acc, fieldName) => {
            acc[fieldName] = Object.values(fieldObjs[fieldName]).reduce((acc, value, idx) => {
                acc[idx] = value;
                return acc;
            }, {});
            return acc;
        }, {});

        return newFieldObjs;
    };

    const handleDeleteField = (field, index) => {
        let updatedFieldValues;
        let updatedFieldErrors;

        if (field === field_names[0]) {
            updatedFieldValues = deleteConnectedFields(fieldValues, [field_names[0], field_names[1], field_names[7], field_names[8]], index);
            updatedFieldErrors = deleteConnectedFields(fieldErrors, [field_names[0], field_names[1], field_names[7], field_names[8]], index);
        } else if (field === field_names[2]) {
            updatedFieldValues = deleteConnectedFields(fieldValues, [field_names[2], field_names[3]], index);
            updatedFieldErrors = deleteConnectedFields(fieldErrors, [field_names[2], field_names[3]], index);
            const newSiteObj = cropsToSites(updatedFieldValues[field_names[2]]);
            const [newAppliedAreaObj, newPartialTreatment, newAltRowMiddle] = newSiteInfo(newSiteObj);
            updatedFieldValues[field_names[4]] = newSiteObj;
            updatedFieldValues[field_names[6]] = newAppliedAreaObj;
            updatedFieldValues[field_names[9]] = newPartialTreatment;
            updatedFieldValues[field_names[10]] = newAltRowMiddle;
        } else {
            updatedFieldValues = {};
        }

        setFieldValues({...fieldValues, ...updatedFieldValues});
        setFieldErrors({...fieldErrors, ...updatedFieldErrors});
    };

    const ApplicationTargeOptionsFresh = (cid, index) => {
        const crop = sprayData["cropList"].find(item => item.cid === cid)

        if (crop) {
            const optionObj = {...applicationTargetOptions};
            optionObj[index] = sprayData["applicationTarget"].filter(item => {
                return (item.crop_id === sprayData["cropCategory"].find(variety => variety.name === crop.crop).ccid || item.crop_id === null);
            }).map(item => {
                return {
                    label: item.name, id: item.attid
                };
            });

            setApplicationTargetOptions(optionObj);
        }
    };

    const siteTreeFresh = () => {
        if (sprayData["siteList"]) {
            const initChecked = {};
            const initExpanded = {};
            sprayData["siteList"].forEach(tree => {
                initChecked[tree.sid] = [];
                initExpanded[tree.sid] = [];
            });
            setChecked(initChecked);
            setExpanded(initExpanded);
            setNodes(sprayData["siteList"].map(transformTreeData));
        }
    };

    const updateCompleted = (stepValue) => {
        setCompleted(prevCompleted => (
            {
                ...prevCompleted,
                [stepValue]: false
            }
        ));
    }

    const updateSiteFields = () => {
        const checkedItems = Object.values(checked).flat();

        const newSiteObj = checkedItems.map(item => {
            return siteOptions.find(option => option.id === item);
        }).filter(Boolean).reduce((acc, value, index) => {
            acc[index] = value;
            return acc;
        }, {});

        if (JSON.stringify(fieldValues[field_names[4]]) !== JSON.stringify(newSiteObj)) {
            const [newCropObj, newApplicationTargetObj] = sitesToCrops(newSiteObj);
            const [newAppliedAreaObj, newPartialTreatment, newAltRowMiddle] = newSiteInfo(newSiteObj);
            setFieldValues(prev => ({
                ...prev,
                [field_names[2]]: newCropObj,
                [field_names[3]]: newApplicationTargetObj,
                [field_names[4]]: newSiteObj,
                [field_names[6]]: newAppliedAreaObj,
                [field_names[9]]: newPartialTreatment,
                [field_names[10]]: newAltRowMiddle,
            }));
        }

        refreshSiteErrors();
    };

    const updateSiteChecked = () => {
        const checkAllChildren = (node, checkItems, checkedList) => {
            if (node && Array.isArray(node.children)) {
                node.children.forEach(child => {
                    if (checkItems.includes(child.value) && !checkedList.includes(child.value)) {
                        checkedList.push(child.value);
                    }
                    checkAllChildren(child, checkItems, checkedList);
                });
            }
        }

        const checkItems = Object.values(fieldValues[field_names[4]]).map(item => item.id);
        let newChecked = Object.keys(checked).reduce((acc, key) => {
            acc[key] = [];
            return acc;
        }, {});

        Object.keys(newChecked).forEach(key => {
            const node = nodes.find(item => item.value === key);
            checkAllChildren(node, checkItems, newChecked[key]);
        });

        if (JSON.stringify(checked) !== JSON.stringify(newChecked)) {
            setChecked(newChecked);
        }
    };

    const updateResponsiblePerson = () => {
        if (selectedResponsible) {
            setFieldValues(prev => ({
                ...prev,
                [field_names[11]]: selectedResponsible,
            }));

            setFormData(prev => ({
                ...prev,
                [field_names[11]]: selectedResponsible,
            }));

            setCompleted(prev => ({
                ...prev,
                [3]: true,
            }));
        }
    }

    const transformTreeData = (node) => ({
        value: node.sid.toString(),
        label: node.type + " - " + node.name,
        children: Array.isArray(node.children) ? node.children.map(transformTreeData) : [],
    });

    const cropsToSites = (cropOptions) => {
        const cropIDList = Object.values(cropOptions)
            .filter(crop => crop.id !== undefined)
            .map(crop => {
                return crop.id;
            });
        const uniqueCropIDList = [...new Set(cropIDList)];

        let siteObj = Object.values(siteOptions).filter(option => uniqueCropIDList.includes(option.cid))
            .reduce((acc, value, index) => {
                acc[index] = value;
                return acc;
            }, {});
        return siteObj;
    }

    const newSiteInfo = (siteSelected) => {
        const preSiteSelected = fieldValues[field_names[4]];
        const preAppliedArea = fieldValues[field_names[6]];
        const prePartialTreatment = fieldValues[field_names[9]];
        const preAltRowMiddle = fieldValues[field_names[10]];

        let newAppliedAreaObj = {};
        let newPartialTreatment = {};
        let newAltRowMiddle = {};

        Object.keys(siteSelected).map(index => {
            const site_index = Object.keys(preSiteSelected).find(pre_index => JSON.stringify(siteSelected[index]) === JSON.stringify(preSiteSelected[pre_index]));
            if (site_index) {
                newAppliedAreaObj[index] = preAppliedArea[site_index];
                newPartialTreatment[index] = prePartialTreatment[site_index];
                newAltRowMiddle[index] = preAltRowMiddle[site_index];
            } else {
                newAppliedAreaObj[index] = siteSelected[index].area;
                newPartialTreatment[index] = false;
                newAltRowMiddle[index] = false;
            }
        })

        return [newAppliedAreaObj, newPartialTreatment, newAltRowMiddle]
    }

    const sitesToCrops = (siteSelected) => {
        const cropIDList = Object.values(siteSelected)
            .filter(site => site.cid !== undefined)
            .map(site => {
                return site.cid;
            });
        const uniqueCropIDList = [...new Set(cropIDList)];
        const cropFieldSelected = sprayOptions["cropOptions"].filter(option => uniqueCropIDList.includes(option.id));

        let newCropObj = {};
        let newApplicationTargetObj = {};
        let index = 0;
        for (let prop in fieldValues[field_names[2]]) {
            if (fieldValues[field_names[2]][prop] !== "") {
                newCropObj[index] = fieldValues[field_names[2]][prop];
                newApplicationTargetObj[index] = fieldValues[field_names[3]][prop];
                ApplicationTargeOptionsFresh(fieldValues[field_names[2]][prop].id, index)
                index++;
            }
        }

        for (let prop in newCropObj) {
            if (!cropFieldSelected.includes(newCropObj[prop])) {
                delete newCropObj[prop];
                delete newApplicationTargetObj[prop];
            }
        }
        cropFieldSelected.map(crop => {
            if (!Object.values(newCropObj).includes(crop)) {
                const index = Object.keys(newCropObj).length
                newCropObj[index] = crop;
                newApplicationTargetObj[index] = "";
                ApplicationTargeOptionsFresh(crop.id, index)
            }
        })

        return [newCropObj, newApplicationTargetObj]
    }

    const closeModal = () => {
        setAddSprayCard(false);
    }

    const chemicalSelectionRender = () => {
        return Object.keys(fieldValues[field_names[0]]).map((rowIdx) => (
            <Grid item xs={12} key={rowIdx}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={11}>
                        <Autocomplete
                            id={`${rowIdx}`}
                            value={fieldValues[field_names[0]][rowIdx]}
                            options={sprayOptions["chemicalOptions"] || []}
                            disableClearable={true}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[0], rowIdx);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    placeholder={"EPA NO. | Trade Name | Cost per Unit | Purchase Date"}
                                    label={"Chemical " + (Number(rowIdx) + 1)}
                                    error={fieldErrors?.[field_names[0]]?.[rowIdx] || false}/>)}
                        />
                    </Grid>
                    <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                        <Button variant="contained" color="secondary"
                                onClick={() => handleDeleteField(field_names[0], rowIdx)}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            id={`${rowIdx}`}
                            value={fieldValues[field_names[1]][rowIdx]}
                            options={sprayOptions["decisionSupportOptions"] || []}
                            disableClearable={true}
                            onChange={(event, value) => {
                                handleInputChange(event, value, field_names[1], rowIdx);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label={"Decision Support " + (Number(rowIdx) + 1)}
                                    error={fieldErrors?.[field_names[1]]?.[rowIdx] || false}/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            label={"Gallons Water Rate " + (Number(rowIdx) + 1)}
                            type="number"
                            inputProps={{
                                step: 0.01,
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment
                                        position="end">{`per site unit`}
                                    </InputAdornment>,
                            }}
                            error={fieldErrors?.[field_names[7]]?.[rowIdx] || false}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[7], rowIdx);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            label={"Application Rate " + (Number(rowIdx) + 1)}
                            type="number"
                            inputProps={{
                                step: 0.01,
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment
                                        position="end">{`${fieldValues?.[field_names[0]]?.[rowIdx]?.unit ? fieldValues?.[field_names[0]]?.[rowIdx]?.unit : ""} per site unit`}
                                    </InputAdornment>,
                            }}
                            error={fieldErrors?.[field_names[8]]?.[rowIdx] || false}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[8], rowIdx);
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>))
    }

    const chemicalStepRender = () => {
        return (
            <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <h1>Create Spray Card Process</h1>
                </Grid>
                {chemicalSelectionRender()}
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Button variant="contained" color="primary" sx={{mb: 2}}
                            onClick={() => handleAddField(field_names[0])}>
                        Add Chemical
                    </Button>
                </Grid>
            </Grid>
        );
    }

    const cropSelectionRender = () => {
        return Object.keys(fieldValues[field_names[2]]).map((rowIdx) => (<React.Fragment key={rowIdx}>
            <Grid item xs={1.5}/>
            <Grid item xs={4}>
                <Autocomplete
                    id={`${rowIdx}`}
                    value={fieldValues[field_names[2]][rowIdx]}
                    options={sprayOptions["cropOptions"] || []}
                    disableClearable={true}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[2], rowIdx);
                    }}
                    renderInput={(params) => (<TextField
                        {...params}
                        fullWidth
                        required
                        variant="outlined"
                        placeholder={"Crop (Variety, Growth Stage)"}
                        label={"Crop " + (Number(rowIdx) + 1)}
                        error={fieldErrors?.[field_names[2]]?.[rowIdx] || false}/>)}
                />
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    id={`${rowIdx}`}
                    value={fieldValues[field_names[3]][rowIdx]}
                    options={applicationTargetOptions[rowIdx] || []}
                    disableClearable={true}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[3], rowIdx);
                    }}
                    renderInput={(params) => (<TextField
                        {...params}
                        fullWidth
                        required
                        variant="outlined"
                        label={"Pesticide Target " + (Number(rowIdx) + 1)}
                        error={fieldErrors?.[field_names[3]]?.[rowIdx] || false}/>)}
                />
            </Grid>
            <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                <Button variant="contained" color="secondary"
                        onClick={() => handleDeleteField(field_names[2], rowIdx)}>
                    Delete
                </Button>
            </Grid>
            <Grid item xs={1.5}/>
        </React.Fragment>))
    }

    const cropStepRender = () => {
        return (<Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sx={{textAlign: 'center'}}>
                <h1>Create Spray Card Process</h1>
            </Grid>
            {cropSelectionRender()}
            <Grid item xs={12} sx={{textAlign: 'center'}}>
                <Button variant="contained" color="primary" sx={{mb: 2}}
                        onClick={() => handleAddField(field_names[2])}>
                    Add Crop
                </Button>
            </Grid>
        </Grid>);
    }

    const sortSiteOptions = (options, selectedCropOptions) => {
        const orderFirstSiteOptions = Object.values(cropsToSites(selectedCropOptions));
        return options.sort((a, b) => {
            if (orderFirstSiteOptions.includes(a) && orderFirstSiteOptions.includes(b)) {
                return orderFirstSiteOptions.indexOf(a) - orderFirstSiteOptions.indexOf(b);
            }
            if (orderFirstSiteOptions.includes(a)) {
                return -1;
            }
            if (orderFirstSiteOptions.includes(b)) {
                return 1;
            }
            return 0;
        });
    }

    const siteInfoRender = () => {
        return (
            <Grid item xs={12} style={{marginBottom: 24}}>
                <Grid container justifyContent="center" spacing={2}>
                    {Object.keys(fieldValues[field_names[4]]).map((rowIdx) =>
                        (
                            <React.Fragment key={rowIdx}>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        value={fieldValues[field_names[4]][rowIdx].label}
                                        label={"Site " + (Number(rowIdx) + 1)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{readOnly: true}}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    {fieldValues[field_names[9]][rowIdx] || fieldValues[field_names[10]][rowIdx] ?
                                        (<TextField
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            value={isNaN(parseFloat(fieldValues[field_names[6]][rowIdx])) ? '' : parseFloat(fieldValues[field_names[6]][rowIdx])}
                                            label={"Applied Area " + (Number(rowIdx) + 1)}
                                            type="number"
                                            inputProps={{
                                                step: 0.01,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment
                                                    position="end">{fieldValues[field_names[4]][rowIdx].unit}</InputAdornment>,
                                            }}
                                            onChange={(event) => {
                                                handleInputChange(event, event.target.value, field_names[6], rowIdx);
                                            }}
                                            error={fieldErrors?.[field_names[6]]?.[rowIdx] || false}/>) :
                                        (<TextField
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            value={fieldValues[field_names[6]][rowIdx]}
                                            label={"Applied Area " + (Number(rowIdx) + 1)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment:
                                                    <InputAdornment
                                                        position="end">{fieldValues[field_names[4]][rowIdx].unit}</InputAdornment>,
                                            }}
                                        />)}
                                </Grid>
                                <Grid item xs={3} container justifyContent="center" alignItems="center">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!!fieldValues[field_names[10]][rowIdx]}
                                                onChange={(event, value) => {
                                                    handleInputChange(event, value, field_names[9], rowIdx);
                                                }}/>}
                                        label="Partial Treatment"/>
                                </Grid>
                                <Grid item xs={3} container justifyContent="center" alignItems="center">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!!fieldValues[field_names[9]][rowIdx]}
                                                onChange={(event, value) => {
                                                    handleInputChange(event, value, field_names[10], rowIdx);
                                                }}/>}
                                        label="Alt Row Middle"/>
                                </Grid>
                            </React.Fragment>
                        ))
                    }
                </Grid>
            </Grid>
        );
    }

    const siteSelectionRender = () => {
        return (
            <>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        size="small"
                        value={Object.values(fieldValues[field_names[4]])}
                        options={sortSiteOptions(siteOptions, fieldValues[field_names[2]])}
                        getOptionLabel={(option) => option.label}
                        groupBy={(option) => option.crop}
                        disableCloseOnSelect
                        onChange={(event, value) => {
                            handleInputChange(event, value, field_names[4]);
                        }}
                        renderOption={(props, option, {selected}) => (<li {...props} style={{padding: '2px'}}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{marginRight: 8}}
                                checked={selected}
                            />
                            {option.label}
                        </li>)}
                        renderInput={(params) => (<TextField
                            {...params}
                            variant="outlined"
                            label="Selected Sites"
                            error={fieldErrors?.[field_names[4]] || false}
                        />)}
                        renderGroup={(params) => {
                            return (<li key={params.key}>
                                <GroupHeader>{params.group}</GroupHeader>
                                <GroupItems>{params.children}</GroupItems>
                            </li>);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <SiteTreeView {...siteTreeProps}/>
                    </Grid>
                </Grid>
            </>
        );
    }

    const siteStepRender = () => {
        return (
            <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <h1>Create Spray Card Process</h1>
                </Grid>
                {siteSelectionRender()}
                {siteInfoRender()}
            </Grid>
        );
    }

    const responsibleRender = () => {
        return (
            <>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <UserTreeView {...userTreeProps}/>
                </Grid>
                <Grid item xs={4}/>
            </>
        );
    }

    const responsibleStepRender = () => {
        return (
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <h1>Create Spray Card Process</h1>
                </Grid>
                {responsibleRender()}
            </Grid>);
    }

    const updateError = (fieldValue, fieldName) => {
        setFieldErrors(prevErrors => {
            let newErrors = {...prevErrors};
            if (!newErrors[fieldName]) {
                newErrors[fieldName] = {};
            }

            if (fieldName === field_names[4]) {
                newErrors[fieldName] = Object.values(fieldValue).length === 0;
            } else {
                for (let index in fieldValue) {
                    if (fieldValue.hasOwnProperty(index)) {
                        newErrors[fieldName][index] = fieldValue[index] === '';
                    }
                }
            }

            return newErrors;
        });
    }

    const checkFields = (fieldValue, fieldName) => {
        let valueList = Object.values(fieldValue);
        if (valueList.length === 0) {
            updateError(fieldValue, fieldName);
            return false;
        } else if (!valueList.every(item => item !== "")) {
            updateError(fieldValue, fieldName);
            return false;
        } else {
            updateError(fieldValue, fieldName);
            return true;
        }
    }

    const saveChemicals = () => {
        const isValidField1 = checkFields(fieldValues[field_names[0]], field_names[0]);
        const isValidField2 = checkFields(fieldValues[field_names[1]], field_names[1]);
        const isValidField3 = checkFields(fieldValues[field_names[7]], field_names[7]);
        const isValidField4 = checkFields(fieldValues[field_names[8]], field_names[8]);

        if (isValidField1 && isValidField2 && isValidField3 && isValidField4) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [field_names[0]]: fieldValues[field_names[0]],
                [field_names[1]]: fieldValues[field_names[1]],
                [field_names[7]]: fieldValues[field_names[7]],
                [field_names[8]]: fieldValues[field_names[8]],
            }));
            return true;
        } else {
            setErrorSnackbar(true);
            return false;
        }
    }

    const saveCrops = () => {
        const isValidField1 = checkFields(fieldValues[field_names[2]], field_names[2]);
        const isValidField2 = checkFields(fieldValues[field_names[3]], field_names[3]);

        if (isValidField1 && isValidField2) {
            setFormData({
                ...formData,
                [field_names[2]]: fieldValues[field_names[2]],
                [field_names[3]]: fieldValues[field_names[3]]
            });
            return true
        } else {
            setErrorSnackbar(true);
            return false;
        }
    }

    const saveSites = () => {
        const isValidField1 = checkFields(fieldValues[field_names[4]], field_names[4]);
        const isValidField2 = checkFields(fieldValues[field_names[6]], field_names[6]);

        if (isValidField1 && isValidField2) {
            setFormData({
                ...formData,
                [field_names[4]]: fieldValues[field_names[4]],
                [field_names[6]]: fieldValues[field_names[6]],
                [field_names[9]]: fieldValues[field_names[9]],
                [field_names[10]]: fieldValues[field_names[10]],
            });
            return true
        } else {
            setErrorSnackbar(true);
            return false;
        }
    }

    async function submitSprayCardData() {
        const opid = await SprayCardCreate();
        await SprayCardInitiate(opid);
    }

    const userTreeProps = {
        sprayData,
        selected: selectedResponsible,
        setSelected: setSelectedResponsible
    };

    const stepperProps = {
        steps,
        activeStep,
        setActiveStep,
        completed,
        setCompleted,
        saveChemicals,
        saveCrops,
        saveSites,
        submitSprayCardData,
        closeModal,
        buttonText: "Create"
    };

    const siteTreeProps = {
        sprayData,
        field_names,
        fieldValues,
        setFieldValues,
        siteOptions,
        end_site_types,
        checked,
        setChecked,
        expanded,
        setExpanded,
        nodes
    };

    const createSuccessProps = {
        open: successSnackbar,
        setOpen: setSuccessSnackbar,
        msg: "Spray Card Process Initiated Successfully.",
        tag: "success"
    };

    const saveErrorProps = {
        open: errorSnackbar, setOpen: setErrorSnackbar, msg: "None data or uncompleted data found.", tag: "error"
    };

    useEffect(() => {
        updateSiteFields();
        updateCompleted(1);
        updateCompleted(2);
    }, [checked]);

    useEffect(() => {
        updateSiteChecked();
    }, [fieldValues]);

    useEffect(() => {
        updateResponsiblePerson();
    }, [selectedResponsible]);

    useEffect(() => {
        setFieldValues(initialFieldValues);
        setFieldErrors({});
        setFormData({});
        setActiveStep(0);
        setCompleted({0: false, 1: false, 2: false, 3:false});
        siteTreeFresh();
    }, [addSprayCard]);

    useEffect(() => {
        setSiteOptions(sprayOptions?.siteOptions || []);
        siteTreeFresh();
    }, [sprayData, sprayOptions]);

    return (
        <>
            <Modal
                open={addSprayCard}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}>
                <Card sx={{width: 1200}}>
                    <CardContent>
                        <Box sx={{width: '100%', flexGrow: 1}}>
                            <Box sx={{width: '100%', minHeight: 400, maxHeight: 800, overflow: 'auto'}}>
                                <div style={{display: activeStep === 0 ? 'block' : 'none'}}>
                                    {chemicalStepRender()}
                                </div>
                                <div style={{display: activeStep === 1 ? 'block' : 'none'}}>
                                    {cropStepRender()}
                                </div>
                                <div style={{display: activeStep === 2 ? 'block' : 'none'}}>
                                    {siteStepRender()}
                                </div>
                                <div style={{display: activeStep === 3 ? 'block' : 'none'}}>
                                    {responsibleStepRender()}
                                </div>
                            </Box>
                            <ModalStepper {...stepperProps}/>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
            <OperationSnackbars  {...createSuccessProps}/>
            <OperationSnackbars  {...saveErrorProps}/>
        </>
    );
}