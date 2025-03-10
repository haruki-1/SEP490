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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/AuthProvider.jsx":
/*!**********************************!*\
  !*** ./context/AuthProvider.jsx ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_Provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Provider */ \"./utils/Provider.jsx\");\n/* harmony import */ var _pages_api_auth_getMe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/pages/api/auth/getMe */ \"./pages/api/auth/getMe.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _utils_Provider__WEBPACK_IMPORTED_MODULE_3__, react_toastify__WEBPACK_IMPORTED_MODULE_5__]);\n([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _utils_Provider__WEBPACK_IMPORTED_MODULE_3__, react_toastify__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n'use client';\n\nvar _jsxFileName = \"D:\\\\SEP490\\\\SEP490\\\\FE\\\\context\\\\AuthProvider.jsx\";\n\n\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)(undefined);\nconst AuthProvider = ({\n  children\n}) => {\n  const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n  const {\n    0: isAuthenticated,\n    1: setIsAuthenticated\n  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)( false && 0);\n  const login = ({\n    accessToken,\n    refreshToken\n  }) => {\n    if (false) {}\n  };\n  const logout = () => {\n    if (false) {}\n  };\n  const {\n    data: dataProfile,\n    isLoading,\n    error,\n    refetch\n  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery)({\n    queryKey: ['dataProfile'],\n    queryFn: () => (0,_pages_api_auth_getMe__WEBPACK_IMPORTED_MODULE_4__.getUserInfo)(userId),\n    refetchOnWindowFocus: true\n  });\n  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {\n    if (isAuthenticated && !isLoading && dataProfile) {\n      if (dataProfile.role === 'Admin' || dataProfile.role === 'Manager' || dataProfile.role === 'User') {\n        return;\n      }\n      react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error('Bạn không có quyền truy cập vào trang này!');\n      router.push('/');\n    }\n  }, [isAuthenticated, dataProfile, isLoading, router]);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(_utils_Provider__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(AuthContext.Provider, {\n      value: {\n        isAuthenticated,\n        login,\n        logout,\n        dataProfile,\n        refetch\n      },\n      children: children\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 60,\n      columnNumber: 4\n    }, undefined)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 59,\n    columnNumber: 3\n  }, undefined);\n};\nconst useAuth = () => {\n  const context = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(AuthContext);\n  if (!context) {\n    throw new Error('useAuth must be used within an AuthProvider');\n  }\n  return context;\n};\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L0F1dGhQcm92aWRlci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsWUFBWTs7QUFBQyxJQUFBQSxZQUFBO0FBQ29DO0FBQ0w7QUFDa0M7QUFDckM7QUFDWTtBQUNkO0FBQUE7QUFFdkMsTUFBTWEsV0FBVyxnQkFBR1Qsb0RBQWEsQ0FBQ1UsU0FBUyxDQUFDO0FBRXJDLE1BQU1DLFlBQVksR0FBR0EsQ0FBQztFQUFFQztBQUFTLENBQUMsS0FBSztFQUM3QyxNQUFNQyxNQUFNLEdBQUdmLDBEQUFTLENBQUMsQ0FBQztFQUMxQixNQUFNO0lBQUEsR0FBQ2dCLGVBQWU7SUFBQSxHQUFFQztFQUFrQixJQUFJYiwrQ0FBUSxDQUNyRCxVQUFpQyxDQUNsQyxDQUFDO0VBRUQsTUFBTWdCLEtBQUssR0FBR0EsQ0FBQztJQUFFQyxXQUFXO0lBQUVDO0VBQWEsQ0FBQyxLQUFLO0lBQ2hELElBQUksT0FBK0IsRUFLbEM7RUFDRixDQUFDO0VBRUQsTUFBTUcsTUFBTSxHQUFHQSxDQUFBLEtBQU07SUFDcEIsSUFBSSxPQUErQixFQUtsQztFQUNGLENBQUM7RUFHRCxNQUFNO0lBQ0xHLElBQUksRUFBRUMsV0FBVztJQUNqQkMsU0FBUztJQUNUQyxLQUFLO0lBQ0xQO0VBRUQsQ0FBQyxHQUFHekIsK0RBQVEsQ0FBQztJQUNaaUMsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUVBLENBQUEsS0FBTTFCLGtFQUFXLENBQUMyQixNQUFNLENBQUM7SUFDbENDLG9CQUFvQixFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUVGOUIsZ0RBQVMsQ0FBQyxNQUFNO0lBQ2YsSUFBSVcsZUFBZSxJQUFJLENBQUNjLFNBQVMsSUFBSUQsV0FBVyxFQUFFO01BQ2pELElBQUlBLFdBQVcsQ0FBQ08sSUFBSSxLQUFLLE9BQU8sSUFBSVAsV0FBVyxDQUFDTyxJQUFJLEtBQUssU0FBUyxJQUFJUCxXQUFXLENBQUNPLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbEc7TUFDRDtNQUNBNUIsaURBQUssQ0FBQ3VCLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQztNQUN6RGhCLE1BQU0sQ0FBQ1ksSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNqQjtFQUNELENBQUMsRUFBRSxDQUFDWCxlQUFlLEVBQUVhLFdBQVcsRUFBRUMsU0FBUyxFQUFFZixNQUFNLENBQUMsQ0FBQztFQUVyRCxvQkFDQ0wsNkRBQUEsQ0FBQ0osdURBQVE7SUFBQVEsUUFBQSxlQUNSSiw2REFBQSxDQUFDQyxXQUFXLENBQUNMLFFBQVE7TUFBQytCLEtBQUssRUFBRTtRQUFFckIsZUFBZTtRQUFFSSxLQUFLO1FBQUVLLE1BQU07UUFBRUksV0FBVztRQUFFTDtNQUFRLENBQUU7TUFBQVYsUUFBQSxFQUNwRkE7SUFBUTtNQUFBd0IsUUFBQSxFQUFBeEMsWUFBQTtNQUFBeUMsVUFBQTtNQUFBQyxZQUFBO0lBQUEsWUFDWTtFQUFDO0lBQUFGLFFBQUEsRUFBQXhDLFlBQUE7SUFBQXlDLFVBQUE7SUFBQUMsWUFBQTtFQUFBLFlBQ2QsQ0FBQztBQUViLENBQUM7QUFFTSxNQUFNQyxPQUFPLEdBQUdBLENBQUEsS0FBTTtFQUM1QixNQUFNQyxPQUFPLEdBQUd2QyxpREFBVSxDQUFDUSxXQUFXLENBQUM7RUFDdkMsSUFBSSxDQUFDK0IsT0FBTyxFQUFFO0lBQ2IsTUFBTSxJQUFJQyxLQUFLLENBQUMsNkNBQTZDLENBQUM7RUFDL0Q7RUFDQSxPQUFPRCxPQUFPO0FBQ2YsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29udGV4dC9BdXRoUHJvdmlkZXIuanN4Pzc2Y2EiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xyXG5pbXBvcnQgeyB1c2VRdWVyeSB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XHJcbmltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSAnLi4vdXRpbHMvUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBnZXRVc2VySW5mbyB9IGZyb20gJ0AvcGFnZXMvYXBpL2F1dGgvZ2V0TWUnO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5JztcclxuXHJcbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh1bmRlZmluZWQpO1xyXG5cclxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcclxuXHRjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHRjb25zdCBbaXNBdXRoZW50aWNhdGVkLCBzZXRJc0F1dGhlbnRpY2F0ZWRdID0gdXNlU3RhdGUoXHJcblx0XHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpXHJcblx0KTtcclxuXHJcblx0Y29uc3QgbG9naW4gPSAoeyBhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuIH0pID0+IHtcclxuXHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWNjZXNzVG9rZW4nLCBhY2Nlc3NUb2tlbik7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWZyZXNoVG9rZW4nLCByZWZyZXNoVG9rZW4pO1xyXG5cdFx0XHRzZXRJc0F1dGhlbnRpY2F0ZWQodHJ1ZSk7XHJcblx0XHRcdHJlZmV0Y2goKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRjb25zdCBsb2dvdXQgPSAoKSA9PiB7XHJcblx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdyZWZyZXNoVG9rZW4nKTtcclxuXHRcdFx0c2V0SXNBdXRoZW50aWNhdGVkKGZhbHNlKTtcclxuXHRcdFx0cm91dGVyLnB1c2goJy9hdXRoL2xvZ2luJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0XHJcblx0Y29uc3Qge1xyXG5cdFx0ZGF0YTogZGF0YVByb2ZpbGUsXHJcblx0XHRpc0xvYWRpbmcsXHJcblx0XHRlcnJvcixcclxuXHRcdHJlZmV0Y2gsXHJcblxyXG5cdH0gPSB1c2VRdWVyeSh7XHJcblx0XHRxdWVyeUtleTogWydkYXRhUHJvZmlsZSddLFxyXG5cdFx0cXVlcnlGbjogKCkgPT4gZ2V0VXNlckluZm8odXNlcklkKSxcclxuXHRcdHJlZmV0Y2hPbldpbmRvd0ZvY3VzOiB0cnVlLFxyXG5cdH0pO1xyXG5cclxuXHR1c2VFZmZlY3QoKCkgPT4ge1xyXG5cdFx0aWYgKGlzQXV0aGVudGljYXRlZCAmJiAhaXNMb2FkaW5nICYmIGRhdGFQcm9maWxlKSB7XHJcblx0XHRcdGlmIChkYXRhUHJvZmlsZS5yb2xlID09PSAnQWRtaW4nIHx8IGRhdGFQcm9maWxlLnJvbGUgPT09ICdNYW5hZ2VyJyB8fCBkYXRhUHJvZmlsZS5yb2xlID09PSAnVXNlcicpIHsgXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRvYXN0LmVycm9yKCdC4bqhbiBraMO0bmcgY8OzIHF1eeG7gW4gdHJ1eSBj4bqtcCB2w6BvIHRyYW5nIG7DoHkhJyk7XHJcblx0XHRcdHJvdXRlci5wdXNoKCcvJyk7XHJcblx0XHR9XHJcblx0fSwgW2lzQXV0aGVudGljYXRlZCwgZGF0YVByb2ZpbGUsIGlzTG9hZGluZywgcm91dGVyXSk7XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8UHJvdmlkZXI+XHJcblx0XHRcdDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyBpc0F1dGhlbnRpY2F0ZWQsIGxvZ2luLCBsb2dvdXQsIGRhdGFQcm9maWxlLCByZWZldGNoIH19PlxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cclxuXHRcdDwvUHJvdmlkZXI+XHJcblx0KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4ge1xyXG5cdGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcclxuXHRpZiAoIWNvbnRleHQpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcigndXNlQXV0aCBtdXN0IGJlIHVzZWQgd2l0aGluIGFuIEF1dGhQcm92aWRlcicpO1xyXG5cdH1cclxuXHRyZXR1cm4gY29udGV4dDtcclxufTtcclxuIl0sIm5hbWVzIjpbIl9qc3hGaWxlTmFtZSIsInVzZVF1ZXJ5IiwidXNlUm91dGVyIiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiUHJvdmlkZXIiLCJnZXRVc2VySW5mbyIsInRvYXN0IiwianN4REVWIiwiX2pzeERFViIsIkF1dGhDb250ZXh0IiwidW5kZWZpbmVkIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJyb3V0ZXIiLCJpc0F1dGhlbnRpY2F0ZWQiLCJzZXRJc0F1dGhlbnRpY2F0ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG9naW4iLCJhY2Nlc3NUb2tlbiIsInJlZnJlc2hUb2tlbiIsInNldEl0ZW0iLCJyZWZldGNoIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsInB1c2giLCJkYXRhIiwiZGF0YVByb2ZpbGUiLCJpc0xvYWRpbmciLCJlcnJvciIsInF1ZXJ5S2V5IiwicXVlcnlGbiIsInVzZXJJZCIsInJlZmV0Y2hPbldpbmRvd0ZvY3VzIiwicm9sZSIsInZhbHVlIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwidXNlQXV0aCIsImNvbnRleHQiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./context/AuthProvider.jsx\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nprogress */ \"nprogress\");\n/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var nprogress_nprogress_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nprogress/nprogress.css */ \"./node_modules/nprogress/nprogress.css\");\n/* harmony import */ var nprogress_nprogress_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nprogress_nprogress_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../context/AuthProvider */ \"./context/AuthProvider.jsx\");\n/* harmony import */ var _utils_Provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/Provider */ \"./utils/Provider.jsx\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_5__, _context_AuthProvider__WEBPACK_IMPORTED_MODULE_7__, _utils_Provider__WEBPACK_IMPORTED_MODULE_8__]);\n([react_toastify__WEBPACK_IMPORTED_MODULE_5__, _context_AuthProvider__WEBPACK_IMPORTED_MODULE_7__, _utils_Provider__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\nvar _jsxFileName = \"D:\\\\SEP490\\\\SEP490\\\\FE\\\\pages\\\\_app.js\";\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\n\n\n\n\n\n\n\n\n\n\n\n// Cấu hình NProgress\n\nnprogress__WEBPACK_IMPORTED_MODULE_1___default().configure({\n  showSpinner: false\n});\nfunction MyApp({\n  Component,\n  pageProps,\n  session\n}) {\n  const {\n    0: loading,\n    1: setLoading\n  } = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(false);\n  (0,react__WEBPACK_IMPORTED_MODULE_10__.useEffect)(() => {\n    const handleStart = () => {\n      setLoading(true);\n      nprogress__WEBPACK_IMPORTED_MODULE_1___default().start();\n    };\n    const handleStop = () => {\n      setLoading(false);\n      nprogress__WEBPACK_IMPORTED_MODULE_1___default().done();\n    };\n    next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on('routeChangeStart', handleStart);\n    next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on('routeChangeComplete', handleStop);\n    next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on('routeChangeError', handleStop);\n    return () => {\n      next_router__WEBPACK_IMPORTED_MODULE_2___default().events.off('routeChangeStart', handleStart);\n      next_router__WEBPACK_IMPORTED_MODULE_2___default().events.off('routeChangeComplete', handleStop);\n      next_router__WEBPACK_IMPORTED_MODULE_2___default().events.off('routeChangeError', handleStop);\n    };\n  }, []);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(\"div\", {\n    className: \"h-full\",\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_0___default()), {\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(\"title\", {\n        children: \"Runa: Incredible Places to Stay and Things to Do\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 48,\n        columnNumber: 17\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(\"meta\", {\n        name: \"description\",\n        content: \"Find holiday rentals, cabins, beach houses, unique homes and experiences around the world \\u2013 all made possible by Hosts on Airbnb.\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 49,\n        columnNumber: 5\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(\"link\", {\n        rel: \"icon\",\n        href: \"images/logo.svg\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 53,\n        columnNumber: 5\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 47,\n      columnNumber: 4\n    }, this), loading && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(\"div\", {\n      className: \"fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50\",\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(\"div\", {\n        className: \"w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 57,\n        columnNumber: 6\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 56,\n      columnNumber: 5\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_utils_Provider__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_7__.AuthProvider, {\n        dynamic: true,\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_9__.SessionProvider, {\n          session: session,\n          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 63,\n            columnNumber: 7\n          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_5__.ToastContainer, {}, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 64,\n            columnNumber: 7\n          }, this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 62,\n          columnNumber: 6\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 61,\n        columnNumber: 4\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 60,\n      columnNumber: 4\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_5__.ToastContainer, {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 68,\n      columnNumber: 4\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 46,\n    columnNumber: 3\n  }, this);\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQUEsS0FBS3RCLFNBQVM7WUFBQWEsUUFBQSxFQUFBQyxZQUFBO1lBQUFDLFVBQUE7WUFBQUMsWUFBQTtVQUFBLE9BQUcsQ0FBQyxlQUM1QnJCLDhEQUFBLENBQUNQLDBEQUFjO1lBQUF5QixRQUFBLEVBQUFDLFlBQUE7WUFBQUMsVUFBQTtZQUFBQyxZQUFBO1VBQUEsT0FBRSxDQUFDO1FBQUE7VUFBQUgsUUFBQSxFQUFBQyxZQUFBO1VBQUFDLFVBQUE7VUFBQUMsWUFBQTtRQUFBLE9BQ0Y7TUFBQztRQUFBSCxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUEsT0FDTDtJQUFDO01BQUFILFFBQUEsRUFBQUMsWUFBQTtNQUFBQyxVQUFBO01BQUFDLFlBQUE7SUFBQSxPQUNOLENBQUMsZUFDWHJCLDhEQUFBLENBQUNQLDBEQUFjO01BQUF5QixRQUFBLEVBQUFDLFlBQUE7TUFBQUMsVUFBQTtNQUFBQyxZQUFBO0lBQUEsT0FBRSxDQUFDO0VBQUE7SUFBQUgsUUFBQSxFQUFBQyxZQUFBO0lBQUFDLFVBQUE7SUFBQUMsWUFBQTtFQUFBLE9BQ2QsQ0FBQztBQUdSLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuaW1wb3J0IE5Qcm9ncmVzcyBmcm9tICducHJvZ3Jlc3MnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0ICducHJvZ3Jlc3MvbnByb2dyZXNzLmNzcyc7XHJcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcclxuaW1wb3J0IHsgVG9hc3RDb250YWluZXIgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XHJcbmltcG9ydCAncmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzcyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L0F1dGhQcm92aWRlcic7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tICcuLi91dGlscy9Qcm92aWRlcic7XHJcbmltcG9ydCB7IFNlc3Npb25Qcm92aWRlciB9IGZyb20gJ25leHQtYXV0aC9yZWFjdCc7XHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcblxyXG4vLyBD4bqldSBow6xuaCBOUHJvZ3Jlc3NcclxuTlByb2dyZXNzLmNvbmZpZ3VyZSh7IHNob3dTcGlubmVyOiBmYWxzZSB9KTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcywgc2Vzc2lvbiB9KSB7XHJcblx0Y29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuXHR1c2VFZmZlY3QoKCkgPT4ge1xyXG5cdFx0Y29uc3QgaGFuZGxlU3RhcnQgPSAoKSA9PiB7XHJcblx0XHRcdHNldExvYWRpbmcodHJ1ZSk7XHJcblx0XHRcdE5Qcm9ncmVzcy5zdGFydCgpO1xyXG5cdFx0fTtcclxuXHRcdGNvbnN0IGhhbmRsZVN0b3AgPSAoKSA9PiB7XHJcblx0XHRcdHNldExvYWRpbmcoZmFsc2UpO1xyXG5cdFx0XHROUHJvZ3Jlc3MuZG9uZSgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRSb3V0ZXIuZXZlbnRzLm9uKCdyb3V0ZUNoYW5nZVN0YXJ0JywgaGFuZGxlU3RhcnQpO1xyXG5cdFx0Um91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VDb21wbGV0ZScsIGhhbmRsZVN0b3ApO1xyXG5cdFx0Um91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VFcnJvcicsIGhhbmRsZVN0b3ApO1xyXG5cclxuXHRcdHJldHVybiAoKSA9PiB7XHJcblx0XHRcdFJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZVN0YXJ0JywgaGFuZGxlU3RhcnQpO1xyXG5cdFx0XHRSb3V0ZXIuZXZlbnRzLm9mZigncm91dGVDaGFuZ2VDb21wbGV0ZScsIGhhbmRsZVN0b3ApO1xyXG5cdFx0XHRSb3V0ZXIuZXZlbnRzLm9mZigncm91dGVDaGFuZ2VFcnJvcicsIGhhbmRsZVN0b3ApO1xyXG5cdFx0fTtcclxuXHR9LCBbXSk7XHJcblxyXG5cclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPSdoLWZ1bGwnPlxyXG5cdFx0XHQ8SGVhZD5cclxuICAgICAgICAgICAgICAgIDx0aXRsZT5SdW5hOiBJbmNyZWRpYmxlIFBsYWNlcyB0byBTdGF5IGFuZCBUaGluZ3MgdG8gRG88L3RpdGxlPlxyXG5cdFx0XHRcdDxtZXRhXHJcblx0XHRcdFx0XHRuYW1lPSdkZXNjcmlwdGlvbidcclxuXHRcdFx0XHRcdGNvbnRlbnQ9J0ZpbmQgaG9saWRheSByZW50YWxzLCBjYWJpbnMsIGJlYWNoIGhvdXNlcywgdW5pcXVlIGhvbWVzIGFuZCBleHBlcmllbmNlcyBhcm91bmQgdGhlIHdvcmxkIOKAkyBhbGwgbWFkZSBwb3NzaWJsZSBieSBIb3N0cyBvbiBBaXJibmIuJ1xyXG5cdFx0XHRcdC8+XHJcblx0XHRcdFx0PGxpbmsgcmVsPSdpY29uJyBocmVmPSdpbWFnZXMvbG9nby5zdmcnIC8+XHJcblx0XHRcdDwvSGVhZD5cclxuXHRcdFx0e2xvYWRpbmcgJiYgKFxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdmaXhlZCB0b3AtMCBsZWZ0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LWZ1bGwgaC1mdWxsIGJnLXdoaXRlIGJnLW9wYWNpdHktNTAnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3ctMTYgaC0xNiBib3JkZXItdC00IGJvcmRlci1ibHVlLTUwMCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluJz48L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KX1cclxuXHRcdFx0PFByb3ZpZGVyPlxyXG5cdFx0XHQ8QXV0aFByb3ZpZGVyIGR5bmFtaWM+XHJcblx0XHRcdFx0XHQ8U2Vzc2lvblByb3ZpZGVyIHNlc3Npb249e3Nlc3Npb259PlxyXG5cdFx0XHRcdFx0XHQ8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcblx0XHRcdFx0XHRcdDxUb2FzdENvbnRhaW5lciAvPlxyXG5cdFx0XHRcdFx0PC9TZXNzaW9uUHJvdmlkZXI+XHJcblx0XHRcdFx0PC9BdXRoUHJvdmlkZXI+XHJcblx0XHRcdDwvUHJvdmlkZXI+XHJcblx0XHRcdDxUb2FzdENvbnRhaW5lciAvPlxyXG5cdFx0PC9kaXY+XHJcblx0KTtcclxuXHJcbn0iXSwibmFtZXMiOlsiSGVhZCIsIk5Qcm9ncmVzcyIsIlJvdXRlciIsIlRvYXN0Q29udGFpbmVyIiwiQXV0aFByb3ZpZGVyIiwiUHJvdmlkZXIiLCJTZXNzaW9uUHJvdmlkZXIiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImpzeERFViIsIl9qc3hERVYiLCJjb25maWd1cmUiLCJzaG93U3Bpbm5lciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwic2Vzc2lvbiIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiaGFuZGxlU3RhcnQiLCJzdGFydCIsImhhbmRsZVN0b3AiLCJkb25lIiwiZXZlbnRzIiwib24iLCJvZmYiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsImZpbGVOYW1lIiwiX2pzeEZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsIm5hbWUiLCJjb250ZW50IiwicmVsIiwiaHJlZiIsImR5bmFtaWMiLCJfb2JqZWN0U3ByZWFkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./pages/api/auth/getMe.js":
