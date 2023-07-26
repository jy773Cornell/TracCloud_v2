import * as React from 'react';
import {lazy, useEffect, useState} from 'react';
import {Autocomplete, Button, Grid, InputAdornment, TextField} from "@mui/material";
import {getCookie} from "../../../utils";

const OperationSnackbars = lazy(() => import('../../../components/Snackbars'))
const ConfirmPopover = lazy(() => import('../ConfirmPopover'))
const SprayCardEdit = lazy(() => import('../SprayCardEdit'))
const SprayCardComplete = lazy(() => import('../SprayCardComplete'))

export default function sprayCardContent({
                                             uid,
                                             sprayData,
                                             sprayCardSelected,
                                             sprayOptions,
                                             setAssignSprayCard,
                                             refreshRecord,
                                             setRefreshRecord,
                                             privilege
                                         }) {
    const [sprayCardContents, setSprayCardContents] = React.useState([]);
    const [chemicalContents, setChemicalContents] = React.useState([]);
    const [totalAmount, setTotalAmount] = React.useState([]);
    const [totalCost, setTotalCost] = React.useState([]);
    const [decisionContents, setDecisionContents] = React.useState([]);
    const [cropContents, setCropContents] = React.useState([]);
    const [targetContents, setTargetContents] = React.useState([]);
    const [siteContents, setSiteContents] = React.useState([]);

    const [returnSuccessSnackbar, setReturnSuccessSnackbar] = useState(false);
    const [withdrawSuccessSnackbar, setWithdrawSuccessSnackbar] = useState(false);
    const [returnPopover, setReturnPopover] = useState(null);
    const [withdrawPopover, setWithdrawPopover] = useState(null);
    const [completeSprayCard, setCompleteSprayCard] = useState(false);
    const [editSprayCard, setEditSprayCard] = useState(false);

    async function SprayCardContentGet(scpid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/workflow/spraycard/content/get/" + "?scpid=" + scpid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setSprayCardContents(data.data);
                    })
                }
            })
    }

    async function SprayCardReturn(spray_card_id, holder_id) {
        const apiData = {"spray_card_id": spray_card_id, "holder_id": holder_id};
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
        await fetch("/workflow/spraycard/return/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setReturnSuccessSnackbar(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    async function SprayCardWithdraw(spray_card_id, owner_id) {
        const apiData = {"spray_card_id": spray_card_id, "owner_id": owner_id};
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
        await fetch("/workflow/spraycard/withdraw/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setWithdrawSuccessSnackbar(true);
                    setRefreshRecord(~refreshRecord);
                }
            })
    }

    const handleCompleteButtonClicked = () => {
        setCompleteSprayCard(true);
    };

    const handleAssignButtonClicked = () => {
        setAssignSprayCard(true);
    };

    const handleEditButtonClicked = () => {
        setEditSprayCard(true);
    };

    const performReturnAction = () => {
        SprayCardReturn(sprayCardSelected.scpid, uid);
    };

    const performWithdrawAction = () => {
        SprayCardWithdraw(sprayCardSelected.scpid, uid);
    };

    const handleOperationButtonClicked = (event, action) => {
        if (action === 'return') {
            setReturnPopover(event.currentTarget);
        } else if (action === 'withdraw') {
            setWithdrawPopover(event.currentTarget);
        }
    };

    const handleClosePopover = (action) => {
        if (action === 'return') {
            setReturnPopover(null);
        } else if (action === 'withdraw') {
            setWithdrawPopover(null);
        }
    };

    const updateSprayCardContent = () => {
        const uniqueChemicalPurchases = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.chemical_purchase), item.chemical_purchase])).values()];

        let applicationRate = []
        for (let i = 0; i < uniqueChemicalPurchases.length; i++) {
            applicationRate.push(sprayCardContents.find(item => JSON.stringify(item.chemical_purchase) === JSON.stringify(uniqueChemicalPurchases[i])).application_rate);
        }

        let tempUniqueChemicalPurchases = JSON.parse(JSON.stringify(uniqueChemicalPurchases));
        for (let i = 0; i < tempUniqueChemicalPurchases.length; i++) {
            tempUniqueChemicalPurchases[i].label = tempUniqueChemicalPurchases[i].label + " | " + applicationRate[i] + " " + tempUniqueChemicalPurchases[i].unit;
        }
        setChemicalContents(tempUniqueChemicalPurchases);

        let uniqueDecisions = [];
        for (let i = 0; i < uniqueChemicalPurchases.length; i++) {
            uniqueDecisions.push(sprayCardContents.find(item => JSON.stringify(item.chemical_purchase) === JSON.stringify(uniqueChemicalPurchases[i])).decision_support);
        }
        setDecisionContents(uniqueDecisions);

        let tempTotalAmount = [];
        for (let i = 0; i < uniqueChemicalPurchases.length; i++) {
            let sum = sprayCardContents
                .filter(item => JSON.stringify(item.chemical_purchase) === JSON.stringify(uniqueChemicalPurchases[i]))
                .reduce((acc, item) => acc + parseFloat(item.total_amount), 0);
            tempTotalAmount.push(sum);
        }
        setTotalAmount(tempTotalAmount);

        let tempTotalCost = [];
        for (let i = 0; i < uniqueChemicalPurchases.length; i++) {
            let sum = sprayCardContents
                .filter(item => JSON.stringify(item.chemical_purchase) === JSON.stringify(uniqueChemicalPurchases[i]))
                .reduce((acc, item) => acc + parseFloat(item.total_cost), 0);
            tempTotalCost.push(sum);
        }
        setTotalCost(tempTotalCost);

        const uniqueCrops = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.crop), item.crop])).values()];
        setCropContents(uniqueCrops);

        let uniqueTargets = [];
        for (let i = 0; i < uniqueCrops.length; i++) {
            uniqueTargets.push(sprayCardContents.find(item => JSON.stringify(item.crop) === JSON.stringify(uniqueCrops[i])).target);
        }
        setTargetContents(uniqueTargets);

        const uniqueSites = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.site), item.site])).values()];
        setSiteContents(uniqueSites);
    };

    const chemicalContentRender = () => {
        return (
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                    {Object.keys(chemicalContents).map((rowIdx) => (
                        <React.Fragment key={rowIdx}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={chemicalContents[rowIdx].label}
                                    label={"Chemical " + (Number(rowIdx) + 1) + "  EPA NO. | Trade Name | Cost Per unit | Purchase Date | Application Rate"}
                                    color="secondary"
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={totalAmount[rowIdx]}
                                    label={"Total Amount " + (Number(rowIdx) + 1)}
                                    color="secondary"
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: <InputAdornment
                                            position="end">{chemicalContents[rowIdx].unit}</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={totalCost[rowIdx]}
                                    label={"Total Cost " + (Number(rowIdx) + 1)}
                                    color="secondary"
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={decisionContents[rowIdx].label}
                                    label={"Decision Support " + (Number(rowIdx) + 1)}
                                    color="secondary"
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </React.Fragment>))}
                </Grid>
            </Grid>
        )
    };

    const siteContentRender = () => {
        return siteContents.length ? (
            <Grid item xs={12}>
                <Autocomplete
                    multiple
                    value={siteContents || []}
                    options={siteContents || []}
                    getOptionLabel={(option) => option.label}
                    readOnly
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Sites"
                            color="success"
                            focused
                        />)}
                />
            </Grid>
        ) : null
    };

    const cropContentRender = () => {
        return (
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                    {Object.keys(cropContents).map((rowIdx) => (
                        <React.Fragment key={rowIdx}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={cropContents[rowIdx].label}
                                    label={"Crop " + (Number(rowIdx) + 1) + " (Variety, Growth Stage)"}
                                    color="warning"
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={targetContents[rowIdx].label}
                                    label={"Application Target " + (Number(rowIdx) + 1)}
                                    color="warning"
                                    focused
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </Grid>
        )
    };

    const completeCondition = () => {
        return (
            sprayCardSelected?.holder_id === uid
        );
    };

    const returnCondition = () => {
        return (
            sprayCardSelected?.holder_id === uid &&
            sprayCardSelected?.holder_id !== sprayCardSelected?.owner_id);
    };

    const editCondition = () => {
        return (
            sprayCardSelected?.owner_id === uid &&
            sprayCardSelected?.holder_id === sprayCardSelected?.owner_id);
    };

    const withdrawCondition = () => {
        return (
            sprayCardSelected?.owner_id === uid
            && sprayCardSelected?.state !== 'archived'
        );
    };

    const operationRender = () => {
        return (
            <React.Fragment>
                <Grid item xs={2.4}>
                    <Button
                        onClick={() => handleAssignButtonClicked()}
                        disabled={!privilege.spraycard_a}
                    >
                        Assign
                    </Button>
                </Grid>
                <Grid item xs={2.4}>
                    <Button
                        aria-describedby={'return-popover'}
                        disabled={!returnCondition()}
                        onClick={(event) => handleOperationButtonClicked(event, 'return')}>
                        Return
                    </Button>
                    <ConfirmPopover
                        id={'return-popover'}
                        open={Boolean(returnPopover)}
                        anchorEl={returnPopover}
                        onClose={() => handleClosePopover('return')}
                        action={performReturnAction}
                        buttonText={"Return to the last assigner?"}
                    />
                </Grid>
                <Grid item xs={2.4}>
                    <Button
                        disabled={!completeCondition()}
                        onClick={() => handleCompleteButtonClicked()}>
                        Complete
                    </Button>
                </Grid>
                <Grid item xs={2.4}>
                    <Button
                        disabled={!editCondition()}
                        onClick={() => handleEditButtonClicked()}>
                        Edit
                    </Button>
                </Grid>
                <Grid item xs={2.4}>
                    <Button
                        aria-describedby={'withdraw-popover'}
                        disabled={!withdrawCondition()}
                        onClick={(event) => handleOperationButtonClicked(event, 'withdraw')}>
                        Withdraw
                    </Button>
                    <ConfirmPopover
                        id={'withdraw-popover'}
                        open={Boolean(withdrawPopover)}
                        anchorEl={withdrawPopover}
                        onClose={() => handleClosePopover('withdraw')}
                        action={performWithdrawAction}
                        buttonText={"Withdraw the spray card?"}
                    />
                </Grid>
            </React.Fragment>
        );
    };

    const returnSuccessProps = {
        open: returnSuccessSnackbar,
        setOpen: setReturnSuccessSnackbar,
        msg: "Spray Card Process Returned Successfully.",
        tag: "success"
    };

    const withdrawSuccessProps = {
        open: withdrawSuccessSnackbar,
        setOpen: setWithdrawSuccessSnackbar,
        msg: "Spray Card Process Withdrew Successfully.",
        tag: "success"
    };

    const SprayCardEditProps = {
        uid,
        sprayData,
        sprayOptions,
        sprayCardContents,
        refreshRecord,
        editSprayCard,
        setEditSprayCard,
        setRefreshRecord,
        setAssignSprayCard,
        sprayCardSelected,
        privilege
    };

    const SprayCardCompleteProps = {
        uid,
        sprayData,
        sprayOptions,
        sprayCardContents,
        refreshRecord,
        completeSprayCard,
        setCompleteSprayCard,
        setRefreshRecord,
        sprayCardSelected
    };

    useEffect(() => {
        sprayCardSelected?.scpid && SprayCardContentGet(sprayCardSelected?.scpid);
    }, [sprayCardSelected]);

    useEffect(() => {
        updateSprayCardContent()
    }, [sprayCardContents]);

    return (
        <>
            <Grid container justifyContent="center" spacing={3}>
                {["completed", "withdrew"].includes(sprayCardSelected?.state) ? null : operationRender()}
                {chemicalContentRender()}
                {cropContentRender()}
                {siteContentRender()}
            </Grid>
            <SprayCardEdit {...SprayCardEditProps}/>
            <SprayCardComplete {...SprayCardCompleteProps}/>
            <OperationSnackbars  {...returnSuccessProps}/>
            <OperationSnackbars  {...withdrawSuccessProps}/>
        </>
    );
}