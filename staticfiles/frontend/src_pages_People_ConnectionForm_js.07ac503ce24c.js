/*! For license information please see src_pages_People_ConnectionForm_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_People_ConnectionForm_js"],{"./src/components/Snackbars/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ OperationSnackbars)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Stack */ "./node_modules/@mui/material/Stack/Stack.js");\n/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Snackbar */ "./node_modules/@mui/material/Snackbar/Snackbar.js");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Alert */ "./node_modules/@mui/material/Alert/Alert.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nconst Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Alert(props, ref) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({\n    elevation: 6,\n    ref: ref,\n    variant: "filled"\n  }, props));\n});\nfunction OperationSnackbars(props) {\n  const handleClose = (event, reason) => {\n    if (reason === \'clickaway\') {\n      return;\n    }\n    props.setOpen(false);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    spacing: 2,\n    sx: {\n      width: \'100%\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    open: props.open,\n    autoHideDuration: 6000,\n    onClose: handleClose\n  }, (() => {\n    switch (props.tag) {\n      case \'success\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "success",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'error\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "error",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'warning\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "warning",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      default:\n        return null;\n    }\n  })()));\n}\n\n//# sourceURL=webpack://frontend/./src/components/Snackbars/index.js?')},"./src/pages/People/ConnectionForm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ConnectionForm)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Modal/Modal.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardContent/CardContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Autocomplete/Autocomplete.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Snackbars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Snackbars */ "./src/components/Snackbars/index.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\nfunction ConnectionForm({\n  employerID,\n  privilege,\n  refreshRecord,\n  setRefreshRecord,\n  openForm,\n  setOpenForm\n}) {\n  const [selectedClient, setSelectedClient] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n  const [clientOptions, setClientOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n  const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");\n  const [fieldError, setFieldError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n  const [isSend, setIsSend] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n  const [isFailed, setIsFailed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n  async function ClientUserListGet(inputUsername) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/user_manage/client/search/" + "?search_username=" + inputUsername + "&request_user_id=" + employerID, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setClientOptions(CreateClientOptions(data.data));\n        });\n      }\n    });\n  }\n  async function RequestConnection(requester_id, provider_id) {\n    const apiData = {\n      requester_id: requester_id,\n      "provider_id": provider_id\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    try {\n      const response = await fetch("/workflow/connection/initiate/", requestOptions);\n      const responseData = await response.json();\n      if (response.ok) {\n        setIsSend(true);\n        setOpenForm(false);\n      } else if (responseData[Object.keys(responseData)[0]][0].includes("already exists")) {\n        setIsFailed(true);\n        setFieldError(true);\n      }\n      console.log(responseData);\n    } catch (error) {\n      console.error("Failed to fetch", error);\n    }\n  }\n  const CreateClientOptions = optionData => {\n    return optionData.map(item => {\n      let newObj = {\n        ...item,\n        id: item.uid,\n        label: `${item.user} (${item.type} of ${item.business_name})`\n      };\n      delete newObj.uid;\n      return newObj;\n    });\n  };\n  const handleSendButtonPressed = async () => {\n    if (!selectedClient) {\n      setFieldError(true);\n    } else {\n      await RequestConnection(employerID, selectedClient);\n    }\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n    if (searchValue) {\n      ClientUserListGet(searchValue);\n    }\n  }, [searchValue]);\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n    setClientOptions([]);\n    setFieldError(false);\n  }, [openForm]);\n  const sendProps = {\n    open: isSend,\n    setOpen: setIsSend,\n    msg: "Connection request has been sent!",\n    tag: "success"\n  };\n  const failedProps = {\n    open: isFailed,\n    setOpen: setIsFailed,\n    msg: "The connection has already existed!",\n    tag: "error"\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    open: openForm,\n    sx: {\n      display: \'flex\',\n      justifyContent: \'center\',\n      alignItems: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    sx: {\n      width: 400\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    container: true,\n    justifyContent: "center",\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    item: true,\n    xs: 12,\n    sx: {\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", null, "Connect A Client")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    item: true,\n    xs: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    options: clientOptions || [],\n    disableClearable: true,\n    onChange: (event, value) => {\n      setSelectedClient(value.id);\n    },\n    renderInput: params => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], _extends({}, params, {\n      required: true,\n      variant: "outlined",\n      label: "Search Username",\n      onChange: event => {\n        setSearchValue(event.target.value);\n      },\n      error: fieldError\n    }))\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    item: true,\n    xs: 6,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n    variant: "contained",\n    color: "secondary",\n    onClick: () => setOpenForm(false)\n  }, "Cancel")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    item: true,\n    xs: 6,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n    variant: "contained",\n    color: "success",\n    onClick: () => handleSendButtonPressed()\n  }, "Send")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], sendProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], failedProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/People/ConnectionForm.js?')}}]);