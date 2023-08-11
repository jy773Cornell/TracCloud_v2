/*! For license information please see src_pages_People_EmployeeList_EmployeeSettingForm_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_People_EmployeeList_EmployeeSettingForm_js"],{"./src/components/Snackbars/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ OperationSnackbars)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Stack */ "./node_modules/@mui/material/Stack/Stack.js");\n/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Snackbar */ "./node_modules/@mui/material/Snackbar/Snackbar.js");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Alert */ "./node_modules/@mui/material/Alert/Alert.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nconst Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Alert(props, ref) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({\n    elevation: 6,\n    ref: ref,\n    variant: "filled"\n  }, props));\n});\nfunction OperationSnackbars(props) {\n  const handleClose = (event, reason) => {\n    if (reason === \'clickaway\') {\n      return;\n    }\n    props.setOpen(false);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    spacing: 2,\n    sx: {\n      width: \'100%\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    open: props.open,\n    autoHideDuration: 6000,\n    onClose: handleClose\n  }, (() => {\n    switch (props.tag) {\n      case \'success\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "success",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'error\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "error",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'warning\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "warning",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      default:\n        return null;\n    }\n  })()));\n}\n\n//# sourceURL=webpack://frontend/./src/components/Snackbars/index.js?')},"./src/pages/People/EmployeeList/EmployeeSettingForm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ EmployeeSettingForm)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Modal/Modal.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardContent/CardContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Backdrop/Backdrop.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Dialog/Dialog.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/DialogTitle/DialogTitle.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/DialogContent/DialogContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/DialogContentText/DialogContentText.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/DialogActions/DialogActions.js");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils */ "./src/utils/index.js");\n/* harmony import */ var _components_Snackbars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Snackbars */ "./src/components/Snackbars/index.js");\n/* harmony import */ var _mui_material_CircularProgress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/CircularProgress */ "./node_modules/@mui/material/CircularProgress/CircularProgress.js");\n\n\n\n\n\nconst PrivilegeTransferList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_ListItem_ListItem_js"), __webpack_require__.e("src_pages_People_EmployeeList_PrivilegeTransferList_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./PrivilegeTransferList */ "./src/pages/People/EmployeeList/PrivilegeTransferList.js")));\nconst PrivilegeNameList = {\n  "employee_c": "Create Employee",\n  "employee_r": "Access Employee",\n  "employee_d": "Delete Employee",\n  "client_add": "Add Client",\n  "client_r": "Access Client",\n  "client_d": "Delete Client",\n  "privilege_set": "Set Privilege",\n  "crop_c": "Create Crop",\n  "crop_r": "Access Crop",\n  "crop_u": "Update Crop",\n  "crop_d": "Delete Crop",\n  "site_c": "Create Site",\n  "site_r": "Access Site",\n  "site_u": "Update Site",\n  "site_d": "Delete Site",\n  "chem_c": "Create Chemical",\n  "chem_r": "Access Chemical",\n  "chem_u": "Update Chemical",\n  "chem_d": "Delete Chemical",\n  "purchase_c": "Create Purchase",\n  "purchase_r": "Access Purchase",\n  "purchase_u": "Update Purchase",\n  "purchase_d": "Delete Purchase",\n  "equip_c": "Create Equipment",\n  "equip_r": "Access Equipment",\n  "equip_u": "Update Equipment",\n  "equip_d": "Delete Equipment",\n  "spray_r": "Access Spray",\n  "spraycard_c": "Create Spray Card",\n  "spraycard_a": "Assign Spray Card"\n};\nfunction EmployeeSettingForm({\n  privilege,\n  employer_id,\n  refreshRecord,\n  setRefreshRecord,\n  settingFormOpen,\n  setSettingFormOpen,\n  selectedEmployee\n}) {\n  const [privilegeList, setPrivilegeList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [left, setLeft] = react__WEBPACK_IMPORTED_MODULE_0___default().useState([]); // Unavailable privileges\n  const [right, setRight] = react__WEBPACK_IMPORTED_MODULE_0___default().useState([]); // Available privileges\n\n  const [isDeleted, setIsDeleted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [isUpdated, setIsUpdated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [openDialog, setOpenDialog] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  async function EmployeePrivilegeGet(employee_id) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/user_manage/privilege/get/" + "?uid=" + employee_id, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setPrivilegeList(data.data);\n        });\n      }\n    });\n  }\n  async function EmployeePrivilegeUpdate(employee_id) {\n    const newPrivilege = reformatPrivilege();\n    const apiData = {\n      user_id: employee_id,\n      ...newPrivilege\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/user_manage/privilege/update/", requestOptions).then(response => {\n      if (response.ok) {\n        setIsUpdated(true);\n      }\n    });\n  }\n  async function DeleteEmployee(employer_id, employee_id) {\n    setIsLoading(true);\n    const apiData = {\n      employer_id: employer_id,\n      employee_id: employee_id\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/user_manage/employee/delete/", requestOptions).then(response => {\n      if (response.ok) {\n        setSettingFormOpen(false);\n        setIsDeleted(true);\n        setRefreshRecord(~refreshRecord);\n      }\n      setIsLoading(false);\n    });\n  }\n  const handleUpdateButtonPressed = async () => {\n    await EmployeePrivilegeUpdate(selectedEmployee.uid);\n    EmployeePrivilegeGet(selectedEmployee.uid);\n  };\n  const handleDeleteConfirm = () => {\n    DeleteEmployee(employer_id, selectedEmployee.uid);\n    setOpenDialog(false);\n  };\n  const sortPrivilege = () => {\n    let leftTemp = [];\n    let rightTemp = [];\n    Object.keys(PrivilegeNameList).map(privilege => {\n      privilegeList[privilege] ? rightTemp.push(PrivilegeNameList[privilege]) : leftTemp.push(PrivilegeNameList[privilege]);\n    });\n    setLeft(leftTemp);\n    setRight(rightTemp);\n  };\n  const reformatPrivilege = () => {\n    let newPrivilege = {};\n    left.map(privilege => {\n      newPrivilege[Object.keys(PrivilegeNameList).find(key => PrivilegeNameList[key] === privilege)] = false;\n    });\n    right.map(privilege => {\n      newPrivilege[Object.keys(PrivilegeNameList).find(key => PrivilegeNameList[key] === privilege)] = true;\n    });\n    return newPrivilege;\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (selectedEmployee) {\n      EmployeePrivilegeGet(selectedEmployee.uid);\n    }\n  }, [selectedEmployee]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (privilegeList) {\n      sortPrivilege();\n    }\n  }, [privilegeList, settingFormOpen]);\n  const deleteProps = {\n    open: isDeleted,\n    setOpen: setIsDeleted,\n    msg: "The employee has already been deleted from your business.",\n    tag: "success"\n  };\n  const updateProps = {\n    open: isUpdated,\n    setOpen: setIsUpdated,\n    msg: "The privilege setting for this employee has been updated.",\n    tag: "success"\n  };\n  const transferListProps = {\n    left,\n    setLeft,\n    right,\n    setRight,\n    privilege\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    open: settingFormOpen,\n    sx: {\n      display: \'flex\',\n      justifyContent: \'center\',\n      alignItems: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    sx: {\n      width: 800\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    container: true,\n    justifyContent: "center",\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    item: true,\n    xs: 12,\n    sx: {\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {\n    style: {\n      marginBottom: \'0\'\n    }\n  }, "Employee Setting "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {\n    style: {\n      marginTop: \'5px\'\n    }\n  }, selectedEmployee === null || selectedEmployee === void 0 ? void 0 : selectedEmployee.user, " (", selectedEmployee === null || selectedEmployee === void 0 ? void 0 : selectedEmployee.first_name, " ", selectedEmployee === null || selectedEmployee === void 0 ? void 0 : selectedEmployee.last_name, ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    item: true,\n    xs: 12,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PrivilegeTransferList, transferListProps)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    item: true,\n    xs: 4,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    variant: "contained",\n    color: "secondary",\n    onClick: () => setSettingFormOpen(false)\n  }, "Close")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    item: true,\n    xs: 4,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    variant: "contained",\n    color: "success",\n    onClick: () => handleUpdateButtonPressed(),\n    disabled: !privilege.privilege_set\n  }, "Update")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    item: true,\n    xs: 4,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    variant: "contained",\n    color: "primary",\n    onClick: () => setOpenDialog(true),\n    disabled: !privilege.employee_d\n  }, "Delete"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    sx: {\n      zIndex: theme => theme.zIndex.drawer + 1\n    },\n    open: isLoading\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_CircularProgress__WEBPACK_IMPORTED_MODULE_9__["default"], {\n    color: "inherit"\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {\n    open: openDialog\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], null, "Confirm Delete"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], null, "Are you sure you want to delete this employee? All the related contents will be removed.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    onClick: () => setOpenDialog(false),\n    color: "primary"\n  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    onClick: handleDeleteConfirm,\n    color: "secondary"\n  }, "Delete"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], deleteProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], updateProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/People/EmployeeList/EmployeeSettingForm.js?')}}]);