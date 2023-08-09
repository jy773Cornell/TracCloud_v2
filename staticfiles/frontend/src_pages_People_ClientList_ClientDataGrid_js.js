/*! For license information please see src_pages_People_ClientList_ClientDataGrid_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_People_ClientList_ClientDataGrid_js"],{"./src/pages/People/ClientList/ClientDataGrid.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ ClientDataGrid)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js");\n\n\n\n\nfunction CustomToolbar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__.GridToolbarExport, null));\n}\nfunction ClientDataGrid({\n  employerID,\n  privilege,\n  refreshRecord,\n  setRefreshRecord\n}) {\n  const [clientList, setClientList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  async function ClientListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    // await fetch("/workflow/spraycard/list/get/" + "?uid=" + uid, requestOptions)\n    //     .then((response) => {\n    //         if (response.ok) {\n    //             response.json().then((data) => {\n    //                 const record_list = data.data;\n    //                 setSprayCardRecords(record_list);\n    //                 const record_row = record_list.map((record) => createRowData(record))\n    //                 setRows(record_row);\n    //             })\n    //         }\n    //     })\n  }\n\n  const createRowData = record => {\n    for (let key in record) {\n      if (record[key] === null) {\n        record[key] = "";\n      }\n    }\n    return {\n      "id": record.scpid,\n      "state": record.state,\n      "owner": record.owner,\n      "holder": record.holder,\n      "update_time": record.update_time,\n      "create_time": record.create_time\n    };\n  };\n  const columnWidth = 150;\n  const columns = [{\n    field: \'user\',\n    headerName: \'Client User\',\n    width: columnWidth\n  }, {\n    field: \'business_name\',\n    headerName: \'Business Name\',\n    width: columnWidth\n  }, {\n    field: \'name\',\n    headerName: \'Name\',\n    width: columnWidth\n  }, {\n    field: \'type\',\n    headerName: \'Type\',\n    width: columnWidth\n  }, {\n    field: \'email\',\n    headerName: \'Email\',\n    width: columnWidth\n  }, {\n    field: \'cell\',\n    headerName: \'Cell Phone\',\n    width: columnWidth\n  }];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([ClientListGet(employerID)]);\n    };\n    fetchData();\n    setMounted(true);\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (mounted) {\n      ClientListGet(employerID);\n    }\n  }, [refreshRecord]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    style: {\n      height: 900\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_7__.DataGrid, {\n    columns: columns,\n    rows: rows,\n    disableRowSelectionOnClick: true,\n    disableClickEdit: true,\n    rowSelection: false,\n    slots: {\n      toolbar: CustomToolbar\n    },\n    localeText: {\n      noRowsLabel: privilege.client_r ? "No rows" : "You don\'t have the privilege to access this data"\n    }\n  })));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/People/ClientList/ClientDataGrid.js?')}}]);