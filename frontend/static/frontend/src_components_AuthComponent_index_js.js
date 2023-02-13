/*! For license information please see src_components_AuthComponent_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_AuthComponent_index_js"],{"./src/components/AuthComponent/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Index)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");\n\n\n\n\nconst Loading = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_styles_styled_js-node_modules_mui_material_styles_useTheme_-f3bc93"), __webpack_require__.e("vendors-node_modules_mui_system_esm_createStyled_js"), __webpack_require__.e("vendors-node_modules_mui_material_Grid_Grid_js-node_modules_mui_system_esm_styled_js"), __webpack_require__.e("vendors-node_modules_mui_material_CircularProgress_CircularProgress_js-node_modules_mui_mater-0ff41d"), __webpack_require__.e("src_pages_Loading_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Loading */ "./src/pages/Loading/index.js")));\nconst Layout = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_system_esm_createStyled_js"), __webpack_require__.e("src_pages_Layout_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Layout */ "./src/pages/Layout/index.js")));\nfunction Index() {\n  const [authStatus, setAuthStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("loading");\n  const [uid, setUID] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  async function AuthCheck() {\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json"\n      },\n      body: JSON.stringify({\n        token: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getToken)()\n      })\n    };\n    await fetch("/api/auth/", requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setUID(data.uid);\n          setAuthStatus("authorized");\n        });\n      } else {\n        setAuthStatus("unauthorized");\n      }\n    });\n  }\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    AuthCheck();\n  }, []);\n  if (authStatus === "loading") {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Loading, null);\n  } else if (authStatus === "authorized") {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Layout, {\n      uid: uid\n    });\n  } else if (authStatus === "unauthorized") {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Navigate, {\n      to: "/login",\n      replace: true\n    });\n  }\n}\n\n//# sourceURL=webpack://frontend/./src/components/AuthComponent/index.js?')}}]);