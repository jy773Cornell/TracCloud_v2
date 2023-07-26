import React, {lazy, useEffect, useState} from 'react';
import {Grid} from "@mui/material";

const EmployeeList = lazy(() => import('./EmployeeList'))

export default function People(props) {
    return (
        <div style={{margin: '0px 15px'}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <EmployeeList {...props}/>
                </Grid>
                <Grid item xs={4}>
                    <EmployeeList {...props}/>
                </Grid>
            </Grid>
        </div>
    );
}