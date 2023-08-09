import * as React from 'react';
import {lazy, useEffect, useState} from "react";
import {Grid} from "@mui/material";

const ReportFileList = lazy(() => import('./ReportFileList'))
const GeneratorList = lazy(() => import('./GeneratorList'))


export default function Report(props) {
    const [refreshRecord, setRefreshRecord] = useState(false);

    const listProps = {
        props,
        refreshRecord,
        setRefreshRecord
    }

    return (
        <div style={{margin: '15px'}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <ReportFileList {...listProps}/>
                </Grid>
                <Grid item xs={4}>
                    <GeneratorList {...listProps}/>
                </Grid>
            </Grid>
        </div>
    );
}