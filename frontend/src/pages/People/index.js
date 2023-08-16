import React, {lazy, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {Outlet} from "react-router-dom";

const EmployeeList = lazy(() => import('./EmployeeList'))
const ClientList = lazy(() => import('./ClientList'))
const VendorList = lazy(() => import('./VendorList'))

export default function People(props) {
    const [refreshRecord, setRefreshRecord] = useState(false);

    const OwnerEmployeePeoplePage = () => (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <EmployeeList {...props}/>
            </Grid>
            <Grid item xs={6}>
                <ClientList {...props}/>
            </Grid>
        </Grid>
    )

    const ClientPeoplePage = () => (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <VendorList {...props}/>
            </Grid>
        </Grid>
    )

    const reportWindowProps =
        {
            ...props,

        }

    return (
        <div style={{margin: '0px 15px'}}>
            {props.relationType === "Client" ? ClientPeoplePage() : OwnerEmployeePeoplePage()}
            <Outlet/>
        </div>
    );
}