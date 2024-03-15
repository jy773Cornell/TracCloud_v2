/*! For license information please see src_pages_SprayCard_SprayCardContent_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_SprayCard_SprayCardContent_index_js"],{"./src/pages/SprayCard/SprayCardContent/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ sprayCardContent)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/InputAdornment/InputAdornment.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Autocomplete/Autocomplete.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils */ "./src/utils/index.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nconst OperationSnackbars = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Alert_Alert_js-node_modules_mui_material_Snackbar_Snackbar_-be4378"), __webpack_require__.e("node_modules_mui_base_ClickAwayListener_ClickAwayListener_js-src_components_Snackbars_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../../components/Snackbars */ "./src/components/Snackbars/index.js")));\nconst ConfirmPopover = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_pages_SprayCard_ConfirmPopover_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../ConfirmPopover */ "./src/pages/SprayCard/ConfirmPopover/index.js")));\nconst SprayCardEdit = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Alert_Alert_js-node_modules_mui_material_Snackbar_Snackbar_-be4378"), __webpack_require__.e("vendors-node_modules_mui_material_Checkbox_Checkbox_js-node_modules_mui_material_FormControlL-91ee78"), __webpack_require__.e("vendors-node_modules_mui_base_ClickAwayListener_ClickAwayListener_js-node_modules_mui_icons-m-7fb143"), __webpack_require__.e("src_pages_SprayCard_SprayCardCreate_SprayCardForm_js"), __webpack_require__.e("src_pages_SprayCard_SprayCardEdit_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../SprayCardEdit */ "./src/pages/SprayCard/SprayCardEdit/index.js")));\nconst SprayCardComplete = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Alert_Alert_js-node_modules_mui_material_Snackbar_Snackbar_-be4378"), __webpack_require__.e("vendors-node_modules_mui_material_MenuItem_MenuItem_js-node_modules_mui_material_internal_svg-338434"), __webpack_require__.e("vendors-node_modules_mui_material_ListItem_ListItem_js"), __webpack_require__.e("vendors-node_modules_mui_material_Dialog_Dialog_js-node_modules_mui_material_DialogActions_Di-397a41"), __webpack_require__.e("vendors-node_modules_mui_material_useMediaQuery_useMediaQuery_js-node_modules_mui_x-date-pick-fa1d50"), __webpack_require__.e("vendors-node_modules_mui_x-date-pickers_DateTimePicker_DateTimePicker_js"), __webpack_require__.e("vendors-node_modules_mui_base_ClickAwayListener_ClickAwayListener_js-node_modules_mui_materia-fa5e59"), __webpack_require__.e("src_pages_SprayCard_SprayCardComplete_index_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../SprayCardComplete */ "./src/pages/SprayCard/SprayCardComplete/index.js")));\nfunction sprayCardContent({\n  uid,\n  sprayData,\n  sprayCardSelected,\n  sprayOptions,\n  setAssignSprayCard,\n  refreshRecord,\n  setRefreshRecord,\n  privilege\n}) {\n  const [sprayCardContents, setSprayCardContents] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [responsiblePerson, setResponsiblePerson] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [gallonsWaterRate, setGallonsWaterRate] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [chemicalContents, setChemicalContents] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [totalAmount, setTotalAmount] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [totalCost, setTotalCost] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [decisionContents, setDecisionContents] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [cropContents, setCropContents] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [targetContents, setTargetContents] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [siteContents, setSiteContents] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);\n  const [returnSuccessSnackbar, setReturnSuccessSnackbar] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [withdrawSuccessSnackbar, setWithdrawSuccessSnackbar] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [returnPopover, setReturnPopover] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [withdrawPopover, setWithdrawPopover] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const [completeSprayCard, setCompleteSprayCard] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [editSprayCard, setEditSprayCard] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  async function SprayCardContentGet(scpid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/workflow/spraycard/content/get/" + "?scpid=" + scpid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          setSprayCardContents(data.data);\n        });\n      }\n    });\n  }\n  async function SprayCardReturn(spray_card_id, holder_id) {\n    const apiData = {\n      "spray_card_id": spray_card_id,\n      "holder_id": holder_id\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/workflow/spraycard/return/", requestOptions).then(response => {\n      if (response.ok) {\n        setReturnSuccessSnackbar(true);\n        setRefreshRecord(~refreshRecord);\n      }\n    });\n  }\n  async function SprayCardWithdraw(spray_card_id, owner_id) {\n    const apiData = {\n      "spray_card_id": spray_card_id,\n      "owner_id": owner_id\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/workflow/spraycard/withdraw/", requestOptions).then(response => {\n      if (response.ok) {\n        setWithdrawSuccessSnackbar(true);\n        setRefreshRecord(~refreshRecord);\n      }\n    });\n  }\n  async function SprayCardStart(spray_card_id, holder_id) {\n    const apiData = {\n      spray_card_id,\n      holder_id\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/workflow/spraycard/start/", requestOptions).then(response => {\n      if (response.ok) {\n        setRefreshRecord(~refreshRecord);\n      } else {\n        // Handle error\n      }\n    }).catch(error => {\n      // Handle error\n    });\n  }\n  async function SprayCardPause(spray_card_id, holder_id) {\n    const apiData = {\n      spray_card_id,\n      holder_id\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/workflow/spraycard/pause/", requestOptions).then(response => {\n      if (response.ok) {\n        setRefreshRecord(~refreshRecord);\n      } else {\n        // Handle error\n      }\n    }).catch(error => {\n      // Handle error\n    });\n  }\n  async function SprayCardResume(spray_card_id, holder_id) {\n    const apiData = {\n      spray_card_id,\n      holder_id\n    };\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/workflow/spraycard/resume/", requestOptions).then(response => {\n      if (response.ok) {\n        setRefreshRecord(~refreshRecord);\n      } else {\n        // Handle error\n      }\n    }).catch(error => {\n      // Handle error\n    });\n  }\n  const handleStartButtonClicked = () => {\n    SprayCardStart(sprayCardSelected.scpid, uid);\n  };\n  const handlePauseButtonClicked = () => {\n    SprayCardPause(sprayCardSelected.scpid, uid);\n  };\n  const handleResumeButtonClicked = () => {\n    SprayCardResume(sprayCardSelected.scpid, uid);\n  };\n  const handleCompleteButtonClicked = () => {\n    setCompleteSprayCard(true);\n  };\n  const handleAssignButtonClicked = () => {\n    setAssignSprayCard(true);\n  };\n  const handleEditButtonClicked = () => {\n    setEditSprayCard(true);\n  };\n  const performReturnAction = () => {\n    SprayCardReturn(sprayCardSelected.scpid, uid);\n  };\n  const performWithdrawAction = () => {\n    SprayCardWithdraw(sprayCardSelected.scpid, uid);\n  };\n  const handleOperationButtonClicked = (event, action) => {\n    if (action === \'return\') {\n      setReturnPopover(event.currentTarget);\n    } else if (action === \'withdraw\') {\n      setWithdrawPopover(event.currentTarget);\n    }\n  };\n  const handleClosePopover = action => {\n    if (action === \'return\') {\n      setReturnPopover(null);\n    } else if (action === \'withdraw\') {\n      setWithdrawPopover(null);\n    }\n  };\n  const updateSprayCardContent = () => {\n    var _sprayCardContents$, _sprayCardContents$2;\n    const uniqueChemicalPurchases = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.chemical_purchase), item.chemical_purchase])).values()];\n    let applicationRate = [];\n    for (let i = 0; i < uniqueChemicalPurchases.length; i++) {\n      applicationRate.push(sprayCardContents.find(item => JSON.stringify(item.chemical_purchase) === JSON.stringify(uniqueChemicalPurchases[i])).application_rate);\n    }\n    let tempUniqueChemicalPurchases = JSON.parse(JSON.stringify(uniqueChemicalPurchases));\n    for (let i = 0; i < tempUniqueChemicalPurchases.length; i++) {\n      tempUniqueChemicalPurchases[i].label = tempUniqueChemicalPurchases[i].label + " | " + applicationRate[i] + " " + tempUniqueChemicalPurchases[i].unit;\n    }\n    setChemicalContents(tempUniqueChemicalPurchases);\n    let uniqueDecisions = [];\n    for (let i = 0; i < uniqueChemicalPurchases.length; i++) {\n      uniqueDecisions.push(sprayCardContents.find(item => JSON.stringify(item.chemical_purchase) === JSON.stringify(uniqueChemicalPurchases[i])).decision_support);\n    }\n    setDecisionContents(uniqueDecisions);\n    let tempTotalAmount = [];\n    for (let i = 0; i < uniqueChemicalPurchases.length; i++) {\n      let sum = sprayCardContents.filter(item => JSON.stringify(item.chemical_purchase) === JSON.stringify(uniqueChemicalPurchases[i])).reduce((acc, item) => acc + parseFloat(item.total_amount), 0);\n      tempTotalAmount.push(sum);\n    }\n    setTotalAmount(tempTotalAmount);\n    let tempTotalCost = [];\n    for (let i = 0; i < uniqueChemicalPurchases.length; i++) {\n      let sum = sprayCardContents.filter(item => JSON.stringify(item.chemical_purchase) === JSON.stringify(uniqueChemicalPurchases[i])).reduce((acc, item) => acc + parseFloat(item.total_cost), 0);\n      tempTotalCost.push(sum);\n    }\n    setTotalCost(tempTotalCost);\n    const uniqueCrops = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.crop), item.crop])).values()];\n    setCropContents(uniqueCrops);\n    let uniqueTargets = [];\n    for (let i = 0; i < uniqueCrops.length; i++) {\n      uniqueTargets.push(sprayCardContents.find(item => JSON.stringify(item.crop) === JSON.stringify(uniqueCrops[i])).target);\n    }\n    setTargetContents(uniqueTargets);\n    const uniqueSites = [...new Map(sprayCardContents.map(item => [JSON.stringify(item.site), item.site])).values()];\n    setSiteContents(uniqueSites);\n    setGallonsWaterRate(((_sprayCardContents$ = sprayCardContents[0]) === null || _sprayCardContents$ === void 0 ? void 0 : _sprayCardContents$.gallons_water_rate) || "");\n    setResponsiblePerson(((_sprayCardContents$2 = sprayCardContents[0]) === null || _sprayCardContents$2 === void 0 ? void 0 : _sprayCardContents$2.responsible_person) || "");\n  };\n  const responsibleContentRender = () => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      container: true,\n      justifyContent: "center",\n      spacing: 2\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      fullWidth: true,\n      variant: "outlined",\n      value: responsiblePerson,\n      label: "Responsible Person",\n      focused: true,\n      InputProps: {\n        readOnly: true\n      }\n    }))));\n  };\n  const chemicalContentRender = () => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      container: true,\n      justifyContent: "center",\n      spacing: 2\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      fullWidth: true,\n      variant: "outlined",\n      value: gallonsWaterRate,\n      label: "Gallons Water Rate",\n      color: "secondary",\n      focused: true,\n      InputProps: {\n        readOnly: true\n      }\n    })), Object.keys(chemicalContents).map(rowIdx => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n      key: rowIdx\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      fullWidth: true,\n      variant: "outlined",\n      value: chemicalContents[rowIdx].label,\n      label: "Chemical " + (Number(rowIdx) + 1) + "  EPA NO. | Trade Name | Cost Per unit | Purchase Date | Application Rate",\n      color: "secondary",\n      focused: true,\n      InputProps: {\n        readOnly: true\n      }\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      fullWidth: true,\n      variant: "outlined",\n      value: totalAmount[rowIdx],\n      label: "Total Amount " + (Number(rowIdx) + 1),\n      color: "secondary",\n      focused: true,\n      InputProps: {\n        readOnly: true,\n        endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {\n          position: "end"\n        }, chemicalContents[rowIdx].unit)\n      }\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      fullWidth: true,\n      variant: "outlined",\n      value: totalCost[rowIdx],\n      label: "Total Cost " + (Number(rowIdx) + 1),\n      color: "secondary",\n      focused: true,\n      InputProps: {\n        readOnly: true,\n        startAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {\n          position: "start"\n        }, "$")\n      }\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      fullWidth: true,\n      variant: "outlined",\n      value: decisionContents[rowIdx].label,\n      label: "Decision Support " + (Number(rowIdx) + 1),\n      color: "secondary",\n      focused: true,\n      InputProps: {\n        readOnly: true\n      }\n    }))))));\n  };\n  const siteContentRender = () => {\n    return siteContents.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n      multiple: true,\n      value: siteContents || [],\n      options: siteContents || [],\n      getOptionLabel: option => option.label,\n      readOnly: true,\n      renderInput: params => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, params, {\n        variant: "outlined",\n        label: "Sites",\n        color: "success",\n        focused: true\n      }))\n    })) : null;\n  };\n  const cropContentRender = () => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      container: true,\n      justifyContent: "center",\n      spacing: 2\n    }, Object.keys(cropContents).map(rowIdx => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n      key: rowIdx\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 6\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      fullWidth: true,\n      variant: "outlined",\n      value: cropContents[rowIdx].label,\n      label: "Crop " + (Number(rowIdx) + 1) + " (Variety)",\n      color: "warning",\n      focused: true,\n      InputProps: {\n        readOnly: true\n      }\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 6\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      fullWidth: true,\n      variant: "outlined",\n      value: targetContents[rowIdx].label,\n      label: "Application Target " + (Number(rowIdx) + 1),\n      color: "warning",\n      focused: true,\n      InputProps: {\n        readOnly: true\n      }\n    }))))));\n  };\n  const completeCondition = () => {\n    return (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.holder_id) === uid;\n  };\n  const returnCondition = () => {\n    return (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.holder_id) === uid && (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.holder_id) !== (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.owner_id);\n  };\n  const editCondition = () => {\n    return (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.owner_id) === uid && (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.holder_id) === (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.owner_id);\n  };\n  const withdrawCondition = () => {\n    return (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.owner_id) === uid && (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.state) !== \'archived\';\n  };\n  const operationRender = () => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 2.4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n      onClick: () => handleAssignButtonClicked(),\n      disabled: !privilege.spraycard_a\n    }, "Assign")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 2.4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n      "aria-describedby": \'return-popover\',\n      disabled: !returnCondition(),\n      onClick: event => handleOperationButtonClicked(event, \'return\')\n    }, "Return"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ConfirmPopover, {\n      id: \'return-popover\',\n      open: Boolean(returnPopover),\n      anchorEl: returnPopover,\n      onClose: () => handleClosePopover(\'return\'),\n      action: performReturnAction,\n      buttonText: "Return to the last assigner?"\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 2.4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n      onClick: () => handleStartButtonClicked()\n    }, "Start")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 2.4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n      onClick: () => handlePauseButtonClicked()\n    }, "Pause")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 2.4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n      onClick: () => handleResumeButtonClicked()\n    }, "Resume")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 2.4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n      disabled: !completeCondition(),\n      onClick: () => handleCompleteButtonClicked()\n    }, "Complete")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 2.4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n      disabled: !editCondition(),\n      onClick: () => handleEditButtonClicked()\n    }, "Edit")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      xs: 2.4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n      "aria-describedby": \'withdraw-popover\',\n      disabled: !withdrawCondition(),\n      onClick: event => handleOperationButtonClicked(event, \'withdraw\')\n    }, "Withdraw"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ConfirmPopover, {\n      id: \'withdraw-popover\',\n      open: Boolean(withdrawPopover),\n      anchorEl: withdrawPopover,\n      onClose: () => handleClosePopover(\'withdraw\'),\n      action: performWithdrawAction,\n      buttonText: "Withdraw the spray card?"\n    })));\n  };\n  const returnSuccessProps = {\n    open: returnSuccessSnackbar,\n    setOpen: setReturnSuccessSnackbar,\n    msg: "Spray Card Process Returned Successfully.",\n    tag: "success"\n  };\n  const withdrawSuccessProps = {\n    open: withdrawSuccessSnackbar,\n    setOpen: setWithdrawSuccessSnackbar,\n    msg: "Spray Card Process Withdrew Successfully.",\n    tag: "success"\n  };\n  const SprayCardEditProps = {\n    uid,\n    sprayData,\n    sprayOptions,\n    sprayCardContents,\n    refreshRecord,\n    editSprayCard,\n    setEditSprayCard,\n    setRefreshRecord,\n    setAssignSprayCard,\n    sprayCardSelected,\n    privilege\n  };\n  const SprayCardCompleteProps = {\n    uid,\n    sprayData,\n    sprayOptions,\n    sprayCardContents,\n    refreshRecord,\n    completeSprayCard,\n    setCompleteSprayCard,\n    setRefreshRecord,\n    sprayCardSelected\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    (sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.scpid) && SprayCardContentGet(sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.scpid);\n  }, [sprayCardSelected]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    updateSprayCardContent();\n  }, [sprayCardContents]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    container: true,\n    justifyContent: "center",\n    spacing: 3\n  }, ["completed", "withdrew"].includes(sprayCardSelected === null || sprayCardSelected === void 0 ? void 0 : sprayCardSelected.state) ? null : operationRender(), responsibleContentRender(), chemicalContentRender(), cropContentRender(), siteContentRender()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SprayCardEdit, SprayCardEditProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SprayCardComplete, SprayCardCompleteProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OperationSnackbars, returnSuccessProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OperationSnackbars, withdrawSuccessProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/SprayCard/SprayCardContent/index.js?')}}]);