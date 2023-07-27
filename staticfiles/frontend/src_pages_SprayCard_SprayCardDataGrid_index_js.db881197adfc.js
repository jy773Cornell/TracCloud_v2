/*! For license information please see src_pages_SprayCard_SprayCardDataGrid_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_SprayCard_SprayCardDataGrid_index_js"],{"./src/pages/SprayCard/SprayCardDataGrid/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ SprayCardDataGrid)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/pages/SprayCard/SprayCardDataGrid/styles.js");\n\n\n\n\n\n\nfunction CustomToolbar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_2__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridToolbarExport, null));\n}\nfunction SprayCardDataGrid({\n  uid,\n  refreshRecord,\n  sprayCardSelected,\n  setSprayCardSelected,\n  sprayData,\n  sprayOptions\n}) {\n  const [sprayCardRecords, setSprayCardRecords] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  async function SprayCardListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/workflow/spraycard/list/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          const record_list = data.data;\n          setSprayCardRecords(record_list);\n          const record_row = record_list.map(record => createRowData(record));\n          setRows(record_row);\n        });\n      }\n    });\n  }\n  const createRowData = record => {\n    return {\n      "id": record.scpid,\n      "state": record.state,\n      "owner": record.owner,\n      "holder": record.holder,\n      "update_time": record.update_time,\n      "create_time": record.create_time\n    };\n  };\n  const handleStateClick = record => {\n    setSprayCardSelected(record);\n  };\n  const updateSelectedSprayCard = () => {\n    if (sprayCardSelected) {\n      const updatedSprayCard = sprayCardRecords.find(record => record.scpid === sprayCardSelected.scpid);\n      setSprayCardSelected(updatedSprayCard ? updatedSprayCard : null);\n    }\n  };\n  const columnWidth = 150;\n  const columns = [{\n    field: \'state\',\n    headerName: \'State\',\n    width: columnWidth,\n    renderCell: params => {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n        variant: "text",\n        disabled: Object.keys(sprayData).length === 0 || Object.keys(sprayOptions).length === 0,\n        onClick: () => handleStateClick(sprayCardRecords.find(record => record.scpid === params.row.id))\n      }, params.row.state);\n    }\n  }, {\n    field: \'owner\',\n    headerName: \'Owner\',\n    width: columnWidth\n  }, {\n    field: \'holder\',\n    headerName: \'Holder\',\n    width: columnWidth\n  }, {\n    field: \'update_time\',\n    headerName: \'Update Time\',\n    width: 200\n  }, {\n    field: \'create_time\',\n    headerName: \'Create Time\',\n    width: 200\n  }];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([SprayCardListGet(uid)]);\n    };\n    fetchData();\n    setMounted(true);\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    updateSelectedSprayCard();\n  }, [sprayCardRecords]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (mounted) {\n      SprayCardListGet(uid);\n    }\n  }, [refreshRecord]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    style: {\n      height: 900\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledDataGrid, {\n    columns: columns,\n    rows: rows,\n    disableRowSelectionOnClick: true,\n    disableClickEdit: true,\n    rowSelection: false,\n    getRowClassName: params => params.id === (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.scpid) ? `highlight` : null,\n    slots: {\n      toolbar: CustomToolbar\n    }\n  })));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/SprayCard/SprayCardDataGrid/index.js?')},"./src/pages/SprayCard/SprayCardDataGrid/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   StyledDataGrid: () => (/* binding */ StyledDataGrid)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/styled.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/grey.js");\n\n\n\nconst StyledDataGrid = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_1__.DataGrid)(() => ({\n  \'& .highlight\': {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][300],\n    \'&:hover\': {\n      backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][400]\n    }\n  }\n}));\n\n//# sourceURL=webpack://frontend/./src/pages/SprayCard/SprayCardDataGrid/styles.js?')}}]);