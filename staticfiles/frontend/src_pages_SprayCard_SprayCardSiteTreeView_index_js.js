/*! For license information please see src_pages_SprayCard_SprayCardSiteTreeView_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_SprayCard_SprayCardSiteTreeView_index_js"],{"./src/pages/SprayCard/SprayCardSiteTreeView/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ SprayCardSiteTreeView)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_checkbox_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-checkbox-tree */ "./node_modules/react-checkbox-tree/lib/index.browser.js");\n/* harmony import */ var react_checkbox_tree__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_checkbox_tree__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.css");\n/* harmony import */ var react_checkbox_tree_lib_react_checkbox_tree_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-checkbox-tree/lib/react-checkbox-tree.css */ "./node_modules/react-checkbox-tree/lib/react-checkbox-tree.css");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/Box/Box.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n\n\n\n\n\n\n\nfunction SprayCardSiteTreeView({\n  sprayData,\n  field_names,\n  fieldValues,\n  setFieldValues,\n  siteOptions,\n  end_site_types,\n  checked,\n  setChecked,\n  expanded,\n  setExpanded,\n  nodes\n}) {\n  const findNodesWithChildren = nodes => {\n    return nodes.reduce((acc, node) => {\n      if (node.children && node.children.length > 0) {\n        acc.push(node.value);\n        acc.push(...findNodesWithChildren(node.children));\n      }\n      return acc;\n    }, []);\n  };\n  const handleExpandToggleClick = node => {\n    setExpanded(prev => {\n      var _prev$node$value;\n      return {\n        ...prev,\n        [node.value]: ((_prev$node$value = prev[node.value]) === null || _prev$node$value === void 0 ? void 0 : _prev$node$value.length) === 0 ? findNodesWithChildren([node]) : []\n      };\n    });\n  };\n  const handleCheck = (treeId, checkedNodes) => {\n    setChecked(prev => ({\n      ...prev,\n      [treeId]: checkedNodes\n    }));\n  };\n  const handleExpand = (treeId, expandedNodes) => {\n    setExpanded(prev => ({\n      ...prev,\n      [treeId]: expandedNodes\n    }));\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, nodes.map(node => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    item: true,\n    xs: 4,\n    key: node.value\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_system__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    key: node.value,\n    sx: {\n      border: \'1px solid #000\',\n      borderRadius: \'4px\',\n      maxHeight: 250,\n      flexGrow: 1,\n      maxWidth: 300,\n      overflowY: \'auto\',\n      overflowX: \'auto\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_system__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    onClick: () => handleExpandToggleClick(node)\n  }, expanded[node.value] && expanded[node.value].length === 0 ? \'Expand\' : \'Collapse\')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_checkbox_tree__WEBPACK_IMPORTED_MODULE_1___default()), {\n    nodes: [node],\n    checked: checked[node.value] || [],\n    expanded: expanded[node.value] || [],\n    onCheck: checkedNodes => handleCheck(node.value, checkedNodes),\n    onExpand: expandedNodes => handleExpand(node.value, expandedNodes),\n    showNodeIcon: false\n  })))));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/SprayCard/SprayCardSiteTreeView/index.js?')}}]);