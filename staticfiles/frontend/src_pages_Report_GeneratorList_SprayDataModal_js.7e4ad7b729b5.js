/*! For license information please see src_pages_Report_GeneratorList_SprayDataModal_js.js.LICENSE.txt */
(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_Report_GeneratorList_SprayDataModal_js"],{"./node_modules/@mui/icons-material/Close.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";eval('\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");\nObject.defineProperty(exports, "__esModule", ({\n  value: true\n}));\nexports["default"] = void 0;\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@mui/icons-material/utils/createSvgIcon.js"));\nvar _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");\nvar _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {\n  d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"\n}), \'Close\');\nexports["default"] = _default;\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/icons-material/Close.js?')},"./src/pages/Report/GeneratorList/SprayDataModal.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ SprayDataModal)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Menu/Menu.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/MenuItem/MenuItem.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Modal/Modal.js");\n/* harmony import */ var _mui_icons_material_Summarize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/icons-material/Summarize */ "./node_modules/@mui/icons-material/Summarize.js");\n/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/icons-material/Close */ "./node_modules/@mui/icons-material/Close.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js");\n/* harmony import */ var _ReportGenerators_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReportGenerators/index */ "./src/pages/Report/ReportGenerators/index.js");\n\n\n\n\n\n\n\n\nconst columnSmallWidth = 100;\nconst columnWidth = 200;\nconst columnMidWidth = 250;\nconst columnLongWidth = 300;\nfunction ReportToolbar({\n  uid,\n  employerID,\n  reportID,\n  rowsSelected,\n  dataList,\n  setShowRecordModal,\n  refreshRecord,\n  setRefreshRecord,\n  setIsGenerate,\n  report_list\n}) {\n  const [anchorEl, setAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const handleClick = event => {\n    setAnchorEl(event.currentTarget);\n  };\n  const handleClose = () => {\n    setAnchorEl(null);\n  };\n  const handleFormatClick = event => {\n    generateReport(reportID, event.target.id);\n    handleClose();\n  };\n  const generateReport = async (reportID, format) => {\n    const generator = (0,_ReportGenerators_index__WEBPACK_IMPORTED_MODULE_1__["default"])(reportID);\n    if (generator) {\n      await generator(dataList, rowsSelected, format, uid, employerID);\n      setRefreshRecord(~refreshRecord);\n      setShowRecordModal(false);\n      setIsGenerate(true);\n    } else {\n      console.error(`No generator found for reportID: ${reportID}`);\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridToolbarExport, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    size: "small",\n    startIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Summarize__WEBPACK_IMPORTED_MODULE_8__["default"], null),\n    onClick: handleClick\n  }, "Generate ", report_list.find(item => item.id === reportID).name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    size: "small",\n    startIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_9__["default"], null),\n    onClick: () => setShowRecordModal(false)\n  }, "Close"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {\n    anchorEl: anchorEl,\n    open: Boolean(anchorEl),\n    onClose: handleClose\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {\n    id: "xlsx",\n    onClick: handleFormatClick\n  }, "Generate XLSX")));\n}\nfunction SprayDataModal({\n  uid,\n  employerID,\n  showRecordModal,\n  setShowRecordModal,\n  reportID,\n  privilege,\n  refreshRecord,\n  setRefreshRecord,\n  setIsGenerate,\n  report_list\n}) {\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rowsSelected, setRowsSelected] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [sprayApplicationList, setSprayApplicationList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [cropList, setCropList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [siteList, setSiteList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [chemicalList, setChemicalList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [purchaseList, setPurchaseList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  async function CropListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    if (privilege.spray_r) {\n      await fetch("/api/crop/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n        if (response.ok) {\n          response.json().then(data => {\n            setCropList(data.data);\n          });\n        }\n      });\n    }\n  }\n  async function SiteListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    if (privilege.spray_r) {\n      await fetch("/api/site/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n        if (response.ok) {\n          response.json().then(data => {\n            setSiteList(flatten(data.data));\n          });\n        }\n      });\n    }\n  }\n  async function ChemicalListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    if (privilege.spray_r) {\n      await fetch("/api/chemical/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n        if (response.ok) {\n          response.json().then(data => {\n            setChemicalList(data.data);\n          });\n        }\n      });\n    }\n  }\n  async function PurchaseListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    if (privilege.spray_r) {\n      await fetch("/api/operation/purchase/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n        if (response.ok) {\n          response.json().then(data => {\n            setPurchaseList(data.data);\n          });\n        }\n      });\n    }\n  }\n  async function SprayApplicationListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    if (privilege.spray_r) {\n      await fetch("/api/operation/application/list/get/?" + "uid=" + uid, requestOptions).then(response => {\n        if (response.ok) {\n          response.json().then(data => {\n            setSprayApplicationList(data.data);\n          });\n        }\n      });\n    }\n  }\n  const flatten = data => {\n    let result = [];\n    for (let i = 0; i < data.length; i++) {\n      let obj = {};\n      obj = {\n        ...data[i]\n      };\n      delete obj.children;\n      result.push(obj);\n      if (data[i].children) {\n        result = result.concat(flatten(data[i].children));\n      }\n    }\n    return result;\n  };\n  const createRowData = () => {\n    return sprayApplicationList.map(record => {\n      const crop = cropList.find(item => item.cid === record.crop);\n      const purchase = purchaseList.find(item => item.prid === record.chemical_purchase);\n      const chemical = chemicalList.find(item => item.chemid === purchase.chemical);\n      let site = siteList.find(item => item.sid === record.site);\n      let siteStr = site.name;\n      while (site.parent) {\n        site = siteList.find(item => item.sid === site.parent);\n        siteStr = `${site.name} - ${siteStr}`;\n      }\n      for (let key in record) {\n        if (record[key] === null) {\n          record[key] = "";\n        }\n      }\n      return {\n        "id": record.arid,\n        "user": record.user,\n        "crop": crop.crop,\n        "start_datetime": record.start_datetime,\n        "finish_datetime": record.finish_datetime,\n        "site": siteStr,\n        "partial_treatment": record.partial_treatment ? "Yes" : "No",\n        "variety": crop.variety,\n        "alt_row_middle": record.alt_row_middle ? "X" : "",\n        "growth_stage": record.growth_stage,\n        "target": record.target,\n        "decision_support": record.decision_support,\n        "trade_name": chemical.trade_name,\n        "active_ingredient": chemical.active_ingredient,\n        "percent_ai": chemical.percent_ai,\n        "epa_reg_no": chemical.epa_reg_no,\n        "rei": chemical.rei,\n        "phi": chemical.phi,\n        "harvestable_date": record.harvestable_date,\n        "equipment": record.equipment,\n        "amount_pesticide_per_tank": record.amount_pesticide_per_tank ? `${record.amount_pesticide_per_tank} ${chemical.unit}` : "",\n        "gallons_water_rate": `${record.gallons_water_rate} per ${record.area_unit}`,\n        "application_rate": `${record.application_rate} ${chemical.unit} per ${record.area_unit}`,\n        "applied_area": `${record.applied_area} ${record.area_unit}`,\n        "total_amount": `${record.total_amount} ${chemical.unit}`,\n        "cost_per_unit": `\\$${purchase.cost_per_unit} per ${chemical.unit}`,\n        "total_cost": `\\$${record.total_cost}`,\n        "applicator": record.applicator,\n        "responsible_person": record.responsible_person,\n        "wind_speed": record.wind_speed,\n        "wind_direction": record.wind_direction,\n        "average_temp": record.average_temp,\n        "note": record.note,\n        "update_time": record.update_time\n      };\n    });\n  };\n  const columns = [{\n    field: \'crop\',\n    headerName: \'Crop\',\n    width: columnSmallWidth\n  }, {\n    field: \'start_datetime\',\n    headerName: \'Datetime Start Spray\',\n    width: columnWidth\n  }, {\n    field: \'finish_datetime\',\n    headerName: \'Datetime Finish Spray\',\n    width: columnWidth\n  }, {\n    field: \'site\',\n    headerName: \'Site\',\n    width: columnMidWidth\n  }, {\n    field: \'partial_treatment\',\n    headerName: \'Partial Treatment\',\n    width: columnWidth\n  }, {\n    field: \'variety\',\n    headerName: \'Variety Sprayed\',\n    width: columnWidth\n  }, {\n    field: \'alt_row_middle\',\n    headerName: \'Alt Row Middle\',\n    width: columnWidth\n  }, {\n    field: \'growth_stage\',\n    headerName: \'Growth Stage\',\n    width: columnWidth\n  }, {\n    field: \'target\',\n    headerName: \'Target Pest\',\n    width: columnWidth\n  }, {\n    field: \'decision_support\',\n    headerName: \'Decision Support\',\n    width: columnWidth\n  }, {\n    field: \'trade_name\',\n    headerName: \'Pesticide Trade Name\',\n    width: columnMidWidth\n  }, {\n    field: \'active_ingredient\',\n    headerName: \'Active Ingredient\',\n    width: columnMidWidth\n  }, {\n    field: \'percent_ai\',\n    headerName: \'% A.I.\',\n    width: columnMidWidth\n  }, {\n    field: \'epa_reg_no\',\n    headerName: \'EPA Registration Number\',\n    width: columnWidth\n  }, {\n    field: \'rei\',\n    headerName: \'REI (hours)\',\n    width: columnWidth\n  }, {\n    field: \'phi\',\n    headerName: \'PHI (days)\',\n    width: columnWidth\n  }, {\n    field: \'harvestable_date\',\n    headerName: \'Earliest Harvestable Date\',\n    width: columnWidth\n  }, {\n    field: \'equipment\',\n    headerName: \'Spray Equipment\',\n    width: columnWidth\n  }, {\n    field: \'amount_pesticide_per_tank\',\n    headerName: \'Amount Pesticide Per Tank\',\n    width: columnWidth\n  }, {\n    field: \'gallons_water_rate\',\n    headerName: \'Gallons Water Rate\',\n    width: columnWidth\n  }, {\n    field: \'application_rate\',\n    headerName: \'Application Rate\',\n    width: columnWidth\n  }, {\n    field: \'applied_area\',\n    headerName: \'Applied Area\',\n    width: columnWidth\n  }, {\n    field: \'total_amount\',\n    headerName: \'Total Amount Applied \',\n    width: columnWidth\n  }, {\n    field: \'cost_per_unit\',\n    headerName: \'Spray Cost Per Applied Unit\',\n    width: columnWidth\n  }, {\n    field: \'total_cost\',\n    headerName: \'Total Cost\',\n    width: columnWidth\n  }, {\n    field: \'applicator\',\n    headerName: \'Applicator Name\',\n    width: columnWidth\n  }, {\n    field: \'responsible_person\',\n    headerName: \'Responsible Person\',\n    width: columnWidth\n  }, {\n    field: \'wind_speed\',\n    headerName: \'Wind Speed (mph)\',\n    width: columnWidth\n  }, {\n    field: \'wind_direction\',\n    headerName: \'Wind Direction\',\n    width: columnWidth\n  }, {\n    field: \'average_temp\',\n    headerName: \'Avg Temp (F°)\',\n    width: columnWidth\n  }, {\n    field: \'note\',\n    headerName: \'Note\',\n    width: columnLongWidth\n  }, {\n    field: \'update_time\',\n    headerName: \'Update Time\',\n    width: columnWidth\n  }];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    setRows(createRowData());\n  }, [sprayApplicationList]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    setRowsSelected([]);\n  }, [showRecordModal]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([CropListGet(employerID), SiteListGet(employerID), await ChemicalListGet(employerID), PurchaseListGet(employerID)]);\n      await SprayApplicationListGet(employerID);\n    };\n    fetchData();\n  }, []);\n  const toolbarProps = {\n    uid,\n    employerID,\n    reportID,\n    rowsSelected,\n    "dataList": rows,\n    setShowRecordModal,\n    refreshRecord,\n    setRefreshRecord,\n    setIsGenerate,\n    report_list\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    open: showRecordModal,\n    sx: {\n      display: \'flex\',\n      justifyContent: \'center\',\n      alignItems: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_13__["default"], {\n    style: {\n      height: \'calc(2/3 * 100vh)\',\n      width: \'calc(2/3 * 100vw)\',\n      overflow: \'auto\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_14__.DataGrid, {\n    columns: columns,\n    rows: rows,\n    checkboxSelection: true,\n    onRowSelectionModelChange: newRowSelectionModel => {\n      setRowsSelected(newRowSelectionModel);\n    },\n    rowSelectionModel: rowsSelected,\n    slots: {\n      toolbar: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReportToolbar, toolbarProps)\n    },\n    density: "compact",\n    localeText: {\n      noRowsLabel: privilege.spray_r ? "No rows" : "You don\'t have the privilege to access this data"\n    }\n  })));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/GeneratorList/SprayDataModal.js?')},"./src/pages/Report/ReportGenerators/CentralPosting/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ CentralPostingGenerator)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils */ "./src/utils/index.js");\n\n\n\nconst reportGenerateUrl = \'/media/report/central-posting/\';\nfunction CentralPostingGenerator(reportData, format, uid, employerID) {\n  return new Promise(async (resolve, reject) => {\n    try {\n      const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCookie)(\'csrftoken\');\n      const requestOptions = {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          \'X-CSRFToken\': csrftoken\n        },\n        body: JSON.stringify({\n          reportData: reportData,\n          format: format,\n          user_id: employerID,\n          author_id: uid\n        })\n      };\n      const response = await fetch(reportGenerateUrl, requestOptions);\n      if (response.ok) {\n        resolve();\n      }\n    } catch (error) {\n      console.error("Failed to generate file:", error);\n      reject(error);\n    }\n  });\n}\n;\n\n//# sourceURL=webpack://frontend/./src/pages/Report/ReportGenerators/CentralPosting/index.js?')},"./src/pages/Report/ReportGenerators/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ reportGenerator)\n/* harmony export */ });\n/* harmony import */ var _CentralPosting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CentralPosting */ "./src/pages/Report/ReportGenerators/CentralPosting/index.js");\n\nconst central_posting_generator = async (dataList, rowsSelected, format, uid, employerID) => {\n  const reportData = dataList.filter(item => rowsSelected.includes(item.id));\n  await (0,_CentralPosting__WEBPACK_IMPORTED_MODULE_0__["default"])(reportData, format, uid, employerID);\n};\nconst reportGeneratorList = {\n  central_posting: central_posting_generator\n};\nfunction reportGenerator(id) {\n  return reportGeneratorList[id];\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/ReportGenerators/index.js?')},"./node_modules/dayjs/dayjs.min.js":function(module){eval('!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",$=/^(\\d{4})[-/]?(\\d{1,2})?[-/]?(\\d{0,2})[Tt\\s]*(\\d{1,2})?:?(\\d{1,2})?:?(\\d{1,2})?[.:]?(\\d+)?$/,y=/\\[([^\\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,l=this;r=Number(r);var $=O.p(h),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===f)return this.set(f,this.$M+r);if($===c)return this.set(c,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:O.s(this.$y,4,"0"),M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,v=this-M,g=O.m(this,M);return g=($={},$[c]=g/12,$[f]=g,$[h]=g/3,$[o]=(v-m)/6048e5,$[a]=(v-m)/864e5,$[u]=v/n,$[s]=v/e,$[i]=v/t,$)[y]||v,l?g:O.a(g)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));\n\n//# sourceURL=webpack://frontend/./node_modules/dayjs/dayjs.min.js?')}}]);