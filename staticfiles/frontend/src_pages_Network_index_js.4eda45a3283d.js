/*! For license information please see src_pages_Network_index_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_Network_index_js"],{"./src/pages/Network/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\n\nfunction App() {\n  const [ws, setWs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const websocket = new WebSocket('ws://' + window.location.host + '/ws/notifications/');\n    websocket.onopen = event => {\n      console.log('WebSocket is open now.');\n      websocket.send(JSON.stringify({\n        message: 'Hello Server'\n      }));\n    };\n    websocket.onmessage = event => {\n      console.log('Received:', event.data);\n    };\n    websocket.onclose = event => {\n      console.log('WebSocket is closed now.');\n    };\n    websocket.onerror = event => {\n      console.error('WebSocket error observed:', event);\n    };\n    setWs(websocket);\n  }, []);\n  const sendMessage = () => {\n    if (ws) {\n      ws.send(JSON.stringify({\n        message: 'Hello from React'\n      }));\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: sendMessage\n  }, \"Send Message\"));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n//# sourceURL=webpack://frontend/./src/pages/Network/index.js?")}}]);