/*!*********************************!*\
  !*** ./pages/api/auth/getMe.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getUserInfo: () => (/* binding */ getUserInfo)\n/* harmony export */ });\nconst getUserInfo = async () => {\n  try {\n    const response = await api.get('/Auth/get-me');\n    return response.data;\n  } catch (error) {\n    console.error('Error fetching the profile:', error.message);\n    throw error;\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvYXV0aC9nZXRNZS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sTUFBTUEsV0FBVyxHQUFHLE1BQUFBLENBQUEsS0FBWTtFQUN0QyxJQUFJO0lBQ0gsTUFBTUMsUUFBUSxHQUFHLE1BQU1DLEdBQUcsQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsQ0FBQztJQVE5QyxPQUFPRixRQUFRLENBQUNHLElBQUk7RUFNckIsQ0FBQyxDQUFDLE9BQU9DLEtBQUssRUFBRTtJQUNmQyxPQUFPLENBQUNELEtBQUssQ0FBQyw2QkFBNkIsRUFBRUEsS0FBSyxDQUFDRSxPQUFPLENBQUM7SUFDM0QsTUFBTUYsS0FBSztFQUNaO0FBQ0QsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL2FwaS9hdXRoL2dldE1lLmpzPzgzMjIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldFVzZXJJbmZvID0gYXN5bmMgKCkgPT4ge1xyXG5cdHRyeSB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9BdXRoL2dldC1tZScpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHRcdHJldHVybiByZXNwb25zZS5kYXRhO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRoZSBwcm9maWxlOicsIGVycm9yLm1lc3NhZ2UpO1xyXG5cdFx0dGhyb3cgZXJyb3I7XHJcblx0fVxyXG59OyJdLCJuYW1lcyI6WyJnZXRVc2VySW5mbyIsInJlc3BvbnNlIiwiYXBpIiwiZ2V0IiwiZGF0YSIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/auth/getMe.js\n");

/***/ }),

