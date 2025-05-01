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
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_Provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Provider */ \"./utils/Provider.jsx\");\n/* harmony import */ var pages_api_auth_getMe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pages/api/auth/getMe */ \"./pages/api/auth/getMe.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _utils_Provider__WEBPACK_IMPORTED_MODULE_3__, pages_api_auth_getMe__WEBPACK_IMPORTED_MODULE_4__, react_toastify__WEBPACK_IMPORTED_MODULE_5__]);\n([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _utils_Provider__WEBPACK_IMPORTED_MODULE_3__, pages_api_auth_getMe__WEBPACK_IMPORTED_MODULE_4__, react_toastify__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n'use client';\n\nvar _jsxFileName = \"D:\\\\GitHub\\\\SEP490\\\\FE\\\\context\\\\AuthProvider.jsx\";\n\n\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)(undefined);\nconst AuthProvider = ({\n  children\n}) => {\n  const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n  const {\n    0: isAuthenticated,\n    1: setIsAuthenticated\n  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)( false && 0);\n  const login = ({\n    accessToken,\n    refreshToken\n  }) => {\n    if (false) {}\n  };\n  const logout = () => {\n    if (false) {}\n  };\n  const {\n    data: dataProfile,\n    isLoading,\n    error,\n    refetch\n  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery)({\n    queryKey: ['dataProfile'],\n    queryFn: () => (0,pages_api_auth_getMe__WEBPACK_IMPORTED_MODULE_4__.getUserInfo)(),\n    refetchOnWindowFocus: true\n  });\n  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {\n    if (isAuthenticated && !isLoading && dataProfile) {\n      if (dataProfile.role === 'Admin' || dataProfile.role === 'Manager' || dataProfile.role === 'User') {\n        return;\n      }\n      react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error('Bạn không có quyền truy cập vào trang này!');\n      router.push('/');\n    }\n  }, [isAuthenticated, dataProfile, isLoading, router]);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(_utils_Provider__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(AuthContext.Provider, {\n      value: {\n        isAuthenticated,\n        login,\n        logout,\n        dataProfile,\n        refetch,\n        isLoading\n      },\n      children: children\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 58,\n      columnNumber: 4\n    }, undefined)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 57,\n    columnNumber: 3\n  }, undefined);\n};\nconst useAuth = () => {\n  const context = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(AuthContext);\n  if (!context) {\n    throw new Error('useAuth must be used within an AuthProvider');\n  }\n  return context;\n};\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L0F1dGhQcm92aWRlci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsWUFBWTs7QUFBQyxJQUFBQSxZQUFBO0FBQ29DO0FBQ0w7QUFDa0M7QUFDckM7QUFDVTtBQUNaO0FBQUE7QUFFdkMsTUFBTWEsV0FBVyxnQkFBR1Qsb0RBQWEsQ0FBQ1UsU0FBUyxDQUFDO0FBRXJDLE1BQU1DLFlBQVksR0FBR0EsQ0FBQztFQUFFQztBQUFTLENBQUMsS0FBSztFQUM3QyxNQUFNQyxNQUFNLEdBQUdmLDBEQUFTLENBQUMsQ0FBQztFQUMxQixNQUFNO0lBQUEsR0FBQ2dCLGVBQWU7SUFBQSxHQUFFQztFQUFrQixJQUFJYiwrQ0FBUSxDQUNyRCxVQUFpQyxDQUNsQyxDQUFDO0VBRUQsTUFBTWdCLEtBQUssR0FBR0EsQ0FBQztJQUFFQyxXQUFXO0lBQUVDO0VBQWEsQ0FBQyxLQUFLO0lBQ2hELElBQUksT0FBK0IsRUFLbEM7RUFDRixDQUFDO0VBRUQsTUFBTUcsTUFBTSxHQUFHQSxDQUFBLEtBQU07SUFDcEIsSUFBSSxPQUErQixFQUtsQztFQUNGLENBQUM7RUFFRCxNQUFNO0lBQ0xHLElBQUksRUFBRUMsV0FBVztJQUNqQkMsU0FBUztJQUNUQyxLQUFLO0lBQ0xQO0VBQ0QsQ0FBQyxHQUFHekIsK0RBQVEsQ0FBQztJQUNaaUMsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUVBLENBQUEsS0FBTTFCLGlFQUFXLENBQUMsQ0FBQztJQUM1QjJCLG9CQUFvQixFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUVGN0IsZ0RBQVMsQ0FBQyxNQUFNO0lBQ2YsSUFBSVcsZUFBZSxJQUFJLENBQUNjLFNBQVMsSUFBSUQsV0FBVyxFQUFFO01BQ2pELElBQUlBLFdBQVcsQ0FBQ00sSUFBSSxLQUFLLE9BQU8sSUFBSU4sV0FBVyxDQUFDTSxJQUFJLEtBQUssU0FBUyxJQUFJTixXQUFXLENBQUNNLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbEc7TUFDRDtNQUNBM0IsaURBQUssQ0FBQ3VCLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQztNQUN6RGhCLE1BQU0sQ0FBQ1ksSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNqQjtFQUNELENBQUMsRUFBRSxDQUFDWCxlQUFlLEVBQUVhLFdBQVcsRUFBRUMsU0FBUyxFQUFFZixNQUFNLENBQUMsQ0FBQztFQUVyRCxvQkFDQ0wsNkRBQUEsQ0FBQ0osdURBQVE7SUFBQVEsUUFBQSxlQUNSSiw2REFBQSxDQUFDQyxXQUFXLENBQUNMLFFBQVE7TUFBQzhCLEtBQUssRUFBRTtRQUFFcEIsZUFBZTtRQUFFSSxLQUFLO1FBQUVLLE1BQU07UUFBRUksV0FBVztRQUFFTCxPQUFPO1FBQUVNO01BQVUsQ0FBRTtNQUFBaEIsUUFBQSxFQUMvRkE7SUFBUTtNQUFBdUIsUUFBQSxFQUFBdkMsWUFBQTtNQUFBd0MsVUFBQTtNQUFBQyxZQUFBO0lBQUEsWUFDWTtFQUFDO0lBQUFGLFFBQUEsRUFBQXZDLFlBQUE7SUFBQXdDLFVBQUE7SUFBQUMsWUFBQTtFQUFBLFlBQ2QsQ0FBQztBQUViLENBQUM7QUFFTSxNQUFNQyxPQUFPLEdBQUdBLENBQUEsS0FBTTtFQUM1QixNQUFNQyxPQUFPLEdBQUd0QyxpREFBVSxDQUFDUSxXQUFXLENBQUM7RUFDdkMsSUFBSSxDQUFDOEIsT0FBTyxFQUFFO0lBQ2IsTUFBTSxJQUFJQyxLQUFLLENBQUMsNkNBQTZDLENBQUM7RUFDL0Q7RUFDQSxPQUFPRCxPQUFPO0FBQ2YsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29udGV4dC9BdXRoUHJvdmlkZXIuanN4Pzc2Y2EiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcbmltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gJy4uL3V0aWxzL1Byb3ZpZGVyJztcbmltcG9ydCB7IGdldFVzZXJJbmZvIH0gZnJvbSAncGFnZXMvYXBpL2F1dGgvZ2V0TWUnO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh1bmRlZmluZWQpO1xuXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuXHRjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblx0Y29uc3QgW2lzQXV0aGVudGljYXRlZCwgc2V0SXNBdXRoZW50aWNhdGVkXSA9IHVzZVN0YXRlKFxuXHRcdHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICEhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJylcblx0KTtcblxuXHRjb25zdCBsb2dpbiA9ICh7IGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4gfSkgPT4ge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc1Rva2VuJywgYWNjZXNzVG9rZW4pO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlZnJlc2hUb2tlbicsIHJlZnJlc2hUb2tlbik7XG5cdFx0XHRzZXRJc0F1dGhlbnRpY2F0ZWQodHJ1ZSk7XG5cdFx0XHRyZWZldGNoKCk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGxvZ291dCA9ICgpID0+IHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NUb2tlbicpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlZnJlc2hUb2tlbicpO1xuXHRcdFx0c2V0SXNBdXRoZW50aWNhdGVkKGZhbHNlKTtcblx0XHRcdHJvdXRlci5wdXNoKCcvYXV0aC9sb2dpbicpO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCB7XG5cdFx0ZGF0YTogZGF0YVByb2ZpbGUsXG5cdFx0aXNMb2FkaW5nLFxuXHRcdGVycm9yLFxuXHRcdHJlZmV0Y2gsXG5cdH0gPSB1c2VRdWVyeSh7XG5cdFx0cXVlcnlLZXk6IFsnZGF0YVByb2ZpbGUnXSxcblx0XHRxdWVyeUZuOiAoKSA9PiBnZXRVc2VySW5mbygpLFxuXHRcdHJlZmV0Y2hPbldpbmRvd0ZvY3VzOiB0cnVlLFxuXHR9KTtcblxuXHR1c2VFZmZlY3QoKCkgPT4ge1xuXHRcdGlmIChpc0F1dGhlbnRpY2F0ZWQgJiYgIWlzTG9hZGluZyAmJiBkYXRhUHJvZmlsZSkge1xuXHRcdFx0aWYgKGRhdGFQcm9maWxlLnJvbGUgPT09ICdBZG1pbicgfHwgZGF0YVByb2ZpbGUucm9sZSA9PT0gJ01hbmFnZXInIHx8IGRhdGFQcm9maWxlLnJvbGUgPT09ICdVc2VyJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0b2FzdC5lcnJvcignQuG6oW4ga2jDtG5nIGPDsyBxdXnhu4FuIHRydXkgY+G6rXAgdsOgbyB0cmFuZyBuw6B5IScpO1xuXHRcdFx0cm91dGVyLnB1c2goJy8nKTtcblx0XHR9XG5cdH0sIFtpc0F1dGhlbnRpY2F0ZWQsIGRhdGFQcm9maWxlLCBpc0xvYWRpbmcsIHJvdXRlcl0pO1xuXG5cdHJldHVybiAoXG5cdFx0PFByb3ZpZGVyPlxuXHRcdFx0PEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IGlzQXV0aGVudGljYXRlZCwgbG9naW4sIGxvZ291dCwgZGF0YVByb2ZpbGUsIHJlZmV0Y2gsIGlzTG9hZGluZyB9fT5cblx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0PC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cblx0XHQ8L1Byb3ZpZGVyPlxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKSA9PiB7XG5cdGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcblx0aWYgKCFjb250ZXh0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1c2VBdXRoIG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gQXV0aFByb3ZpZGVyJyk7XG5cdH1cblx0cmV0dXJuIGNvbnRleHQ7XG59O1xuIl0sIm5hbWVzIjpbIl9qc3hGaWxlTmFtZSIsInVzZVF1ZXJ5IiwidXNlUm91dGVyIiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiUHJvdmlkZXIiLCJnZXRVc2VySW5mbyIsInRvYXN0IiwianN4REVWIiwiX2pzeERFViIsIkF1dGhDb250ZXh0IiwidW5kZWZpbmVkIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJyb3V0ZXIiLCJpc0F1dGhlbnRpY2F0ZWQiLCJzZXRJc0F1dGhlbnRpY2F0ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG9naW4iLCJhY2Nlc3NUb2tlbiIsInJlZnJlc2hUb2tlbiIsInNldEl0ZW0iLCJyZWZldGNoIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsInB1c2giLCJkYXRhIiwiZGF0YVByb2ZpbGUiLCJpc0xvYWRpbmciLCJlcnJvciIsInF1ZXJ5S2V5IiwicXVlcnlGbiIsInJlZmV0Y2hPbldpbmRvd0ZvY3VzIiwicm9sZSIsInZhbHVlIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwidXNlQXV0aCIsImNvbnRleHQiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./context/AuthProvider.jsx\n");

