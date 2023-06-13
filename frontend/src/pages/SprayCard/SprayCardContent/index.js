import * as React from 'react';
import {useEffect, useState} from 'react';
import {Autocomplete, Button, Grid, TextField} from "@mui/material";

export default function sprayCardContent({
                                             uid,
                                             sprayCardSelected,
                                             sprayOptions,
                                             setAssignSprayCard,
                                         }) {
    const [sprayCardContents, setSprayCardContents] = React.useState([]);
    const [chemicalContents, setChemicalContents] = React.useState([]);
    const [decisionContents, setDecisionContents] = React.useState([]);
    const [cropContents, setCropContents] = React.useState([]);
    const [targetContents, setTargetContents] = React.useState([]);
    const [siteContents, setSiteContents] = React.useState([]);

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

    const handleAssignButtonClicked = () => {
        setAssignSprayCard(true);
    };

    const updateSprayCardContent = () => {
        const uniqueChemicalPurchases = [...new Set(sprayCardContents.map(item => item.chemical_purchase))]
        setChemicalContents(uniqueChemicalPurchases.map(id => sprayOptions.chemicalOptions.find(option => option.id === id)));


        const uniqueDecisions = [...new Set(sprayCardContents.map(item => item.decision_support))];
        setDecisionContents(uniqueDecisions.map(id => sprayOptions.decisionSupportOptions.find(option => option.id === id)));

        const uniqueCrops = [...new Set(sprayCardContents.map(item => item.crop))];
        setCropContents(uniqueCrops.map(id => sprayOptions.cropOptions.find(option => option.id === id)));

        const uniqueTargets = [...new Set(sprayCardContents.map(item => item.target))];
        setTargetContents(uniqueTargets.map(id => sprayOptions.targetOptions.find(option => option.id === id)));

        const uniqueSites = [...new Set(sprayCardContents.map(item => item.site))];
        setSiteContents(uniqueSites.map(id => sprayOptions.siteOptions.find(option => option.id === id)));
    };

    const chemicalContentRender = () => {
        return Object.keys(chemicalContents).map((rowIdx) => (
            <React.Fragment key={rowIdx}>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={chemicalContents[rowIdx].label}
                        label={"Chemical " + (Number(rowIdx) + 1) + "  EPA NO.  |  Trade Name  |  Active Ingredient  |  REI  |  PHI  |  Cost per Unit  |  Purchase Date"}
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
                        value={decisionContents[rowIdx].label}
                        label={"Decision Support " + (Number(rowIdx) + 1)}
                        color="secondary"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </React.Fragment>
        ))
    };

    const siteContentRender = () => {
        return (
            <Grid item xs={12}>
                <Autocomplete
                    multiple
                    size="small"
                    value={siteContents || []}
                    options={sprayOptions?.siteOptions || []}
                    getOptionLabel={(option) => option.label}
                    readOnly
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Selected Sites"
                            color="success"
                            focused
                        />)}

                />
            </Grid>
        )
    };

    const cropContentRender = () => {
        return Object.keys(cropContents).map((rowIdx) => (
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
        ))
    };

    const operationRender = () => {
        return (
            <React.Fragment>
                <Grid item xs={2.4}>
                    <Button>Complete</Button>
                </Grid>
                <Grid item xs={2.4}>
                    <Button onClick={() => handleAssignButtonClicked()}>Assign</Button>
                </Grid>
                <Grid item xs={2.4}>
                    <Button>Return</Button>
                </Grid>
                <Grid item xs={2.4}>
                    <Button disabled={sprayCardSelected?.owner_id !== uid}>Edit</Button>
                </Grid>
                <Grid item xs={2.4}>
                    <Button disabled={sprayCardSelected?.owner_id !== uid}>Withdraw</Button>
                </Grid>
            </React.Fragment>
        );
    };

    useEffect(() => {
        sprayCardSelected?.scpid && SprayCardContentGet(sprayCardSelected?.scpid);
    }, [sprayCardSelected]);

    useEffect(() => {
        updateSprayCardContent()
    }, [sprayCardContents]);

    return (
        <Grid container justifyContent="center" spacing={3}>
            {operationRender()}
            {chemicalContentRender()}
            {cropContentRender()}
            {siteContentRender()}
        </Grid>
    );
}