import * as React from 'react';
import {useEffect, useState} from "react";
import SprayCardForm from "../SprayCardCreate/SprayCardForm";

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

    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    const [selectedResponsible, setSelectedResponsible] = useState("");

    const updateInitialEditFields = () => {
        let initialFieldValues = field_names.reduce((acc, cur) => {
            if ([field_names[5], field_names[11]].includes(cur)) {
                acc[cur] = "";
            } else {
                acc[cur] = {};
            }
            return acc;
        }, {});

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
            initialFieldValues[field_names[0]][i] = sprayOptions.chemicalOptions.find(option => option.id === previousChemicalContents[i].id);
            initialFieldValues[field_names[1]][i] = sprayOptions.decisionSupportOptions.find(option => option.id === previousDecision[i].id);
            initialFieldValues[field_names[7]][i] = preGallonsWater[i];
            initialFieldValues[field_names[8]][i] = preApplicationRate[i];
        }

        const previousCrops = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.crop), item.crop])).values()];
        const previousTargets = previousCrops.map(item => sprayCardContents.find(spray =>
            JSON.stringify(spray.crop) === JSON.stringify(item)
        ).target);
        for (let i = 0; i < previousCrops.length; i++) {
            initialFieldValues[field_names[2]][i] = sprayOptions.cropOptions.find(option => option.id === previousCrops[i].id);
            initialFieldValues[field_names[3]][i] = sprayOptions.targetOptions.find(option => option.id === previousTargets[i].id);
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
            initialFieldValues[field_names[4]][i] = sprayOptions.siteOptions.find(option => option.id === preSites[i].id);
            initialFieldValues[field_names[6]][i] = preAppliedArea[i];
            initialFieldValues[field_names[9]][i] = prePartialTreatment[i];
            initialFieldValues[field_names[10]][i] = preAltRowMiddle[i];
        }

        setSelectedResponsible(sprayCardContents[0].responsible_person);
        initialFieldValues[field_names[11]] = sprayCardContents[0].responsible_person;

        return initialFieldValues
    };

    const sprayCardFormProps = {
        uid,
        openSprayCard: editSprayCard,
        setOpenSprayCard: setEditSprayCard,
        sprayData,
        sprayOptions,
        refreshRecord,
        setRefreshRecord,
        setAssignSprayCard,
        sprayCardSelected,
        setSprayCardSelected: null,
        fieldValues,
        setFieldValues,
        initialFieldValues,
        field_names,
        selectedResponsible,
        setSelectedResponsible,
        tag: "edit"
    };

    useEffect(() => {
        if (sprayCardContents.length > 0) {
            setFieldValues(updateInitialEditFields());
        }
    }, [sprayCardContents, editSprayCard]);

    return (
        <SprayCardForm {...sprayCardFormProps}/>
    );
}