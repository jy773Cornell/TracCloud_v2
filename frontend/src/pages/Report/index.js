import * as React from 'react';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import {
    Autocomplete, Button, Card, CardContent, Checkbox, Grid, InputAdornment, Modal, TextField,
} from "@mui/material";
import {AddButton} from "./styles";
import OperationSnackbars from "../../components/Snackbars";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";

const columnWidth = 200;
const columnMidWidth = 250;
const columnLongWidth = 350;

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
            <AddButton/>
        </GridToolbarContainer>
    );
}


function RecordModal({
                         showRecordModal, setShowRecordModal, rows, columns, rowSelectionModel, setRowSelectionModel,
                     }) {

    return (
        <Modal
            open={showRecordModal}
            onClose={() => setShowRecordModal(false)}
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
        >
            < Paper style={{height: 500, width: 1000}}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    density="compact"
                />
            </Paper>
        </Modal>
    );
}

export default function Report(props) {
    const uid = props.uid;
    const [sprayApplicationList, setSprayApplicationList] = useState([]);
    const [cropList, setCropList] = useState([]);
    const [siteList, setSiteList] = useState([]);
    const [chemicalList, setChemicalList] = useState([]);
    const [purchaseList, setPurchaseList] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]);

    const [rows, setRows] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [showRecordModal, setShowRecordModal] = useState(false);

    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);

    async function CropListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCropList(data.data);
                    })
                }
            })
    }

    async function SiteListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/site/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setSiteList(flatten(data.data));
                    })
                }
            })
    }

    async function ChemicalListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/chemical/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setChemicalList(data.data);
                    })
                }
            })
    }

    async function EquipmentListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/equipment/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setEquipmentList(data.data);
                    })
                }
            })
    }

    async function PurchaseListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/operation/purchase/list/get/" + "?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setPurchaseList(data.data);
                    })
                }
            })
    }

    async function SprayApplicationListGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/operation/application/list/get/?" + "uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const sprayList = data.data.filter(item => item.type === "Spray")
                        setSprayApplicationList(sprayList);
                    })
                }
            })
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

    const createRowData = (record) => {
        const crop = cropList.find(item => item.cid === record.crop);
        const purchase = purchaseList.find(item => item.prid === record.chemical_purchase);
        const chemical = chemicalList.find(item => item.chemid === purchase.chemical);
        const equipment = equipmentList.find(item => item.eid === record.equipment);

        let site = siteList.find(item => item.sid === record.site);
        let siteStr = site.name;
        while (site.parent) {
            site = siteList.find(item => item.sid === site.parent)
            siteStr = `${site.name} - ${siteStr}`;
        }

        return {
            "id": record.arid,
            "crop": `${crop.crop} (${crop.variety}, ${crop.growth_stage})`,
            "site": siteStr,
            "applied_area": `${record.applied_area} ${record.area_unit}`,
            "app_datetime": record.app_datetime,
            "operator": record.operator,
            "target": record.target,
            "decision_support": record.decision_support,
            "chemical_purchase": chemical.epa_reg_no,
            "trade_name": chemical.trade_name,
            "active_ingredient": chemical.active_ingredient,
            "percent_ai": chemical.percent_ai,
            "rei": chemical.rei,
            "phi": chemical.phi,
            "cost_per_unit": `\$${purchase.cost_per_unit} per ${chemical.unit}`,
            "equipment": equipment.name,
            "water_use": `${record.water_use} ${record.water_unit} per ${record.area_unit}`,
            "application_rate": `${record.application_rate} ${chemical.unit} per ${record.area_unit}`,
            "total_amount": `${record.total_amount} ${chemical.unit}`,
            "total_cost": `\$${record.total_cost}`,
            "customer": record.customer,
            "wind_speed": record.wind_speed,
            "wind_direction": record.wind_direction,
            "average_temp": record.average_temp,
            "update_time": record.update_time
        };
    }

    const columns = [{
        field: 'crop', headerName: 'Crop', sortable: false, width: columnLongWidth,
    }, {
        field: 'site', headerName: 'Site', sortable: false, width: columnLongWidth,
    }, {
        field: 'applied_area', headerName: 'Applied Area', sortable: false, width: columnWidth,
    }, {
        field: 'app_datetime', headerName: 'Application Datetime', sortable: false, width: columnWidth,
    }, {
        field: 'operator', headerName: 'Operator', sortable: false, width: columnWidth,
    }, {
        field: 'target', headerName: 'Application Target', sortable: false, width: columnWidth,
    }, {
        field: 'decision_support', headerName: 'Decision Support', sortable: false, width: columnWidth,
    }, {
        field: 'chemical_purchase', headerName: 'EPA Registration No.', sortable: false, width: columnMidWidth,
    }, {
        field: 'trade_name', headerName: 'Trade Name', sortable: false, width: columnMidWidth,
    }, {
        field: 'active_ingredient', headerName: 'Active Ingredient', sortable: false, width: columnMidWidth,
    }, {
        field: 'percent_ai', headerName: 'Active Ingredient Percent', sortable: false, width: columnMidWidth,
    }, {
        field: 'rei', headerName: 'REI', sortable: false, width: columnWidth,
    }, {
        field: 'phi', headerName: 'PHI', sortable: false, width: columnWidth,
    }, {
        field: 'cost_per_unit', headerName: 'Cost per Unit', sortable: false, width: columnWidth,
    }, {
        field: 'equipment', headerName: 'Equipment', sortable: false, width: columnWidth,
    }, {
        field: 'water_use', headerName: 'Water Use', sortable: false, width: columnMidWidth,
    }, {
        field: 'application_rate', headerName: 'Application Rate', sortable: false, width: columnMidWidth,
    }, {
        field: 'total_amount', headerName: 'Total Amount', sortable: false, width: columnWidth,
    }, {
        field: 'total_cost', headerName: 'Total Cost', sortable: false, width: columnWidth,
    }, {
        field: 'customer', headerName: 'Customer', sortable: false, width: columnWidth,
    }, {
        field: 'wind_speed', headerName: 'Wind Speed', sortable: false, width: columnWidth,
    }, {
        field: 'wind_direction', headerName: 'Wind Direction', sortable: false, width: columnWidth,
    }, {
        field: 'average_temp', headerName: 'Average Temperature', sortable: false, width: columnWidth,
    }, {
        field: 'update_time', headerName: 'Update Time', sortable: false, width: columnWidth,
    },]

    const recordModalProps = {
        showRecordModal, setShowRecordModal, rows, columns, rowSelectionModel, setRowSelectionModel,
    };

    const successProps = {
        open: success, setOpen: setSuccess, msg: "Crop record is uploaded successfully!", tag: "success"
    };

    const warningProps = {
        open: warning, setOpen: setWarning, msg: "Crop record has been deleted!", tag: "success"
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([CropListGet(uid), SiteListGet(uid), EquipmentListGet(uid), await ChemicalListGet(uid), PurchaseListGet(uid)]);
            await SprayApplicationListGet(uid);
        };

        fetchData();
    }, []);

    useEffect(() => {
        setRows(sprayApplicationList.map((record) => createRowData(record)));
    }, [sprayApplicationList]);

    return (<div>
        <AddButton
            variant="contained"
            startIcon={<AddIcon/>}
            onClick={() => setShowRecordModal(true)}>
        </AddButton>
        <RecordModal {...recordModalProps}/>
        <OperationSnackbars  {...successProps}/>
        <OperationSnackbars  {...warningProps}/>
    </div>);
}