/***/ "./utils/Provider.jsx":
/*!****************************!*\
  !*** ./utils/Provider.jsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Provider)\n/* harmony export */ });\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query-devtools */ \"@tanstack/react-query-devtools\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_2__]);\n([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n'use client';\n\nvar _jsxFileName = \"D:\\\\SEP490\\\\SEP490\\\\FE\\\\utils\\\\Provider.jsx\";\n\n\n\n\nfunction Provider({\n  children\n}) {\n  const {\n    0: queryClient\n  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.QueryClient());\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.QueryClientProvider, {\n    client: queryClient,\n    children: [children, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_2__.ReactQueryDevtools, {\n      initialIsOpen: false\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 4\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 10,\n    columnNumber: 3\n  }, this);\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9Qcm92aWRlci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFlBQVk7O0FBQUMsSUFBQUEsWUFBQTtBQUM0RDtBQUN4QztBQUNtQztBQUFBO0FBRXJELFNBQVNPLFFBQVFBLENBQUM7RUFBRUM7QUFBUyxDQUFDLEVBQUU7RUFDOUMsTUFBTTtJQUFBLEdBQUNDO0VBQVcsSUFBSU4sK0NBQVEsQ0FBQyxNQUFNLElBQUlGLDhEQUFXLENBQUMsQ0FBQyxDQUFDO0VBRXZELG9CQUNDSyw2REFBQSxDQUFDSixzRUFBbUI7SUFBQ1EsTUFBTSxFQUFFRCxXQUFZO0lBQUFELFFBQUEsR0FDdkNBLFFBQVEsZUFDVEYsNkRBQUEsQ0FBQ0YsOEVBQWtCO01BQUNPLGFBQWEsRUFBRTtJQUFNO01BQUFDLFFBQUEsRUFBQVosWUFBQTtNQUFBYSxVQUFBO01BQUFDLFlBQUE7SUFBQSxPQUFFLENBQUM7RUFBQTtJQUFBRixRQUFBLEVBQUFaLFlBQUE7SUFBQWEsVUFBQTtJQUFBQyxZQUFBO0VBQUEsT0FDeEIsQ0FBQztBQUV4QixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdXRpbHMvUHJvdmlkZXIuanN4P2I5NmUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xyXG5pbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSZWFjdFF1ZXJ5RGV2dG9vbHMgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnktZGV2dG9vbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XHJcblx0Y29uc3QgW3F1ZXJ5Q2xpZW50XSA9IHVzZVN0YXRlKCgpID0+IG5ldyBRdWVyeUNsaWVudCgpKTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxRdWVyeUNsaWVudFByb3ZpZGVyIGNsaWVudD17cXVlcnlDbGllbnR9PlxyXG5cdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDxSZWFjdFF1ZXJ5RGV2dG9vbHMgaW5pdGlhbElzT3Blbj17ZmFsc2V9IC8+XHJcblx0XHQ8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XHJcblx0KTtcclxufVxyXG4iXSwibmFtZXMiOlsiX2pzeEZpbGVOYW1lIiwiUXVlcnlDbGllbnQiLCJRdWVyeUNsaWVudFByb3ZpZGVyIiwidXNlU3RhdGUiLCJSZWFjdFF1ZXJ5RGV2dG9vbHMiLCJqc3hERVYiLCJfanN4REVWIiwiUHJvdmlkZXIiLCJjaGlsZHJlbiIsInF1ZXJ5Q2xpZW50IiwiY2xpZW50IiwiaW5pdGlhbElzT3BlbiIsImZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/Provider.jsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ "./action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "nprogress":
/*!****************************!*\
  !*** external "nprogress" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("nprogress");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "@tanstack/react-query-devtools":
/*!*************************************************!*\
  !*** external "@tanstack/react-query-devtools" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query-devtools");;

/***/ }),

/***/ "react-toastify":
/*!*********************************!*\
  !*** external "react-toastify" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-toastify");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/react-toastify","vendor-chunks/nprogress"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();