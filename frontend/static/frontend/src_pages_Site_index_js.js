/*! For license information please see src_pages_Site_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_Site_index_js"],{"./src/components/ConfirmPopover/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ConfirmPopover)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Popover/Popover.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n\n\n\n\nfunction ConfirmPopover(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], {\n    open: Boolean(props.anchorEl),\n    anchorEl: props.anchorEl,\n    anchorOrigin: {\n      vertical: \'bottom\',\n      horizontal: \'center\'\n    },\n    transformOrigin: {\n      vertical: \'top\',\n      horizontal: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    sx: {\n      p: 1,\n      maxWidth: 400\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    variant: "body1"\n  }, props.msg), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    onClick: () => {\n      if (props.type === "delete") {\n        props.setAnchorEl(null);\n        props.onDeleteClicked(props.params);\n      } else if (props.type === "update") {\n        props.setAnchorEl(null);\n        props.onSaveClicked();\n      }\n    },\n    color: "primary"\n  }, "Yes"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    onClick: () => props.setAnchorEl(null),\n    color: "secondary"\n  }, "No")));\n}\n\n//# sourceURL=webpack://frontend/./src/components/ConfirmPopover/index.js?')},"./src/components/Snackbars/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ OperationSnackbars)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Stack */ "./node_modules/@mui/material/Stack/Stack.js");\n/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Snackbar */ "./node_modules/@mui/material/Snackbar/Snackbar.js");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Alert */ "./node_modules/@mui/material/Alert/Alert.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\nconst Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Alert(props, ref) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({\n    elevation: 6,\n    ref: ref,\n    variant: "filled"\n  }, props));\n});\nfunction OperationSnackbars(props) {\n  const handleClose = (event, reason) => {\n    if (reason === \'clickaway\') {\n      return;\n    }\n    props.setOpen(false);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    spacing: 2,\n    sx: {\n      width: \'100%\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    open: props.open,\n    autoHideDuration: 6000,\n    onClose: handleClose\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n    onClose: handleClose,\n    severity: "success",\n    sx: {\n      width: \'100%\'\n    }\n  }, props.msg)));\n}\n\n//# sourceURL=webpack://frontend/./src/components/Snackbars/index.js?')},"./src/pages/Site/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Site)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/IconButton */ "./node_modules/@mui/material/IconButton/IconButton.js");\n/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @mui/icons-material/Add */ "./node_modules/@mui/icons-material/Add.js");\n/* harmony import */ var _mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/icons-material/Edit */ "./node_modules/@mui/icons-material/Edit.js");\n/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/icons-material/Delete */ "./node_modules/@mui/icons-material/Delete.js");\n/* harmony import */ var _mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/icons-material/Save */ "./node_modules/@mui/icons-material/Save.js");\n/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/icons-material/Cancel */ "./node_modules/@mui/icons-material/Cancel.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Modal/Modal.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardContent/CardContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Autocomplete/Autocomplete.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/pages/Site/styles.js");\n/* harmony import */ var _components_Snackbars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Snackbars */ "./src/components/Snackbars/index.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js");\n/* harmony import */ var _components_ConfirmPopover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ConfirmPopover */ "./src/components/ConfirmPopover/index.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst columnWidth = 200;\nconst editWidth = 180;\nconst field_names = ["crop", "variety", "crop_code", "category", "growth_stage"];\nfunction createAPIData(data) {\n  const {\n    crop: crop_id,\n    variety: variety_id,\n    growth_stage: growth_stage_id,\n    ...rest\n  } = data;\n  return {\n    crop_id,\n    variety_id,\n    growth_stage_id,\n    ...rest\n  };\n}\nfunction createRowData(record) {\n  return {\n    "id": record.cid,\n    "crop": record.crop,\n    "variety": record.variety,\n    "crop_code": record.crop_code,\n    "category": record.category,\n    "growth_stage": record.growth_stage,\n    "update_time": record.update_time\n  };\n}\nfunction CustomToolbar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_7__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_8__.GridToolbarExport, null));\n}\nfunction AddSiteRecord({\n  fieldValues,\n  formData,\n  columns,\n  cropCategoryOptions,\n  cropVarietyOptions,\n  cropGrowthStageOptions,\n  handleInputChange,\n  showAddModal,\n  setShowAddModal,\n  setIsSave,\n  inputError,\n  updateInputError,\n  refreshRecord,\n  setRefreshRecord\n}) {\n  async function CropRecordSave() {\n    const apiData = createAPIData(formData);\n    console.log(apiData);\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json"\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/api/crop/create/", requestOptions).then(response => {\n      if (response.ok) {\n        setIsSave(true);\n        setShowAddModal(false);\n        setRefreshRecord(~refreshRecord);\n      }\n    });\n  }\n  const handleSaveButtonPressed = () => {\n    if (Object.values(fieldValues).every(value => value !== "")) {\n      CropRecordSave();\n    } else {\n      updateInputError();\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n    open: showAddModal,\n    onClose: () => setShowAddModal(false),\n    sx: {\n      display: \'flex\',\n      justifyContent: \'center\',\n      alignItems: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {\n    sx: {\n      width: 400\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    container: true,\n    justifyContent: "center",\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    item: true,\n    xs: 12,\n    sx: {\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "Add Crop Record")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    item: true,\n    xs: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {\n    value: fieldValues[field_names[0]],\n    options: cropCategoryOptions,\n    onChange: (event, value) => {\n      handleInputChange(event, value, field_names[0]);\n    },\n    renderInput: params => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, params, {\n      required: true,\n      variant: "outlined",\n      label: columns[2].headerName,\n      error: inputError[field_names[0]]\n    }))\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    item: true,\n    xs: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {\n    value: fieldValues[field_names[1]],\n    options: cropVarietyOptions,\n    onChange: (event, value) => {\n      handleInputChange(event, value, field_names[1]);\n    },\n    renderInput: params => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, params, {\n      required: true,\n      variant: "outlined",\n      label: columns[3].headerName,\n      error: inputError[field_names[1]]\n    }))\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    item: true,\n    xs: 6\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], {\n    value: fieldValues[field_names[2]],\n    InputLabelProps: {\n      shrink: true,\n      readOnly: true\n    },\n    variant: "outlined",\n    label: columns[4].headerName\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    item: true,\n    xs: 6\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], {\n    value: fieldValues[field_names[3]],\n    InputLabelProps: {\n      shrink: true,\n      readOnly: true\n    },\n    variant: "outlined",\n    label: columns[5].headerName\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    item: true,\n    xs: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {\n    value: fieldValues[field_names[4]],\n    options: cropGrowthStageOptions,\n    onChange: (event, value) => {\n      handleInputChange(event, value, field_names[4]);\n    },\n    renderInput: params => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, params, {\n      required: true,\n      variant: "outlined",\n      label: columns[6].headerName,\n      error: inputError[field_names[4]]\n    }))\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    item: true,\n    xs: 6,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_15__["default"], {\n    variant: "contained",\n    color: "success",\n    onClick: () => handleSaveButtonPressed()\n  }, "Save")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    item: true,\n    xs: 6,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_15__["default"], {\n    variant: "contained",\n    color: "secondary",\n    onClick: () => setShowAddModal(false)\n  }, "Cancel"))))));\n}\nfunction Site(props) {\n  const uid = props.uid;\n  const [cropCategory, setCropCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [cropVariety, setCropVariety] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [cropGrowthStage, setCropGrowthStage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [formData, setFormData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});\n  const [fieldValues, setFieldValues] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});\n  const [cropCategoryOptions, setCropCategoryOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [cropVarietyOptions, setCropVarietyOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [cropGrowthStageOptions, setCropGrowthStageOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [showAddModal, setShowAddModal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [isSave, setIsSave] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [isDelete, setIsDelete] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [inputError, setInputError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [editRowId, setEditRowId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [anchorEl, setAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [popoverRowId, setPopoverRowId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [refreshRecord, setRefreshRecord] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  async function CropListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/crop/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          const record_list = data.data;\n          const record_row = record_list.map(record => createRowData(record));\n          setRows(record_row);\n        });\n      }\n    });\n  }\n  async function CropCategoryGet() {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/crop/category/", requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setCropCategory(data.data);\n        });\n      }\n    });\n  }\n  async function CropVarietyGet() {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/crop/variety/", requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setCropVariety(data.data);\n        });\n      }\n    });\n  }\n  async function CropGrowthStageGet() {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/crop/growthstage/", requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setCropGrowthStage(data.data);\n        });\n      }\n    });\n  }\n  async function CropRecordUpdate() {\n    const apiData = createAPIData(formData);\n    console.log(apiData);\n    const requestOptions = {\n      method: "PUT",\n      headers: {\n        "Content-Type": "application/json"\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/api/crop/update/", requestOptions).then(response => {\n      if (response.ok) {\n        setIsSave(true);\n        setEditRowId(null);\n        setRefreshRecord(~refreshRecord);\n      }\n    });\n  }\n  async function CropRecordDelete(cid) {\n    const apiData = {\n      "user": uid,\n      "cid": cid\n    };\n    console.log(apiData);\n    const requestOptions = {\n      method: "PUT",\n      headers: {\n        "Content-Type": "application/json"\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/api/crop/delete/", requestOptions).then(response => {\n      if (response.ok) {\n        setIsDelete(true);\n        setRefreshRecord(~refreshRecord);\n      }\n    });\n  }\n  const clearInputError = () => {\n    setInputError(Object.fromEntries(field_names.map(item => [item, false])));\n  };\n  const updateInputError = () => {\n    Object.keys(fieldValues).forEach(key => {\n      if (fieldValues[key] === "") {\n        setInputError(prevInputError => ({\n          ...prevInputError,\n          [key]: true\n        }));\n      } else {\n        setInputError(prevInputError => ({\n          ...prevInputError,\n          [key]: false\n        }));\n      }\n    });\n  };\n  const onSaveClicked = () => {\n    if (Object.values(fieldValues).every(value => value !== "")) {\n      CropRecordUpdate();\n      const index = rows.findIndex(item => item.id === fieldValues.id);\n      setRows([...rows.slice(0, index), fieldValues, ...rows.slice(index + 1)]);\n    } else {\n      updateInputError();\n    }\n  };\n  const onCancelClicked = () => {\n    setEditRowId(null);\n    clearInputError();\n  };\n  const onEditClicked = params => {\n    const crop = cropCategoryOptions.find(item => item.label === params.row.crop);\n    setFormData({\n      "cid": params.id,\n      "crop": crop.id\n    });\n    setFieldValues(params.row);\n    setEditRowId(params.id);\n    clearInputError();\n  };\n  const onDeleteClicked = params => {\n    CropRecordDelete(params.id);\n    const index = rows.findIndex(item => item.id === params.id);\n    setRows([...rows.slice(0, index), ...rows.slice(index + 1)]);\n  };\n  const onAddClicked = () => {\n    setFormData({\n      "user_id": uid\n    });\n    setFieldValues(Object.fromEntries(field_names.map(item => [item, ""])));\n    setEditRowId(null);\n    setShowAddModal(true);\n    clearInputError();\n  };\n  const CropCategoryOptionsFresh = () => {\n    setCropCategoryOptions(cropCategory.map(item => ({\n      label: item.name,\n      id: item.ccid,\n      crop_code: item.crop_code,\n      category: item.category\n    })));\n  };\n  const CropVarietyOptionsFresh = crop_id => {\n    setCropVarietyOptions(cropVariety.filter(item => item.crop_id === crop_id).map(item => ({\n      label: item.name,\n      id: item.cvid\n    })));\n  };\n  const CropGrowthStageOptionsFresh = crop_id => {\n    setCropGrowthStageOptions(cropGrowthStage.filter(item => item.crop_id === crop_id).map(item => ({\n      label: item.name,\n      id: item.cgsid\n    })));\n  };\n  const handleInputChange = (event, value, field) => {\n    if (field === field_names[0]) {\n      setFieldValues({\n        ...fieldValues,\n        [field]: value.label,\n        [field_names[1]]: "",\n        [field_names[2]]: value.crop_code,\n        [field_names[3]]: value.category,\n        [field_names[4]]: ""\n      });\n      setFormData({\n        ...formData,\n        [field]: value.id,\n        [field_names[1]]: null,\n        [field_names[4]]: null\n      });\n    } else {\n      setFieldValues({\n        ...fieldValues,\n        [field]: value.label\n      });\n      setFormData({\n        ...formData,\n        [field]: value.id\n      });\n    }\n  };\n  const columns = [{\n    field: \'operations\',\n    headerName: \'Operations\',\n    sortable: false,\n    width: 100,\n    disableColumnMenu: true,\n    disableClickEventBubbling: true,\n    renderCell: params => {\n      if (editRowId !== params.id) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__["default"], {\n          onClick: () => onEditClicked(params)\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Edit__WEBPACK_IMPORTED_MODULE_17__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__["default"], {\n          onClick: event => {\n            setAnchorEl(event.currentTarget);\n            setPopoverRowId(params.id);\n          }\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_18__["default"], null)), popoverRowId === params.id && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ConfirmPopover__WEBPACK_IMPORTED_MODULE_3__["default"], {\n          anchorEl: anchorEl,\n          setAnchorEl: setAnchorEl,\n          onDeleteClicked: onDeleteClicked,\n          params: params,\n          msg: "Delete this record?",\n          type: "delete"\n        }));\n      } else {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__["default"], {\n          onClick: event => {\n            setAnchorEl(event.currentTarget);\n            setPopoverRowId(params.id);\n          }\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_19__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__["default"], {\n          onClick: () => onCancelClicked()\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_20__["default"], null)), popoverRowId === params.id && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ConfirmPopover__WEBPACK_IMPORTED_MODULE_3__["default"], {\n          anchorEl: anchorEl,\n          setAnchorEl: setAnchorEl,\n          onSaveClicked: onSaveClicked,\n          params: params,\n          msg: "Update this record?",\n          type: "update"\n        }));\n      }\n    }\n  }, {\n    field: \'id\',\n    headerName: \'ID\',\n    width: columnWidth\n  }, {\n    field: \'crop\',\n    headerName: \'Crop\',\n    width: columnWidth,\n    renderCell: (params, rowID = params.id) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {\n      options: cropCategoryOptions,\n      disableClearable: true,\n      readOnly: editRowId !== rowID,\n      value: editRowId === rowID ? fieldValues[field_names[0]] : params.value,\n      onChange: (event, value) => {\n        handleInputChange(event, value, field_names[0]);\n      },\n      renderInput: params => {\n        return editRowId !== rowID ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, params, {\n          variant: "standard",\n          InputProps: {\n            disableUnderline: true\n          },\n          sx: {\n            width: columnWidth\n          }\n        })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, params, {\n          variant: "standard",\n          error: inputError[field_names[0]],\n          sx: {\n            width: editWidth\n          }\n        }));\n      }\n    })\n  }, {\n    field: \'variety\',\n    headerName: \'Variety\',\n    width: columnWidth,\n    renderCell: (params, rowID = params.id) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {\n      options: cropVarietyOptions,\n      disableClearable: true,\n      readOnly: editRowId !== rowID,\n      value: editRowId === rowID ? fieldValues[field_names[1]] : params.value,\n      onChange: (event, value) => {\n        handleInputChange(event, value, field_names[1]);\n      },\n      renderInput: params => {\n        return editRowId !== rowID ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, params, {\n          variant: "standard",\n          InputProps: {\n            disableUnderline: true\n          },\n          sx: {\n            width: columnWidth\n          }\n        })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, params, {\n          variant: "standard",\n          sx: {\n            width: editWidth\n          },\n          error: inputError[field_names[1]]\n        }));\n      }\n    })\n  }, {\n    field: \'crop_code\',\n    headerName: \'Crop Code\',\n    width: columnWidth,\n    valueGetter: params => {\n      return editRowId === params.id ? fieldValues[field_names[2]] : params.value;\n    }\n  }, {\n    field: \'category\',\n    headerName: \'Category\',\n    width: columnWidth,\n    valueGetter: params => {\n      return editRowId === params.id ? fieldValues[field_names[3]] : params.value;\n    }\n  }, {\n    field: \'growth_stage\',\n    headerName: \'Growth Stage\',\n    width: columnWidth,\n    renderCell: (params, rowID = params.id) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {\n      options: cropGrowthStageOptions,\n      disableClearable: true,\n      readOnly: editRowId !== rowID,\n      value: editRowId === rowID ? fieldValues[field_names[4]] : params.value,\n      onChange: (event, value) => {\n        handleInputChange(event, value, field_names[4]);\n      },\n      renderInput: params => {\n        return editRowId !== rowID ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, params, {\n          variant: "standard",\n          InputProps: {\n            disableUnderline: true\n          },\n          sx: {\n            width: columnWidth\n          }\n        })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, params, {\n          variant: "standard",\n          sx: {\n            width: editWidth\n          },\n          error: inputError[field_names[4]]\n        }));\n      }\n    })\n  }, {\n    field: \'update_time\',\n    headerName: \'Update Time\',\n    width: columnWidth\n  }];\n  const addProps = {\n    fieldValues,\n    formData,\n    columns,\n    cropCategoryOptions,\n    cropVarietyOptions,\n    cropGrowthStageOptions,\n    handleInputChange,\n    showAddModal,\n    setShowAddModal,\n    setIsSave,\n    inputError,\n    updateInputError,\n    refreshRecord,\n    setRefreshRecord\n  };\n  const saveProps = {\n    open: isSave,\n    setOpen: setIsSave,\n    msg: "Crop record is uploaded successfully!"\n  };\n  const deleteProps = {\n    open: isDelete,\n    setOpen: setIsDelete,\n    msg: "Crop record has been deleted!"\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    CropCategoryGet();\n    CropVarietyGet();\n    CropGrowthStageGet();\n    clearInputError();\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    CropCategoryOptionsFresh();\n  }, [cropCategory]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    CropVarietyOptionsFresh(formData.crop);\n    CropGrowthStageOptionsFresh(formData.crop);\n  }, [formData.crop]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    CropListGet(uid);\n  }, [refreshRecord]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.AddButton, {\n    variant: "contained",\n    startIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_21__["default"], null),\n    onClick: () => onAddClicked()\n  }, "Add Crop"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_22__["default"], {\n    style: {\n      height: 900,\n      margin: \'0px 15px\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_23__.DataGrid, {\n    columns: columns,\n    rows: rows,\n    disableRowSelectionOnClick: true,\n    disableClickEdit: true,\n    rowSelection: false,\n    slots: {\n      toolbar: CustomToolbar\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AddSiteRecord, addProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], saveProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], deleteProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Site/index.js?')},"./src/pages/Site/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "AddButton": () => (/* binding */ AddButton)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/styled.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/orange.js");\n\n\n\nconst AddButton = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"])(() => ({\n  margin: "15px 15px",\n  backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][500],\n  \'&:hover\': {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][700]\n  }\n}));\n\n//# sourceURL=webpack://frontend/./src/pages/Site/styles.js?')}}]);