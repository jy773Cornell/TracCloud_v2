import * as React from 'react';
import Paper from '@mui/material/Paper';
import {lazy, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Grid,
    Modal,
    Typography, MenuItem, Menu,
} from "@mui/material";
import SummarizeIcon from '@mui/icons-material/Summarize';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {grey} from '@mui/material/colors';
import CentralPostingGenerator from '../../components/ReportGenerators/CentralPosting';
import {Container} from "@mui/system";

const columnWidth = 200;
const columnMidWidth = 250;
const columnLongWidth = 350;

const report_list = [
    {
        id: "restricted_pesticide_purchases",
        name: "Restricted Pesticide Purchases",
        description: "This is the description for Restricted Pesticide Purchases report",
        link: ""
    },
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
const spray_report_format = ["central_posting"]

const central_posting_generator = async (dataList, rowsSelected, format) => {
    const reportData = dataList.filter(item => rowsSelected.includes(item.id));
    await CentralPostingGenerator(reportData, format);
};

const reportGenerators = {
    central_posting: central_posting_generator,
};

function ReportCard({report, setShowRecordModal, setReportID}) {
    const {id, name, description, link} = report;

    return (
        <Card elevation={1} sx={{margin: "15px"}} style={{backgroundColor: grey[50], border: '1px solid #c8c8c8'}}>
            <CardHeader
                title={name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions style={{display: 'flex', gap: '10px'}}>
                <Button
                    variant="outlined"
                    size="small"
                    color="success"
                    onClick={() => {
                        setShowRecordModal(true);
                        setReportID(id);
                    }}
                >
                    Generate
                </Button>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                    <Button variant="outlined" size="small">
                        Learn More
                    </Button>
                </a>
            </CardActions>
        </Card>
    );
}

function ReportList({setShowRecordModal, setReportID}) {
    return (
        <Container>
            <Grid container spacing={1}>
                {report_list.map((report) => {
                    const props = {report, setShowRecordModal, setReportID};
                    return (
                        <Grid item xs={6} md={4} lg={3} key={report.id}>
                            <ReportCard {...props} />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}

function ReportToolbar({reportID, rowsSelected, dataList}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFormatClick = (event) => {
        generateReport(reportID, event.target.id);
        handleClose();
    };

    const generateReport = (reportID, format) => {
        const generator = reportGenerators[reportID];
        if (generator) {
            generator(dataList, rowsSelected, format);
        } else {
            console.error(`No generator found for reportID: ${reportID}`);
        }
    };

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
            <Button size="small" startIcon={<SummarizeIcon/>} onClick={handleClick}>
                Generate Report
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem id="xlsx" onClick={handleFormatClick}>Download as XLSX</MenuItem>
                <MenuItem id="pdf" onClick={handleFormatClick}>Download as PDF</MenuItem>
            </Menu>
        </GridToolbarContainer>
    );
}

function RecordModal({
                         showRecordModal,
                         setShowRecordModal,
                         cropList,
                         siteList,
                         chemicalList,
                         purchaseList,
                         equipmentList,
                         sprayApplicationList,
                         reportID,
                     }) {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [rowsSelected, setRowsSelected] = React.useState([]);

    const createRowData = () => {
        if (spray_report_format.includes(reportID)) {
            return (
                sprayApplicationList.map((record) => {
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
                        "app_date": record.app_date,
                        "start_time": record.start_time,
                        "finish_time": record.finish_time,
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
                })
            );
        } else {
            return ([]);
        }
    }

    const createColumns = () => {
        if (spray_report_format.includes(reportID)) {
            return (
                [
                    {
                        field: 'crop',
                        headerName: 'Crop',
                        sortable: false,
                        width: columnLongWidth,
                    },
                    {
                        field: 'site',
                        headerName: 'Site',
                        sortable: false,
                        width: columnLongWidth,
                    },
                    {
                        field: 'applied_area',
                        headerName: 'Applied Area',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'app_date',
                        headerName: 'Application Date',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'start_time',
                        headerName: 'Start Time',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'finish_time',
                        headerName: 'Finish Time',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'operator',
                        headerName: 'Operator',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'target',
                        headerName: 'Application Target',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'decision_support',
                        headerName: 'Decision Support',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'chemical_purchase',
                        headerName: 'EPA Registration No.',
                        sortable: false,
                        width: columnMidWidth,
                    },
                    {
                        field: 'trade_name',
                        headerName: 'Trade Name',
                        sortable: false,
                        width: columnMidWidth,
                    },
                    {
                        field: 'active_ingredient',
                        headerName: 'Active Ingredient',
                        sortable: false,
                        width: columnMidWidth,
                    },
                    {
                        field: 'percent_ai',
                        headerName: 'Active Ingredient Percent',
                        sortable: false,
                        width: columnMidWidth,
                    },
                    {
                        field: 'rei',
                        headerName: 'REI',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'phi',
                        headerName: 'PHI',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'cost_per_unit',
                        headerName: 'Cost per Unit',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'equipment',
                        headerName: 'Equipment',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'water_use',
                        headerName: 'Water Use',
                        sortable: false,
                        width: columnMidWidth,
                    },
                    {
                        field: 'application_rate',
                        headerName: 'Application Rate',
                        sortable: false,
                        width: columnMidWidth,
                    },
                    {
                        field: 'total_amount',
                        headerName: 'Total Amount',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'total_cost',
                        headerName: 'Total Cost',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'customer',
                        headerName: 'Customer',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'wind_speed',
                        headerName: 'Wind Speed',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'wind_direction',
                        headerName: 'Wind Direction',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'average_temp',
                        headerName: 'Average Temperature',
                        sortable: false,
                        width: columnWidth,
                    },
                    {
                        field: 'update_time', headerName: 'Update Time', sortable: false, width: columnWidth,
                    },
                ]
            );
        } else {
            return ([]);
        }
    }

    useEffect(() => {
        setRows(createRowData());
        setColumns(createColumns());
    }, [reportID, sprayApplicationList,]);

    return (
        <Modal
            open={showRecordModal}
            onClose={() => setShowRecordModal(false)}
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
        >
            <Paper style={{height: 'calc(2/3 * 100vh)', width: 'calc(2/3 * 100vw)'}}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowsSelected(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowsSelected}
                    slots={{
                        toolbar: () => <ReportToolbar
                            reportID={reportID}
                            rowsSelected={rowsSelected}
                            dataList={rows}/>,
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

    const [showRecordModal, setShowRecordModal] = useState(false);
    const [reportID, setReportID] = useState("");

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
                        setSprayApplicationList(data.data);
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
        equipmentList,
        sprayApplicationList,
        reportID,
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([CropListGet(uid), SiteListGet(uid), EquipmentListGet(uid), await ChemicalListGet(uid), PurchaseListGet(uid)]);
            await SprayApplicationListGet(uid);
        };

        fetchData();
    }, []);

    return (
        <div>
            <ReportList {...reportListProps}/>
            <RecordModal {...recordModalProps}/>
        </div>
    );
}