/*! For license information please see src_pages_People_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_People_index_js"],{"./src/pages/People/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ People)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n\n\nconst EmployeeList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_ButtonBase_ButtonBase_js-node_modules_mui_material_utils_cr-d774f9"), __webpack_require__.e("vendors-node_modules_mui_material_Button_Button_js"), __webpack_require__.e("src_pages_People_EmployeeList_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./EmployeeList */ "./src/pages/People/EmployeeList/index.js")));\nconst ClientList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_ButtonBase_ButtonBase_js-node_modules_mui_material_utils_cr-d774f9"), __webpack_require__.e("vendors-node_modules_mui_material_Button_Button_js"), __webpack_require__.e("src_pages_People_ClientList_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./ClientList */ "./src/pages/People/ClientList/index.js")));\nfunction People(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    style: {\n      margin: \'0px 15px\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], {\n    container: true,\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], {\n    item: true,\n    xs: 8\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(EmployeeList, props)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], {\n    item: true,\n    xs: 4\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ClientList, props))));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/People/index.js?')}}]);