/***/ }),

/***/ "./next-i18next.config.js":
/*!********************************!*\
  !*** ./next-i18next.config.js ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = {\n  i18n: {\n    defaultLocale: 'vi',\n    locales: ['en', 'vi', 'ja'],\n    localeDetection: true\n  },\n  defaultNS: 'common',\n  localePath: './public/locales'\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9uZXh0LWkxOG5leHQuY29uZmlnLmpzIiwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImkxOG4iLCJkZWZhdWx0TG9jYWxlIiwibG9jYWxlcyIsImxvY2FsZURldGVjdGlvbiIsImRlZmF1bHROUyIsImxvY2FsZVBhdGgiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25leHQtaTE4bmV4dC5jb25maWcuanM/MWNiOSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcblx0aTE4bjoge1xuXHRcdGRlZmF1bHRMb2NhbGU6ICd2aScsXG5cdFx0bG9jYWxlczogWydlbicsICd2aScsICdqYSddLFxuXHRcdGxvY2FsZURldGVjdGlvbjogdHJ1ZSxcblx0fSxcblx0ZGVmYXVsdE5TOiAnY29tbW9uJyxcblx0bG9jYWxlUGF0aDogJy4vcHVibGljL2xvY2FsZXMnLFxufTsiXSwibWFwcGluZ3MiOiJBQUFBQSxNQUFNLENBQUNDLE9BQU8sR0FBRztFQUNoQkMsSUFBSSxFQUFFO0lBQ0xDLGFBQWEsRUFBRSxJQUFJO0lBQ25CQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUMzQkMsZUFBZSxFQUFFO0VBQ2xCLENBQUM7RUFDREMsU0FBUyxFQUFFLFFBQVE7RUFDbkJDLFVBQVUsRUFBRTtBQUNiLENBQUMifQ==\n//# sourceURL=webpack-internal:///./next-i18next.config.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nprogress */ \"nprogress\");\n/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var nprogress_nprogress_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nprogress/nprogress.css */ \"./node_modules/nprogress/nprogress.css\");\n/* harmony import */ var nprogress_nprogress_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nprogress_nprogress_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../context/AuthProvider */ \"./context/AuthProvider.jsx\");\n/* harmony import */ var _utils_Provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/Provider */ \"./utils/Provider.jsx\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next-i18next */ \"next-i18next\");\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_i18next__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var next_i18next_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next-i18next.config */ \"./next-i18next.config.js\");\n/* harmony import */ var next_i18next_config__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_i18next_config__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_5__, _context_AuthProvider__WEBPACK_IMPORTED_MODULE_7__, _utils_Provider__WEBPACK_IMPORTED_MODULE_8__]);\n([react_toastify__WEBPACK_IMPORTED_MODULE_5__, _context_AuthProvider__WEBPACK_IMPORTED_MODULE_7__, _utils_Provider__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\nvar _jsxFileName = \"D:\\\\GitHub\\\\SEP490\\\\FE\\\\pages\\\\_app.js\";\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Cấu hình NProgress\n\nnprogress__WEBPACK_IMPORTED_MODULE_1___default().configure({\n  showSpinner: false\n});\nfunction MyApp({\n  Component,\n  pageProps,\n  session\n}) {\n  const {\n    0: loading,\n    1: setLoading\n  } = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(false);\n  (0,react__WEBPACK_IMPORTED_MODULE_10__.useEffect)(() => {\n    const handleStart = () => {\n      setLoading(true);\n      nprogress__WEBPACK_IMPORTED_MODULE_1___default().start();\n    };\n    const handleStop = () => {\n      setLoading(false);\n      nprogress__WEBPACK_IMPORTED_MODULE_1___default().done();\n    };\n    next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on('routeChangeStart', handleStart);\n    next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on('routeChangeComplete', handleStop);\n    next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on('routeChangeError', handleStop);\n    return () => {\n      next_router__WEBPACK_IMPORTED_MODULE_2___default().events.off('routeChangeStart', handleStart);\n      next_router__WEBPACK_IMPORTED_MODULE_2___default().events.off('routeChangeComplete', handleStop);\n      next_router__WEBPACK_IMPORTED_MODULE_2___default().events.off('routeChangeError', handleStop);\n    };\n  }, []);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(\"div\", {\n    className: \"h-full\",\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_0___default()), {\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(\"title\", {\n        children: \"Runa: Incredible Places to Stay and Things to Do\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 51,\n        columnNumber: 17\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(\"meta\", {\n        name: \"description\",\n        content: \"Find holiday rentals, cabins, beach houses, unique homes and experiences around the world \\u2013 all made possible by Hosts on Airbnb.\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 52,\n        columnNumber: 5\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(\"link\", {\n        rel: \"icon\",\n        href: \"images/logo.svg\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 56,\n        columnNumber: 5\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 50,\n      columnNumber: 4\n    }, this), loading && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(\"div\", {\n      className: \"fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50\",\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(\"div\", {\n        className: \"w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 60,\n        columnNumber: 6\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 59,\n      columnNumber: 5\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_utils_Provider__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_7__.AuthProvider, {\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_9__.SessionProvider, {\n          session: session,\n          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 66,\n            columnNumber: 7\n          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_5__.ToastContainer, {}, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 67,\n            columnNumber: 7\n          }, this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 65,\n          columnNumber: 6\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 64,\n        columnNumber: 4\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 63,\n      columnNumber: 4\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_5__.ToastContainer, {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 71,\n      columnNumber: 4\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 49,\n    columnNumber: 3\n  }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_i18next__WEBPACK_IMPORTED_MODULE_11__.appWithTranslation)(MyApp, (next_i18next_config__WEBPACK_IMPORTED_MODULE_12___default())));\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c0IsYUFBQSxLQUFLckIsU0FBUztZQUFBYSxRQUFBLEVBQUFDLFlBQUE7WUFBQUMsVUFBQTtZQUFBQyxZQUFBO1VBQUEsT0FBRyxDQUFDLGVBQzVCckIsOERBQUEsQ0FBQ1QsMERBQWM7WUFBQTJCLFFBQUEsRUFBQUMsWUFBQTtZQUFBQyxVQUFBO1lBQUFDLFlBQUE7VUFBQSxPQUFFLENBQUM7UUFBQTtVQUFBSCxRQUFBLEVBQUFDLFlBQUE7VUFBQUMsVUFBQTtVQUFBQyxZQUFBO1FBQUEsT0FDRjtNQUFDO1FBQUFILFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQSxPQUNMO0lBQUM7TUFBQUgsUUFBQSxFQUFBQyxZQUFBO01BQUFDLFVBQUE7TUFBQUMsWUFBQTtJQUFBLE9BQ04sQ0FBQyxlQUNYckIsOERBQUEsQ0FBQ1QsMERBQWM7TUFBQTJCLFFBQUEsRUFBQUMsWUFBQTtNQUFBQyxVQUFBO01BQUFDLFlBQUE7SUFBQSxPQUFFLENBQUM7RUFBQTtJQUFBSCxRQUFBLEVBQUFDLFlBQUE7SUFBQUMsVUFBQTtJQUFBQyxZQUFBO0VBQUEsT0FDZCxDQUFDO0FBR1I7QUFDQSxpRUFBZXhCLGlFQUFrQixDQUFDTSxLQUFLLEVBQUVMLDZEQUFpQixDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCBOUHJvZ3Jlc3MgZnJvbSAnbnByb2dyZXNzJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0ICducHJvZ3Jlc3MvbnByb2dyZXNzLmNzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lciB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5JztcbmltcG9ydCAncmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzcyc7XG5cbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHQvQXV0aFByb3ZpZGVyJztcbmltcG9ydCBQcm92aWRlciBmcm9tICcuLi91dGlscy9Qcm92aWRlcic7XG5pbXBvcnQgeyBTZXNzaW9uUHJvdmlkZXIgfSBmcm9tICduZXh0LWF1dGgvcmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFwcFdpdGhUcmFuc2xhdGlvbiB9IGZyb20gJ25leHQtaTE4bmV4dCc7XG5pbXBvcnQgbmV4dEkxOG5leHRDb25maWcgZnJvbSAnbmV4dC1pMThuZXh0LmNvbmZpZyc7XG5cblxuLy8gQ+G6pXUgaMOsbmggTlByb2dyZXNzXG5OUHJvZ3Jlc3MuY29uZmlndXJlKHsgc2hvd1NwaW5uZXI6IGZhbHNlIH0pO1xuXG5cblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcywgc2Vzc2lvbiB9KSB7XG5cdGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuXHR1c2VFZmZlY3QoKCkgPT4ge1xuXHRcdGNvbnN0IGhhbmRsZVN0YXJ0ID0gKCkgPT4ge1xuXHRcdFx0c2V0TG9hZGluZyh0cnVlKTtcblx0XHRcdE5Qcm9ncmVzcy5zdGFydCgpO1xuXHRcdH07XG5cdFx0Y29uc3QgaGFuZGxlU3RvcCA9ICgpID0+IHtcblx0XHRcdHNldExvYWRpbmcoZmFsc2UpO1xuXHRcdFx0TlByb2dyZXNzLmRvbmUoKTtcblx0XHR9O1xuXG5cdFx0Um91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VTdGFydCcsIGhhbmRsZVN0YXJ0KTtcblx0XHRSb3V0ZXIuZXZlbnRzLm9uKCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgaGFuZGxlU3RvcCk7XG5cdFx0Um91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VFcnJvcicsIGhhbmRsZVN0b3ApO1xuXG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZVN0YXJ0JywgaGFuZGxlU3RhcnQpO1xuXHRcdFx0Um91dGVyLmV2ZW50cy5vZmYoJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCBoYW5kbGVTdG9wKTtcblx0XHRcdFJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZUVycm9yJywgaGFuZGxlU3RvcCk7XG5cdFx0fTtcblx0fSwgW10pO1xuXG5cblxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPSdoLWZ1bGwnPlxuXHRcdFx0PEhlYWQ+XG4gICAgICAgICAgICAgICAgPHRpdGxlPlJ1bmE6IEluY3JlZGlibGUgUGxhY2VzIHRvIFN0YXkgYW5kIFRoaW5ncyB0byBEbzwvdGl0bGU+XG5cdFx0XHRcdDxtZXRhXG5cdFx0XHRcdFx0bmFtZT0nZGVzY3JpcHRpb24nXG5cdFx0XHRcdFx0Y29udGVudD0nRmluZCBob2xpZGF5IHJlbnRhbHMsIGNhYmlucywgYmVhY2ggaG91c2VzLCB1bmlxdWUgaG9tZXMgYW5kIGV4cGVyaWVuY2VzIGFyb3VuZCB0aGUgd29ybGQg4oCTIGFsbCBtYWRlIHBvc3NpYmxlIGJ5IEhvc3RzIG9uIEFpcmJuYi4nXG5cdFx0XHRcdC8+XG5cdFx0XHRcdDxsaW5rIHJlbD0naWNvbicgaHJlZj0naW1hZ2VzL2xvZ28uc3ZnJyAvPlxuXHRcdFx0PC9IZWFkPlxuXHRcdFx0e2xvYWRpbmcgJiYgKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZml4ZWQgdG9wLTAgbGVmdC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdy1mdWxsIGgtZnVsbCBiZy13aGl0ZSBiZy1vcGFjaXR5LTUwJz5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndy0xNiBoLTE2IGJvcmRlci10LTQgYm9yZGVyLWJsdWUtNTAwIHJvdW5kZWQtZnVsbCBhbmltYXRlLXNwaW4nPjwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCl9XG5cdFx0XHQ8UHJvdmlkZXI+XG5cdFx0XHQ8QXV0aFByb3ZpZGVyPlxuXHRcdFx0XHRcdDxTZXNzaW9uUHJvdmlkZXIgc2Vzc2lvbj17c2Vzc2lvbn0+XG5cdFx0XHRcdFx0XHQ8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG5cdFx0XHRcdFx0XHQ8VG9hc3RDb250YWluZXIgLz5cblx0XHRcdFx0XHQ8L1Nlc3Npb25Qcm92aWRlcj5cblx0XHRcdFx0PC9BdXRoUHJvdmlkZXI+XG5cdFx0XHQ8L1Byb3ZpZGVyPlxuXHRcdFx0PFRvYXN0Q29udGFpbmVyIC8+XG5cdFx0PC9kaXY+XG5cdCk7XG5cbn1cbmV4cG9ydCBkZWZhdWx0IGFwcFdpdGhUcmFuc2xhdGlvbihNeUFwcCwgbmV4dEkxOG5leHRDb25maWcpOyJdLCJuYW1lcyI6WyJIZWFkIiwiTlByb2dyZXNzIiwiUm91dGVyIiwiVG9hc3RDb250YWluZXIiLCJBdXRoUHJvdmlkZXIiLCJQcm92aWRlciIsIlNlc3Npb25Qcm92aWRlciIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiYXBwV2l0aFRyYW5zbGF0aW9uIiwibmV4dEkxOG5leHRDb25maWciLCJqc3hERVYiLCJfanN4REVWIiwiY29uZmlndXJlIiwic2hvd1NwaW5uZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInNlc3Npb24iLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImhhbmRsZVN0YXJ0Iiwic3RhcnQiLCJoYW5kbGVTdG9wIiwiZG9uZSIsImV2ZW50cyIsIm9uIiwib2ZmIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJuYW1lIiwiY29udGVudCIsInJlbCIsImhyZWYiLCJfb2JqZWN0U3ByZWFkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./pages/api/auth/getMe.js":
