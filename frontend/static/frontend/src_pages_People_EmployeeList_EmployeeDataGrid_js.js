/*! For license information please see src_pages_People_EmployeeList_EmployeeDataGrid_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_People_EmployeeList_EmployeeDataGrid_js"],{"./src/pages/People/EmployeeList/EmployeeDataGrid.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ EmployeeDataGrid)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles */ "./src/pages/People/styles.js");\n\n\n\n\n\n\nconst EmployeeSettingForm = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Alert_Alert_js-node_modules_mui_material_Snackbar_Snackbar_-be4378"), __webpack_require__.e("vendors-node_modules_mui_material_Dialog_Dialog_js-node_modules_mui_material_DialogActions_Di-397a41"), __webpack_require__.e("vendors-node_modules_mui_material_Card_Card_js-node_modules_mui_material_CardContent_CardCont-6d7ab1"), __webpack_require__.e("src_pages_People_EmployeeList_EmployeeSettingForm_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./EmployeeSettingForm */ "./src/pages/People/EmployeeList/EmployeeSettingForm.js")));\nfunction CustomToolbar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridToolbarExport, null));\n}\nfunction EmployeeDataGrid({\n  employerID,\n  privilege,\n  refreshRecord,\n  setRefreshRecord\n}) {\n  const [employeeList, setEmployeeList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [selectedEmployee, setSelectedEmployee] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [settingFormOpen, setSettingFormOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  async function EmployeeListGet(employer_id) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    if (privilege.employee_r) {\n      await fetch("/user_manage/employee/list/get/" + "?employer_id=" + employer_id, requestOptions).then(response => {\n        if (response.ok) {\n          response.json().then(data => {\n            const record_list = data.data;\n            setEmployeeList(record_list);\n            const record_row = record_list.map(record => createRowData(record));\n            setRows(record_row);\n          });\n        }\n      });\n    }\n  }\n  const createRowData = record => {\n    for (let key in record) {\n      if (record[key] === null) {\n        record[key] = "";\n      }\n    }\n    return {\n      "id": record.uid,\n      "user": record.user,\n      "name": `${record.first_name} ${record.last_name}`,\n      "type": record.type,\n      "email": record.email,\n      "cell_phone": record.cell_phone,\n      "pesticide_applicator_no": record.pesticide_applicator_no,\n      "pesticide_expire_date": record.pesticide_expire_date,\n      "added_by": record.added_by\n    };\n  };\n  const handleUserClick = employee => {\n    setSelectedEmployee(employee);\n    setSettingFormOpen(true);\n  };\n  const columnWidth = 150;\n  const columnMiddleWidth = 250;\n  const columnLongWidth = 300;\n  const columns = [{\n    field: \'user\',\n    headerName: \'Employee User\',\n    width: columnWidth,\n    renderCell: params => {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n        variant: "text",\n        onClick: () => handleUserClick(employeeList.find(employees => employees.uid === params.row.id))\n      }, params.row.user);\n    }\n  }, {\n    field: \'name\',\n    headerName: \'Name\',\n    width: 200\n  }, {\n    field: \'type\',\n    headerName: \'Type\',\n    width: columnWidth\n  }, {\n    field: \'email\',\n    headerName: \'Email\',\n    width: columnMiddleWidth\n  }, {\n    field: \'cell_phone\',\n    headerName: \'Cell Phone\',\n    width: columnWidth\n  }, {\n    field: \'pesticide_applicator_no\',\n    headerName: \'Pesticide Certification I.D.\',\n    width: columnLongWidth\n  }, {\n    field: \'pesticide_expire_date\',\n    headerName: \'Pesticide Certification Expire Date\',\n    width: columnLongWidth\n  }, {\n    field: \'added_by\',\n    headerName: \'Added By\',\n    width: columnMiddleWidth\n  }];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([EmployeeListGet(employerID)]);\n    };\n    fetchData();\n    setMounted(true);\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (mounted) {\n      EmployeeListGet(employerID);\n    }\n  }, [refreshRecord]);\n  const settingProps = {\n    privilege,\n    employerID,\n    refreshRecord,\n    setRefreshRecord,\n    settingFormOpen,\n    setSettingFormOpen,\n    selectedEmployee\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    style: {\n      height: 900\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledDataGrid, {\n    columns: columns,\n    rows: rows,\n    disableRowSelectionOnClick: true,\n    disableClickEdit: true,\n    rowSelection: false,\n    getRowClassName: params => params.id === (selectedEmployee === null || selectedEmployee === void 0 ? void 0 : selectedEmployee.uid) ? `highlight` : null,\n    slots: {\n      toolbar: CustomToolbar\n    },\n    localeText: {\n      noRowsLabel: privilege.employee_r ? "No rows" : "You don\'t have the privilege to access this data"\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(EmployeeSettingForm, settingProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/People/EmployeeList/EmployeeDataGrid.js?')},"./src/pages/People/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AddButton: () => (/* binding */ AddButton),\n/* harmony export */   CancelButton: () => (/* binding */ CancelButton),\n/* harmony export */   StyledDataGrid: () => (/* binding */ StyledDataGrid)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/styled.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/orange.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/grey.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/pink.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js");\n\n\n\n\n\nconst AddButton = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"])(() => ({\n  margin: "15px 15px",\n  backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][500],\n  \'&:hover\': {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][700]\n  }\n}));\nconst CancelButton = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"])(({\n  theme\n}) => ({\n  margin: "15px 15px",\n  backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_3__["default"][500],\n  \'&:hover\': {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_3__["default"][700]\n  }\n}));\nconst StyledDataGrid = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.DataGrid)(() => ({\n  \'& .highlight\': {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_5__["default"][300],\n    \'&:hover\': {\n      backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_5__["default"][400]\n    }\n  }\n}));\n\n//# sourceURL=webpack://frontend/./src/pages/People/styles.js?')}}]);