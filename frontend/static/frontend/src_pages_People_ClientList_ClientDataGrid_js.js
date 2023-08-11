/*! For license information please see src_pages_People_ClientList_ClientDataGrid_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_People_ClientList_ClientDataGrid_js"],{"./src/components/ConfirmPopover/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ConfirmPopover)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Popover/Popover.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n\n\n\n\nfunction ConfirmPopover(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], {\n    open: Boolean(props.anchorEl),\n    anchorEl: props.anchorEl,\n    anchorOrigin: {\n      vertical: \'bottom\',\n      horizontal: \'center\'\n    },\n    transformOrigin: {\n      vertical: \'top\',\n      horizontal: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    sx: {\n      p: 1,\n      maxWidth: 400\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    variant: "body1"\n  }, props.msg), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    onClick: () => {\n      if (props.type === "delete") {\n        props.setAnchorEl(null);\n        props.onDeleteClicked(props.params);\n      } else if (props.type === "update") {\n        props.setAnchorEl(null);\n        props.onSaveClicked();\n      }\n    },\n    color: "primary"\n  }, "Yes"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    onClick: () => props.setAnchorEl(null),\n    color: "secondary"\n  }, "No")));\n}\n\n//# sourceURL=webpack://frontend/./src/components/ConfirmPopover/index.js?')},"./src/pages/People/ClientList/ClientDataGrid.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ClientDataGrid)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/IconButton */ "./node_modules/@mui/material/IconButton/IconButton.js");\n/* harmony import */ var _mui_icons_material_Send__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/icons-material/Send */ "./node_modules/@mui/icons-material/Send.js");\n/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/icons-material/Delete */ "./node_modules/@mui/icons-material/Delete.js");\n/* harmony import */ var _components_ConfirmPopover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/ConfirmPopover */ "./src/components/ConfirmPopover/index.js");\n\n\n\n\n\n\n\n\nfunction CustomToolbar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridToolbarExport, null));\n}\nfunction ClientDataGrid({\n  employerID,\n  privilege,\n  refreshRecord,\n  setRefreshRecord\n}) {\n  const [clientList, setClientList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [anchorEl, setAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [popoverRowId, setPopoverRowId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  async function ClientListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/user_manage/client_or_vendor/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          const record_list = data.data;\n          setClientList(record_list);\n          const record_row = record_list.map(record => createRowData(record));\n          setRows(record_row);\n        });\n      }\n    });\n  }\n  const createRowData = record => {\n    for (let key in record) {\n      if (record[key] === null) {\n        record[key] = "";\n      }\n    }\n    return {\n      "id": record.uid,\n      "user": record.user,\n      "business_name": record.business_name,\n      "name": `${record.first_name} ${record.last_name}`,\n      "type": record.type,\n      "email": record.email,\n      "cell_phone": record.cell_phone\n    };\n  };\n  const columnWidth = 150;\n  const columnMiddleWidth = 250;\n  const columns = [{\n    field: \'operations\',\n    headerName: \'Operations\',\n    width: columnWidth,\n    renderCell: params => {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_7__["default"]\n      // onClick={() => onDownloadClicked(params)}\n      , null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Send__WEBPACK_IMPORTED_MODULE_8__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_7__["default"], {\n        onClick: event => {\n          setAnchorEl(event.currentTarget);\n          setPopoverRowId(params.id);\n        },\n        disabled: !privilege.client_d\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_9__["default"], null)), popoverRowId === params.id && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ConfirmPopover__WEBPACK_IMPORTED_MODULE_1__["default"], {\n        anchorEl: anchorEl,\n        setAnchorEl: setAnchorEl\n        // onDeleteClicked={onDeleteClicked}\n        ,\n        params: params,\n        msg: "Delete this connection?",\n        type: "delete"\n      }));\n    }\n  }, {\n    field: \'user\',\n    headerName: \'Client User\',\n    width: columnWidth\n  }, {\n    field: \'business_name\',\n    headerName: \'Business Name\',\n    width: columnMiddleWidth\n  }, {\n    field: \'name\',\n    headerName: \'Name\',\n    width: 200\n  }, {\n    field: \'type\',\n    headerName: \'Type\',\n    width: columnWidth\n  }, {\n    field: \'email\',\n    headerName: \'Email\',\n    width: columnMiddleWidth\n  }, {\n    field: \'cell_phone\',\n    headerName: \'Cell Phone\',\n    width: columnWidth\n  }];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([ClientListGet(employerID)]);\n    };\n    fetchData();\n    setMounted(true);\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (mounted) {\n      ClientListGet(employerID);\n    }\n  }, [refreshRecord]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_10__["default"], {\n    style: {\n      height: 900\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_11__.DataGrid, {\n    columns: columns,\n    rows: rows,\n    disableRowSelectionOnClick: true,\n    disableClickEdit: true,\n    rowSelection: false,\n    slots: {\n      toolbar: CustomToolbar\n    },\n    localeText: {\n      noRowsLabel: privilege.client_r ? "No rows" : "You don\'t have the privilege to access this data"\n    }\n  })));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/People/ClientList/ClientDataGrid.js?')}}]);