/*!*********************************!*\
  !*** ./pages/api/auth/getMe.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getUserInfo: () => (/* binding */ getUserInfo)\n/* harmony export */ });\n/* harmony import */ var utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/api */ \"./utils/api.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([utils_api__WEBPACK_IMPORTED_MODULE_0__]);\nutils_api__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst getUserInfo = async () => {\n  try {\n    const response = await utils_api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/Auth/get-me');\n    return response.data;\n  } catch (error) {\n    console.error('Error fetching the profile:', error.message);\n    throw error;\n  }\n};\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvYXV0aC9nZXRNZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE0QjtBQUVyQixNQUFNQyxXQUFXLEdBQUcsTUFBQUEsQ0FBQSxLQUFZO0VBQ3RDLElBQUk7SUFDSCxNQUFNQyxRQUFRLEdBQUcsTUFBTUYscURBQU8sQ0FBQyxjQUFjLENBQUM7SUFROUMsT0FBT0UsUUFBUSxDQUFDRSxJQUFJO0VBTXJCLENBQUMsQ0FBQyxPQUFPQyxLQUFLLEVBQUU7SUFDZkMsT0FBTyxDQUFDRCxLQUFLLENBQUMsNkJBQTZCLEVBQUVBLEtBQUssQ0FBQ0UsT0FBTyxDQUFDO0lBQzNELE1BQU1GLEtBQUs7RUFDWjtBQUNELENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL2FwaS9hdXRoL2dldE1lLmpzPzgzMjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwidXRpbHMvYXBpXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VySW5mbyA9IGFzeW5jICgpID0+IHtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9BdXRoL2dldC1tZScpO1xuXG5cblxuXG5cblxuXG5cdFx0cmV0dXJuIHJlc3BvbnNlLmRhdGE7XG5cblxuXG5cblxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRoZSBwcm9maWxlOicsIGVycm9yLm1lc3NhZ2UpO1xuXHRcdHRocm93IGVycm9yO1xuXHR9XG59OyJdLCJuYW1lcyI6WyJhcGkiLCJnZXRVc2VySW5mbyIsInJlc3BvbnNlIiwiZ2V0IiwiZGF0YSIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/auth/getMe.js\n");

