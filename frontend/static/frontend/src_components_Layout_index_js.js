/*! For license information please see src_components_Layout_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_Layout_index_js"],{"./src/components/Layout/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Layout)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/components/Layout/styles.js");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");\n\n\n\n\nconst LayoutAppBar = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_material_styles_useTheme_-730887"), __webpack_require__.e("vendors-node_modules_mui_material_ButtonBase_ButtonBase_js-node_modules_mui_material_utils_cr-99e9ab"), __webpack_require__.e("vendors-node_modules_mui_material_IconButton_IconButton_js-node_modules_mui_material_Toolbar_-95fa18"), __webpack_require__.e("vendors-node_modules_mui_icons-material_AdminPanelSettings_js-node_modules_mui_icons-material-2a7124"), __webpack_require__.e("src_components_AppBarComponent_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../AppBarComponent */ "./src/components/AppBarComponent/index.js")));\nconst LayoutDrawer = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Modal_Modal_js"), __webpack_require__.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_material_styles_useTheme_-730887"), __webpack_require__.e("vendors-node_modules_mui_material_Paper_Paper_js-node_modules_mui_material_transitions_utils_-232ada"), __webpack_require__.e("vendors-node_modules_mui_material_List_List_js-node_modules_mui_material_Typography_Typography_js"), __webpack_require__.e("vendors-node_modules_mui_material_ButtonBase_ButtonBase_js-node_modules_mui_material_utils_cr-99e9ab"), __webpack_require__.e("vendors-node_modules_mui_material_ListItem_ListItem_js-node_modules_mui_material_useMediaQuer-055791"), __webpack_require__.e("vendors-node_modules_mui_icons-material_AccountBox_js-node_modules_mui_icons-material_Assignm-8a7cbb"), __webpack_require__.e("src_components_DrawerComponent_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../DrawerComponent */ "./src/components/DrawerComponent/index.js")));\nfunction Layout(props) {\n  const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  const [userType, setUserType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  const [menuOpen, setMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();\n  function toggleMenuOpen() {\n    menuOpen ? setMenuOpen(false) : setMenuOpen(true);\n  }\n  async function handleLogout() {\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "DELETE",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      }\n    };\n    await fetch("/api/logout/", requestOptions).then(response => {\n      if (response.ok) {\n        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.removeToken)();\n        navigate("/login");\n      }\n    });\n  }\n  async function UserInfoGet(props) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/user/get/" + "?uid=" + props.uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setUsername(data.data.username);\n          setUserType(data.data.type);\n        });\n      }\n    });\n  }\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    UserInfoGet(props);\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledRoot, null, menuOpen ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LayoutDrawer, {\n    userType: userType,\n    setMenuOpen: setMenuOpen\n  }) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LayoutAppBar, {\n    username: username,\n    userType: userType,\n    toggleMenuOpen: toggleMenuOpen,\n    handleLogout: handleLogout\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Outlet, null)));\n}\n\n//# sourceURL=webpack://frontend/./src/components/Layout/index.js?')},"./src/components/Layout/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   StyledContainer: () => (/* binding */ StyledContainer),\n/* harmony export */   StyledRoot: () => (/* binding */ StyledRoot),\n/* harmony export */   drawerWidth: () => (/* binding */ drawerWidth)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ \"./node_modules/@mui/system/esm/styled.js\");\n\nconst drawerWidth = 200;\nconst StyledRoot = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"div\")({\n  width: '100%',\n  height: '100%',\n  position: 'absolute',\n  left: 0,\n  top: 0,\n  display: 'flex',\n  flexDirection: 'row'\n});\nconst StyledContainer = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"div\")({\n  display: 'flex',\n  flexDirection: 'column',\n  flexGrow: 1,\n  width: '100%',\n  overflowX: 'hidden'\n});\n\n//# sourceURL=webpack://frontend/./src/components/Layout/styles.js?")}}]);