import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Autocomplete, Card, CardContent, Checkbox, Grid, InputAdornment, Modal, TextField} from "@mui/material";
import {lazy, useEffect, useState} from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {GroupHeader, GroupItems} from "./styles";
import OperationSnackbars from "../../../components/Snackbars";
import {getCookie} from "../../../utils";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

const field_names = [
    "start_time", "finish_time",
    "total_amount", "amount_unit", "total_cost", "application_rate", "rate_unit",
    "equipment", "water_use", "water_unit",
    "average_temp", "wind_speed", "wind_direction",
]

const windDirections = [{label: 'North', id: 0}, {label: 'Northeast', id: 1}, {
    label: 'East',
    id: 2
}, {label: 'Southeast', id: 3}, {label: 'South', id: 4}, {label: 'Southwest', id: 5}, {
    label: 'West',
    id: 6
}, {label: 'Northwest', id: 7}];

export default function SprayCardComplete({
                                              uid,
                                              sprayData,
                                              sprayOptions,
                                              sprayCardContents,
                                              refreshRecord,
                                              completeSprayCard,
                                              setCompleteSprayCard,
                                              setRefreshRecord,
                                              sprayCardSelected
                                          }) {

    const [fieldValues, setFieldValues] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);

    const [cropSiteInfo, setCropSiteInfo] = useState({});
    const [chemicalInfo, setChemicalInfo] = React.useState([]);
    const [totalSiteSize, setTotalSiteSize] = useState(0);

    async function SprayCardComplete() {
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
        const response = await fetch("/workflow/spraycard/complete/", requestOptions)
        if (response.ok) {
            setSuccessSnackbar(true);
            setCompleteSprayCard(false);
            setRefreshRecord(~refreshRecord);
        }
    }

    const reformatSubmitData = () => {
        const chemicalList = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.chemical_purchase), item.chemical_purchase])).values()]

        let submitData = {"spray_card_id": sprayCardSelected.scpid, "holder_id": uid, "data": {}};
        for (let i = 0; i < sprayCardContents.length; i++) {
            const record = sprayCardContents[i];
            const chemical_idx = chemicalList.map(JSON.stringify).indexOf(JSON.stringify(record.chemical_purchase));
            const total_amount = (Number(fieldValues[field_names[5]][chemical_idx]) * Number(record.site.size)).toFixed(2).toString();
            const total_cost = (Number(fieldValues[field_names[5]][chemical_idx]) * Number(record.site.size) * Number(record.chemical_purchase.cost)).toFixed(2).toString();
            const water_use = ((Number(fieldValues[field_names[8]]) / totalSiteSize) * Number(record.site.size)).toFixed(2).toString();

            const recordData = {
                "operator_id": uid,
                "start_time": fieldValues[field_names[0]],
                "finish_time": fieldValues[field_names[1]],
                "total_amount": total_amount,
                "amount_unit_id": sprayOptions["chemicalUnitOptions"].find(item => item.label === chemicalList[chemical_idx].unit).id,
                "total_cost": total_cost,
                "application_rate": fieldValues[field_names[5]][chemical_idx],
                "rate_unit_id": sprayOptions["chemicalUnitOptions"].find(item => item.label === chemicalList[chemical_idx].unit).id,
                "applied_area": record.site.size,
                "area_unit_id": sprayOptions["siteUnitOptions"].find(item => item.label === record.site.size_unit).id,
                "equipment": fieldValues[field_names[7]],
                "water_use": water_use,
                "water_unit_id": fieldValues[field_names[9]],
                "average_temp": fieldValues[field_names[10]],
                "wind_speed": fieldValues[field_names[11]],
                "wind_direction": fieldValues[field_names[12]],
            }

            submitData["data"][record.arid] = (recordData);
        }

        return submitData
    }

    const handleInputChange = (event, value, field, index = null) => {
        let fieldObj;
        if (index) {
            fieldObj = fieldValues[field] || {};
            fieldObj[index] = value;
        } else {
            fieldObj = value;
        }

        if (field === field_names[2]) {
            setFieldValues(prevValues => ({
                ...prevValues, [field]: fieldObj, [field_names[4]]: {
                    ...prevValues[field_names[4]],
                    [index]: (Number(chemicalInfo[index].cost) * Number(value)).toFixed(2),
                }, [field_names[5]]: {
                    ...prevValues[field_names[5]],
                    [index]: (Number(value) / totalSiteSize).toFixed(2),
                },
            }));
        } else {
            setFieldValues(prevValues => ({
                ...prevValues, [field]: fieldObj
            }));
        }
    };

    const updateCorpSiteInfo = () => {
        let newCropSiteInfo = {};
        sprayCardContents.map(item => {
            const crop = item.site.crop;
            if (!newCropSiteInfo[crop]) {
                newCropSiteInfo[crop] = [];
            }

            if (!newCropSiteInfo[crop].map(JSON.stringify).includes(JSON.stringify(item.site))) {
                newCropSiteInfo[crop].push(item.site);
            }
        })

        setCropSiteInfo(newCropSiteInfo);
    };

    const updateChemicalInfo = () => {
        const uniqueChemicalPurchases = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.chemical_purchase), item.chemical_purchase])).values()]
        setChemicalInfo(uniqueChemicalPurchases);
    };

    const updateTotalSiteSize = () => {
        const uniqueSize = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.site), item.site])).values()]
        let totalSize = 0;
        uniqueSize.map(item => {
            totalSize += item.size;
        })
        setTotalSiteSize(totalSize);
    };

    const checkFields = () => {
        let valid = true;
        setFieldErrors(initialFieldErrors);
        const checkFieldNames = [field_names[2], field_names[7], field_names[8], field_names[9]];

        checkFieldNames.map(field => {
            if (field === field_names[2]) {
                Object.keys(fieldValues[field]).map(index => {
                    if (!fieldValues[field][index]) {
                        setFieldErrors(prevValues => ({
                            ...prevValues,
                            [field]: {
                                ...prevValues[field],
                                [index]: true
                            }
                        }));
                        valid = false;
                    }
                })
            } else {
                if (!fieldValues[field]) {
                    setFieldErrors(prevValues => ({
                        ...prevValues, [field]: true
                    }));
                    valid = false;
                }
            }
        })

        return valid;
    };

    const handleCompleteButtonClicked = () => {
        if (checkFields()) {
            SprayCardComplete();
        } else {
            setErrorSnackbar(true);
        }
    };

    const sprayTimeRender = () => {
        return (<>
            <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        variant="outlined"
                        label={"Start Time"}
                        value={dayjs(fieldValues[field_names[0]])}
                        onChange={(event) => {
                            handleInputChange(event, dayjs(event).format('YYYY-MM-DD HH:mm'), field_names[0]);
                        }}
                        sx={{width: '100%'}}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        variant="outlined"
                        label={"Finish Time"}
                        value={dayjs(fieldValues[field_names[1]])}
                        onChange={(event) => {
                            handleInputChange(event, dayjs(event).format('YYYY-MM-DD HH:mm'), field_names[1]);
                        }}
                        sx={{width: '100%'}}
                    />
                </LocalizationProvider>
            </Grid>
        </>);
    };

    const sprayCropSiteRender = () => {
        return (<Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
                {Object.keys(cropSiteInfo).map((crop) => (<Grid item xs={4} key={crop}>
                    <Autocomplete
                        multiple
                        value={cropSiteInfo[crop] || []}
                        options={cropSiteInfo[crop] || []}
                        getOptionLabel={(option) => option.label}
                        readOnly
                        renderInput={(params) => (<TextField
                            {...params}
                            variant="outlined"
                            label={crop}
                            color="success"
                            focused
                        />)}
                    />
                </Grid>))}
            </Grid>
        </Grid>);
    };

    const sprayChemicalRender = () => {
        return (<Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
                {Object.keys(chemicalInfo).map((index) => (<React.Fragment key={index}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={chemicalInfo[index].label}
                            label={"Chemical " + (Number(index) + 1) + "  EPA NO.  |  Trade Name  |  Active Ingredient  |  Cost per Unit  |  Purchase Date"}
                            color="secondary"
                            focused
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
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
                                    position="end">{`${chemicalInfo[index].unit}`}</InputAdornment>,
                            }}
                            label={"Total Amount"}
                            error={fieldErrors?.[field_names[2]]?.[index] || false}
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[2], index);
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={fieldValues[field_names[4]]?.[index] || 0}
                            label={"Total Cost"}
                            InputLabelProps={{
                                shrink: true, readOnly: true,
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={fieldValues[field_names[5]]?.[index] || 0}
                            label={"Application Rate"}
                            InputLabelProps={{
                                shrink: true, readOnly: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    {`${chemicalInfo[index].unit} per ${(Object.values(cropSiteInfo)[0])[0].size_unit}`}
                                </InputAdornment>,
                            }}
                        />
                    </Grid>
                </React.Fragment>))}
            </Grid>
        </Grid>);
    };

    const sprayOtherRender = () => {
        return (<>
            <Grid item xs={1.5}/>
            <Grid item xs={3}>
                <Autocomplete
                    disableClearable={true}
                    options={sprayOptions["equipmentOptions"] || []}
                    onChange={(event, value) => {
                        handleInputChange(event, value.id, field_names[7]);
                    }}
                    renderInput={(params) => (<TextField {...params}
                                                         required
                                                         variant="outlined"
                                                         placeholder={"Equipment (Owner, Code)"}
                                                         label={"Equipment"}
                                                         error={fieldErrors?.[field_names[7]] || false}/>)}
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
                    label={"Total Water Use"}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[8]);
                    }}
                    error={fieldErrors?.[field_names[8]] || false}
                />
            </Grid>
            <Grid item xs={3}>
                <Autocomplete
                    disableClearable={true}
                    options={sprayOptions["chemicalUnitOptions"] || []}
                    onChange={(event, value) => {
                        handleInputChange(event, value.id, field_names[9]);
                    }}
                    renderInput={(params) => (<TextField {...params}
                                                         required
                                                         variant="outlined"
                                                         label={"Water Unit"}
                                                         error={fieldErrors?.[field_names[9]] || false}/>)}
                />
            </Grid>
            <Grid item xs={1.5}/>
            <Grid item xs={1.5}/>
            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    inputProps={{
                        step: 0.01,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment
                            position="end">{`°F`}</InputAdornment>,
                    }}
                    label={"Average Temperature"}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[10]);
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    inputProps={{
                        step: 0.01,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment
                            position="end">{`mph`}</InputAdornment>,
                    }}
                    label={"Wind Speed"}
                    onChange={(event) => {
                        handleInputChange(event, event.target.value, field_names[11]);
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <Autocomplete
                    disableClearable={true}
                    options={windDirections}
                    onChange={(event, value) => {
                        handleInputChange(event, value.label, field_names[12]);
                    }}
                    renderInput={(params) => (<TextField {...params}
                                                         variant="outlined"
                                                         label={"Wind Direction"}
                    />)}
                />
            </Grid>
            <Grid item xs={1.5}/>
        </>);
    };

    const sprayCompleteRender = () => {
        return (<Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sx={{textAlign: 'center'}}>
                <h1>Complete Spray Card</h1>
            </Grid>
            {sprayTimeRender()}
            {sprayCropSiteRender()}
            {sprayChemicalRender()}
            {sprayOtherRender()}
        </Grid>);
    };

    const buttonRender = () => {
        return (<Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Button
                color="inherit"
                sx={{mr: 1}}
                onClick={() => setCompleteSprayCard(false)}
            >
                Later
            </Button>
            <Box sx={{flex: '1 1 auto'}}/>
            <Button
                sx={{mr: 1}}
                onClick={() => handleCompleteButtonClicked()}
            >
                Complete
            </Button>
        </Box>);
    };

    const initialValues = field_names.reduce((acc, cur) => {
        if ([field_names[0], field_names[1]].includes(cur)) {
            acc[cur] = dayjs().format('YYYY-MM-DD HH:mm');
        } else if (cur === field_names[2]) {
            acc[cur] = {};
            const uniqueChemicalPurchases = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.chemical_purchase), item.chemical_purchase])).values()]
            for (let i = 0; i < uniqueChemicalPurchases.length; i++) {
                acc[cur][i] = "";
            }
        } else {
            acc[cur] = "";
        }
        return acc;
    }, {});

    const initialFieldErrors = field_names.reduce((acc, cur) => {
        if (cur === field_names[2]) {
            acc[cur] = {};
            const uniqueChemicalPurchases = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.chemical_purchase), item.chemical_purchase])).values()]
            for (let i = 0; i < uniqueChemicalPurchases.length; i++) {
                acc[cur][i] = false;
            }
        } else {
            acc[cur] = false;
        }
        return acc;
    }, {});

    const completeSuccessProps = {
        open: successSnackbar,
        setOpen: setSuccessSnackbar,
        msg: "Spray Card Process Completed Successfully.",
        tag: "success"
    };

    const completeErrorProps = {
        open: errorSnackbar, setOpen: setErrorSnackbar, msg: "Uncompleted data found.", tag: "error"
    };

    useEffect(() => {
        updateCorpSiteInfo();
        updateTotalSiteSize();
        updateChemicalInfo();
    }, [sprayCardContents]);

    useEffect(() => {
        setFieldValues(initialValues);
        setFieldErrors(initialFieldErrors);
    }, [completeSprayCard]);

    return (
        <>
            <Modal
                open={completeSprayCard}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}>
                <Card sx={{width: 1250}}>
                    <CardContent>
                        <Box sx={{width: '100%', flexGrow: 1}}>
                            <Box sx={{width: '100%', minHeight: 400, maxHeight: 800, overflow: 'auto'}}>
                                {sprayCompleteRender()}
                                {buttonRender()}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
            <OperationSnackbars  {...completeSuccessProps}/>
            <OperationSnackbars  {...completeErrorProps}/>
        </>
    );
}