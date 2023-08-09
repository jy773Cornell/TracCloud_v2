import * as React from 'react';
import {lazy, useState} from "react";
import OperationSnackbars from "../../../components/Snackbars";

const ReportGenerateList = lazy(() => import('./ReportGenerateList'));
const SprayDataModal = lazy(() => import('./SprayDataModal'));

const report_list = [
    {
        id: "central_posting",
        name: "Central Posting",
        description: "This is the description for Central Posting report",
        link: ""
    },
    {
        id: "applicator_report_26",
        name: "Applicator Report-26",
        description: "This is the description for Applicator Report-26 report",
        link: ""
    },
    {
        id: "applicators_26a",
        name: "Applicators-26A",
        description: "This is the description for Applicators-26A report",
        link: ""
    },
    {
        id: "record_keeping_26",
        name: "RecordKeeping-26",
        description: "This is the description for RecordKeeping-26 report",
        link: ""
    },
    {
        id: "priv_app_record",
        name: "PrivAppRecord",
        description: "This is the description for PrivAppRecord report",
        link: ""
    },
    {id: "generic_form", name: "GenericForm", description: "This is the description for GenericForm report", link: ""},
    {
        id: "motts_and_yonder_distr",
        name: "Mott's&YonderDistr.",
        description: "This is the description for Mott's&YonderDistr. report",
        link: ""
    },
    {
        id: "birds_eye_and_others",
        name: "BirdsEye&Others",
        description: "This is the description for BirdsEye&Others report",
        link: ""
    },
    {id: "beech_nut", name: "BeechNut", description: "This is the description for BeechNut report", link: ""},
    {id: "knouse", name: "Knouse", description: "This is the description for Knouse report", link: ""},
    {id: "globalgap", name: "GLOBALGAP", description: "This is the description for GLOBALGAP report", link: ""},
    {id: "ecoapple", name: "EcoApple", description: "This is the description for EcoApple report", link: ""},
    {
        id: "carriage_house",
        name: "CarriageHouse",
        description: "This is the description for CarriageHouse report",
        link: ""
    },
    {
        id: "constellation",
        name: "Constellation",
        description: "This is the description for Constellation report",
        link: ""
    },
    {
        id: "cliffstar_and_westfield_maid",
        name: "Cliffstar&WestfieldMaid",
        description: "This is the description for Cliffstar&WestfieldMaid report",
        link: ""
    },
    {id: "growers_coop", name: "GrowersCoop", description: "This is the description for GrowersCoop report", link: ""},
    {id: "meiers", name: "Meier's", description: "This is the description for Meier's report", link: ""},
    {id: "mogen_david", name: "MogenDavid", description: "This is the description for MogenDavid report", link: ""},
    {
        id: "national_grape",
        name: "NationalGrape",
        description: "This is the description for NationalGrape report",
        link: ""
    }

]

export default function GeneratorList({props, refreshRecord, setRefreshRecord}) {
    const uid = props.uid;
    const employerID = props.employerID
    const privilege = props.privilege;

    const [reportID, setReportID] = useState("");
    const [showRecordModal, setShowRecordModal] = useState(false);
    const [isGenerate, setIsGenerate] = useState(false);

    const listProps = {
        report_list,
        setShowRecordModal,
        setReportID,
        privilege
    };

    const modalProps = {
        uid,
        employerID,
        showRecordModal,
        setShowRecordModal,
        reportID,
        privilege,
        refreshRecord,
        setRefreshRecord,
        setIsGenerate,
        report_list
    };

    const generateProps = {
        open: isGenerate,
        setOpen: setIsGenerate,
        msg: "Report file is generated!",
        tag: "success"
    };

    return (
        <>
            <ReportGenerateList {...listProps}/>
            <SprayDataModal {...modalProps}/>
            <OperationSnackbars  {...generateProps}/>
        </>
    );
}
