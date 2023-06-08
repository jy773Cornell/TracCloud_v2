/*! For license information please see src_pages_SprayCard_SprayCardDetails_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_SprayCard_SprayCardDetails_js"],{"./node_modules/@mui/system/esm/Box/Box.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _createBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createBox */ "./node_modules/@mui/system/esm/createBox.js");\n\n\nconst Box = (0,_createBox__WEBPACK_IMPORTED_MODULE_0__["default"])();\n true ? Box.propTypes /* remove-proptypes */ = {\n  // ----------------------------- Warning --------------------------------\n  // | These PropTypes are generated from the TypeScript type definitions |\n  // |     To update them edit the d.ts file and run "yarn proptypes"     |\n  // ----------------------------------------------------------------------\n  /**\n   * @ignore\n   */\n  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node),\n  /**\n   * The component used for the root node.\n   * Either a string to use a HTML element or a component.\n   */\n  component: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().elementType),\n  /**\n   * The system prop that allows defining system overrides as well as additional CSS styles.\n   */\n  sx: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)])\n} : 0;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Box);\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/system/esm/Box/Box.js?')},"./node_modules/@mui/system/esm/createBox.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ createBox)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");\n/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");\n/* harmony import */ var _mui_styled_engine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/styled-engine */ "./node_modules/@mui/styled-engine/index.js");\n/* harmony import */ var _styleFunctionSx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styleFunctionSx */ "./node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js");\n/* harmony import */ var _styleFunctionSx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./styleFunctionSx */ "./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js");\n/* harmony import */ var _useTheme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useTheme */ "./node_modules/@mui/system/esm/useTheme.js");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");\n\n\nconst _excluded = ["className", "component"];\n\n\n\n\n\n\nfunction createBox(options = {}) {\n  const {\n    defaultTheme,\n    defaultClassName = \'MuiBox-root\',\n    generateClassName\n  } = options;\n  const BoxRoot = (0,_mui_styled_engine__WEBPACK_IMPORTED_MODULE_5__["default"])(\'div\', {\n    shouldForwardProp: prop => prop !== \'theme\' && prop !== \'sx\' && prop !== \'as\'\n  })(_styleFunctionSx__WEBPACK_IMPORTED_MODULE_6__["default"]);\n  const Box = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Box(inProps, ref) {\n    const theme = (0,_useTheme__WEBPACK_IMPORTED_MODULE_7__["default"])(defaultTheme);\n    const _extendSxProp = (0,_styleFunctionSx__WEBPACK_IMPORTED_MODULE_8__["default"])(inProps),\n      {\n        className,\n        component = \'div\'\n      } = _extendSxProp,\n      other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_extendSxProp, _excluded);\n    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BoxRoot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({\n      as: component,\n      ref: ref,\n      className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),\n      theme: theme\n    }, other));\n  });\n  return Box;\n}\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/system/esm/createBox.js?')},"./src/pages/SprayCard/SprayCardDetails.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ SprayCardDetails)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/Box/Box.js");\n\n\n\nfunction SprayCardDetails(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_1__["default"], {\n    style: {\n      height: 900\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_system__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    bgcolor: "info.main",\n    height: "100px"\n  }, "Spray Card Process Details")));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/SprayCard/SprayCardDetails.js?')}}]);