/*! For license information please see src_components_AppBarComponent_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_AppBarComponent_index_js"],{"./src/components/AppBarComponent/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ LayoutAppBar)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/AppBar */ "./node_modules/@mui/material/AppBar/AppBar.js");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/Box/Box.js");\n/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Toolbar */ "./node_modules/@mui/material/Toolbar/Toolbar.js");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/IconButton */ "./node_modules/@mui/material/IconButton/IconButton.js");\n/* harmony import */ var _mui_material_Badge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Badge */ "./node_modules/@mui/material/Badge/Badge.js");\n/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/icons-material/Menu */ "./node_modules/@mui/icons-material/Menu.js");\n/* harmony import */ var _mui_icons_material_Search__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/icons-material/Search */ "./node_modules/@mui/icons-material/Search.js");\n/* harmony import */ var _mui_icons_material_Notifications__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/icons-material/Notifications */ "./node_modules/@mui/icons-material/Notifications.js");\n/* harmony import */ var _mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/icons-material/Logout */ "./node_modules/@mui/icons-material/Logout.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/components/AppBarComponent/styles.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n\n\n\n\n\n\n\n\n\n\n\n\nfunction LayoutAppBar(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    position: "static"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    size: "large",\n    edge: "start",\n    color: "inherit",\n    "aria-label": "open drawer",\n    sx: {\n      mr: 2\n    },\n    onClick: props.toggleMenuOpen\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_6__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledSearch, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledSearchIconWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Search__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledInputBase, {\n    placeholder: "Search\\u2026",\n    inputProps: {\n      \'aria-label\': \'search\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    sx: {\n      flexGrow: 1\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    sx: {\n      display: {\n        xs: \'none\',\n        md: \'flex\'\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    sx: {\n      display: \'flex\',\n      alignItems: "center",\n      padding: 1.5\n    }\n  }, "Hello, ", props.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    size: "large",\n    "aria-label": "new notifications",\n    color: "inherit"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Badge__WEBPACK_IMPORTED_MODULE_9__["default"], {\n    badgeContent: 16,\n    color: "error"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Notifications__WEBPACK_IMPORTED_MODULE_10__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    size: "large",\n    "aria-label": "new notifications",\n    color: "inherit",\n    onClick: props.handleLogout\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_11__["default"], null))))));\n}\n\n//# sourceURL=webpack://frontend/./src/components/AppBarComponent/index.js?')},"./src/components/AppBarComponent/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StyledInputBase\": () => (/* binding */ StyledInputBase),\n/* harmony export */   \"StyledSearch\": () => (/* binding */ StyledSearch),\n/* harmony export */   \"StyledSearchIconWrapper\": () => (/* binding */ StyledSearchIconWrapper)\n/* harmony export */ });\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/styles/styled.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/system/esm/colorManipulator.js\");\n/* harmony import */ var _mui_material_InputBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/InputBase */ \"./node_modules/@mui/material/InputBase/InputBase.js\");\n\n\nconst StyledSearch = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div')(({\n  theme\n}) => ({\n  position: 'relative',\n  borderRadius: theme.shape.borderRadius,\n  backgroundColor: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_1__.alpha)(theme.palette.common.white, 0.15),\n  '&:hover': {\n    backgroundColor: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_1__.alpha)(theme.palette.common.white, 0.25)\n  },\n  marginRight: theme.spacing(2),\n  marginLeft: 0,\n  width: '100%',\n  [theme.breakpoints.up('sm')]: {\n    marginLeft: theme.spacing(3),\n    width: 'auto'\n  }\n}));\nconst StyledSearchIconWrapper = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div')(({\n  theme\n}) => ({\n  padding: theme.spacing(0, 2),\n  height: '100%',\n  position: 'absolute',\n  pointerEvents: 'none',\n  display: 'flex',\n  alignItems: 'center',\n  justifyContent: 'center'\n}));\nconst StyledInputBase = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_mui_material_InputBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(({\n  theme\n}) => ({\n  color: 'inherit',\n  '& .MuiInputBase-input': {\n    padding: theme.spacing(1, 1, 1, 0),\n    // vertical padding + font size from searchIcon\n    paddingLeft: `calc(1em + ${theme.spacing(4)})`,\n    transition: theme.transitions.create('width'),\n    width: '100%',\n    [theme.breakpoints.up('md')]: {\n      width: '20ch'\n    }\n  }\n}));\n\n//# sourceURL=webpack://frontend/./src/components/AppBarComponent/styles.js?")}}]);