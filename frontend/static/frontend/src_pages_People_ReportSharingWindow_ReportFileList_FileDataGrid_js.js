/*! For license information please see src_pages_People_ReportSharingWindow_ReportFileList_FileDataGrid_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_People_ReportSharingWindow_ReportFileList_FileDataGrid_js"],{"./src/pages/People/ReportSharingWindow/ReportFileList/FileDataGrid.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ FileDataGrid)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarFilterButton.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport.js");\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/x-data-grid */ "./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils */ "./src/utils/index.js");\n/* harmony import */ var _Report_ReportGenerators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Report/ReportGenerators */ "./src/pages/Report/ReportGenerators/index.js");\n\n\n\n\n\n\n\n\n\n\n\n\nfunction CustomToolbar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__.GridToolbarContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_4__.GridToolbarColumnsButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_5__.GridToolbarFilterButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridToolbarDensitySelector, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_7__.GridToolbarExport, null));\n}\nfunction FileDataGrid({\n  employerID,\n  privilege,\n  selectedFiles,\n  setSelectedFiles\n}) {\n  const [fileList, setFileList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  async function FileListGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    if (privilege.report_r) {\n      await fetch("/media/report/list/get/" + "?employer_id=" + uid, requestOptions).then(response => {\n        if (response.ok) {\n          response.json().then(data => {\n            const record_list = data.data;\n            setFileList(record_list);\n            const record_row = record_list.map(record => createRowData(record));\n            setRows(record_row);\n          });\n        }\n      });\n    }\n  }\n  const createRowData = record => {\n    for (let key in record) {\n      if (record[key] === null) {\n        record[key] = "";\n      }\n    }\n    return {\n      "id": record.rid,\n      "name": record.name,\n      "author": record.author,\n      "create_time": record.create_time\n    };\n  };\n  const columnWidth = 200;\n  const columnLongWidth = 300;\n  const columns = [{\n    field: \'name\',\n    headerName: \'File Name\',\n    width: columnLongWidth\n  }, {\n    field: \'author\',\n    headerName: \'Created By\',\n    width: columnWidth\n  }, {\n    field: \'create_time\',\n    headerName: \'Created Time\',\n    width: columnWidth\n  }];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([FileListGet(employerID)]);\n    };\n    fetchData();\n    setMounted(true);\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    style: {\n      height: \'calc(3/4 * 5/6 * 100vh)\',\n      marginLeft: \'16px\',\n      marginTop: \'16px\',\n      overflow: \'auto\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_9__.DataGrid, {\n    columns: columns,\n    rows: rows,\n    checkboxSelection: true,\n    onRowSelectionModelChange: newRowSelectionModel => {\n      setSelectedFiles(newRowSelectionModel);\n    },\n    rowSelectionModel: selectedFiles,\n    slots: {\n      toolbar: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CustomToolbar, null)\n    },\n    density: "compact",\n    localeText: {\n      noRowsLabel: privilege.report_r ? "No rows" : "You don\'t have the privilege to access this data"\n    }\n  }));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/People/ReportSharingWindow/ReportFileList/FileDataGrid.js?')},"./src/pages/Report/ReportGenerators/CentralPosting/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ CentralPostingGenerator)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils */ "./src/utils/index.js");\n\n\n\nconst reportGenerateUrl = \'/media/report/central-posting/\';\nfunction CentralPostingGenerator(reportData, format, uid, employerID) {\n  return new Promise(async (resolve, reject) => {\n    try {\n      const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCookie)(\'csrftoken\');\n      const requestOptions = {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          \'X-CSRFToken\': csrftoken\n        },\n        body: JSON.stringify({\n          reportData: reportData,\n          format: format,\n          user_id: employerID,\n          author_id: uid\n        })\n      };\n      const response = await fetch(reportGenerateUrl, requestOptions);\n      if (response.ok) {\n        resolve();\n      }\n    } catch (error) {\n      console.error("Failed to generate file:", error);\n      reject(error);\n    }\n  });\n}\n;\n\n//# sourceURL=webpack://frontend/./src/pages/Report/ReportGenerators/CentralPosting/index.js?')},"./src/pages/Report/ReportGenerators/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ reportGenerator)\n/* harmony export */ });\n/* harmony import */ var _CentralPosting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CentralPosting */ "./src/pages/Report/ReportGenerators/CentralPosting/index.js");\n\nconst central_posting_generator = async (dataList, rowsSelected, format, uid, employerID) => {\n  const reportData = dataList.filter(item => rowsSelected.includes(item.id));\n  await (0,_CentralPosting__WEBPACK_IMPORTED_MODULE_0__["default"])(reportData, format, uid, employerID);\n};\nconst reportGeneratorList = {\n  central_posting: central_posting_generator\n};\nfunction reportGenerator(id) {\n  return reportGeneratorList[id];\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Report/ReportGenerators/index.js?')}}]);