import * as React from 'react';
import {useEffect, useState} from "react";
import SprayCardForm from "./SprayCardForm";

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

    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    const [selectedResponsible, setSelectedResponsible] = useState("");

    const sprayCardFormProps = {
        uid,
        openSprayCard: addSprayCard,
        setOpenSprayCard: setAddSprayCard,
        sprayData,
        sprayOptions,
        refreshRecord,
        setRefreshRecord,
        setAssignSprayCard,
        sprayCardSelected: null,
        setSprayCardSelected,
        fieldValues,
        setFieldValues,
        initialFieldValues,
        field_names,
        selectedResponsible,
        setSelectedResponsible,
        tag: "create"
    };

    return (
        <SprayCardForm {...sprayCardFormProps}/>
    );
}