import * as React from 'react';
import {useEffect, useState} from "react";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columnSmallWidth = 100;
const columnWidth = 200;
const columnMidWidth = 250;
const columnLongWidth = 300;

function CustomToolbar() {
    return (<GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
    </GridToolbarContainer>);
}

export default function SprayDataGrid({props, height, width}) {
    const uid = props.uid;
    const privilege = props.privilege;

    const [sprayApplicationList, setSprayApplicationList] = useState([]);
    const [cropList, setCropList] = useState([]);
    const [siteList, setSiteList] = useState([]);
    const [chemicalList, setChemicalList] = useState([]);
    const [purchaseList, setPurchaseList] = useState([]);

    const [rows, setRows] = useState([]);
    const [isExpended, setIsExpended] = useState(true);

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
                            // const sprayList = data.data.filter(item => item.type === "Spray")
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

    const createExpandedRowData = (record) => {
        const crop = cropList.find(item => item.cid === record.crop);
        const purchase = purchaseList.find(item => item.prid === record.chemical_purchase);
        const chemical = chemicalList.find(item => item.chemid === purchase.chemical);

        let site = siteList.find(item => item.sid === record.site);
        let siteStr = site.name;
        while (site.parent) {
            site = siteList.find(item => item.sid === site.parent)
            siteStr = `${site.name} - ${siteStr}`;
        }

        return {
            "id": record.arid,
            "crop": crop.crop,
            "start_datetime": record.start_datetime,
            "finish_datetime": record.finish_datetime,
            "site": siteStr,
            "partial_treatment": record.partial_treatment ? "Yes" : "No",
            "variety": crop.variety,
            "alt_row_middle": record.alt_row_middle ? "X" : "",
            "growth_stage": record.growth_stage,
            "target": record.target,
            "decision_support": record.decision_support,
            "trade_name": chemical.trade_name,
            "active_ingredient": chemical.active_ingredient,
            "percent_ai": chemical.percent_ai,
            "epa_reg_no": chemical.epa_reg_no,
            "rei": chemical.rei,
            "phi": chemical.phi,
            "harvestable_date": record.harvestable_date,
            "equipment": record.equipment,
            "amount_pesticide_per_tank": record.amount_pesticide_per_tank ? `${record.amount_pesticide_per_tank} ${chemical.unit}` : "",
            "gallons_water_rate": `${record.gallons_water_rate} per ${record.area_unit}`,
            "application_rate": `${record.application_rate} ${chemical.unit} per ${record.area_unit}`,
            "applied_area": `${record.applied_area} ${record.area_unit}`,
            "total_amount": `${record.total_amount} ${chemical.unit}`,
            "cost_per_unit": `\$${purchase.cost_per_unit} per ${chemical.unit}`,
            "total_cost": `\$${record.total_cost}`,
            "applicator": record.applicator,
            "responsible_person": record.responsible_person,
            "wind_speed": record.wind_speed,
            "wind_direction": record.wind_direction,
            "average_temp": record.average_temp,
            "note": record.note,
            "update_time": record.update_time
        };
    }

    const updateRowData = () => {
        if (isExpended) {
            setRows(sprayApplicationList.map((record) => createExpandedRowData(record)));
        } else {
            console.log(1);
        }
    }

    const columns = [
        {
            field: 'crop',
            headerName: 'Crop',
            width: columnSmallWidth,
        },
        {
            field: 'start_datetime',
            headerName: 'Datetime Start Spray',
            width: columnWidth,
        },
        {
            field: 'finish_datetime',
            headerName: 'Datetime Finish Spray',
            width: columnWidth,
        },
        {
            field: 'site',
            headerName: 'Site',
            width: columnMidWidth,
        },
        {
            field: 'partial_treatment',
            headerName: 'Partial Treatment',
            width: columnWidth,
        },
        {
            field: 'variety',
            headerName: 'Variety Sprayed',
            width: columnWidth,
        },
        {
            field: 'alt_row_middle',
            headerName: 'Alt Row Middle',
            width: columnWidth,
        },
        {
            field: 'growth_stage',
            headerName: 'Growth Stage',
            width: columnWidth,
        },
        {
            field: 'target',
            headerName: 'Target Pest',
            width: columnWidth,
        },
        {
            field: 'decision_support',
            headerName: 'Decision Support',
            width: columnWidth,
        },
        {
            field: 'trade_name',
            headerName: 'Pesticide Trade Name',
            width: columnMidWidth,
        },
        {
            field: 'active_ingredient',
            headerName: 'Active Ingredient',
            width: columnMidWidth,
        },
        {
            field: 'percent_ai',
            headerName: '% A.I.',
            width: columnMidWidth,
        },
        {
            field: 'epa_reg_no',
            headerName: 'EPA Registration Number',
            width: columnWidth,
        },
        {
            field: 'rei',
            headerName: 'REI (hours)',
            width: columnWidth,
        },
        {
            field: 'phi',
            headerName: 'PHI (days)',
            width: columnWidth,
        },
        {
            field: 'harvestable_date',
            headerName: 'Earliest Harvestable Date',
            width: columnWidth,
        },
        {
            field: 'equipment',
            headerName: 'Spray Equipment',
            width: columnWidth,
        },
        {
            field: 'amount_pesticide_per_tank',
            headerName: 'Amount Pesticide Per Tank',
            width: columnWidth,
        },
        {
            field: 'gallons_water_rate',
            headerName: 'Gallons Water Rate',
            width: columnWidth,
        },
        {
            field: 'application_rate',
            headerName: 'Application Rate',
            width: columnWidth,
        },
        {
            field: 'applied_area',
            headerName: 'Applied Area',
            width: columnWidth,
        },
        {
            field: 'total_amount',
            headerName: 'Total Amount Applied ',
            width: columnWidth,
        },
        {
            field: 'cost_per_unit',
            headerName: 'Spray Cost Per Applied Unit',
            width: columnWidth,
        },
        {
            field: 'total_cost',
            headerName: 'Total Cost',
            width: columnWidth,
        },
        {
            field: 'applicator',
            headerName: 'Applicator Name',
            width: columnWidth,
        },
        {
            field: 'responsible_person',
            headerName: 'Responsible Person',
            width: columnWidth,
        },
        {
            field: 'wind_speed',
            headerName: 'Wind Speed (mph)',
            width: columnWidth,
        },
        {
            field: 'wind_direction',
            headerName: 'Wind Direction',
            width: columnWidth,
        },
        {
            field: 'average_temp',
            headerName: 'Avg Temp (F°)',
            width: columnWidth,
        },
        {
            field: 'note',
            headerName: 'Note',
            width: columnLongWidth,
        },
        {
            field: 'update_time',
            headerName: 'Update Time',
            width: columnWidth,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                CropListGet(uid),
                SiteListGet(uid),
                await ChemicalListGet(uid),
                PurchaseListGet(uid)
            ]);
            await SprayApplicationListGet(uid);
        };

        fetchData();
    }, []);

    useEffect(() => {
        updateRowData();
    }, [sprayApplicationList]);

    return (
        <Paper style={{height: height, margin: '15px 15px', width: width, overflow: 'auto'}}>
            <DataGrid
                columns={columns}
                rows={rows}
                disableRowSelectionOnClick={true}
                disableClickEdit={true}
                rowSelection={false}
                slots={{
                    toolbar: CustomToolbar,
                }}
                localeText={{noRowsLabel: privilege.spray_r ? "No rows" : "You don't have the privilege to access this data"}}
            />
        </Paper>
    );
}