/***/ }),

/***/ "./utils/Provider.jsx":
/*!****************************!*\
  !*** ./utils/Provider.jsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Provider)\n/* harmony export */ });\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query-devtools */ \"@tanstack/react-query-devtools\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_2__]);\n([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__, _tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n'use client';\n\nvar _jsxFileName = \"D:\\\\GitHub\\\\SEP490\\\\FE\\\\utils\\\\Provider.jsx\";\n\n\n\n\nfunction Provider({\n  children\n}) {\n  const {\n    0: queryClient\n  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.QueryClient());\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.QueryClientProvider, {\n    client: queryClient,\n    children: [children, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_2__.ReactQueryDevtools, {\n      initialIsOpen: false\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 4\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 10,\n    columnNumber: 3\n  }, this);\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9Qcm92aWRlci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFlBQVk7O0FBQUMsSUFBQUEsWUFBQTtBQUM0RDtBQUN4QztBQUNtQztBQUFBO0FBRXJELFNBQVNPLFFBQVFBLENBQUM7RUFBRUM7QUFBUyxDQUFDLEVBQUU7RUFDOUMsTUFBTTtJQUFBLEdBQUNDO0VBQVcsSUFBSU4sK0NBQVEsQ0FBQyxNQUFNLElBQUlGLDhEQUFXLENBQUMsQ0FBQyxDQUFDO0VBRXZELG9CQUNDSyw2REFBQSxDQUFDSixzRUFBbUI7SUFBQ1EsTUFBTSxFQUFFRCxXQUFZO0lBQUFELFFBQUEsR0FDdkNBLFFBQVEsZUFDVEYsNkRBQUEsQ0FBQ0YsOEVBQWtCO01BQUNPLGFBQWEsRUFBRTtJQUFNO01BQUFDLFFBQUEsRUFBQVosWUFBQTtNQUFBYSxVQUFBO01BQUFDLFlBQUE7SUFBQSxPQUFFLENBQUM7RUFBQTtJQUFBRixRQUFBLEVBQUFaLFlBQUE7SUFBQWEsVUFBQTtJQUFBQyxZQUFBO0VBQUEsT0FDeEIsQ0FBQztBQUV4QixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdXRpbHMvUHJvdmlkZXIuanN4P2I5NmUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZWFjdFF1ZXJ5RGV2dG9vbHMgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnktZGV2dG9vbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcblx0Y29uc3QgW3F1ZXJ5Q2xpZW50XSA9IHVzZVN0YXRlKCgpID0+IG5ldyBRdWVyeUNsaWVudCgpKTtcblxuXHRyZXR1cm4gKFxuXHRcdDxRdWVyeUNsaWVudFByb3ZpZGVyIGNsaWVudD17cXVlcnlDbGllbnR9PlxuXHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0PFJlYWN0UXVlcnlEZXZ0b29scyBpbml0aWFsSXNPcGVuPXtmYWxzZX0gLz5cblx0XHQ8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XG5cdCk7XG59XG4iXSwibmFtZXMiOlsiX2pzeEZpbGVOYW1lIiwiUXVlcnlDbGllbnQiLCJRdWVyeUNsaWVudFByb3ZpZGVyIiwidXNlU3RhdGUiLCJSZWFjdFF1ZXJ5RGV2dG9vbHMiLCJqc3hERVYiLCJfanN4REVWIiwiUHJvdmlkZXIiLCJjaGlsZHJlbiIsInF1ZXJ5Q2xpZW50IiwiY2xpZW50IiwiaW5pdGlhbElzT3BlbiIsImZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/Provider.jsx\n");

