import * as React from 'react';
import SprayDataGrid from "./SprayDataGrid";

export default function SprayRecord(props) {
    return (
        <SprayDataGrid props={props} height={1000} width={'calc(100% - 30px)'}/>
    );
}