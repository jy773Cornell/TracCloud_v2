/*! For license information please see src_pages_SprayCard_UserTreeView_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_SprayCard_UserTreeView_index_js"],{"./node_modules/@mui/icons-material/ChevronRight.js":(__unused_webpack_module,exports,__webpack_require__)=>{eval('\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");\nObject.defineProperty(exports, "__esModule", ({\n  value: true\n}));\nexports["default"] = void 0;\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@mui/icons-material/utils/createSvgIcon.js"));\nvar _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");\nvar _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {\n  d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"\n}), \'ChevronRight\');\nexports["default"] = _default;\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/icons-material/ChevronRight.js?')},"./src/pages/SprayCard/UserTreeView/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ UserTreeView)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/Box/Box.js");\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/icons-material/ExpandMore */ "./node_modules/@mui/icons-material/ExpandMore.js");\n/* harmony import */ var _mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/icons-material/ChevronRight */ "./node_modules/@mui/icons-material/ChevronRight.js");\n/* harmony import */ var _mui_lab_TreeView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/lab/TreeView */ "./node_modules/@mui/lab/TreeView/TreeView.js");\n/* harmony import */ var _mui_lab_TreeItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/lab/TreeItem */ "./node_modules/@mui/lab/TreeItem/TreeItem.js");\n\n\n\n\n\n\n\nfunction UserTreeView({\n  sprayData,\n  field_names,\n  handleInputChange\n}) {\n  const [expanded, setExpanded] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [selected, setSelected] = react__WEBPACK_IMPORTED_MODULE_0__.useState("");\n  const handleToggle = (event, nodeIds) => {\n    setExpanded(nodeIds);\n  };\n  const handleSelect = (event, nodeIds) => {\n    setSelected(nodeIds);\n    handleInputChange(event, nodeIds, field_names[5]);\n  };\n  const collectNodeIds = nodes => {\n    let ids = [];\n    for (let nodeId in nodes) {\n      ids.push(nodeId);\n      if (nodes[nodeId].children) {\n        ids = ids.concat(collectNodeIds(nodes[nodeId].children));\n      }\n    }\n    return ids;\n  };\n  const handleExpandClick = () => {\n    if (expanded.length === 0) {\n      const allNodeIds = collectNodeIds(sprayData["userSubTree"]);\n      setExpanded(allNodeIds);\n    } else {\n      setExpanded([]);\n    }\n  };\n  const renderTree = nodes => {\n    if (!nodes) {\n      return null;\n    }\n    return Object.entries(nodes).map(([nodeId, nodeData]) => {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TreeItem__WEBPACK_IMPORTED_MODULE_1__["default"], {\n        key: nodeId,\n        nodeId: nodeId,\n        label: nodeData.label\n      }, nodeData.children && renderTree(nodeData.children));\n    });\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    sx: {\n      height: 280,\n      flexGrow: 1,\n      maxWidth: 400,\n      overflowY: \'auto\',\n      overflowX: \'auto\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    onClick: handleExpandClick\n  }, expanded.length === 0 ? \'Expand all\' : \'Collapse all\')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TreeView__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    "aria-label": "controlled",\n    defaultCollapseIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_5__["default"], null),\n    defaultExpandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_6__["default"], null),\n    expanded: expanded,\n    selected: selected,\n    onNodeToggle: handleToggle,\n    onNodeSelect: handleSelect\n  }, renderTree(sprayData["userSubTree"])));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/SprayCard/UserTreeView/index.js?')}}]);