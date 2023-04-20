/*! For license information please see src_pages_Report_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_Report_index_js"],{"./src/components/Snackbars/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ OperationSnackbars)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Stack */ "./node_modules/@mui/material/Stack/Stack.js");\n/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Snackbar */ "./node_modules/@mui/material/Snackbar/Snackbar.js");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Alert */ "./node_modules/@mui/material/Alert/Alert.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nconst Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Alert(props, ref) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({\n    elevation: 6,\n    ref: ref,\n    variant: "filled"\n  }, props));\n});\nfunction OperationSnackbars(props) {\n  const handleClose = (event, reason) => {\n    if (reason === \'clickaway\') {\n      return;\n    }\n    props.setOpen(false);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    spacing: 2,\n    sx: {\n      width: \'100%\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    open: props.open,\n    autoHideDuration: 6000,\n    onClose: handleClose\n  }, (() => {\n    switch (props.tag) {\n      case \'success\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "success",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'error\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "error",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'warning\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "warning",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      default:\n        return null;\n    }\n  })()));\n}\n\n//# sourceURL=webpack://frontend/./src/components/Snackbars/index.js?')},"./src/pages/Report/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Report)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardContent/CardContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardActions/CardActions.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Modal/Modal.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/pages/Report/styles.js");\n/* harmony import */ var _components_Snackbars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Snackbars */ "./src/components/Snackbars/index.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/Container/Container.js");\n\n\n\n\n\n\n\n\n\nconst report_list = [{\n  id: 0,\n  name: "Central Posting",\n  description: "This is a central posting report",\n  link: "related_url"\n}];\nconst columnWidth = 200;\nconst columnMidWidth = 250;\nconst columnLongWidth = 350;\nfunction CustomToolbar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_7__.GridToolbarExport, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.AddButton, null));\n}\nfunction ReportCard({\n  info\n}) {\n  const {\n    name,\n    description,\n    link\n  } = info;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    sx: {\n      width: 250,\n      height: 150,\n      margin: \'15px\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {\n    variant: "h5",\n    component: "div"\n  }, "name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {\n    sx: {\n      mb: 1.5\n    },\n    color: "text.secondary"\n  }, "adjective"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {\n    variant: "body2"\n  }, "well meaning and kindly.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), \'"a benevolent smile"\')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    size: "small"\n  }, "Learn More")));\n}\nfunction ReportGeneratorList() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_system__WEBPACK_IMPORTED_MODULE_13__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], {\n    container: true,\n    spacing: 3\n  }, report_list.map(report => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], {\n    item: true,\n    xs: 12,\n    md: 6,\n    lg: 4,\n    key: report.id\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReportCard, {\n    info: report\n  })))));\n}\nfunction RecordModal({\n  showRecordModal,\n  setShowRecordModal,\n  rows,\n  columns,\n  rowSelectionModel,\n  setRowSelectionModel\n}) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_15__["default"], {\n    open: showRecordModal,\n    onClose: () => setShowRecordModal(false),\n    sx: {\n      display: \'flex\',\n      justifyContent: \'center\',\n      alignItems: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_16__["default"], {\n    style: {\n      height: 500,\n      width: 1000\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_17__.DataGrid, {\n    columns: columns,\n    rows: rows,\n    checkboxSelection: true,\n    onRowSelectionModelChange: newRowSelectionModel => {\n      setRowSelectionModel(newRowSelectionModel);\n    },\n    rowSelectionModel: rowSelectionModel,\n    slots: {\n      toolbar: CustomToolbar\n    },\n    density: "compact"\n  })));\n}\nfunction Report(props) {\n  const uid = props.uid;\n  const [sprayApplicationList, setSprayApplicationList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [cropList, setCropList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [siteList, setSiteList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [chemicalList, setChemicalList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [purchaseList, setPurchaseList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [equipmentList, setEquipmentList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rowSelectionModel, setRowSelectionModel] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [showRecordModal, setShowRecordModal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [success, setSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [warning, setWarning] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  async function CropListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/crop/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setCropList(data.data);\n        });\n      }\n    });\n  }\n  async function SiteListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/site/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setSiteList(flatten(data.data));\n        });\n      }\n    });\n  }\n  async function ChemicalListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/chemical/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setChemicalList(data.data);\n        });\n      }\n    });\n  }\n  async function EquipmentListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/equipment/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setEquipmentList(data.data);\n        });\n      }\n    });\n  }\n  async function PurchaseListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/operation/purchase/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setPurchaseList(data.data);\n        });\n      }\n    });\n  }\n  async function SprayApplicationListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/operation/application/list/get/?" + "uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          const sprayList = data.data.filter(item => item.type === "Spray");\n          setSprayApplicationList(sprayList);\n        });\n      }\n    });\n  }\n  const flatten = data => {\n    let result = [];\n    for (let i = 0; i < data.length; i++) {\n      let obj = {};\n      obj = {\n        ...data[i]\n      };\n      delete obj.children;\n      result.push(obj);\n      if (data[i].children) {\n        result = result.concat(flatten(data[i].children));\n      }\n    }\n    return result;\n  };\n  const createRowData = record => {\n    const crop = cropList.find(item => item.cid === record.crop);\n    const purchase = purchaseList.find(item => item.prid === record.chemical_purchase);\n    const chemical = chemicalList.find(item => item.chemid === purchase.chemical);\n    const equipment = equipmentList.find(item => item.eid === record.equipment);\n    let site = siteList.find(item => item.sid === record.site);\n    let siteStr = site.name;\n    while (site.parent) {\n      site = siteList.find(item => item.sid === site.parent);\n      siteStr = `${site.name} - ${siteStr}`;\n    }\n    return {\n      "id": record.arid,\n      "crop": `${crop.crop} (${crop.variety}, ${crop.growth_stage})`,\n      "site": siteStr,\n      "applied_area": `${record.applied_area} ${record.area_unit}`,\n      "app_datetime": record.app_datetime,\n      "operator": record.operator,\n      "target": record.target,\n      "decision_support": record.decision_support,\n      "chemical_purchase": chemical.epa_reg_no,\n      "trade_name": chemical.trade_name,\n      "active_ingredient": chemical.active_ingredient,\n      "percent_ai": chemical.percent_ai,\n      "rei": chemical.rei,\n      "phi": chemical.phi,\n      "cost_per_unit": `\\$${purchase.cost_per_unit} per ${chemical.unit}`,\n      "equipment": equipment.name,\n      "water_use": `${record.water_use} ${record.water_unit} per ${record.area_unit}`,\n      "application_rate": `${record.application_rate} ${chemical.unit} per ${record.area_unit}`,\n      "total_amount": `${record.total_amount} ${chemical.unit}`,\n      "total_cost": `\\$${record.total_cost}`,\n      "customer": record.customer,\n      "wind_speed": record.wind_speed,\n      "wind_direction": record.wind_direction,\n      "average_temp": record.average_temp,\n      "update_time": record.update_time\n    };\n  };\n  const columns = [{\n    field: \'crop\',\n    headerName: \'Crop\',\n    sortable: false,\n    width: columnLongWidth\n  }, {\n    field: \'site\',\n    headerName: \'Site\',\n    sortable: false,\n    width: columnLongWidth\n  }, {\n    field: \'applied_area\',\n    headerName: \'Applied Area\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'app_datetime\',\n    headerName: \'Application Datetime\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'operator\',\n    headerName: \'Operator\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'target\',\n    headerName: \'Application Target\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'decision_support\',\n    headerName: \'Decision Support\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'chemical_purchase\',\n    headerName: \'EPA Registration No.\',\n    sortable: false,\n    width: columnMidWidth\n  }, {\n    field: \'trade_name\',\n    headerName: \'Trade Name\',\n    sortable: false,\n    width: columnMidWidth\n  }, {\n    field: \'active_ingredient\',\n    headerName: \'Active Ingredient\',\n    sortable: false,\n    width: columnMidWidth\n  }, {\n    field: \'percent_ai\',\n    headerName: \'Active Ingredient Percent\',\n    sortable: false,\n    width: columnMidWidth\n  }, {\n    field: \'rei\',\n    headerName: \'REI\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'phi\',\n    headerName: \'PHI\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'cost_per_unit\',\n    headerName: \'Cost per Unit\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'equipment\',\n    headerName: \'Equipment\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'water_use\',\n    headerName: \'Water Use\',\n    sortable: false,\n    width: columnMidWidth\n  }, {\n    field: \'application_rate\',\n    headerName: \'Application Rate\',\n    sortable: false,\n    width: columnMidWidth\n  }, {\n    field: \'total_amount\',\n    headerName: \'Total Amount\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'total_cost\',\n    headerName: \'Total Cost\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'customer\',\n    headerName: \'Customer\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'wind_speed\',\n    headerName: \'Wind Speed\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'wind_direction\',\n    headerName: \'Wind Direction\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'average_temp\',\n    headerName: \'Average Temperature\',\n    sortable: false,\n    width: columnWidth\n  }, {\n    field: \'update_time\',\n    headerName: \'Update Time\',\n    sortable: false,\n    width: columnWidth\n  }];\n  const recordModalProps = {\n    showRecordModal,\n    setShowRecordModal,\n    rows,\n    columns,\n    rowSelectionModel,\n    setRowSelectionModel\n  };\n  const successProps = {\n    open: success,\n    setOpen: setSuccess,\n    msg: "Crop record is uploaded successfully!",\n    tag: "success"\n  };\n  const warningProps = {\n    open: warning,\n    setOpen: setWarning,\n    msg: "Crop record has been deleted!",\n    tag: "success"\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([CropListGet(uid), SiteListGet(uid), EquipmentListGet(uid), await ChemicalListGet(uid), PurchaseListGet(uid)]);\n      await SprayApplicationListGet(uid);\n    };\n    fetchData();\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    setRows(sprayApplicationList.map(record => createRowData(record)));\n  }, [sprayApplicationList]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReportGeneratorList, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RecordModal, recordModalProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], successProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], warningProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/index.js?')},"./src/pages/Report/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "AddButton": () => (/* binding */ AddButton)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/styled.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/orange.js");\n\n\n\nconst AddButton = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"])(() => ({\n  margin: "15px 15px",\n  backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][500],\n  \'&:hover\': {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][700]\n  }\n}));\n\n//# sourceURL=webpack://frontend/./src/pages/Report/styles.js?')}}]);