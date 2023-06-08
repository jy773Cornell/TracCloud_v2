/*! For license information please see src_pages_HomePage_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_HomePage_index_js"],{"./node_modules/@mui/material/Link/Link.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ \"./node_modules/@babel/runtime/helpers/esm/extends.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ \"./node_modules/clsx/dist/clsx.m.js\");\n/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/utils */ \"./node_modules/@mui/utils/esm/elementTypeAcceptingRef.js\");\n/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/base */ \"./node_modules/@mui/utils/esm/composeClasses/composeClasses.js\");\n/* harmony import */ var _utils_capitalize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/capitalize */ \"./node_modules/@mui/material/utils/capitalize.js\");\n/* harmony import */ var _styles_styled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/styled */ \"./node_modules/@mui/material/styles/styled.js\");\n/* harmony import */ var _styles_useThemeProps__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/useThemeProps */ \"./node_modules/@mui/material/styles/useThemeProps.js\");\n/* harmony import */ var _utils_useIsFocusVisible__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/useIsFocusVisible */ \"./node_modules/@mui/material/utils/useIsFocusVisible.js\");\n/* harmony import */ var _utils_useForkRef__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/useForkRef */ \"./node_modules/@mui/material/utils/useForkRef.js\");\n/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _linkClasses__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./linkClasses */ \"./node_modules/@mui/material/Link/linkClasses.js\");\n/* harmony import */ var _getTextDecoration__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getTextDecoration */ \"./node_modules/@mui/material/Link/getTextDecoration.js\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\n\nconst _excluded = [\"className\", \"color\", \"component\", \"onBlur\", \"onFocus\", \"TypographyClasses\", \"underline\", \"variant\", \"sx\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst useUtilityClasses = ownerState => {\n  const {\n    classes,\n    component,\n    focusVisible,\n    underline\n  } = ownerState;\n  const slots = {\n    root: ['root', `underline${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(underline)}`, component === 'button' && 'button', focusVisible && 'focusVisible']\n  };\n  return (0,_mui_base__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(slots, _linkClasses__WEBPACK_IMPORTED_MODULE_7__.getLinkUtilityClass, classes);\n};\nconst LinkRoot = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(_Typography__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n  name: 'MuiLink',\n  slot: 'Root',\n  overridesResolver: (props, styles) => {\n    const {\n      ownerState\n    } = props;\n    return [styles.root, styles[`underline${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(ownerState.underline)}`], ownerState.component === 'button' && styles.button];\n  }\n})(({\n  theme,\n  ownerState\n}) => {\n  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({}, ownerState.underline === 'none' && {\n    textDecoration: 'none'\n  }, ownerState.underline === 'hover' && {\n    textDecoration: 'none',\n    '&:hover': {\n      textDecoration: 'underline'\n    }\n  }, ownerState.underline === 'always' && (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    textDecoration: 'underline'\n  }, ownerState.color !== 'inherit' && {\n    textDecorationColor: (0,_getTextDecoration__WEBPACK_IMPORTED_MODULE_10__[\"default\"])({\n      theme,\n      ownerState\n    })\n  }, {\n    '&:hover': {\n      textDecorationColor: 'inherit'\n    }\n  }), ownerState.component === 'button' && {\n    position: 'relative',\n    WebkitTapHighlightColor: 'transparent',\n    backgroundColor: 'transparent',\n    // Reset default value\n    // We disable the focus ring for mouse, touch and keyboard users.\n    outline: 0,\n    border: 0,\n    margin: 0,\n    // Remove the margin in Safari\n    borderRadius: 0,\n    padding: 0,\n    // Remove the padding in Firefox\n    cursor: 'pointer',\n    userSelect: 'none',\n    verticalAlign: 'middle',\n    MozAppearance: 'none',\n    // Reset\n    WebkitAppearance: 'none',\n    // Reset\n    '&::-moz-focus-inner': {\n      borderStyle: 'none' // Remove Firefox dotted outline.\n    },\n\n    [`&.${_linkClasses__WEBPACK_IMPORTED_MODULE_7__[\"default\"].focusVisible}`]: {\n      outline: 'auto'\n    }\n  });\n});\nconst Link = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Link(inProps, ref) {\n  const props = (0,_styles_useThemeProps__WEBPACK_IMPORTED_MODULE_11__[\"default\"])({\n    props: inProps,\n    name: 'MuiLink'\n  });\n  const {\n      className,\n      color = 'primary',\n      component = 'a',\n      onBlur,\n      onFocus,\n      TypographyClasses,\n      underline = 'always',\n      variant = 'inherit',\n      sx\n    } = props,\n    other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(props, _excluded);\n  const {\n    isFocusVisibleRef,\n    onBlur: handleBlurVisible,\n    onFocus: handleFocusVisible,\n    ref: focusVisibleRef\n  } = (0,_utils_useIsFocusVisible__WEBPACK_IMPORTED_MODULE_12__[\"default\"])();\n  const [focusVisible, setFocusVisible] = react__WEBPACK_IMPORTED_MODULE_2__.useState(false);\n  const handlerRef = (0,_utils_useForkRef__WEBPACK_IMPORTED_MODULE_13__[\"default\"])(ref, focusVisibleRef);\n  const handleBlur = event => {\n    handleBlurVisible(event);\n    if (isFocusVisibleRef.current === false) {\n      setFocusVisible(false);\n    }\n    if (onBlur) {\n      onBlur(event);\n    }\n  };\n  const handleFocus = event => {\n    handleFocusVisible(event);\n    if (isFocusVisibleRef.current === true) {\n      setFocusVisible(true);\n    }\n    if (onFocus) {\n      onFocus(event);\n    }\n  };\n  const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({}, props, {\n    color,\n    component,\n    focusVisible,\n    underline,\n    variant\n  });\n  const classes = useUtilityClasses(ownerState);\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(LinkRoot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    color: color,\n    className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(classes.root, className),\n    classes: TypographyClasses,\n    component: component,\n    onBlur: handleBlur,\n    onFocus: handleFocus,\n    ref: handlerRef,\n    ownerState: ownerState,\n    variant: variant,\n    sx: [...(!Object.keys(_getTextDecoration__WEBPACK_IMPORTED_MODULE_10__.colorTransformations).includes(color) ? [{\n      color\n    }] : []), ...(Array.isArray(sx) ? sx : [sx])]\n  }, other));\n});\n true ? Link.propTypes /* remove-proptypes */ = {\n  // ----------------------------- Warning --------------------------------\n  // | These PropTypes are generated from the TypeScript type definitions |\n  // |     To update them edit the d.ts file and run \"yarn proptypes\"     |\n  // ----------------------------------------------------------------------\n  /**\n   * The content of the component.\n   */\n  children: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().node),\n  /**\n   * Override or extend the styles applied to the component.\n   */\n  classes: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),\n  /**\n   * @ignore\n   */\n  className: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string),\n  /**\n   * The color of the link.\n   * @default 'primary'\n   */\n  color: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().any),\n  /**\n   * The component used for the root node.\n   * Either a string to use a HTML element or a component.\n   */\n  component: _mui_utils__WEBPACK_IMPORTED_MODULE_15__[\"default\"],\n  /**\n   * @ignore\n   */\n  onBlur: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),\n  /**\n   * @ignore\n   */\n  onFocus: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),\n  /**\n   * The system prop that allows defining system overrides as well as additional CSS styles.\n   */\n  sx: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_14___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_14___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object)]),\n  /**\n   * `classes` prop applied to the [`Typography`](/material-ui/api/typography/) element.\n   */\n  TypographyClasses: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),\n  /**\n   * Controls when the link should have an underline.\n   * @default 'always'\n   */\n  underline: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOf(['always', 'hover', 'none']),\n  /**\n   * Applies the theme typography styles.\n   * @default 'inherit'\n   */\n  variant: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)])\n} : 0;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Link);\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/material/Link/Link.js?")},"./node_modules/@mui/material/Link/getTextDecoration.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"colorTransformations\": () => (/* binding */ colorTransformations),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ \"./node_modules/@mui/system/esm/style.js\");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/system */ \"./node_modules/@mui/system/esm/colorManipulator.js\");\n\nconst colorTransformations = {\n  primary: 'primary.main',\n  textPrimary: 'text.primary',\n  secondary: 'secondary.main',\n  textSecondary: 'text.secondary',\n  error: 'error.main'\n};\nconst transformDeprecatedColors = color => {\n  return colorTransformations[color] || color;\n};\nconst getTextDecoration = ({\n  theme,\n  ownerState\n}) => {\n  const transformedColor = transformDeprecatedColors(ownerState.color);\n  const color = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.getPath)(theme, `palette.${transformedColor}`, false) || ownerState.color;\n  const channelColor = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.getPath)(theme, `palette.${transformedColor}Channel`);\n  if ('vars' in theme && channelColor) {\n    return `rgba(${channelColor} / 0.4)`;\n  }\n  return (0,_mui_system__WEBPACK_IMPORTED_MODULE_1__.alpha)(color, 0.4);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTextDecoration);\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/material/Link/getTextDecoration.js?")},"./node_modules/@mui/material/Link/linkClasses.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getLinkUtilityClass\": () => (/* binding */ getLinkUtilityClass)\n/* harmony export */ });\n/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/utils */ \"./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js\");\n/* harmony import */ var _generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generateUtilityClass */ \"./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js\");\n\n\nfunction getLinkUtilityClass(slot) {\n  return (0,_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('MuiLink', slot);\n}\nconst linkClasses = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('MuiLink', ['root', 'underlineNone', 'underlineHover', 'underlineAlways', 'button', 'focusVisible']);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (linkClasses);\n\n//# sourceURL=webpack://frontend/./node_modules/@mui/material/Link/linkClasses.js?")},"./src/pages/HomePage/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ HomePage)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Link/Link.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardHeader/CardHeader.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CardContent/CardContent.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/colors */ "./node_modules/@mui/material/colors/grey.js");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/Container/Container.js");\n\n\n\n\n\nconst entry_list = [{\n  id: "profile_page",\n  name: "Profile",\n  description: "Update your profile!",\n  path: "/profile"\n}, {\n  id: "network_page",\n  name: "Network",\n  description: "Connect with other professionals!",\n  path: "/network"\n}, {\n  id: "crop_page",\n  name: "Crops",\n  description: "Manage your crop information!",\n  path: "/crop"\n}, {\n  id: "site_page",\n  name: "Sites",\n  description: "Manage your farming sites!",\n  path: "/site"\n}, {\n  id: "chemical_page",\n  name: "Chemicals",\n  description: "Manage chemical usage and inventory!",\n  path: "/chemical"\n}, {\n  id: "equipment_page",\n  name: "Equipment",\n  description: "Track your farming equipment!",\n  path: "/equipment"\n}, {\n  id: "spray_record_page",\n  name: "Spray Records",\n  description: "Document pesticide and herbicide applications!",\n  path: "/record/spray"\n}, {\n  id: "harvest_record_page",\n  name: "Harvest Records",\n  description: "Record your harvest information!",\n  path: "/record/harvest"\n}, {\n  id: "purchase_record_page",\n  name: "Purchase Records",\n  description: "Track your chemical purchases!",\n  path: "/record/purchase"\n}, {\n  id: "generate_report_page",\n  name: "Generate Reports",\n  description: "Create reports based on your business data!",\n  path: "/report"\n}];\nfunction EntryCard({\n  entry\n}) {\n  const {\n    name,\n    description,\n    path\n  } = entry;\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();\n  const hoverStyle = {\n    backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][300],\n    transition: "all 0.3s"\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    to: path,\n    style: {\n      textDecoration: "none"\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    elevation: 1,\n    sx: {\n      margin: "15px",\n      backgroundColor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_2__["default"][50],\n      border: \'1px solid #c8c8c8\',\n      cursor: "pointer",\n      "&:hover": hoverStyle\n    },\n    onClick: () => navigate(path)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    title: name\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    variant: "body2"\n  }, description))));\n}\nfunction HomePage() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_system__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n    container: true,\n    spacing: 1\n  }, entry_list.map(entry => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n      item: true,\n      xs: 6,\n      md: 4,\n      lg: 3,\n      key: entry.id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(EntryCard, {\n      entry: entry\n    }));\n  })));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/HomePage/index.js?')}}]);