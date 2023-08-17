import React, {lazy, useEffect, useState} from 'react';
import OperationSnackbars from "../../../../components/Snackbars";

const FileDataGrid = lazy(() => import('./FileDataGrid'))

export default function ReportFileList(props) {
    return (
        <div>
            <FileDataGrid {...props}/>
        </div>
    );
}