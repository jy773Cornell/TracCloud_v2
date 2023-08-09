import React, {lazy, useEffect, useState} from 'react';
import OperationSnackbars from "../../../components/Snackbars";

const FileDataGrid = lazy(() => import('./FileDataGrid'))

export default function ReportFileList({props, refreshRecord, setRefreshRecord}) {
    const uid = props.uid;
    const employerID = props.employerID;
    const privilege = props.privilege;

    const [isDownload, setIsDownload] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const dataGridProps = {
        employerID,
        privilege,
        refreshRecord,
        setRefreshRecord,
        setIsDownload,
        setIsDelete,
    }

    const downloadProps = {
        open: isDownload,
        setOpen: setIsDownload,
        msg: "Report file is downloaded successfully!",
        tag: "success"
    };

    const deleteProps = {
        open: isDelete,
        setOpen: setIsDelete,
        msg: "Report file is deleted!",
        tag: "success"
    };

    return (
        <div>
            <FileDataGrid {...dataGridProps}/>
            <OperationSnackbars  {...downloadProps}/>
            <OperationSnackbars  {...deleteProps}/>
        </div>
    );
}