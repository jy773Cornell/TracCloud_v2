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
    "equipment", "amount_pesticide_per_tank",
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
    const [warningSnackbar, setWarningSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);

    const [cropSiteInfo, setCropSiteInfo] = useState({});
    const [chemicalInfo, setChemicalInfo] = React.useState([]);

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

            const recordData = {
                "applicator_id": uid,
                "start_datetime": fieldValues[field_names[0]],
                "finish_datetime": fieldValues[field_names[1]],
                "harvestable_date": addDaysToDate(fieldValues[field_names[1]], chemicalList[chemical_idx].phi),
                "equipment_id": fieldValues[field_names[2]],
                "amount_pesticide_per_tank": fieldValues[field_names[3]][chemical_idx],
                "average_temp": fieldValues[field_names[4]],
                "wind_speed": fieldValues[field_names[5]],
                "wind_direction": fieldValues[field_names[6]],
            }

            submitData["data"][record.arid] = (recordData);
        }

        return submitData
    }

    const addDaysToDate = (dateString, daysString) => {
        const initialDate = new Date(dateString);
        const days = parseFloat(daysString);
        let newDate;

        if (days === 0) {
            newDate = new Date(initialDate.getTime());
        } else {
            const millisecondsToAdd = (days + 1) * 24 * 60 * 60 * 1000;
            newDate = new Date(initialDate.getTime() + millisecondsToAdd);
        }

        return newDate.toISOString().slice(0, 10);
    }

    const handleInputChange = (event, value, field, index = null) => {
        let fieldObj;
        if (index) {
            fieldObj = fieldValues[field] || {};
            fieldObj[index] = value;
        } else {
            fieldObj = value;
        }

        setFieldValues(prevValues => ({
            ...prevValues, [field]: fieldObj
        }));
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

    const checkFields = () => {
        let valid = true;
        setFieldErrors(initialFieldErrors);
        const checkFieldNames = [field_names[2]];

        checkFieldNames.map(field => {
            if (!fieldValues[field]) {
                setFieldErrors(prevValues => ({
                    ...prevValues, [field]: true
                }));
                valid = false;
            }
        })

        return valid;
    };

    const checkDateFields = () => {
        return (dayjs(fieldValues[field_names[1]]).isAfter(dayjs(fieldValues[field_names[0]])));
    }

    const handleCompleteButtonClicked = () => {
        if (!checkDateFields()) {
            setWarningSnackbar(true);
            return;
        }

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

    const sprayEquipmentRender = () => {
        return (
            <Grid item xs={6}>
                <Autocomplete
                    disableClearable={true}
                    options={sprayOptions["equipmentOptions"] || []}
                    onChange={(event, value) => {
                        handleInputChange(event, value.id, field_names[2]);
                    }}
                    renderInput={(params) => (<TextField {...params}
                                                         required
                                                         variant="outlined"
                                                         placeholder={"Equipment (Owner, Code)"}
                                                         label={"Equipment"}
                                                         error={fieldErrors?.[field_names[2]] || false}/>)}
                />
            </Grid>
        );
    };

    const sprayChemicalRender = () => {
        return (
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                    {Object.keys(chemicalInfo).map((rowIdx) => (<React.Fragment key={rowIdx}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={chemicalInfo[rowIdx].label}
                                label={"Chemical " + (Number(rowIdx) + 1) + "  EPA NO. | Trade Name | Gallons Water Rate | Application Rate | Cost Per unit"}
                                color="secondary"
                                focused
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label={"Amount Pesticide Per Tank"}
                                color="secondary"
                                type="number"
                                inputProps={{
                                    step: 0.01,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        {`${chemicalInfo[rowIdx].unit}`}
                                    </InputAdornment>,
                                }}
                                onChange={(event) => {
                                    handleInputChange(event, event.target.value, field_names[3], rowIdx);
                                }}
                            />
                        </Grid>
                    </React.Fragment>))}
                </Grid>
            </Grid>
        )
    };

    const sprayOtherRender = () => {
        return (
            <>
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
                            handleInputChange(event, event.target.value, field_names[4]);
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
                            handleInputChange(event, event.target.value, field_names[5]);
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Autocomplete
                        disableClearable={true}
                        options={windDirections}
                        onChange={(event, value) => {
                            handleInputChange(event, value.label, field_names[6]);
                        }}
                        renderInput={(params) => (<TextField {...params}
                                                             variant="outlined"
                                                             label={"Wind Direction"}
                        />)}
                    />
                </Grid>
            </>
        );
    };

    const sprayCompleteRender = () => {
        return (
            <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <h1>Complete Spray Card</h1>
                </Grid>
                {sprayTimeRender()}
                {sprayCropSiteRender()}
                {sprayEquipmentRender()}
                {sprayChemicalRender()}
                {sprayOtherRender()}
            </Grid>
        );
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
        } else if (cur === field_names[3]) {
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
        acc[cur] = false;
        return acc;
    }, {});

    const completeSuccessProps = {
        open: successSnackbar,
        setOpen: setSuccessSnackbar,
        msg: "Spray Card Process Completed Successfully.",
        tag: "success"
    };

    const completeWarningProps = {
        open: warningSnackbar,
        setOpen: setWarningSnackbar,
        msg: "Finish time must be later than start time.",
        tag: "warning"
    };

    const completeErrorProps = {
        open: errorSnackbar, setOpen: setErrorSnackbar, msg: "Uncompleted data found.", tag: "error"
    };

    useEffect(() => {
        updateCorpSiteInfo();
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
            <OperationSnackbars  {...completeWarningProps}/>
            <OperationSnackbars  {...completeErrorProps}/>
        </>
    );
}