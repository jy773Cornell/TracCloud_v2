/*! For license information please see src_pages_Report_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_Report_index_js"],{"./src/pages/Report/ReportCardList.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ReportCardList)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardHeader/CardHeader.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardContent/CardContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardActions/CardActions.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/grey.js");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/Container/Container.js");\n\n\n\n\nconst report_list = [{\n  id: "restricted_pesticide_purchases",\n  name: "Restricted Pesticide Purchases",\n  description: "This is the description for Restricted Pesticide Purchases report",\n  link: ""\n}, {\n  id: "central_posting",\n  name: "Central Posting",\n  description: "This is the description for Central Posting report",\n  link: ""\n}, {\n  id: "applicator_report_26",\n  name: "Applicator Report-26",\n  description: "This is the description for Applicator Report-26 report",\n  link: ""\n}, {\n  id: "applicators_26a",\n  name: "Applicators-26A",\n  description: "This is the description for Applicators-26A report",\n  link: ""\n}, {\n  id: "record_keeping_26",\n  name: "RecordKeeping-26",\n  description: "This is the description for RecordKeeping-26 report",\n  link: ""\n}, {\n  id: "priv_app_record",\n  name: "PrivAppRecord",\n  description: "This is the description for PrivAppRecord report",\n  link: ""\n}, {\n  id: "generic_form",\n  name: "GenericForm",\n  description: "This is the description for GenericForm report",\n  link: ""\n}, {\n  id: "motts_and_yonder_distr",\n  name: "Mott\'s&YonderDistr.",\n  description: "This is the description for Mott\'s&YonderDistr. report",\n  link: ""\n}, {\n  id: "birds_eye_and_others",\n  name: "BirdsEye&Others",\n  description: "This is the description for BirdsEye&Others report",\n  link: ""\n}, {\n  id: "beech_nut",\n  name: "BeechNut",\n  description: "This is the description for BeechNut report",\n  link: ""\n}, {\n  id: "knouse",\n  name: "Knouse",\n  description: "This is the description for Knouse report",\n  link: ""\n}, {\n  id: "globalgap",\n  name: "GLOBALGAP",\n  description: "This is the description for GLOBALGAP report",\n  link: ""\n}, {\n  id: "ecoapple",\n  name: "EcoApple",\n  description: "This is the description for EcoApple report",\n  link: ""\n}, {\n  id: "carriage_house",\n  name: "CarriageHouse",\n  description: "This is the description for CarriageHouse report",\n  link: ""\n}, {\n  id: "constellation",\n  name: "Constellation",\n  description: "This is the description for Constellation report",\n  link: ""\n}, {\n  id: "cliffstar_and_westfield_maid",\n  name: "Cliffstar&WestfieldMaid",\n  description: "This is the description for Cliffstar&WestfieldMaid report",\n  link: ""\n}, {\n  id: "growers_coop",\n  name: "GrowersCoop",\n  description: "This is the description for GrowersCoop report",\n  link: ""\n}, {\n  id: "meiers",\n  name: "Meier\'s",\n  description: "This is the description for Meier\'s report",\n  link: ""\n}, {\n  id: "mogen_david",\n  name: "MogenDavid",\n  description: "This is the description for MogenDavid report",\n  link: ""\n}, {\n  id: "national_grape",\n  name: "NationalGrape",\n  description: "This is the description for NationalGrape report",\n  link: ""\n}];\nfunction ReportCard({\n  report,\n  setShowRecordModal,\n  setReportID\n}) {\n  const {\n    id,\n    name,\n    description,\n    link\n  } = report;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], {\n    elevation: 1,\n    sx: {\n      margin: "15px"\n    },\n    style: {\n      backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][50],\n      border: \'1px solid #c8c8c8\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    title: name\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    variant: "body2",\n    color: "textSecondary"\n  }, description)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    style: {\n      display: \'flex\',\n      gap: \'10px\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    variant: "outlined",\n    size: "small",\n    color: "success",\n    onClick: () => {\n      setShowRecordModal(true);\n      setReportID(id);\n    }\n  }, "Generate"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {\n    href: link,\n    target: "_blank",\n    rel: "noopener noreferrer",\n    style: {\n      textDecoration: \'none\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    variant: "outlined",\n    size: "small"\n  }, "Learn More"))));\n}\nfunction ReportCardList({\n  setShowRecordModal,\n  setReportID\n}) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_system__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n    container: true,\n    spacing: 1\n  }, report_list.map(report => {\n    const props = {\n      report,\n      setShowRecordModal,\n      setReportID\n    };\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n      item: true,\n      xs: 6,\n      md: 4,\n      lg: 3,\n      key: report.id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReportCard, props));\n  })));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/ReportCardList.js?')},"./src/pages/Report/SprayDataModal.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SprayDataModal)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Paper */ \"./node_modules/@mui/material/Paper/Paper.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/Menu/Menu.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/MenuItem/MenuItem.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/Modal/Modal.js\");\n/* harmony import */ var _mui_icons_material_Summarize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/icons-material/Summarize */ \"./node_modules/@mui/icons-material/Summarize.js\");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/x-data-grid */ \"./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js\");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/x-data-grid */ \"./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js\");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ \"./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js\");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-data-grid */ \"./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js\");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/x-data-grid */ \"./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js\");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/x-data-grid */ \"./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js\");\n/* harmony import */ var _reportGenerators_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reportGenerators/index */ \"./src/pages/Report/reportGenerators/index.js\");\n\n\n\n\n\n\n\nconst columnSmallWidth = 100;\nconst columnWidth = 200;\nconst columnMidWidth = 250;\nconst columnLongWidth = 300;\nfunction ReportToolbar({\n  reportID,\n  rowsSelected,\n  dataList\n}) {\n  const [anchorEl, setAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const handleClick = event => {\n    setAnchorEl(event.currentTarget);\n  };\n  const handleClose = () => {\n    setAnchorEl(null);\n  };\n  const handleFormatClick = event => {\n    generateReport(reportID, event.target.id);\n    handleClose();\n  };\n  const generateReport = (reportID, format) => {\n    const generator = (0,_reportGenerators_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(reportID);\n    if (generator) {\n      generator(dataList, rowsSelected, format);\n    } else {\n      console.error(`No generator found for reportID: ${reportID}`);\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridToolbarExport, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    size: \"small\",\n    startIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Summarize__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null),\n    onClick: handleClick\n  }, \"Generate Report\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    anchorEl: anchorEl,\n    open: Boolean(anchorEl),\n    onClose: handleClose\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    id: \"xlsx\",\n    onClick: handleFormatClick\n  }, \"Download as XLSX\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    id: \"pdf\",\n    onClick: handleFormatClick\n  }, \"Download as PDF\")));\n}\nfunction SprayDataModal({\n  showRecordModal,\n  setShowRecordModal,\n  cropList,\n  siteList,\n  chemicalList,\n  purchaseList,\n  sprayApplicationList,\n  reportID\n}) {\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rowsSelected, setRowsSelected] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const createRowData = () => {\n    return sprayApplicationList.map(record => {\n      const crop = cropList.find(item => item.cid === record.crop);\n      const purchase = purchaseList.find(item => item.prid === record.chemical_purchase);\n      const chemical = chemicalList.find(item => item.chemid === purchase.chemical);\n      let site = siteList.find(item => item.sid === record.site);\n      let siteStr = site.name;\n      while (site.parent) {\n        site = siteList.find(item => item.sid === site.parent);\n        siteStr = `${site.name} - ${siteStr}`;\n      }\n      return {\n        \"id\": record.arid,\n        \"crop\": crop.crop,\n        \"start_datetime\": record.start_datetime,\n        \"finish_datetime\": record.finish_datetime,\n        \"site\": siteStr,\n        \"partial_treatment\": record.partial_treatment ? \"Yes\" : \"No\",\n        \"variety\": crop.variety,\n        \"alt_row_middle\": record.alt_row_middle ? \"X\" : \"\",\n        \"growth_stage\": crop.growth_stage,\n        \"target\": record.target,\n        \"decision_support\": record.decision_support,\n        \"trade_name\": chemical.trade_name,\n        \"active_ingredient\": chemical.active_ingredient,\n        \"percent_ai\": chemical.percent_ai,\n        \"epa_reg_no\": chemical.epa_reg_no,\n        \"rei\": chemical.rei,\n        \"phi\": chemical.phi,\n        \"harvestable_date\": record.harvestable_date,\n        \"equipment\": record.equipment,\n        \"amount_pesticide_per_tank\": record.amount_pesticide_per_tank ? `${record.amount_pesticide_per_tank} ${chemical.unit}` : \"\",\n        \"gallons_water_rate\": `${record.gallons_water_rate} per ${record.area_unit}`,\n        \"application_rate\": `${record.application_rate} ${chemical.unit} per ${record.area_unit}`,\n        \"applied_area\": `${record.applied_area} ${record.area_unit}`,\n        \"total_amount\": `${record.total_amount} ${chemical.unit}`,\n        \"cost_per_unit\": `\\$${purchase.cost_per_unit} per ${chemical.unit}`,\n        \"total_cost\": `\\$${record.total_cost}`,\n        \"applicator\": record.applicator,\n        \"responsible_person\": record.responsible_person,\n        \"wind_speed\": record.wind_speed,\n        \"wind_direction\": record.wind_direction,\n        \"average_temp\": record.average_temp,\n        \"note\": record.note,\n        \"update_time\": record.update_time\n      };\n    });\n  };\n  const columns = [{\n    field: 'crop',\n    headerName: 'Crop',\n    width: columnSmallWidth\n  }, {\n    field: 'start_datetime',\n    headerName: 'Datetime Start Spray',\n    width: columnWidth\n  }, {\n    field: 'finish_datetime',\n    headerName: 'Datetime Finish Spray',\n    width: columnWidth\n  }, {\n    field: 'site',\n    headerName: 'Site',\n    width: columnMidWidth\n  }, {\n    field: 'partial_treatment',\n    headerName: 'Partial Treatment',\n    width: columnWidth\n  }, {\n    field: 'variety',\n    headerName: 'Variety Sprayed',\n    width: columnWidth\n  }, {\n    field: 'alt_row_middle',\n    headerName: 'Alt Row Middle',\n    width: columnWidth\n  }, {\n    field: 'growth_stage',\n    headerName: 'Growth Stage',\n    width: columnWidth\n  }, {\n    field: 'target',\n    headerName: 'Target Pest',\n    width: columnWidth\n  }, {\n    field: 'decision_support',\n    headerName: 'Decision Support',\n    width: columnWidth\n  }, {\n    field: 'trade_name',\n    headerName: 'Pesticide Trade Name',\n    width: columnMidWidth\n  }, {\n    field: 'active_ingredient',\n    headerName: 'Active Ingredient',\n    width: columnMidWidth\n  }, {\n    field: 'percent_ai',\n    headerName: '% A.I.',\n    width: columnMidWidth\n  }, {\n    field: 'epa_reg_no',\n    headerName: 'EPA Registration Number',\n    width: columnWidth\n  }, {\n    field: 'rei',\n    headerName: 'REI (hours)',\n    width: columnWidth\n  }, {\n    field: 'phi',\n    headerName: 'PHI (days)',\n    width: columnWidth\n  }, {\n    field: 'harvestable_date',\n    headerName: 'Earliest Harvestable Date',\n    width: columnWidth\n  }, {\n    field: 'equipment',\n    headerName: 'Spray Equipment',\n    width: columnWidth\n  }, {\n    field: 'amount_pesticide_per_tank',\n    headerName: 'Amount Pesticide Per Tank',\n    width: columnWidth\n  }, {\n    field: 'gallons_water_rate',\n    headerName: 'Gallons Water Rate',\n    width: columnWidth\n  }, {\n    field: 'application_rate',\n    headerName: 'Application Rate',\n    width: columnWidth\n  }, {\n    field: 'applied_area',\n    headerName: 'Applied Area',\n    width: columnWidth\n  }, {\n    field: 'total_amount',\n    headerName: 'Total Amount Applied ',\n    width: columnWidth\n  }, {\n    field: 'cost_per_unit',\n    headerName: 'Spray Cost Per Applied Unit',\n    width: columnWidth\n  }, {\n    field: 'total_cost',\n    headerName: 'Total Cost',\n    width: columnWidth\n  }, {\n    field: 'applicator',\n    headerName: 'Applicator Name',\n    width: columnWidth\n  }, {\n    field: 'responsible_person',\n    headerName: 'Responsible Person',\n    width: columnWidth\n  }, {\n    field: 'wind_speed',\n    headerName: 'Wind Speed (mph)',\n    width: columnWidth\n  }, {\n    field: 'wind_direction',\n    headerName: 'Wind Direction',\n    width: columnWidth\n  }, {\n    field: 'average_temp',\n    headerName: 'Avg Temp (F°)',\n    width: columnWidth\n  }, {\n    field: 'note',\n    headerName: 'Note',\n    width: columnLongWidth\n  }, {\n    field: 'update_time',\n    headerName: 'Update Time',\n    width: columnWidth\n  }];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    setRows(createRowData());\n  }, [sprayApplicationList]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    open: showRecordModal,\n    onClose: () => setShowRecordModal(false),\n    sx: {\n      display: 'flex',\n      justifyContent: 'center',\n      alignItems: 'center'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    style: {\n      height: 'calc(2/3 * 100vh)',\n      width: 'calc(2/3 * 100vw)',\n      overflow: 'auto'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_13__.DataGrid, {\n    columns: columns,\n    rows: rows,\n    checkboxSelection: true,\n    onRowSelectionModelChange: newRowSelectionModel => {\n      setRowsSelected(newRowSelectionModel);\n    },\n    rowSelectionModel: rowsSelected,\n    slots: {\n      toolbar: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReportToolbar, {\n        reportID: reportID,\n        rowsSelected: rowsSelected,\n        dataList: rows\n      })\n    },\n    density: \"compact\"\n  })));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/SprayDataModal.js?")},"./src/pages/Report/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Report)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _SprayDataModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SprayDataModal */ "./src/pages/Report/SprayDataModal.js");\n/* harmony import */ var _ReportCardList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReportCardList */ "./src/pages/Report/ReportCardList.js");\n\n\n\n\nfunction Report(props) {\n  const uid = props.uid;\n  const [sprayApplicationList, setSprayApplicationList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [cropList, setCropList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [siteList, setSiteList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [chemicalList, setChemicalList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [purchaseList, setPurchaseList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [showRecordModal, setShowRecordModal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [reportID, setReportID] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  async function CropListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/crop/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setCropList(data.data);\n        });\n      }\n    });\n  }\n  async function SiteListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/site/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setSiteList(flatten(data.data));\n        });\n      }\n    });\n  }\n  async function ChemicalListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/chemical/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setChemicalList(data.data);\n        });\n      }\n    });\n  }\n  async function PurchaseListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/operation/purchase/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setPurchaseList(data.data);\n        });\n      }\n    });\n  }\n  async function SprayApplicationListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/operation/application/list/get/?" + "uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setSprayApplicationList(data.data);\n        });\n      }\n    });\n  }\n  const flatten = data => {\n    let result = [];\n    for (let i = 0; i < data.length; i++) {\n      let obj = {};\n      obj = {\n        ...data[i]\n      };\n      delete obj.children;\n      result.push(obj);\n      if (data[i].children) {\n        result = result.concat(flatten(data[i].children));\n      }\n    }\n    return result;\n  };\n  const reportListProps = {\n    setShowRecordModal,\n    setReportID\n  };\n  const recordModalProps = {\n    showRecordModal,\n    setShowRecordModal,\n    cropList,\n    siteList,\n    chemicalList,\n    purchaseList,\n    sprayApplicationList,\n    reportID\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([CropListGet(uid), SiteListGet(uid), await ChemicalListGet(uid), PurchaseListGet(uid)]);\n      await SprayApplicationListGet(uid);\n    };\n    fetchData();\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ReportCardList__WEBPACK_IMPORTED_MODULE_2__["default"], reportListProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_SprayDataModal__WEBPACK_IMPORTED_MODULE_1__["default"], recordModalProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/index.js?')},"./src/pages/Report/reportGenerators/CentralPosting/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ CentralPostingGenerator)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils */ "./src/utils/index.js");\n\n\n\nconst reportGenerateUrl = \'/api/report/central-posting\';\nfunction CentralPostingGenerator(reportData, format) {\n  return new Promise(async (resolve, reject) => {\n    try {\n      const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCookie)(\'csrftoken\');\n      const requestOptions = {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          \'X-CSRFToken\': csrftoken\n        },\n        body: JSON.stringify({\n          reportData: reportData,\n          format: format\n        })\n      };\n      const response = await fetch(reportGenerateUrl, requestOptions);\n      const reportFile = await response.arrayBuffer();\n      const blob = new Blob([reportFile], {\n        type: format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"\n      });\n      const downloadUrl = URL.createObjectURL(blob);\n      const downloadLink = document.createElement("a");\n      downloadLink.href = downloadUrl;\n      downloadLink.download = "Central Posting " + dayjs__WEBPACK_IMPORTED_MODULE_1___default()().format(\'YYYY-MM-DD_HH-mm-ss\') + (format === "pdf" ? ".pdf" : ".xlsx");\n      downloadLink.click();\n      URL.revokeObjectURL(downloadUrl);\n      resolve();\n    } catch (error) {\n      console.error("Failed to generate and download file:", error);\n      reject(error);\n    }\n  });\n}\n;\n\n//# sourceURL=webpack://frontend/./src/pages/Report/reportGenerators/CentralPosting/index.js?')},"./src/pages/Report/reportGenerators/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ reportGenerator)\n/* harmony export */ });\n/* harmony import */ var _CentralPosting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CentralPosting */ "./src/pages/Report/reportGenerators/CentralPosting/index.js");\n\nconst central_posting_generator = async (dataList, rowsSelected, format) => {\n  const reportData = dataList.filter(item => rowsSelected.includes(item.id));\n  await (0,_CentralPosting__WEBPACK_IMPORTED_MODULE_0__["default"])(reportData, format);\n};\nconst reportGeneratorList = {\n  central_posting: central_posting_generator\n};\nfunction reportGenerator(id) {\n  return reportGeneratorList[id];\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/reportGenerators/index.js?')}}]);