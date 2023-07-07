import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Autocomplete, Card, CardContent, Checkbox, Grid, Modal, TextField} from "@mui/material";
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

const steps = ['Select Chemicals', 'Select Crops', 'Select Sites'];

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

export default function SprayCardEdit({
                                          uid,
                                          sprayData,
                                          sprayOptions,
                                          sprayCardContents,
                                          refreshRecord,
                                          editSprayCard,
                                          setEditSprayCard,
                                          setRefreshRecord,
                                          setAssignSprayCard,
                                          sprayCardSelected
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

    const [mounted, setMounted] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({0: false, 1: false, 2: false, 3: false});
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);

    async function SprayCardUpdate() {
        const apiData = {"scpid": sprayCardSelected.scpid, "records": reformatSubmitData()};
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST", headers: {
                "Content-Type": "application/json", 'X-CSRFToken': csrftoken,
            }, body: JSON.stringify(apiData),
        };
        const response = await fetch("/workflow/spraycard/update/", requestOptions)
        if (response.ok) {
            setEditSprayCard(false);
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

    const updateInitialEditFields = () => {
        let initialFieldValues = field_names.reduce((acc, cur) => {
            if ([field_names[5], field_names[11]].includes(cur)) {
                acc[cur] = "";
            } else {
                acc[cur] = {};
            }
            return acc;
        }, {});

        if (sprayCardContents) {
            const previousChemicalContents = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.chemical_purchase), item.chemical_purchase])).values()];
            const preGallonsWater = previousChemicalContents.map(item => sprayCardContents.find(spray =>
                JSON.stringify(spray.chemical_purchase) === JSON.stringify(item)
            ).gallons_water_rate);
            const preApplicationRate = previousChemicalContents.map(item => sprayCardContents.find(spray =>
                JSON.stringify(spray.chemical_purchase) === JSON.stringify(item)
            ).application_rate);
            const previousDecision = previousChemicalContents.map(item => sprayCardContents.find(spray =>
                JSON.stringify(spray.chemical_purchase) === JSON.stringify(item)
            ).decision_support);

            for (let i = 0; i < previousChemicalContents.length; i++) {
                initialFieldValues[field_names[0]][i] = previousChemicalContents[i];
                initialFieldValues[field_names[1]][i] = previousDecision[i];
                initialFieldValues[field_names[7]][i] = preGallonsWater[i];
                initialFieldValues[field_names[8]][i] = preApplicationRate[i];
            }

            const previousCrops = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.crop), item.crop])).values()];
            const previousTargets = previousCrops.map(item => sprayCardContents.find(spray =>
                JSON.stringify(spray.crop) === JSON.stringify(item)
            ).target);

            for (let i = 0; i < previousCrops.length; i++) {
                initialFieldValues[field_names[2]][i] = previousCrops[i];
                initialFieldValues[field_names[3]][i] = previousTargets[i];
                ApplicationTargeOptionsFresh(previousCrops[i].id, i)
            }

            const preSites = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.site), item.site])).values()]
            const preAppliedArea = preSites.map(item => sprayCardContents.find(spray =>
                JSON.stringify(spray.site) === JSON.stringify(item)
            ).applied_area);
            const prePartialTreatment = preSites.map(item => sprayCardContents.find(spray =>
                JSON.stringify(spray.site) === JSON.stringify(item)
            ).partial_treatment);
            const preAltRowMiddle = preSites.map(item => sprayCardContents.find(spray =>
                JSON.stringify(spray.site) === JSON.stringify(item)
            ).alt_row_middle);

            for (let i = 0; i < preSites.length; i++) {
                initialFieldValues[field_names[4]][i] = preSites[i];
                initialFieldValues[field_names[6]][i] = preAppliedArea[i];
                initialFieldValues[field_names[9]][i] = prePartialTreatment[i];
                initialFieldValues[field_names[10]][i] = preAltRowMiddle[i];
            }
        }

        setSelectedResponsible(sprayCardContents[0].responsible_person);

        return initialFieldValues
    };

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
        const crop = sprayData?.["cropList"]?.find(item => item.cid === cid)

        if (crop) {
            const optionObj = {...applicationTargetOptions};
            optionObj[index] = sprayData["applicationTarget"].filter(item => {
                return (item.crop_id === sprayData["cropCategory"].find(variety => variety.name === crop.crop).ccid || item.crop_id === null);
            }).map(item => {
                return {
                    label: item.name, id: item.attid
                };
            });

            setApplicationTargetOptions(prevOptions => ({
                ...prevOptions, ...optionObj
            }));
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
        setCompleted(prevCompleted => ({
            ...prevCompleted, [stepValue]: false
        }));
    }

    const updateSiteFields = () => {
        const checkedItems = Object.values(checked).flat();

        let newFieldValue = {...fieldValues};
        newFieldValue[field_names[4]] = checkedItems.map(item => {
            return siteOptions.find(option => option.id === item);
        }).filter(Boolean);

        if (JSON.stringify(fieldValues) !== JSON.stringify(newFieldValue)) {
            const [newCropObj, newApplicationTargetObj] = sitesToCrops(newFieldValue[field_names[4]]);
            setFieldValues({
                ...fieldValues,
                [field_names[2]]: newCropObj,
                [field_names[3]]: newApplicationTargetObj,
                [field_names[4]]: newFieldValue[field_names[4]],
            });
        }
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

        const checkItems = fieldValues[field_names[4]].map(item => item.id);
        const newChecked = {};
        sprayData["siteList"]?.forEach(tree => {
            newChecked[tree.sid] = [];
        });

        Object.keys(newChecked).forEach(key => {
            const node = nodes.find(item => item.value === key);
            checkAllChildren(node, checkItems, newChecked[key]);
        });

        if (JSON.stringify(checked) !== JSON.stringify(newChecked)) {
            setChecked(newChecked);
        }
    };

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

        return siteOptions.filter(option => uniqueCropIDList.includes(option.cid));
    }

    const sitesToCrops = (SiteOptions) => {
        const cropIDList = SiteOptions
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
        setEditSprayCard(false);
    }

    const chemicalSelectionRender = () => {
        return Object.keys(fieldValues[field_names[0]]).map((rowIdx) => (<React.Fragment key={rowIdx}>
            <Grid item xs={8}>
                <Autocomplete
                    id={`${rowIdx}`}
                    value={fieldValues[field_names[0]][rowIdx]}
                    options={sprayOptions["chemicalOptions"] || []}
                    disableClearable={true}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[0], rowIdx);
                    }}
                    renderInput={(params) => (<TextField
                        {...params}
                        fullWidth
                        required
                        variant="outlined"
                        placeholder={"EPA NO.  |  Trade Name  |  Active Ingredient  |  REI  |  PHI  |  Cost per Unit  |  Purchase Date"}
                        label={"Chemical " + (Number(rowIdx) + 1)}
                        error={fieldErrors?.[field_names[0]]?.[rowIdx] || false}/>)}
                />
            </Grid>
            <Grid item xs={3}>
                <Autocomplete
                    id={`${rowIdx}`}
                    value={fieldValues[field_names[1]][rowIdx]}
                    options={sprayOptions["decisionSupportOptions"] || []}
                    disableClearable={true}
                    onChange={(event, value) => {
                        handleInputChange(event, value, field_names[1], rowIdx);
                    }}
                    renderInput={(params) => (<TextField
                        {...params}
                        fullWidth
                        required
                        variant="outlined"
                        label={"Decision Support " + (Number(rowIdx) + 1)}
                        error={fieldErrors?.[field_names[1]]?.[rowIdx] || false}/>)}
                />
            </Grid>
            <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                <Button variant="contained" color="secondary"
                        onClick={() => handleDeleteField(field_names[0], rowIdx)}>
                    Delete
                </Button>
            </Grid>
        </React.Fragment>))
    }

    const chemicalStepRender = () => {
        return (<Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} sx={{textAlign: 'center'}}>
                <h1>Edit Spray Card Process</h1>
            </Grid>
            {chemicalSelectionRender()}
            <Grid item xs={12} sx={{textAlign: 'center'}}>
                <Button variant="contained" color="primary" sx={{mb: 2}}
                        onClick={() => handleAddField(field_names[0])}>
                    Add Chemical
                </Button>
            </Grid>
        </Grid>);
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
                        label={"Application Target " + (Number(rowIdx) + 1)}
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
        return (<Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} sx={{textAlign: 'center'}}>
                <h1>Edit Spray Card Process</h1>
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
        const orderFirstSiteOptions = cropsToSites(selectedCropOptions);
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

    const siteSelectionRender = () => {
        return (<>
            <Grid item xs={9}>
                <Grid container spacing={2}>
                    <SiteTreeView {...siteTreeProps}/>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Autocomplete
                    multiple
                    value={fieldValues[field_names[4]]}
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
        </>);
    }

    const siteStepRender = () => {
        return (<Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} sx={{textAlign: 'center'}}>
                <h1>Edit Spray Card Process</h1>
            </Grid>
            {siteSelectionRender()}
        </Grid>);
    }

    const updateError = (fieldValue, fieldName) => {
        setFieldErrors(prevErrors => {
            let newErrors = {...prevErrors};
            if (!newErrors[fieldName]) {
                newErrors[fieldName] = {};
            }
            for (let index in fieldValue) {
                if (fieldValue.hasOwnProperty(index)) {
                    newErrors[fieldName][index] = fieldValue[index] === '';
                }
            }
            return newErrors;
        });
    }

    const checkFields = (fieldValue, fieldName) => {
        let valueList = Object.values(fieldValue);
        if (valueList.length === 0) {
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

        if (isValidField1 && isValidField2) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [field_names[0]]: fieldValues[field_names[0]],
                [field_names[1]]: fieldValues[field_names[1]]
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
        const isValidField = fieldValues[field_names[4]].length !== 0;

        setFieldErrors({
            ...fieldErrors, [field_names[4]]: !isValidField
        });

        if (isValidField) {
            setFormData({
                ...formData, [field_names[4]]: fieldValues[field_names[4]],
            });
            return true
        } else {
            setErrorSnackbar(true);
            return false;
        }
    }

    function submitSprayCardData() {
        SprayCardUpdate();
    }

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
        buttonText: "Update"
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

    const updateSuccessProps = {
        open: successSnackbar,
        setOpen: setSuccessSnackbar,
        msg: "Spray Card Process Updated Successfully.",
        tag: "success"
    };

    const saveErrorProps = {
        open: errorSnackbar, setOpen: setErrorSnackbar, msg: "None data or uncompleted data found.", tag: "error"
    };

    useEffect(() => {
        if (mounted) {
            updateSiteFields();
            updateCompleted(1);
            updateCompleted(2);
        }
        setMounted(true);
    }, [checked]);

    useEffect(() => {
        updateSiteChecked();
    }, [fieldValues]);

    useEffect(() => {
        setFieldErrors({});
        setFormData({});
        setActiveStep(0);
        setCompleted({0: false, 1: false, 2: false});
        siteTreeExpandRefresh();
    }, [editSprayCard]);

    useEffect(() => {
        setFieldValues(updateInitialEditFields());
        setMounted(false);
    }, [sprayCardContents]);

    useEffect(() => {
        setSiteOptions(sprayOptions?.siteOptions || []);
        siteTreeRefresh();
        siteTreeExpandRefresh();
        setFieldValues(updateInitialEditFields());
        setMounted(false);
    }, [sprayData, sprayOptions]);

    return (<>
        <Modal
            open={editSprayCard}
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}>
            <Card sx={{width: 1250}}>
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
                        </Box>
                        <ModalStepper {...stepperProps}/>
                    </Box>
                </CardContent>
            </Card>
        </Modal>
        <OperationSnackbars  {...updateSuccessProps}/>
        <OperationSnackbars  {...saveErrorProps}/>
    </>);
}