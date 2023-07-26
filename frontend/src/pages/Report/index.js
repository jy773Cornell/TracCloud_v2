import * as React from 'react';
import {useEffect, useState} from "react";
import SprayDataModal from "./SprayDataModal";
import ReportCardList from "./ReportCardList";

export default function Report(props) {
    const uid = props.uid;
    const privilege = props.privilege;

    const [sprayApplicationList, setSprayApplicationList] = useState([]);
    const [cropList, setCropList] = useState([]);
    const [siteList, setSiteList] = useState([]);
    const [chemicalList, setChemicalList] = useState([]);
    const [purchaseList, setPurchaseList] = useState([]);

    const [showRecordModal, setShowRecordModal] = useState(false);
    const [reportID, setReportID] = useState("");

    async function CropListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        if (privilege.spray_r) {
            await fetch("/api/crop/list/get/" + "?uid=" + uid, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            setCropList(data.data);
                        })
                    }
                })
        }
    }

    async function SiteListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        if (privilege.spray_r) {
            await fetch("/api/site/list/get/" + "?uid=" + uid, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            setSiteList(flatten(data.data));
                        })
                    }
                })
        }
    }

    async function ChemicalListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        if (privilege.spray_r) {
            await fetch("/api/chemical/list/get/" + "?uid=" + uid, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            setChemicalList(data.data);
                        })
                    }
                })
        }
    }

    async function PurchaseListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        if (privilege.spray_r) {
            await fetch("/api/operation/purchase/list/get/" + "?uid=" + uid, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            setPurchaseList(data.data);
                        })
                    }
                })
        }
    }

    async function SprayApplicationListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        if (privilege.spray_r) {
            await fetch("/api/operation/application/list/get/?" + "uid=" + uid, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            setSprayApplicationList(data.data);
                        })
                    }
                })
        }
    }

    const flatten = (data) => {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj = {...data[i]};
            delete obj.children;
            result.push(obj);
            if (data[i].children) {
                result = result.concat(flatten(data[i].children));
            }
        }
        return result;
    }

    const reportListProps = {
        setShowRecordModal, setReportID,
    };

    const recordModalProps = {
        showRecordModal,
        setShowRecordModal,
        cropList,
        siteList,
        chemicalList,
        purchaseList,
        sprayApplicationList,
        reportID,
        privilege,
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([CropListGet(uid), SiteListGet(uid), await ChemicalListGet(uid), PurchaseListGet(uid)]);
            await SprayApplicationListGet(uid);
        };

        fetchData();
    }, []);

    return (
        <div>
            <ReportCardList {...reportListProps}/>
            <SprayDataModal {...recordModalProps}/>
        </div>
    );
}