/*! For license information please see src_pages_Report_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_Report_index_js"],{"./src/components/ReportGenerators/CentralPosting/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ CentralPostingGenerator)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var xlsx_populate_browser_xlsx_populate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xlsx-populate/browser/xlsx-populate */ "./node_modules/xlsx-populate/browser/xlsx-populate.js");\n/* harmony import */ var xlsx_populate_browser_xlsx_populate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xlsx_populate_browser_xlsx_populate__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst templateUrl = \'/api/report/central-posting\';\nasync function CentralPostingGenerator() {\n  try {\n    const templateData = await fetch(templateUrl).then(response => response.arrayBuffer());\n    const workbook = await xlsx_populate_browser_xlsx_populate__WEBPACK_IMPORTED_MODULE_1___default().fromDataAsync(templateData);\n\n    // Fill in data\n\n    const sheet = workbook.sheet("Central Posting");\n    sheet.cell("A1").value("Hello");\n    sheet.cell("B1").value("World");\n    const xlsxBlob = await workbook.outputAsync({\n      type: "blob"\n    });\n    const downloadUrl = URL.createObjectURL(xlsxBlob);\n    const downloadLink = document.createElement("a");\n    downloadLink.href = downloadUrl;\n    downloadLink.download = "Central Posting.xlsx";\n    downloadLink.click();\n    URL.revokeObjectURL(downloadUrl);\n  } catch (error) {\n    console.error("Failed to generate and download xlsx:", error);\n  }\n}\n;\n\n//# sourceURL=webpack://frontend/./src/components/ReportGenerators/CentralPosting/index.js?')},"./src/pages/Report/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Report)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardHeader/CardHeader.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardContent/CardContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardActions/CardActions.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Menu/Menu.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/MenuItem/MenuItem.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Modal/Modal.js");\n/* harmony import */ var _mui_icons_material_Summarize__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/icons-material/Summarize */ "./node_modules/@mui/icons-material/Summarize.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/grey.js");\n/* harmony import */ var _components_ReportGenerators_CentralPosting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/ReportGenerators/CentralPosting */ "./src/components/ReportGenerators/CentralPosting/index.js");\n\n\n\n\n\n\n\n\nconst columnWidth = 200;\nconst columnMidWidth = 250;\nconst columnLongWidth = 350;\nconst report_list = [{\n  id: "restricted_pesticide_purchases",\n  name: "Restricted Pesticide Purchases",\n  description: "This is the description for Restricted Pesticide Purchases report",\n  link: ""\n}, {\n  id: "central_posting",\n  name: "Central Posting",\n  description: "This is the description for Central Posting report",\n  link: ""\n}, {\n  id: "applicator_report_26",\n  name: "Applicator Report-26",\n  description: "This is the description for Applicator Report-26 report",\n  link: ""\n}, {\n  id: "applicators_26a",\n  name: "Applicators-26A",\n  description: "This is the description for Applicators-26A report",\n  link: ""\n}, {\n  id: "record_keeping_26",\n  name: "RecordKeeping-26",\n  description: "This is the description for RecordKeeping-26 report",\n  link: ""\n}, {\n  id: "priv_app_record",\n  name: "PrivAppRecord",\n  description: "This is the description for PrivAppRecord report",\n  link: ""\n}, {\n  id: "generic_form",\n  name: "GenericForm",\n  description: "This is the description for GenericForm report",\n  link: ""\n}, {\n  id: "motts_and_yonder_distr",\n  name: "Mott\'s&YonderDistr.",\n  description: "This is the description for Mott\'s&YonderDistr. report",\n  link: ""\n}, {\n  id: "birds_eye_and_others",\n  name: "BirdsEye&Others",\n  description: "This is the description for BirdsEye&Others report",\n  link: ""\n}, {\n  id: "beech_nut",\n  name: "BeechNut",\n  description: "This is the description for BeechNut report",\n  link: ""\n}, {\n  id: "knouse",\n  name: "Knouse",\n  description: "This is the description for Knouse report",\n  link: ""\n}, {\n  id: "globalgap",\n  name: "GLOBALGAP",\n  description: "This is the description for GLOBALGAP report",\n  link: ""\n}, {\n  id: "ecoapple",\n  name: "EcoApple",\n  description: "This is the description for EcoApple report",\n  link: ""\n}, {\n  id: "carriage_house",\n  name: "CarriageHouse",\n  description: "This is the description for CarriageHouse report",\n  link: ""\n}, {\n  id: "constellation",\n  name: "Constellation",\n  description: "This is the description for Constellation report",\n  link: ""\n}, {\n  id: "cliffstar_and_westfield_maid",\n  name: "Cliffstar&WestfieldMaid",\n  description: "This is the description for Cliffstar&WestfieldMaid report",\n  link: ""\n}, {\n  id: "growers_coop",\n  name: "GrowersCoop",\n  description: "This is the description for GrowersCoop report",\n  link: ""\n}, {\n  id: "meiers",\n  name: "Meier\'s",\n  description: "This is the description for Meier\'s report",\n  link: ""\n}, {\n  id: "mogen_david",\n  name: "MogenDavid",\n  description: "This is the description for MogenDavid report",\n  link: ""\n}, {\n  id: "national_grape",\n  name: "NationalGrape",\n  description: "This is the description for NationalGrape report",\n  link: ""\n}];\nconst spray_report_format = ["central_posting"];\nconst central_posting_generator = async (dataList, rowsSelected, format) => {\n  await (0,_components_ReportGenerators_CentralPosting__WEBPACK_IMPORTED_MODULE_1__["default"])();\n};\nconst reportGenerators = {\n  central_posting: central_posting_generator\n};\nfunction ReportCard({\n  report,\n  setShowRecordModal,\n  setReportID\n}) {\n  const {\n    id,\n    name,\n    description,\n    link\n  } = report;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    elevation: 1,\n    sx: {\n      margin: "15px"\n    },\n    style: {\n      backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_3__["default"][50],\n      border: \'1px solid #c8c8c8\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    title: name\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    variant: "body2",\n    color: "textSecondary"\n  }, description)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    style: {\n      display: \'flex\',\n      gap: \'10px\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    variant: "outlined",\n    size: "small",\n    color: "success",\n    onClick: () => {\n      setShowRecordModal(true);\n      setReportID(id);\n    }\n  }, "Generate"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {\n    href: link,\n    target: "_blank",\n    rel: "noopener noreferrer",\n    style: {\n      textDecoration: \'none\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    variant: "outlined",\n    size: "small"\n  }, "Learn More"))));\n}\nfunction ReportList({\n  setShowRecordModal,\n  setReportID\n}) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n    container: true,\n    spacing: 1\n  }, report_list.map(report => {\n    const props = {\n      report,\n      setShowRecordModal,\n      setReportID\n    };\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n      item: true,\n      xs: 6,\n      md: 3,\n      lg: 2.4,\n      key: report.id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReportCard, props));\n  }));\n}\nfunction ReportToolbar({\n  reportID,\n  rowsSelected,\n  dataList\n}) {\n  const [anchorEl, setAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const handleClick = event => {\n    setAnchorEl(event.currentTarget);\n  };\n  const handleClose = () => {\n    setAnchorEl(null);\n  };\n  const handleFormatClick = event => {\n    generateReport(reportID, event.target.id);\n    handleClose();\n  };\n  const generateReport = (reportID, format) => {\n    const generator = reportGenerators[reportID];\n    if (generator) {\n      generator(dataList, rowsSelected, format);\n    } else {\n      console.error(`No generator found for reportID: ${reportID}`);\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_10__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_11__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_12__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_13__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_14__.GridToolbarExport, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    size: "small",\n    startIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Summarize__WEBPACK_IMPORTED_MODULE_15__["default"], null),\n    onClick: handleClick\n  }, "Generate Report"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_16__["default"], {\n    anchorEl: anchorEl,\n    open: Boolean(anchorEl),\n    onClose: handleClose\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_17__["default"], {\n    id: "xlsx",\n    onClick: handleFormatClick\n  }, "Download as XLSX"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_17__["default"], {\n    id: "pdf",\n    onClick: handleFormatClick\n  }, "Download as PDF")));\n}\nfunction RecordModal({\n  showRecordModal,\n  setShowRecordModal,\n  cropList,\n  siteList,\n  chemicalList,\n  purchaseList,\n  equipmentList,\n  sprayApplicationList,\n  reportID\n}) {\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [columns, setColumns] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rowsSelected, setRowsSelected] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const createRowData = () => {\n    if (spray_report_format.includes(reportID)) {\n      return sprayApplicationList.map(record => {\n        const crop = cropList.find(item => item.cid === record.crop);\n        const purchase = purchaseList.find(item => item.prid === record.chemical_purchase);\n        const chemical = chemicalList.find(item => item.chemid === purchase.chemical);\n        const equipment = equipmentList.find(item => item.eid === record.equipment);\n        let site = siteList.find(item => item.sid === record.site);\n        let siteStr = site.name;\n        while (site.parent) {\n          site = siteList.find(item => item.sid === site.parent);\n          siteStr = `${site.name} - ${siteStr}`;\n        }\n        return {\n          "id": record.arid,\n          "crop": `${crop.crop} (${crop.variety}, ${crop.growth_stage})`,\n          "site": siteStr,\n          "applied_area": `${record.applied_area} ${record.area_unit}`,\n          "app_date": record.app_date,\n          "start_time": record.start_time,\n          "finish_time": record.finish_time,\n          "operator": record.operator,\n          "target": record.target,\n          "decision_support": record.decision_support,\n          "chemical_purchase": chemical.epa_reg_no,\n          "trade_name": chemical.trade_name,\n          "active_ingredient": chemical.active_ingredient,\n          "percent_ai": chemical.percent_ai,\n          "rei": chemical.rei,\n          "phi": chemical.phi,\n          "cost_per_unit": `\\$${purchase.cost_per_unit} per ${chemical.unit}`,\n          "equipment": equipment.name,\n          "water_use": `${record.water_use} ${record.water_unit} per ${record.area_unit}`,\n          "application_rate": `${record.application_rate} ${chemical.unit} per ${record.area_unit}`,\n          "total_amount": `${record.total_amount} ${chemical.unit}`,\n          "total_cost": `\\$${record.total_cost}`,\n          "customer": record.customer,\n          "wind_speed": record.wind_speed,\n          "wind_direction": record.wind_direction,\n          "average_temp": record.average_temp,\n          "update_time": record.update_time\n        };\n      });\n    } else {\n      return [];\n    }\n  };\n  const createColumns = () => {\n    if (spray_report_format.includes(reportID)) {\n      return [{\n        field: \'crop\',\n        headerName: \'Crop\',\n        sortable: false,\n        width: columnLongWidth\n      }, {\n        field: \'site\',\n        headerName: \'Site\',\n        sortable: false,\n        width: columnLongWidth\n      }, {\n        field: \'applied_area\',\n        headerName: \'Applied Area\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'app_date\',\n        headerName: \'Application Date\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'start_time\',\n        headerName: \'Start Time\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'finish_time\',\n        headerName: \'Finish Time\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'operator\',\n        headerName: \'Operator\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'target\',\n        headerName: \'Application Target\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'decision_support\',\n        headerName: \'Decision Support\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'chemical_purchase\',\n        headerName: \'EPA Registration No.\',\n        sortable: false,\n        width: columnMidWidth\n      }, {\n        field: \'trade_name\',\n        headerName: \'Trade Name\',\n        sortable: false,\n        width: columnMidWidth\n      }, {\n        field: \'active_ingredient\',\n        headerName: \'Active Ingredient\',\n        sortable: false,\n        width: columnMidWidth\n      }, {\n        field: \'percent_ai\',\n        headerName: \'Active Ingredient Percent\',\n        sortable: false,\n        width: columnMidWidth\n      }, {\n        field: \'rei\',\n        headerName: \'REI\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'phi\',\n        headerName: \'PHI\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'cost_per_unit\',\n        headerName: \'Cost per Unit\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'equipment\',\n        headerName: \'Equipment\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'water_use\',\n        headerName: \'Water Use\',\n        sortable: false,\n        width: columnMidWidth\n      }, {\n        field: \'application_rate\',\n        headerName: \'Application Rate\',\n        sortable: false,\n        width: columnMidWidth\n      }, {\n        field: \'total_amount\',\n        headerName: \'Total Amount\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'total_cost\',\n        headerName: \'Total Cost\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'customer\',\n        headerName: \'Customer\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'wind_speed\',\n        headerName: \'Wind Speed\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'wind_direction\',\n        headerName: \'Wind Direction\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'average_temp\',\n        headerName: \'Average Temperature\',\n        sortable: false,\n        width: columnWidth\n      }, {\n        field: \'update_time\',\n        headerName: \'Update Time\',\n        sortable: false,\n        width: columnWidth\n      }];\n    } else {\n      return [];\n    }\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    setRows(createRowData());\n    setColumns(createColumns());\n  }, [reportID, sprayApplicationList]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_18__["default"], {\n    open: showRecordModal,\n    onClose: () => setShowRecordModal(false),\n    sx: {\n      display: \'flex\',\n      justifyContent: \'center\',\n      alignItems: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_19__["default"], {\n    style: {\n      height: \'calc(2/3 * 100vh)\',\n      width: \'calc(2/3 * 100vw)\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_20__.DataGrid, {\n    columns: columns,\n    rows: rows,\n    checkboxSelection: true,\n    onRowSelectionModelChange: newRowSelectionModel => {\n      setRowsSelected(newRowSelectionModel);\n    },\n    rowSelectionModel: rowsSelected,\n    slots: {\n      toolbar: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReportToolbar, {\n        reportID: reportID,\n        rowsSelected: rowsSelected,\n        dataList: {\n          sprayApplicationList: sprayApplicationList,\n          purchaseList: purchaseList\n        }\n      })\n    },\n    density: "compact"\n  })));\n}\nfunction Report(props) {\n  const uid = props.uid;\n  const [sprayApplicationList, setSprayApplicationList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [cropList, setCropList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [siteList, setSiteList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [chemicalList, setChemicalList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [purchaseList, setPurchaseList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [equipmentList, setEquipmentList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [showRecordModal, setShowRecordModal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [reportID, setReportID] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  async function CropListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/crop/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setCropList(data.data);\n        });\n      }\n    });\n  }\n  async function SiteListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/site/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setSiteList(flatten(data.data));\n        });\n      }\n    });\n  }\n  async function ChemicalListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/chemical/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setChemicalList(data.data);\n        });\n      }\n    });\n  }\n  async function EquipmentListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/equipment/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setEquipmentList(data.data);\n        });\n      }\n    });\n  }\n  async function PurchaseListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/operation/purchase/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setPurchaseList(data.data);\n        });\n      }\n    });\n  }\n  async function SprayApplicationListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/operation/application/list/get/?" + "uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          const sprayList = data.data.filter(item => item.type === "Spray");\n          setSprayApplicationList(sprayList);\n        });\n      }\n    });\n  }\n  const flatten = data => {\n    let result = [];\n    for (let i = 0; i < data.length; i++) {\n      let obj = {};\n      obj = {\n        ...data[i]\n      };\n      delete obj.children;\n      result.push(obj);\n      if (data[i].children) {\n        result = result.concat(flatten(data[i].children));\n      }\n    }\n    return result;\n  };\n  const reportListProps = {\n    setShowRecordModal,\n    setReportID\n  };\n  const recordModalProps = {\n    showRecordModal,\n    setShowRecordModal,\n    cropList,\n    siteList,\n    chemicalList,\n    purchaseList,\n    equipmentList,\n    sprayApplicationList,\n    reportID\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([CropListGet(uid), SiteListGet(uid), EquipmentListGet(uid), await ChemicalListGet(uid), PurchaseListGet(uid)]);\n      await SprayApplicationListGet(uid);\n    };\n    fetchData();\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReportList, reportListProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RecordModal, recordModalProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/index.js?')}}]);