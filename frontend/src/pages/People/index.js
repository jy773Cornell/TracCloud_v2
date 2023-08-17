import React, {lazy, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {Outlet} from "react-router-dom";

const EmployeeList = lazy(() => import('./EmployeeList'))
const ClientVendorList = lazy(() => import('./ClientVendorList'))

export default function People(props) {
    const OwnerEmployeePeoplePage = () => (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <EmployeeList {...props}/>
            </Grid>
            <Grid item xs={6}>
                <ClientVendorList {...props}/>
            </Grid>
        </Grid>
    )

    const ClientPeoplePage = () => (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ClientVendorList {...props}/>
            </Grid>
        </Grid>
    )

    return (
        <div style={{margin: '0px 15px'}}>
            {props.relationType === "Client" ? ClientPeoplePage() : OwnerEmployeePeoplePage()}
            <Outlet/>
        </div>
    );
}