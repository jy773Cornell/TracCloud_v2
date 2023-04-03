/*! For license information please see src_pages_HomePage_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_HomePage_index_js"],{"./src/pages/HomePage/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ SiteTreeView)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_lab_TreeView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/lab/TreeView */ "./node_modules/@mui/lab/TreeView/TreeView.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/Box/Box.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/pages/HomePage/styles.js");\n\n\n\n\n\nfunction SiteTreeView(props) {\n  const [expanded, setExpanded] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const handleToggle = (event, nodeIds) => {\n    setExpanded(nodeIds);\n  };\n  const handleExpandClick = () => {\n    setExpanded(oldExpanded => oldExpanded.length === 0 ? [\'1\', \'3\', \'7\'] : []);\n  };\n  const renderTree = nodes => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledTreeItem, {\n    key: nodes.sid,\n    nodeId: nodes.sid.toString(),\n    label: nodes.name\n  }, Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_system__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    sx: {\n      height: 270,\n      flexGrow: 1,\n      maxWidth: 400,\n      overflowY: \'auto\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_system__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    sx: {\n      mb: 1\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    onClick: handleExpandClick\n  }, expanded.length === 0 ? \'Expand all\' : \'Collapse all\')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TreeView__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    "aria-label": "customized",\n    defaultExpanded: [],\n    defaultCollapseIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.MinusSquare, null),\n    defaultExpandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.PlusSquare, null),\n    defaultEndIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.CloseSquare, null),\n    expanded: expanded,\n    onNodeToggle: handleToggle,\n    sx: {\n      height: 400,\n      flexGrow: 1,\n      maxWidth: 250,\n      overflowY: \'auto\'\n    }\n  }, props.data.map(node => renderTree(node))));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/HomePage/index.js?')},"./src/pages/HomePage/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "CloseSquare": () => (/* binding */ CloseSquare),\n/* harmony export */   "MinusSquare": () => (/* binding */ MinusSquare),\n/* harmony export */   "PlusSquare": () => (/* binding */ PlusSquare),\n/* harmony export */   "StyledTreeItem": () => (/* binding */ StyledTreeItem)\n/* harmony export */ });\n/* harmony import */ var _react_spring_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-spring/web */ "./node_modules/@react-spring/web/dist/esm/index.js");\n/* harmony import */ var _mui_material_Collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Collapse */ "./node_modules/@mui/material/Collapse/Collapse.js");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/styles/styled.js");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/system/esm/colorManipulator.js");\n/* harmony import */ var _mui_lab_TreeItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/lab/TreeItem */ "./node_modules/@mui/lab/TreeItem/TreeItem.js");\n/* harmony import */ var _mui_lab_TreeItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/lab/TreeItem */ "./node_modules/@mui/lab/TreeItem/treeItemClasses.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_SvgIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/SvgIcon */ "./node_modules/@mui/material/SvgIcon/SvgIcon.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\nfunction TransitionComponent(props) {\n  const style = (0,_react_spring_web__WEBPACK_IMPORTED_MODULE_0__.useSpring)({\n    from: {\n      opacity: 0,\n      transform: \'translate3d(20px,0,0)\'\n    },\n    to: {\n      opacity: props.in ? 1 : 0,\n      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`\n    }\n  });\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_react_spring_web__WEBPACK_IMPORTED_MODULE_0__.animated.div, {\n    style: style\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_Collapse__WEBPACK_IMPORTED_MODULE_2__["default"], props));\n}\nTransitionComponent.propTypes = {\n  /**\r\n   * Show the component; triggers the enter or exit states\r\n   */\n  in: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool)\n};\nconst StyledTreeItem = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_4__["default"])(props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_lab_TreeItem__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, props, {\n  TransitionComponent: TransitionComponent\n})))(({\n  theme\n}) => ({\n  [`& .${_mui_lab_TreeItem__WEBPACK_IMPORTED_MODULE_6__["default"].iconContainer}`]: {\n    \'& .close\': {\n      opacity: 0.3\n    }\n  },\n  [`& .${_mui_lab_TreeItem__WEBPACK_IMPORTED_MODULE_6__["default"].group}`]: {\n    marginLeft: 15,\n    paddingLeft: 18,\n    borderLeft: `1px dashed ${(0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_7__.alpha)(theme.palette.text.primary, 0.4)}`\n  }\n}));\nfunction MinusSquare(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_SvgIcon__WEBPACK_IMPORTED_MODULE_8__["default"], _extends({\n    fontSize: "inherit",\n    style: {\n      width: 14,\n      height: 14\n    }\n  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {\n    d: "M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z"\n  }));\n}\nfunction PlusSquare(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_SvgIcon__WEBPACK_IMPORTED_MODULE_8__["default"], _extends({\n    fontSize: "inherit",\n    style: {\n      width: 14,\n      height: 14\n    }\n  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {\n    d: "M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z"\n  }));\n}\nfunction CloseSquare(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_SvgIcon__WEBPACK_IMPORTED_MODULE_8__["default"], _extends({\n    className: "close",\n    fontSize: "inherit",\n    style: {\n      width: 14,\n      height: 14\n    }\n  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {\n    d: "M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z"\n  }));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/HomePage/styles.js?')}}]);