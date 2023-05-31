/*! For license information please see src_pages_UserProfile_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_UserProfile_index_js"],{"./node_modules/@mui/system/esm/Container/Container.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _createContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createContainer */ \"./node_modules/@mui/system/esm/Container/createContainer.js\");\n\n\n\n/**\n *\n * Demos:\n *\n * - [Container (Material UI)](https://mui.com/material-ui/react-container/)\n * - [Container (MUI System)](https://mui.com/system/react-container/)\n *\n * API:\n *\n * - [Container API](https://mui.com/system/api/container/)\n */\nconst Container = (0,_createContainer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n true ? Container.propTypes /* remove-proptypes */ = {\n  // ----------------------------- Warning --------------------------------\n  // | These PropTypes are generated from the TypeScript type definitions |\n  // |     To update them edit TypeScript types and run \"yarn proptypes\"  |\n  // ----------------------------------------------------------------------\n  /**\n   * @ignore\n   */\n  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node),\n  /**\n   * Override or extend the styles applied to the component.\n   */\n  classes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),\n  /**\n   * The component used for the root node.\n   * Either a string to use a HTML element or a component.\n   */\n  component: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().elementType),\n  /**\n   * If `true`, the left and right padding is removed.\n   * @default false\n   */\n  disableGutters: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),\n  /**\n   * Set the max-width to match the min-width of the current breakpoint.\n   * This is useful if you'd prefer to design for a fixed set of sizes\n   * instead of trying to accommodate a fully fluid viewport.\n   * It's fluid by default.\n   * @default false\n   */\n  fixed: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),\n  /**\n   * Determine the max-width of the container.\n   * The container width grows with the size of the screen.\n   * Set to `false` to disable `maxWidth`.\n   * @default 'lg'\n   */\n  maxWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)]),\n  /**\n   * The system prop that allows defining system overrides as well as additional CSS styles.\n   */\n  sx: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)])\n} : 0;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Container);\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/system/esm/Container/Container.js?")},"./node_modules/@mui/system/esm/Container/createContainer.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ createContainer)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");\n/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");\n/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/capitalize.js");\n/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");\n/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/utils */ "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js");\n/* harmony import */ var _useThemeProps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../useThemeProps */ "./node_modules/@mui/system/esm/useThemeProps/useThemeProps.js");\n/* harmony import */ var _styled__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styled */ "./node_modules/@mui/system/esm/styled.js");\n/* harmony import */ var _createTheme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../createTheme */ "./node_modules/@mui/system/esm/createTheme/createTheme.js");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");\n\n\nconst _excluded = ["className", "component", "disableGutters", "fixed", "maxWidth", "classes"];\n\n\n\n\n\n\n\n\nconst defaultTheme = (0,_createTheme__WEBPACK_IMPORTED_MODULE_5__["default"])();\nconst defaultCreateStyledComponent = (0,_styled__WEBPACK_IMPORTED_MODULE_6__["default"])(\'div\', {\n  name: \'MuiContainer\',\n  slot: \'Root\',\n  overridesResolver: (props, styles) => {\n    const {\n      ownerState\n    } = props;\n    return [styles.root, styles[`maxWidth${(0,_mui_utils__WEBPACK_IMPORTED_MODULE_7__["default"])(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];\n  }\n});\nconst useThemePropsDefault = inProps => (0,_useThemeProps__WEBPACK_IMPORTED_MODULE_8__["default"])({\n  props: inProps,\n  name: \'MuiContainer\',\n  defaultTheme\n});\nconst useUtilityClasses = (ownerState, componentName) => {\n  const getContainerUtilityClass = slot => {\n    return (0,_mui_utils__WEBPACK_IMPORTED_MODULE_9__["default"])(componentName, slot);\n  };\n  const {\n    classes,\n    fixed,\n    disableGutters,\n    maxWidth\n  } = ownerState;\n  const slots = {\n    root: [\'root\', maxWidth && `maxWidth${(0,_mui_utils__WEBPACK_IMPORTED_MODULE_7__["default"])(String(maxWidth))}`, fixed && \'fixed\', disableGutters && \'disableGutters\']\n  };\n  return (0,_mui_utils__WEBPACK_IMPORTED_MODULE_10__["default"])(slots, getContainerUtilityClass, classes);\n};\nfunction createContainer(options = {}) {\n  const {\n    // This will allow adding custom styled fn (for example for custom sx style function)\n    createStyledComponent = defaultCreateStyledComponent,\n    useThemeProps = useThemePropsDefault,\n    componentName = \'MuiContainer\'\n  } = options;\n  const ContainerRoot = createStyledComponent(({\n    theme,\n    ownerState\n  }) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({\n    width: \'100%\',\n    marginLeft: \'auto\',\n    boxSizing: \'border-box\',\n    marginRight: \'auto\',\n    display: \'block\'\n  }, !ownerState.disableGutters && {\n    paddingLeft: theme.spacing(2),\n    paddingRight: theme.spacing(2),\n    // @ts-ignore module augmentation fails if custom breakpoints are used\n    [theme.breakpoints.up(\'sm\')]: {\n      paddingLeft: theme.spacing(3),\n      paddingRight: theme.spacing(3)\n    }\n  }), ({\n    theme,\n    ownerState\n  }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {\n    const breakpoint = breakpointValueKey;\n    const value = theme.breakpoints.values[breakpoint];\n    if (value !== 0) {\n      // @ts-ignore\n      acc[theme.breakpoints.up(breakpoint)] = {\n        maxWidth: `${value}${theme.breakpoints.unit}`\n      };\n    }\n    return acc;\n  }, {}), ({\n    theme,\n    ownerState\n  }) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, ownerState.maxWidth === \'xs\' && {\n    // @ts-ignore module augmentation fails if custom breakpoints are used\n    [theme.breakpoints.up(\'xs\')]: {\n      // @ts-ignore module augmentation fails if custom breakpoints are used\n      maxWidth: Math.max(theme.breakpoints.values.xs, 444)\n    }\n  }, ownerState.maxWidth &&\n  // @ts-ignore module augmentation fails if custom breakpoints are used\n  ownerState.maxWidth !== \'xs\' && {\n    // @ts-ignore module augmentation fails if custom breakpoints are used\n    [theme.breakpoints.up(ownerState.maxWidth)]: {\n      // @ts-ignore module augmentation fails if custom breakpoints are used\n      maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`\n    }\n  }));\n  const Container = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Container(inProps, ref) {\n    const props = useThemeProps(inProps);\n    const {\n        className,\n        component = \'div\',\n        disableGutters = false,\n        fixed = false,\n        maxWidth = \'lg\'\n      } = props,\n      other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);\n    const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {\n      component,\n      disableGutters,\n      fixed,\n      maxWidth\n    });\n\n    // @ts-ignore module augmentation fails if custom breakpoints are used\n    const classes = useUtilityClasses(ownerState, componentName);\n    return (\n      /*#__PURE__*/\n      // @ts-ignore theme is injected by the styled util\n      (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ContainerRoot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({\n        as: component\n        // @ts-ignore module augmentation fails if custom breakpoints are used\n        ,\n        ownerState: ownerState,\n        className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className),\n        ref: ref\n      }, other))\n    );\n  });\n   true ? Container.propTypes /* remove-proptypes */ = {\n    children: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().node),\n    classes: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object),\n    className: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string),\n    component: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().elementType),\n    disableGutters: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),\n    fixed: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),\n    maxWidth: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOf([\'xs\', \'sm\', \'md\', \'lg\', \'xl\', false]), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string)]),\n    sx: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_11___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object)])\n  } : 0;\n  return Container;\n}\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/system/esm/Container/createContainer.js?')},"./src/components/Snackbars/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ OperationSnackbars)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Stack */ "./node_modules/@mui/material/Stack/Stack.js");\n/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Snackbar */ "./node_modules/@mui/material/Snackbar/Snackbar.js");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Alert */ "./node_modules/@mui/material/Alert/Alert.js");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nconst Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Alert(props, ref) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({\n    elevation: 6,\n    ref: ref,\n    variant: "filled"\n  }, props));\n});\nfunction OperationSnackbars(props) {\n  const handleClose = (event, reason) => {\n    if (reason === \'clickaway\') {\n      return;\n    }\n    props.setOpen(false);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    spacing: 2,\n    sx: {\n      width: \'100%\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    open: props.open,\n    autoHideDuration: 6000,\n    onClose: handleClose\n  }, (() => {\n    switch (props.tag) {\n      case \'success\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "success",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'error\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "error",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      case \'warning\':\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Alert, {\n          onClose: handleClose,\n          severity: "warning",\n          sx: {\n            width: \'100%\'\n          }\n        }, props.msg);\n      default:\n        return null;\n    }\n  })()));\n}\n\n//# sourceURL=webpack://frontend/./src/components/Snackbars/index.js?')},"./src/pages/UserProfile/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ UserProfile)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardContent/CardContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/pages/UserProfile/styles.js");\n/* harmony import */ var _components_Snackbars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Snackbars */ "./src/components/Snackbars/index.js");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");\n/* harmony import */ var _mui_x_date_pickers_AdapterDayjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/x-date-pickers/AdapterDayjs */ "./node_modules/@mui/x-date-pickers/AdapterDayjs/index.js");\n/* harmony import */ var _mui_x_date_pickers_DatePicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/x-date-pickers/DatePicker */ "./node_modules/@mui/x-date-pickers/DatePicker/DatePicker.js");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/x-date-pickers/LocalizationProvider */ "./node_modules/@mui/x-date-pickers/LocalizationProvider/LocalizationProvider.js");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/Container/Container.js");\n\n\n\n\n\n\n\n\n\n\n\nconst Loading = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_components_Loading_index_js-_d1da1").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/Loading */ "./src/components/Loading/index.js")));\nconst field_names = ["type", "name", "business_name", "registration_license_no", "license_expire_date", "address", "city", "county", "state", "zipcode", "country", "phone", "cell", "email"];\nfunction ProfileForm({\n  profile,\n  fieldValues,\n  isEdit,\n  setIsEdit,\n  inputError,\n  onEditClicked,\n  handleInputChange,\n  handleSaveButtonPressed\n}) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    sx: {\n      width: 600\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    container: true,\n    justifyContent: "center",\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 12,\n    sx: {\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, profile.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Type",\n    variant: "outlined",\n    value: profile[field_names[0]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Name",\n    variant: "outlined",\n    required: true,\n    value: fieldValues[field_names[1]],\n    error: inputError[field_names[1]],\n    onChange: event => {\n      handleInputChange(event, event.target.value, field_names[1]);\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Name",\n    variant: "outlined",\n    value: profile[field_names[1]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 12\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Business Name",\n    variant: "outlined",\n    value: fieldValues[field_names[2]],\n    onChange: event => {\n      handleInputChange(event, event.target.value, field_names[2]);\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Business Name",\n    variant: "outlined",\n    value: profile[field_names[2]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Registration NO.",\n    variant: "outlined",\n    value: fieldValues[field_names[3]],\n    onChange: event => {\n      handleInputChange(event, event.target.value, field_names[3]);\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Registration NO.",\n    variant: "outlined",\n    value: profile[field_names[3]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_9__.LocalizationProvider, {\n    dateAdapter: _mui_x_date_pickers_AdapterDayjs__WEBPACK_IMPORTED_MODULE_10__.AdapterDayjs\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_date_pickers_DatePicker__WEBPACK_IMPORTED_MODULE_11__.DatePicker, {\n    variant: "outlined",\n    label: "Registration Expiration Date",\n    value: dayjs__WEBPACK_IMPORTED_MODULE_4___default()(fieldValues[field_names[4]]),\n    onChange: event => {\n      handleInputChange(event, dayjs__WEBPACK_IMPORTED_MODULE_4___default()(event).format(\'YYYY-MM-DD\'), field_names[4]);\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Registration Expiration Date",\n    variant: "outlined",\n    value: profile[field_names[4]],\n    InputProps: {\n      readOnly: true\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Address",\n    variant: "outlined",\n    value: fieldValues[field_names[5]],\n    onChange: event => {\n      handleInputChange(event, event.target.value, field_names[5]);\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Address",\n    variant: "outlined",\n    value: profile[field_names[5]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "City",\n    variant: "outlined",\n    value: fieldValues[field_names[6]],\n    autoComplete: "address-level2",\n    onChange: event => {\n      handleInputChange(event, event.target.value, field_names[6]);\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "City",\n    variant: "outlined",\n    value: profile[field_names[6]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "County",\n    variant: "outlined",\n    value: fieldValues[field_names[7]],\n    autoComplete: "address-level2",\n    onChange: event => {\n      handleInputChange(event, event.target.value, field_names[7]);\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "County",\n    variant: "outlined",\n    value: profile[field_names[7]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "State",\n    variant: "outlined",\n    value: fieldValues[field_names[8]],\n    autoComplete: "address-level1",\n    onChange: event => {\n      handleInputChange(event, event.target.value, field_names[8]);\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "State",\n    variant: "outlined",\n    value: profile[field_names[8]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Zip Code",\n    variant: "outlined",\n    value: fieldValues[field_names[9]],\n    autoComplete: "postal-code",\n    onChange: event => {\n      handleInputChange(event, event.target.value, field_names[9]);\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Zip Code",\n    variant: "outlined",\n    value: profile[field_names[9]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6\n  }, isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Country",\n    variant: "outlined",\n    required: true,\n    value: fieldValues[field_names[10]],\n    autoComplete: "country",\n    onChange: event => {\n      handleInputChange(event, event.target.value, field_names[10]);\n    },\n    InputLabelProps: {\n      shrink: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Country",\n    variant: "outlined",\n    value: profile[field_names[10]],\n    InputProps: {\n      readOnly: true\n    },\n    sx: {\n      width: \'100%\'\n    }\n  })), isEdit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    variant: "contained",\n    color: "success",\n    onClick: () => handleSaveButtonPressed()\n  }, "Save")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 6,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    variant: "contained",\n    color: "secondary",\n    onClick: () => setIsEdit(false)\n  }, "Cancel"))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    item: true,\n    xs: 12,\n    sx: {\n      justifyContent: \'center\',\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.EditButton, {\n    variant: "contained",\n    color: "secondary",\n    onClick: () => onEditClicked()\n  }, "Edit")))));\n}\nfunction UserProfile(props) {\n  const uid = props.uid;\n  const [profile, setProfile] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [formData, setFormData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});\n  const [fieldValues, setFieldValues] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});\n  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n  const [isEdit, setIsEdit] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [isSave, setIsSave] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [inputError, setInputError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [refreshRecord, setRefreshRecord] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  async function ProfileGet(uid) {\n    const requestOptions = {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json"\n      }\n    };\n    await fetch("/api/user/get/" + "?uid=" + uid, requestOptions).then(response => {\n      if (response.ok) {\n        response.json().then(data => {\n          const profileData = Object.fromEntries(Object.entries(data.data).map(([key, value]) => [key, value === null ? "" : value]));\n          setProfile(profileData);\n          setFieldValues(profileData);\n          setLoading(false);\n        });\n      }\n    });\n  }\n  async function ProfileUpdate() {\n    const apiData = formData;\n    console.log(apiData);\n    const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getCookie)(\'csrftoken\');\n    const requestOptions = {\n      method: "PUT",\n      headers: {\n        "Content-Type": "application/json",\n        \'X-CSRFToken\': csrftoken\n      },\n      body: JSON.stringify(apiData)\n    };\n    await fetch("/api/user/profile/update/", requestOptions).then(response => {\n      if (response.ok) {\n        setIsSave(true);\n        setRefreshRecord(~refreshRecord);\n      }\n    });\n  }\n  const clearInputError = () => {\n    setInputError(Object.fromEntries(field_names.map(item => [item, false])));\n  };\n  const updateInputError = () => {\n    Object.keys(fieldValues).forEach(key => {\n      if (fieldValues[key] === "") {\n        setInputError(prevInputError => ({\n          ...prevInputError,\n          [key]: true\n        }));\n      } else {\n        setInputError(prevInputError => ({\n          ...prevInputError,\n          [key]: false\n        }));\n      }\n    });\n  };\n  const handleInputChange = (event, value, field) => {\n    setFieldValues({\n      ...fieldValues,\n      [field]: value\n    });\n    setFormData({\n      ...formData,\n      [field]: value\n    });\n  };\n  const onEditClicked = () => {\n    setFormData({\n      "uid": uid\n    });\n    setFieldValues(Object.fromEntries(field_names.map(item => [item, profile.item])));\n    setIsEdit(true);\n    clearInputError();\n  };\n  const handleSaveButtonPressed = () => {\n    if ([fieldValues[field_names[1]]].every(value => value !== "")) {\n      ProfileUpdate();\n    } else {\n      updateInputError();\n    }\n  };\n  const formProps = {\n    profile,\n    fieldValues,\n    isEdit,\n    setIsEdit,\n    inputError,\n    onEditClicked,\n    handleInputChange,\n    handleSaveButtonPressed\n  };\n  const saveProps = {\n    open: isSave,\n    setOpen: setIsSave,\n    msg: "Profile is uploaded successfully!",\n    tag: "success"\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchData = async () => {\n      await Promise.all([ProfileGet(uid)]);\n    };\n    fetchData();\n    clearInputError();\n    setMounted(true);\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (mounted) {\n      ProfileGet(uid);\n    }\n  }, [refreshRecord]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_system__WEBPACK_IMPORTED_MODULE_13__["default"], {\n    sx: {\n      display: \'flex\',\n      flexDirection: \'column\',\n      justifyContent: \'center\',\n      alignItems: \'center\',\n      height: \'100vh\',\n      p: 2\n    }\n  }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Loading, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ProfileForm, formProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Snackbars__WEBPACK_IMPORTED_MODULE_2__["default"], saveProps));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/UserProfile/index.js?')},"./src/pages/UserProfile/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "EditButton": () => (/* binding */ EditButton)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/styled.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/orange.js");\n\n\n\nconst EditButton = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"])(() => ({\n  margin: "15px 15px",\n  backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][500],\n  \'&:hover\': {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][700]\n  }\n}));\n\n//# sourceURL=webpack://frontend/./src/pages/UserProfile/styles.js?')}}]);