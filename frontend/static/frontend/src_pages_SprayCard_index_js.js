/*! For license information please see src_pages_SprayCard_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_SprayCard_index_js"],{"./node_modules/@mui/material/colors/pink.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst pink = {\n  50: '#fce4ec',\n  100: '#f8bbd0',\n  200: '#f48fb1',\n  300: '#f06292',\n  400: '#ec407a',\n  500: '#e91e63',\n  600: '#d81b60',\n  700: '#c2185b',\n  800: '#ad1457',\n  900: '#880e4f',\n  A100: '#ff80ab',\n  A200: '#ff4081',\n  A400: '#f50057',\n  A700: '#c51162'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pink);\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/material/colors/pink.js?")},"./src/pages/SprayCard/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/pages/SprayCard/styles.js");\n/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/icons-material/Add */ "./node_modules/@mui/icons-material/Add.js");\n/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react-lite */ "./node_modules/mobx-react-lite/es/index.js");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store */ "./src/store/index.js");\n\n\n\n\n\n\n\nconst SprayCardCreate = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_List_List_js-node_modules_mui_material_Modal_Modal_js"), __webpack_require__.e("vendors-node_modules_mui_material_Paper_Paper_js-node_modules_mui_material_transitions_utils_-232ada"), __webpack_require__.e("vendors-node_modules_mui_base_utils_useSlotProps_js-node_modules_mui_utils_esm_elementAccepti-2024b3"), __webpack_require__.e("vendors-node_modules_mui_material_Menu_Menu_js"), __webpack_require__.e("vendors-node_modules_mui_material_TextField_TextField_js"), __webpack_require__.e("vendors-node_modules_mui_material_Chip_Chip_js-node_modules_mui_material_Popper_Popper_js"), __webpack_require__.e("vendors-node_modules_mui_material_Autocomplete_Autocomplete_js"), __webpack_require__.e("vendors-node_modules_mui_material_Alert_Alert_js-node_modules_mui_material_Snackbar_Snackbar_-be4378"), __webpack_require__.e("vendors-node_modules_mui_material_Checkbox_Checkbox_js-node_modules_mui_material_FormControlL-91ee78"), __webpack_require__.e("vendors-node_modules_mui_base_ClickAwayListener_ClickAwayListener_js-node_modules_mui_icons-m-7fb143"), __webpack_require__.e("vendors-node_modules_mui_material_CardContent_CardContent_js-node_modules_mui_material_Card_C-66d0d3"), __webpack_require__.e("src_pages_SprayCard_SprayCardCreate_SprayCardForm_js"), __webpack_require__.e("src_pages_SprayCard_SprayCardCreate_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./SprayCardCreate */ "./src/pages/SprayCard/SprayCardCreate/index.js")));\nconst SprayCardAssign = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_List_List_js-node_modules_mui_material_Modal_Modal_js"), __webpack_require__.e("vendors-node_modules_mui_material_Paper_Paper_js-node_modules_mui_material_transitions_utils_-232ada"), __webpack_require__.e("vendors-node_modules_mui_base_utils_useSlotProps_js-node_modules_mui_utils_esm_elementAccepti-2024b3"), __webpack_require__.e("vendors-node_modules_mui_material_Menu_Menu_js"), __webpack_require__.e("vendors-node_modules_mui_material_TextField_TextField_js"), __webpack_require__.e("vendors-node_modules_mui_material_Chip_Chip_js-node_modules_mui_material_Popper_Popper_js"), __webpack_require__.e("vendors-node_modules_mui_material_Autocomplete_Autocomplete_js"), __webpack_require__.e("vendors-node_modules_mui_material_Alert_Alert_js-node_modules_mui_material_Snackbar_Snackbar_-be4378"), __webpack_require__.e("vendors-node_modules_mui_base_ClickAwayListener_ClickAwayListener_js-node_modules_mui_materia-381931"), __webpack_require__.e("src_pages_SprayCard_SprayCardAssign_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./SprayCardAssign */ "./src/pages/SprayCard/SprayCardAssign/index.js")));\nconst SprayCardDataGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_List_List_js-node_modules_mui_material_Modal_Modal_js"), __webpack_require__.e("vendors-node_modules_mui_material_Paper_Paper_js-node_modules_mui_material_transitions_utils_-232ada"), __webpack_require__.e("vendors-node_modules_mui_base_utils_useSlotProps_js-node_modules_mui_utils_esm_elementAccepti-2024b3"), __webpack_require__.e("vendors-node_modules_mui_material_Menu_Menu_js"), __webpack_require__.e("vendors-node_modules_mui_material_TextField_TextField_js"), __webpack_require__.e("vendors-node_modules_mui_material_Chip_Chip_js-node_modules_mui_material_Popper_Popper_js"), __webpack_require__.e("vendors-node_modules_mui_material_Autocomplete_Autocomplete_js"), __webpack_require__.e("vendors-node_modules_mui_material_Checkbox_Checkbox_js-node_modules_mui_material_FormControlL-91ee78"), __webpack_require__.e("vendors-node_modules_mui_material_MenuItem_MenuItem_js"), __webpack_require__.e("vendors-node_modules_mui_material_Divider_Divider_js-node_modules_mui_material_ListItemIcon_L-189f4a"), __webpack_require__.e("vendors-node_modules_mui_x-data-grid_DataGrid_DataGrid_js-node_modules_mui_x-data-grid_compon-7ff413"), __webpack_require__.e("vendors-node_modules_mui_base_ClickAwayListener_ClickAwayListener_js-node_modules_mui_materia-8d3b2d0"), __webpack_require__.e("src_pages_SprayCard_SprayCardDataGrid_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./SprayCardDataGrid */ "./src/pages/SprayCard/SprayCardDataGrid/index.js")));\nconst SprayCardDetails = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Paper_Paper_js-node_modules_mui_material_transitions_utils_-232ada"), __webpack_require__.e("vendors-node_modules_mui_icons-material_ExpandLess_js-node_modules_mui_icons-material_ExpandM-3807b4"), __webpack_require__.e("src_pages_SprayCard_SprayCardDetails_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./SprayCardDetails */ "./src/pages/SprayCard/SprayCardDetails/index.js")));\nfunction SprayCard(props) {\n  const uid = props.uid;\n  const employerID = props.employerID;\n  const privilege = props.privilege;\n  const {\n    sprayCardStore\n  } = (0,_store__WEBPACK_IMPORTED_MODULE_3__.useStore)();\n  const [sprayData, setSprayData] = react__WEBPACK_IMPORTED_MODULE_0__.useState({});\n  const [sprayOptions, setSprayOption] = react__WEBPACK_IMPORTED_MODULE_0__.useState({});\n  const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);\n  const [addSprayCard, setAddSprayCard] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);\n  const [assignSprayCard, setAssignSprayCard] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);\n  const [sprayCardSelected, setSprayCardSelected] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);\n  const [refreshRecord, setRefreshRecord] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const createSprayCardProps = {\n    uid,\n    addSprayCard,\n    setAddSprayCard,\n    sprayData,\n    sprayOptions,\n    refreshRecord,\n    setRefreshRecord,\n    setAssignSprayCard,\n    setSprayCardSelected,\n    privilege\n  };\n  const assignSprayCardProps = {\n    uid,\n    sprayData,\n    sprayOptions,\n    assignSprayCard,\n    setAssignSprayCard,\n    sprayCardSelected,\n    refreshRecord,\n    setRefreshRecord\n  };\n  const dataGridProps = {\n    uid,\n    refreshRecord,\n    sprayCardSelected,\n    setSprayCardSelected,\n    sprayData,\n    sprayOptions\n  };\n  const detailsProps = {\n    uid,\n    sprayData,\n    sprayCardSelected,\n    sprayOptions,\n    setAssignSprayCard,\n    refreshRecord,\n    setRefreshRecord,\n    privilege\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      const data = await sprayCardStore.getSprayData(uid, employerID);\n      setSprayData(data["record_data"]);\n      setSprayOption(data["option_data"]);\n      setMounted(true);\n    };\n    fetchData();\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.AddButton, {\n    variant: "contained",\n    startIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_4__["default"], null),\n    disabled: !mounted || !privilege.spraycard_c,\n    onClick: () => setAddSprayCard(true)\n  }, "Add Spray Card Process"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    style: {\n      margin: \'0px 15px\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    container: true,\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    item: true,\n    xs: 6\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SprayCardDataGrid, dataGridProps)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    item: true,\n    xs: 6\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SprayCardDetails, detailsProps)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SprayCardCreate, createSprayCardProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SprayCardAssign, assignSprayCardProps));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__.observer)(SprayCard));\n\n//# sourceURL=webpack://frontend/./src/pages/SprayCard/index.js?')},"./src/pages/SprayCard/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AddButton: () => (/* binding */ AddButton),\n/* harmony export */   CancelButton: () => (/* binding */ CancelButton)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/styled.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/orange.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/pink.js");\n\n\n\n\nconst AddButton = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"])(({\n  theme\n}) => ({\n  margin: "15px 15px",\n  backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][500],\n  \'&:hover\': {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][700]\n  }\n}));\nconst CancelButton = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"])(({\n  theme\n}) => ({\n  margin: "15px 15px",\n  backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_3__["default"][500],\n  \'&:hover\': {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_3__["default"][700]\n  }\n}));\n\n//# sourceURL=webpack://frontend/./src/pages/SprayCard/styles.js?')},"./src/store/SprayCardStore.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/dist/mobx.esm.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst end_site_types = ["Row", "Hole Code#", "Section", "Block"];\nclass SprayCardStore {\n  async getSprayData(uid, employerID) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    const responses = await Promise.all([fetch("/api/crop/list/get/" + "?uid=" + employerID, requestOptions), fetch("/api/site/list/get/" + "?uid=" + employerID, requestOptions), fetch("/api/chemical/list/get/" + "?uid=" + employerID, requestOptions), fetch("/api/equipment/list/get/" + "?uid=" + employerID, requestOptions), fetch("/api/operation/purchase/list/get/" + "?uid=" + employerID, requestOptions), fetch("/api/operation/application/list/get/?" + "uid=" + employerID, requestOptions), fetch("/api/crop/category/", requestOptions), fetch("/api/operation/application/target/", requestOptions), fetch("/api/operation/application/desicisionsupport/", requestOptions), fetch("/api/unit/", requestOptions), fetch("/api/crop/growthstage/", requestOptions), fetch("/workflow/spraycard/assignees/get/?" + "uid=" + uid + "&employer_id=" + employerID, requestOptions)]);\n    const jsonDataPromises = responses.map(response => {\n      if (response.ok) {\n        return response.json();\n      } else {\n        throw new Error(\'Network response was not ok.\');\n      }\n    });\n    const jsonData = await Promise.all(jsonDataPromises);\n    const flatten = data => {\n      let result = [];\n      for (let i = 0; i < data.length; i++) {\n        let obj = {};\n        obj = {\n          ...data[i]\n        };\n        delete obj.children;\n        result.push(obj);\n        if (data[i].children) {\n          result = result.concat(flatten(data[i].children));\n        }\n      }\n      return result;\n    };\n    return {\n      "record_data": {\n        cropList: jsonData[0].data,\n        siteList: jsonData[1].data,\n        chemicalList: jsonData[2].data,\n        equipmentList: jsonData[3].data,\n        purchaseList: jsonData[4].data,\n        sprayApplicationList: jsonData[5].data,\n        cropCategory: jsonData[6].data,\n        applicationTarget: jsonData[7].data,\n        decisionSupport: jsonData[8].data,\n        unit: jsonData[9].data,\n        growthStage: jsonData[10].data,\n        assigneeList: jsonData[11].data\n      },\n      "option_data": {\n        chemicalOptions: jsonData[4].data.map(item => {\n          const chemical = jsonData[2].data.find(chem => chem.chemid === item.chemical);\n          return {\n            label: `${chemical.epa_reg_no} | ${chemical.trade_name} | \\$${item.cost_per_unit} per ${chemical.unit} | ${item.pur_datetime}`,\n            unit: chemical.unit,\n            cost: item.cost_per_unit,\n            cost_per_unit: `\\$${item.cost_per_unit} per ${chemical.unit}`,\n            id: item.prid\n          };\n        }),\n        decisionSupportOptions: jsonData[8].data.map(item => ({\n          label: item.name,\n          id: item.dsid\n        })),\n        cropOptions: jsonData[0].data.map(item => ({\n          label: `${item.crop} (${item.variety})`,\n          id: item.cid\n        })),\n        growthStageOptions: jsonData[10].data.map(item => ({\n          label: `${item.name}`,\n          crop_id: item.crop_id,\n          id: item.cgsid\n        })),\n        targetOptions: jsonData[7].data.map(item => ({\n          label: item.name,\n          id: item.attid\n        })),\n        siteOptions: flatten(jsonData[1].data).filter(item => end_site_types.includes(item.type)).map(item => {\n          let site = item;\n          let optionStr = site.name;\n          const sid = site.sid;\n          const cid = site.crop.cid;\n          const ccid = site.crop.ccid;\n          const crop = `${site.crop.crop} (${site.crop.variety})`;\n          const area = site.size;\n          const unit = site.size_unit;\n          while (site.parent) {\n            site = flatten(jsonData[1].data).find(item => item.sid === site.parent);\n            optionStr = `${site.name} - ${optionStr}`;\n          }\n          return {\n            id: sid,\n            label: optionStr,\n            cid: cid,\n            ccid: ccid,\n            crop: crop,\n            area: area,\n            unit: unit\n          };\n        }),\n        equipmentOptions: jsonData[3].data.map(item => ({\n          label: `${item.name}`,\n          id: item.eid\n        })),\n        chemicalUnitOptions: jsonData[9].data.filter(item => item.usage === "chemical").map(item => ({\n          label: item.name,\n          id: item.unitid\n        })),\n        siteUnitOptions: jsonData[9].data.filter(item => item.usage === "site").map(item => ({\n          label: item.name,\n          id: item.unitid\n        })),\n        assigneeOptions: jsonData[11].data.map(item => ({\n          label: `${item.user} (${item.first_name} ${item.last_name})`,\n          type: item.type,\n          id: item.uid\n        }))\n      }\n    };\n  }\n  constructor() {\n    (0,mobx__WEBPACK_IMPORTED_MODULE_1__.makeAutoObservable)(this);\n  }\n}\nconst sprayCardStore = new SprayCardStore();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sprayCardStore);\n\n//# sourceURL=webpack://frontend/./src/store/SprayCardStore.js?')},"./src/store/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useStore: () => (/* binding */ useStore)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _SprayCardStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SprayCardStore */ "./src/store/SprayCardStore.js");\n\n\nclass RootStore {\n  constructor() {\n    this.sprayCardStore = _SprayCardStore__WEBPACK_IMPORTED_MODULE_1__["default"];\n  }\n}\nconst rootStore = new RootStore();\nconst context = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext(rootStore);\nconst useStore = () => react__WEBPACK_IMPORTED_MODULE_0___default().useContext(context);\n\n\n//# sourceURL=webpack://frontend/./src/store/index.js?')}}]);