/***/ }),

/***/ "./utils/api.js":
/*!**********************!*\
  !*** ./utils/api.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst api = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n  baseURL: 'https://duongcongson-001-site1.jtempurl.com/api',\n  headers: {\n    'Content-Type': 'application/json'\n  }\n});\n\n// Request interceptor: Attach access token if available\napi.interceptors.request.use(config => {\n  const token = localStorage.getItem('accessToken');\n  if (token) {\n    config.headers['Authorization'] = `Bearer ${token}`;\n  }\n  return config;\n});\n\n// Response interceptor: Handle 401 errors and refresh token\napi.interceptors.response.use(response => response, async error => {\n  console.log('Error in interceptor:', error.response?.status); // Debugging line\n  const originalRequest = error.config;\n  if (error.response?.status === 500 && !originalRequest._retry) {\n    originalRequest._retry = true;\n    const refreshToken = localStorage.getItem('refreshToken');\n    if (refreshToken) {\n      try {\n        // Call the refresh token endpoint with PUT method\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].put('https://duongcongson-001-site1.jtempurl.com/api/Auth/access-token', {\n          refreshToken\n        }, {\n          headers: {\n            'Content-Type': 'application/json'\n          }\n        });\n        const {\n          accessToken\n        } = response.data;\n        localStorage.setItem('accessToken', accessToken);\n        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;\n\n        // Retry the original request with the new access token\n        return api(originalRequest);\n      } catch (refreshError) {\n        console.error('Failed to refresh token:', refreshError);\n        localStorage.removeItem('accessToken');\n        localStorage.removeItem('refreshToken');\n        window.location.href = '/auth/login'; // Redirect to login on failure\n      }\n    }\n  }\n\n  return Promise.reject(error);\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9hcGkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEI7QUFFMUIsTUFBTUMsR0FBRyxHQUFHRCxvREFBWSxDQUFDO0VBQ3hCRyxPQUFPLEVBQUUsaURBQWlEO0VBQzFEQyxPQUFPLEVBQUU7SUFDUixjQUFjLEVBQUU7RUFDakI7QUFDRCxDQUFDLENBQUM7O0FBRUY7QUFDQUgsR0FBRyxDQUFDSSxZQUFZLENBQUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFFQyxNQUFNLElBQUs7RUFDeEMsTUFBTUMsS0FBSyxHQUFHQyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxhQUFhLENBQUM7RUFDakQsSUFBSUYsS0FBSyxFQUFFO0lBQ1ZELE1BQU0sQ0FBQ0osT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFJLFVBQVNLLEtBQU0sRUFBQztFQUNwRDtFQUNBLE9BQU9ELE1BQU07QUFDZCxDQUFDLENBQUM7O0FBRUY7QUFDQVAsR0FBRyxDQUFDSSxZQUFZLENBQUNPLFFBQVEsQ0FBQ0wsR0FBRyxDQUMzQkssUUFBUSxJQUFLQSxRQUFRLEVBQ3RCLE1BQU9DLEtBQUssSUFBSztFQUNoQkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLEVBQUVGLEtBQUssQ0FBQ0QsUUFBUSxFQUFFSSxNQUFNLENBQUMsQ0FBQyxDQUFDO0VBQzlELE1BQU1DLGVBQWUsR0FBR0osS0FBSyxDQUFDTCxNQUFNO0VBRXBDLElBQUlLLEtBQUssQ0FBQ0QsUUFBUSxFQUFFSSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUNDLGVBQWUsQ0FBQ0MsTUFBTSxFQUFFO0lBQzlERCxlQUFlLENBQUNDLE1BQU0sR0FBRyxJQUFJO0lBQzdCLE1BQU1DLFlBQVksR0FBR1QsWUFBWSxDQUFDQyxPQUFPLENBQUMsY0FBYyxDQUFDO0lBRXpELElBQUlRLFlBQVksRUFBRTtNQUNqQixJQUFJO1FBQ0g7UUFDQSxNQUFNUCxRQUFRLEdBQUcsTUFBTVosaURBQVMsQ0FDL0IsbUVBQW1FLEVBQ25FO1VBQUVtQjtRQUFhLENBQUMsRUFDaEI7VUFDQ2YsT0FBTyxFQUFFO1lBQ1IsY0FBYyxFQUFFO1VBQ2pCO1FBQ0QsQ0FDRCxDQUFDO1FBRUQsTUFBTTtVQUFFaUI7UUFBWSxDQUFDLEdBQUdULFFBQVEsQ0FBQ1UsSUFBSTtRQUNyQ1osWUFBWSxDQUFDYSxPQUFPLENBQUMsYUFBYSxFQUFFRixXQUFXLENBQUM7UUFDaERKLGVBQWUsQ0FBQ2IsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFJLFVBQVNpQixXQUFZLEVBQUM7O1FBRWxFO1FBQ0EsT0FBT3BCLEdBQUcsQ0FBQ2dCLGVBQWUsQ0FBQztNQUM1QixDQUFDLENBQUMsT0FBT08sWUFBWSxFQUFFO1FBQ3RCVixPQUFPLENBQUNELEtBQUssQ0FBQywwQkFBMEIsRUFBRVcsWUFBWSxDQUFDO1FBQ3ZEZCxZQUFZLENBQUNlLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDdENmLFlBQVksQ0FBQ2UsVUFBVSxDQUFDLGNBQWMsQ0FBQztRQUN2Q0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQztNQUN2QztJQUNEO0VBQ0Q7O0VBRUEsT0FBT0MsT0FBTyxDQUFDQyxNQUFNLENBQUNqQixLQUFLLENBQUM7QUFDN0IsQ0FDRCxDQUFDO0FBRUQsaUVBQWVaLEdBQUcsRSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3V0aWxzL2FwaS5qcz9jMTEzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxuY29uc3QgYXBpID0gYXhpb3MuY3JlYXRlKHtcblx0YmFzZVVSTDogJ2h0dHBzOi8vZHVvbmdjb25nc29uLTAwMS1zaXRlMS5qdGVtcHVybC5jb20vYXBpJyxcblx0aGVhZGVyczoge1xuXHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdH0sXG59KTtcblxuLy8gUmVxdWVzdCBpbnRlcmNlcHRvcjogQXR0YWNoIGFjY2VzcyB0b2tlbiBpZiBhdmFpbGFibGVcbmFwaS5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoKGNvbmZpZykgPT4ge1xuXHRjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xuXHRpZiAodG9rZW4pIHtcblx0XHRjb25maWcuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3Rva2VufWA7XG5cdH1cblx0cmV0dXJuIGNvbmZpZztcbn0pO1xuXG4vLyBSZXNwb25zZSBpbnRlcmNlcHRvcjogSGFuZGxlIDQwMSBlcnJvcnMgYW5kIHJlZnJlc2ggdG9rZW5cbmFwaS5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKFxuXHQocmVzcG9uc2UpID0+IHJlc3BvbnNlLFxuXHRhc3luYyAoZXJyb3IpID0+IHtcblx0XHRjb25zb2xlLmxvZygnRXJyb3IgaW4gaW50ZXJjZXB0b3I6JywgZXJyb3IucmVzcG9uc2U/LnN0YXR1cyk7IC8vIERlYnVnZ2luZyBsaW5lXG5cdFx0Y29uc3Qgb3JpZ2luYWxSZXF1ZXN0ID0gZXJyb3IuY29uZmlnO1xuXG5cdFx0aWYgKGVycm9yLnJlc3BvbnNlPy5zdGF0dXMgPT09IDUwMCAmJiAhb3JpZ2luYWxSZXF1ZXN0Ll9yZXRyeSkge1xuXHRcdFx0b3JpZ2luYWxSZXF1ZXN0Ll9yZXRyeSA9IHRydWU7XG5cdFx0XHRjb25zdCByZWZyZXNoVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVmcmVzaFRva2VuJyk7XG5cblx0XHRcdGlmIChyZWZyZXNoVG9rZW4pIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBDYWxsIHRoZSByZWZyZXNoIHRva2VuIGVuZHBvaW50IHdpdGggUFVUIG1ldGhvZFxuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucHV0KFxuXHRcdFx0XHRcdFx0J2h0dHBzOi8vZHVvbmdjb25nc29uLTAwMS1zaXRlMS5qdGVtcHVybC5jb20vYXBpL0F1dGgvYWNjZXNzLXRva2VuJyxcblx0XHRcdFx0XHRcdHsgcmVmcmVzaFRva2VuIH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSByZXNwb25zZS5kYXRhO1xuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NUb2tlbicsIGFjY2Vzc1Rva2VuKTtcblx0XHRcdFx0XHRvcmlnaW5hbFJlcXVlc3QuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke2FjY2Vzc1Rva2VufWA7XG5cblx0XHRcdFx0XHQvLyBSZXRyeSB0aGUgb3JpZ2luYWwgcmVxdWVzdCB3aXRoIHRoZSBuZXcgYWNjZXNzIHRva2VuXG5cdFx0XHRcdFx0cmV0dXJuIGFwaShvcmlnaW5hbFJlcXVlc3QpO1xuXHRcdFx0XHR9IGNhdGNoIChyZWZyZXNoRXJyb3IpIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVmcmVzaCB0b2tlbjonLCByZWZyZXNoRXJyb3IpO1xuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NUb2tlbicpO1xuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdyZWZyZXNoVG9rZW4nKTtcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9sb2dpbic7IC8vIFJlZGlyZWN0IHRvIGxvZ2luIG9uIGZhaWx1cmVcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG5cdH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGFwaTtcbiJdLCJuYW1lcyI6WyJheGlvcyIsImFwaSIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsInVzZSIsImNvbmZpZyIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInJlc3BvbnNlIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzIiwib3JpZ2luYWxSZXF1ZXN0IiwiX3JldHJ5IiwicmVmcmVzaFRva2VuIiwicHV0IiwiYWNjZXNzVG9rZW4iLCJkYXRhIiwic2V0SXRlbSIsInJlZnJlc2hFcnJvciIsInJlbW92ZUl0ZW0iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJQcm9taXNlIiwicmVqZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/api.js\n");

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

/***/ "next-i18next":
/*!*******************************!*\
  !*** external "next-i18next" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-i18next");

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

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

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