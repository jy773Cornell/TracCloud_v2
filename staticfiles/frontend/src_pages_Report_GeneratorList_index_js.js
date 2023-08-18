/*! For license information please see src_pages_Report_GeneratorList_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_Report_GeneratorList_index_js"],{"./src/components/Snackbars/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ OperationSnackbars)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Stack */ "./node_modules/@mui/material/Stack/Stack.js");\n/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Snackbar */ "./node_modules/@mui/material/Snackbar/Snackbar.js");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Alert */ "./node_modules/@mui/material/Alert/Alert.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nconst Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Alert(props, ref) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({\n    elevation: 6,\n    ref: ref,\n    variant: "filled"\n  }, props));\n});\nfunction OperationSnackbars(props) {\n  const handleClose = (event, reason) => {\n    if (reason === \'clickaway\') {\n      return;\n    }\n    props.setOpen(false);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    spacing: 2,\n    sx: {\n      width: \'100%\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    open: props.open,\n    autoHideDuration: 6000,\n    onClose: handleClose\n  }, (() => {\n    switch (props.tag) {\n      case \'success\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "success",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'error\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "error",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'warning\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "warning",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      default:\n        return null;\n    }\n  })()));\n}\n\n//# sourceURL=webpack://frontend/./src/components/Snackbars/index.js?')},"./src/pages/Report/GeneratorList/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ GeneratorList)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Snackbars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Snackbars */ "./src/components/Snackbars/index.js");\n\n\n\nconst ReportGenerateList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Button_Button_js"), __webpack_require__.e("vendors-node_modules_mui_material_CardActions_CardActions_js-node_modules_mui_material_CardCo-09640b"), __webpack_require__.e("src_pages_Report_GeneratorList_ReportGenerateList_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./ReportGenerateList */ "./src/pages/Report/GeneratorList/ReportGenerateList.js")));\nconst SprayDataModal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Modal_Modal_js"), __webpack_require__.e("vendors-node_modules_mui_material_Menu_Menu_js"), __webpack_require__.e("vendors-node_modules_mui_material_TextField_TextField_js"), __webpack_require__.e("vendors-node_modules_mui_material_Chip_Chip_js-node_modules_mui_material_Popper_Popper_js"), __webpack_require__.e("vendors-node_modules_mui_material_Autocomplete_Autocomplete_js"), __webpack_require__.e("vendors-node_modules_mui_material_Checkbox_Checkbox_js-node_modules_mui_material_FormControlL-91ee78"), __webpack_require__.e("vendors-node_modules_mui_material_Divider_Divider_js-node_modules_mui_material_ListItemIcon_L-189f4a"), __webpack_require__.e("vendors-node_modules_mui_material_Button_Button_js"), __webpack_require__.e("vendors-node_modules_mui_material_Badge_Badge_js"), __webpack_require__.e("vendors-node_modules_mui_material_MenuItem_MenuItem_js-node_modules_mui_material_internal_svg-338434"), __webpack_require__.e("vendors-node_modules_mui_x-data-grid_DataGrid_DataGrid_js-node_modules_mui_x-data-grid_compon-7ff413"), __webpack_require__.e("vendors-node_modules_dayjs_dayjs_min_js"), __webpack_require__.e("vendors-node_modules_mui_icons-material_Summarize_js-node_modules_mui_material_Typography_Typ-ff95b4"), __webpack_require__.e("src_pages_Report_GeneratorList_SprayDataModal_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./SprayDataModal */ "./src/pages/Report/GeneratorList/SprayDataModal.js")));\nconst report_list = [{\n  id: "central_posting",\n  name: "Central Posting",\n  description: "This is the description for Central Posting report",\n  link: ""\n}, {\n  id: "applicator_report_26",\n  name: "Applicator Report-26",\n  description: "This is the description for Applicator Report-26 report",\n  link: ""\n}, {\n  id: "applicators_26a",\n  name: "Applicators-26A",\n  description: "This is the description for Applicators-26A report",\n  link: ""\n}, {\n  id: "record_keeping_26",\n  name: "RecordKeeping-26",\n  description: "This is the description for RecordKeeping-26 report",\n  link: ""\n}, {\n  id: "priv_app_record",\n  name: "PrivAppRecord",\n  description: "This is the description for PrivAppRecord report",\n  link: ""\n}, {\n  id: "generic_form",\n  name: "GenericForm",\n  description: "This is the description for GenericForm report",\n  link: ""\n}, {\n  id: "motts_and_yonder_distr",\n  name: "Mott\'s&YonderDistr.",\n  description: "This is the description for Mott\'s&YonderDistr. report",\n  link: ""\n}, {\n  id: "birds_eye_and_others",\n  name: "BirdsEye&Others",\n  description: "This is the description for BirdsEye&Others report",\n  link: ""\n}, {\n  id: "beech_nut",\n  name: "BeechNut",\n  description: "This is the description for BeechNut report",\n  link: ""\n}, {\n  id: "knouse",\n  name: "Knouse",\n  description: "This is the description for Knouse report",\n  link: ""\n}, {\n  id: "globalgap",\n  name: "GLOBALGAP",\n  description: "This is the description for GLOBALGAP report",\n  link: ""\n}, {\n  id: "ecoapple",\n  name: "EcoApple",\n  description: "This is the description for EcoApple report",\n  link: ""\n}, {\n  id: "carriage_house",\n  name: "CarriageHouse",\n  description: "This is the description for CarriageHouse report",\n  link: ""\n}, {\n  id: "constellation",\n  name: "Constellation",\n  description: "This is the description for Constellation report",\n  link: ""\n}, {\n  id: "cliffstar_and_westfield_maid",\n  name: "Cliffstar&WestfieldMaid",\n  description: "This is the description for Cliffstar&WestfieldMaid report",\n  link: ""\n}, {\n  id: "growers_coop",\n  name: "GrowersCoop",\n  description: "This is the description for GrowersCoop report",\n  link: ""\n}, {\n  id: "meiers",\n  name: "Meier\'s",\n  description: "This is the description for Meier\'s report",\n  link: ""\n}, {\n  id: "mogen_david",\n  name: "MogenDavid",\n  description: "This is the description for MogenDavid report",\n  link: ""\n}, {\n  id: "national_grape",\n  name: "NationalGrape",\n  description: "This is the description for NationalGrape report",\n  link: ""\n}];\nfunction GeneratorList({\n  props,\n  refreshRecord,\n  setRefreshRecord\n}) {\n  const uid = props.uid;\n  const employerID = props.employerID;\n  const privilege = props.privilege;\n  const [reportID, setReportID] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  const [showRecordModal, setShowRecordModal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [isGenerate, setIsGenerate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const listProps = {\n    report_list,\n    setShowRecordModal,\n    setReportID,\n    privilege\n  };\n  const modalProps = {\n    uid,\n    employerID,\n    showRecordModal,\n    setShowRecordModal,\n    reportID,\n    privilege,\n    refreshRecord,\n    setRefreshRecord,\n    setIsGenerate,\n    report_list\n  };\n  const generateProps = {\n    open: isGenerate,\n    setOpen: setIsGenerate,\n    msg: "Report file is generated!",\n    tag: "success"\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReportGenerateList, listProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SprayDataModal, modalProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_1__["default"], generateProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/GeneratorList/index.js?')}}]);