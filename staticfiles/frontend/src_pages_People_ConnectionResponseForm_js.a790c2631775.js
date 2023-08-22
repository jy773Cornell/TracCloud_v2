/*! For license information please see src_pages_People_ConnectionResponseForm_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_People_ConnectionResponseForm_js"],{"./src/components/Snackbars/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ OperationSnackbars)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Stack */ "./node_modules/@mui/material/Stack/Stack.js");\n/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Snackbar */ "./node_modules/@mui/material/Snackbar/Snackbar.js");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Alert */ "./node_modules/@mui/material/Alert/Alert.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nconst Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Alert(props, ref) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({\n    elevation: 6,\n    ref: ref,\n    variant: "filled"\n  }, props));\n});\nfunction OperationSnackbars(props) {\n  const handleClose = (event, reason) => {\n    if (reason === \'clickaway\') {\n      return;\n    }\n    props.setOpen(false);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    spacing: 2,\n    sx: {\n      width: \'100%\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    open: props.open,\n    autoHideDuration: 6000,\n    onClose: handleClose\n  }, (() => {\n    switch (props.tag) {\n      case \'success\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "success",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'error\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "error",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'warning\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "warning",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      default:\n        return null;\n    }\n  })()));\n}\n\n//# sourceURL=webpack://frontend/./src/components/Snackbars/index.js?')},"./src/pages/People/ConnectionResponseForm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ConnectionResponseForm)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Modal/Modal.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardContent/CardContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Snackbars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Snackbars */ "./src/components/Snackbars/index.js");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");\n\n\n\n\n\n\n\nfunction ConnectionResponseForm(props) {\n  const [requester, SetRequester] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n  const [openForm, setOpenForm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n  const [isSuccess, setIsSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n  const [isFailed, setIsFailed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n  const [isWarning, setIsWarning] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();\n  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useLocation)();\n  const searchParams = new URLSearchParams(location.search);\n  const mid = searchParams.get(\'mid\');\n  const cpid = searchParams.get(\'cpid\');\n  async function RequesterUserGet(cpid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/workflow/connection/requester/get/" + "?cpid=" + cpid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          SetRequester(data.data);\n        });\n      }\n    });\n  }\n  async function AcceptConnection(provider_id, requester_id, cpid, mid) {\n    const apiData = {\n      provider_id,\n      requester_id,\n      cpid,\n      mid\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    try {\n      const response = await fetch("/workflow/connection/approve/", requestOptions);\n      const responseData = await response.json();\n      if (response.ok) {\n        setIsSuccess(true);\n      } else if (responseData[Object.keys(responseData)[0]][0].includes("already exists")) {\n        setIsFailed(true);\n      }\n      setOpenForm(false);\n      setTimeout(() => {\n        navigate("/people");\n      }, 3000);\n    } catch (error) {\n      console.error("Failed to fetch", error);\n    }\n  }\n  async function DeclineConnection(provider_id, requester_id, cpid, mid) {\n    const apiData = {\n      provider_id,\n      requester_id,\n      cpid,\n      mid\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    try {\n      const response = await fetch("/workflow/connection/reject/", requestOptions);\n      const responseData = await response.json();\n      if (response.ok) {\n        setIsWarning(true);\n      } else if (responseData[Object.keys(responseData)[0]][0].includes("already exists")) {\n        setIsFailed(true);\n      }\n      setOpenForm(false);\n      setTimeout(() => {\n        navigate("/people");\n      }, 3000);\n    } catch (error) {\n      console.error("Failed to fetch", error);\n    }\n  }\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n    RequesterUserGet(cpid);\n  }, []);\n  const successProps = {\n    open: isSuccess,\n    setOpen: setIsSuccess,\n    msg: "Congratulation! You just built a new connection!",\n    tag: "success"\n  };\n  const failedProps = {\n    open: isFailed,\n    setOpen: setIsFailed,\n    msg: "The connection has already existed!",\n    tag: "error"\n  };\n  const warningProps = {\n    open: isWarning,\n    setOpen: setIsWarning,\n    msg: "You\'ve declined the connection request!",\n    tag: "warning"\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    open: openForm,\n    sx: {\n      display: \'flex\',\n      justifyContent: \'center\',\n      alignItems: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    sx: {\n      width: 600\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    container: true,\n    justifyContent: "center",\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 12,\n    sx: {\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", null, "Connect Request")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 12,\n    sx: {\n      textAlign: \'center\',\n      fontSize: \'22px\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "Username: "), (requester === null || requester === void 0 ? void 0 : requester.username) || ""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 12,\n    sx: {\n      textAlign: \'center\',\n      fontSize: \'22px\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "Role: "), requester ? `${requester.type} of ${requester.business_name}` : ""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 4,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    variant: "contained",\n    onClick: () => {\n      setOpenForm(false);\n      navigate("/people");\n    }\n  }, "Later")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 4,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    variant: "contained",\n    color: "secondary",\n    disabled: !requester,\n    onClick: () => DeclineConnection(props.employerID, requester.uid, cpid, mid)\n  }, "Decline")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 4,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    variant: "contained",\n    color: "success",\n    disabled: !requester,\n    onClick: () => AcceptConnection(props.employerID, requester.uid, cpid, mid)\n  }, "Accept")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], successProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], failedProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], warningProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/People/ConnectionResponseForm.js?')}}]);