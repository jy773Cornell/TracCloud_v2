/*! For license information please see src_pages_Login_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_Login_index_js"],{"./src/pages/Login/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Login)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Avatar/Avatar.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormControlLabel/FormControlLabel.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Checkbox/Checkbox.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Link/Link.js");\n/* harmony import */ var _mui_icons_material_LockOutlined__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/icons-material/LockOutlined */ "./node_modules/@mui/icons-material/LockOutlined.js");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./src/pages/Login/styles.js");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");\n\n\n\n\n\n\nfunction Login() {\n  const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  const [remember, setRemember] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [errors, setErrors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n    "status": [false, false],\n    "message": ["", ""]\n  });\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();\n  function handleUsernameChange(event) {\n    setUsername(event.target.value);\n  }\n  function handlePasswordChange(event) {\n    setPassword(event.target.value);\n  }\n  function handleRememberChange(event) {\n    setRemember(event.target.checked);\n  }\n  async function SignInBtnPressed(event) {\n    event.preventDefault();\n    setErrors({\n      "status": [false, false],\n      "message": ["", ""]\n    });\n    if (username === "" && password === "") {\n      setErrors({\n        "status": [true, true],\n        "message": ["This field is required.", "This field is required."]\n      });\n    } else if (username === "") {\n      setErrors({\n        "status": [true, false],\n        "message": ["This field is required.", ""]\n      });\n    } else if (password === "") {\n      setErrors({\n        "status": [false, true],\n        "message": ["", "This field is required."]\n      });\n    } else {\n      const csrftoken = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCookie)(\'csrftoken\');\n      const requestOptions = {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          \'X-CSRFToken\': csrftoken\n        },\n        body: JSON.stringify({\n          username: username,\n          password: password,\n          remember: remember\n        })\n      };\n      await fetch("/api/login/", requestOptions).then(response => {\n        if (response.ok) {\n          response.json().then(data => {\n            if (data.token) {\n              (0,_utils__WEBPACK_IMPORTED_MODULE_2__.setToken)(data.token);\n              navigate("/home");\n            }\n          });\n        } else {\n          if (response.statusText === "Not Found") {\n            setErrors({\n              "status": [true, false],\n              "message": ["Input username doesn\'t exist.", ""]\n            });\n          } else if (response.statusText === "Forbidden") {\n            setErrors({\n              "status": [false, true],\n              "message": ["", "Please input correct password."]\n            });\n          }\n        }\n      });\n    }\n  }\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledGrid, {\n    container: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledCard, {\n    elevation: 10\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {\n    onSubmit: event => SignInBtnPressed(event)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    align: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    sx: {\n      backgroundColor: \'#1bbd7e\'\n    }\n  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_LockOutlined__WEBPACK_IMPORTED_MODULE_6__["default"], null), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    variant: "h4",\n    component: "h4"\n  }, "Sign In")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Username",\n    placeholder: "Enter username",\n    variant: "standard",\n    fullWidth: true,\n    required: true,\n    error: errors.status[0],\n    helperText: errors.message[0],\n    onChange: handleUsernameChange\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    label: "Password",\n    placeholder: "Enter password",\n    variant: "standard",\n    type: "password",\n    fullWidth: true,\n    required: true,\n    error: errors.status[1],\n    helperText: errors.message[1],\n    onChange: handlePasswordChange\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {\n      name: "remember",\n      color: "primary",\n      onChange: handleRememberChange\n    }),\n    label: "Remember me"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {\n    type: "submit",\n    color: "primary",\n    variant: "contained",\n    fullWidth: true\n  }, "Sign in"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_styles__WEBPACK_IMPORTED_MODULE_1__.StyledTypography, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    href: "/workflow/password_reset"\n  }, "Forgot password?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], null, " Do you have an account?", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n    href: "/workflow/registration"\n  }, " Sign Up ")))));\n}\n\n//# sourceURL=webpack://frontend/./src/pages/Login/index.js?')},"./src/pages/Login/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "StyledCard": () => (/* binding */ StyledCard),\n/* harmony export */   "StyledGrid": () => (/* binding */ StyledGrid),\n/* harmony export */   "StyledTypography": () => (/* binding */ StyledTypography)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/styled.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Card/Card.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n\n\nconst StyledGrid = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"])({\n  height: \'100vh\',\n  display: \'flex\',\n  justifyContent: \'center\',\n  alignItems: \'center\'\n});\nconst StyledCard = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"])({\n  padding: 20,\n  width: 380,\n  margin: 20\n});\nconst StyledTypography = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__["default"])(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"])({\n  paddingTop: 10\n});\n\n//# sourceURL=webpack://frontend/./src/pages/Login/styles.js?')}}]);