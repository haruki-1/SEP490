"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.js":
/*!****************************!*\
  !*** ./pages/_document.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyDocument)\n/* harmony export */ });\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"D:\\\\SEP490\\\\SEP490\\\\FE\\\\pages\\\\_document.js\";\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\n\n\n\nclass MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_0___default()) {\n  render() {\n    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_0__.Html, {\n      lang: \"en\",\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_0__.Head, {\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"link\", {\n          href: \"https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800;900&display=swap\",\n          rel: \"stylesheet\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 9,\n          columnNumber: 6\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 8,\n        columnNumber: 5\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(\"body\", {\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_0__.Main, {}, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 15,\n          columnNumber: 6\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_0__.NextScript, {}, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 16,\n          columnNumber: 6\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 14,\n        columnNumber: 5\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 7,\n      columnNumber: 4\n    }, this);\n  }\n  static async getInitialProps(ctx) {\n    const sheet = new styled_components__WEBPACK_IMPORTED_MODULE_1__.ServerStyleSheet();\n    const originalRenderPage = ctx.renderPage;\n    try {\n      ctx.renderPage = () => originalRenderPage({\n        enhanceApp: App => props => sheet.collectStyles( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(App, _objectSpread({}, props), void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 29,\n          columnNumber: 58\n        }, this))\n      });\n      const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_0___default().getInitialProps(ctx);\n      return _objectSpread(_objectSpread({}, initialProps), {}, {\n        styles: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {\n          children: [initialProps.styles, sheet.getStyleElement()]\n        }, void 0, true)\n      });\n    } finally {\n      sheet.seal();\n    }\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUF1RTtBQUNsQjtBQUFBO0FBQUE7QUFFdEMsTUFBTVUsVUFBVSxTQUFTVixzREFBUSxDQUFDO0VBQ2hEVyxNQUFNQSxDQUFBLEVBQUc7SUFDUixvQkFDQ0osNkRBQUEsQ0FBQ0wsK0NBQUk7TUFBQ1UsSUFBSSxFQUFDLElBQUk7TUFBQUMsUUFBQSxnQkFDZE4sNkRBQUEsQ0FBQ04sK0NBQUk7UUFBQVksUUFBQSxlQUNKTiw2REFBQTtVQUNDTyxJQUFJLEVBQUMsNEZBQTRGO1VBQ2pHQyxHQUFHLEVBQUM7UUFBWTtVQUFBQyxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUEsT0FDaEI7TUFBQztRQUFBSCxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUEsT0FDRyxDQUFDLGVBQ1BaLDZEQUFBO1FBQUFNLFFBQUEsZ0JBQ0NOLDZEQUFBLENBQUNKLCtDQUFJO1VBQUFhLFFBQUEsRUFBQUMsWUFBQTtVQUFBQyxVQUFBO1VBQUFDLFlBQUE7UUFBQSxPQUFFLENBQUMsZUFDUlosNkRBQUEsQ0FBQ0gscURBQVU7VUFBQVksUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBLE9BQUUsQ0FBQztNQUFBO1FBQUFILFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQSxPQUNULENBQUM7SUFBQTtNQUFBSCxRQUFBLEVBQUFDLFlBQUE7TUFBQUMsVUFBQTtNQUFBQyxZQUFBO0lBQUEsT0FDRixDQUFDO0VBRVQ7RUFFQSxhQUFhQyxlQUFlQSxDQUFDQyxHQUFHLEVBQUU7SUFDakMsTUFBTUMsS0FBSyxHQUFHLElBQUlqQiwrREFBZ0IsQ0FBQyxDQUFDO0lBQ3BDLE1BQU1rQixrQkFBa0IsR0FBR0YsR0FBRyxDQUFDRyxVQUFVO0lBRXpDLElBQUk7TUFDSEgsR0FBRyxDQUFDRyxVQUFVLEdBQUcsTUFDaEJELGtCQUFrQixDQUFDO1FBQ2xCRSxVQUFVLEVBQUdDLEdBQUcsSUFBTUMsS0FBSyxJQUFLTCxLQUFLLENBQUNNLGFBQWEsZUFBQ3JCLDZEQUFBLENBQUNtQixHQUFHLEVBQUFHLGFBQUEsS0FBS0YsS0FBSztVQUFBWCxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUEsT0FBRyxDQUFDO01BQ3ZFLENBQUMsQ0FBQztNQUVILE1BQU1XLFlBQVksR0FBRyxNQUFNOUIsb0VBQXdCLENBQUNxQixHQUFHLENBQUM7TUFDeEQsT0FBQVEsYUFBQSxDQUFBQSxhQUFBLEtBQ0lDLFlBQVk7UUFDZkMsTUFBTSxlQUNMeEIsNkRBQUEsQ0FBQUUsMkRBQUE7VUFBQUksUUFBQSxHQUNFaUIsWUFBWSxDQUFDQyxNQUFNLEVBQ25CVCxLQUFLLENBQUNVLGVBQWUsQ0FBQyxDQUFDO1FBQUEsZUFDdkI7TUFDRjtJQUVILENBQUMsU0FBUztNQUNUVixLQUFLLENBQUNXLElBQUksQ0FBQyxDQUFDO0lBQ2I7RUFDRDtBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvX2RvY3VtZW50LmpzPzUzOGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERvY3VtZW50LCB7IEhlYWQsIEh0bWwsIE1haW4sIE5leHRTY3JpcHQgfSBmcm9tICduZXh0L2RvY3VtZW50JztcclxuaW1wb3J0IHsgU2VydmVyU3R5bGVTaGVldCB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15RG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudCB7XHJcblx0cmVuZGVyKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEh0bWwgbGFuZz0nZW4nPlxyXG5cdFx0XHRcdDxIZWFkPlxyXG5cdFx0XHRcdFx0PGxpbmtcclxuXHRcdFx0XHRcdFx0aHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1OdW5pdG8rU2Fuczp3Z2h0QDQwMDs2MDA7NzAwOzgwMDs5MDAmZGlzcGxheT1zd2FwJ1xyXG5cdFx0XHRcdFx0XHRyZWw9J3N0eWxlc2hlZXQnXHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdDwvSGVhZD5cclxuXHRcdFx0XHQ8Ym9keT5cclxuXHRcdFx0XHRcdDxNYWluIC8+XHJcblx0XHRcdFx0XHQ8TmV4dFNjcmlwdCAvPlxyXG5cdFx0XHRcdDwvYm9keT5cclxuXHRcdFx0PC9IdG1sPlxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoY3R4KSB7XHJcblx0XHRjb25zdCBzaGVldCA9IG5ldyBTZXJ2ZXJTdHlsZVNoZWV0KCk7XHJcblx0XHRjb25zdCBvcmlnaW5hbFJlbmRlclBhZ2UgPSBjdHgucmVuZGVyUGFnZTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjdHgucmVuZGVyUGFnZSA9ICgpID0+XHJcblx0XHRcdFx0b3JpZ2luYWxSZW5kZXJQYWdlKHtcclxuXHRcdFx0XHRcdGVuaGFuY2VBcHA6IChBcHApID0+IChwcm9wcykgPT4gc2hlZXQuY29sbGVjdFN0eWxlcyg8QXBwIHsuLi5wcm9wc30gLz4pLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Y29uc3QgaW5pdGlhbFByb3BzID0gYXdhaXQgRG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eCk7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0Li4uaW5pdGlhbFByb3BzLFxyXG5cdFx0XHRcdHN0eWxlczogKFxyXG5cdFx0XHRcdFx0PD5cclxuXHRcdFx0XHRcdFx0e2luaXRpYWxQcm9wcy5zdHlsZXN9XHJcblx0XHRcdFx0XHRcdHtzaGVldC5nZXRTdHlsZUVsZW1lbnQoKX1cclxuXHRcdFx0XHRcdDwvPlxyXG5cdFx0XHRcdCksXHJcblx0XHRcdH07XHJcblx0XHR9IGZpbmFsbHkge1xyXG5cdFx0XHRzaGVldC5zZWFsKCk7XHJcblx0XHR9XHJcblx0fVxyXG59Il0sIm5hbWVzIjpbIkRvY3VtZW50IiwiSGVhZCIsIkh0bWwiLCJNYWluIiwiTmV4dFNjcmlwdCIsIlNlcnZlclN0eWxlU2hlZXQiLCJqc3hERVYiLCJfanN4REVWIiwiRnJhZ21lbnQiLCJfRnJhZ21lbnQiLCJNeURvY3VtZW50IiwicmVuZGVyIiwibGFuZyIsImNoaWxkcmVuIiwiaHJlZiIsInJlbCIsImZpbGVOYW1lIiwiX2pzeEZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsImdldEluaXRpYWxQcm9wcyIsImN0eCIsInNoZWV0Iiwib3JpZ2luYWxSZW5kZXJQYWdlIiwicmVuZGVyUGFnZSIsImVuaGFuY2VBcHAiLCJBcHAiLCJwcm9wcyIsImNvbGxlY3RTdHlsZXMiLCJfb2JqZWN0U3ByZWFkIiwiaW5pdGlhbFByb3BzIiwic3R5bGVzIiwiZ2V0U3R5bGVFbGVtZW50Iiwic2VhbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_document.js\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("styled-components");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_document.js")));
module.exports = __webpack_exports__;

})();