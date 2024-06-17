"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/payment_success/page",{

/***/ "(app-client)/./app/components/PaymentSuccess.tsx":
/*!*******************************************!*\
  !*** ./app/components/PaymentSuccess.tsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ PaymentSuccess; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _lib_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/cart */ \"(app-client)/./lib/cart.ts\");\n/* harmony import */ var _utils_cartStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/cartStorage */ \"(app-client)/./utils/cartStorage.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/store */ \"(app-client)/./app/store/store.ts\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/image */ \"(app-client)/./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Button */ \"(app-client)/./app/components/Button.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction PaymentSuccess() {\n    _s();\n    const user = (0,_store_store__WEBPACK_IMPORTED_MODULE_4__.useVinaTeaStore)((state)=>state.user);\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        if (user) {\n            (0,_utils_cartStorage__WEBPACK_IMPORTED_MODULE_2__.clearLocalCart)();\n            const clearCart = async ()=>{\n                try {\n                    await (0,_lib_cart__WEBPACK_IMPORTED_MODULE_1__.clearDBCart)(user.accessToken);\n                    console.log(\"Cleared database cart\");\n                } catch (error) {\n                    console.error(error);\n                }\n            };\n            clearCart();\n        }\n    }, [\n        user\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"mx-[20%] rounded-2xl bg-white p-4 text-center\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mx-auto my-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 py-5\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_5___default()), {\n                    src: \"/images/green-mark.jpg\",\n                    width: 512,\n                    height: 512,\n                    alt: \"Payment OK\",\n                    className: \"h-12 w-12 rounded-full\"\n                }, void 0, false, {\n                    fileName: \"D:\\\\NextJS\\\\OnlineFoodStore\\\\frontend\\\\app\\\\components\\\\PaymentSuccess.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\NextJS\\\\OnlineFoodStore\\\\frontend\\\\app\\\\components\\\\PaymentSuccess.tsx\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-lg text-gray-500\",\n                children: \"Payment Success!\"\n            }, void 0, false, {\n                fileName: \"D:\\\\NextJS\\\\OnlineFoodStore\\\\frontend\\\\app\\\\components\\\\PaymentSuccess.tsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"h-24 w-24 bg-gray-500\"\n            }, void 0, false, {\n                fileName: \"D:\\\\NextJS\\\\OnlineFoodStore\\\\frontend\\\\app\\\\components\\\\PaymentSuccess.tsx\",\n                lineNumber: 41,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"Your payment has been processed successfully.\"\n            }, void 0, false, {\n                fileName: \"D:\\\\NextJS\\\\OnlineFoodStore\\\\frontend\\\\app\\\\components\\\\PaymentSuccess.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"w-10\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Button__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                    label: \"Go to HomePage\",\n                    handleClick: ()=>window.location.href = \"/\"\n                }, void 0, false, {\n                    fileName: \"D:\\\\NextJS\\\\OnlineFoodStore\\\\frontend\\\\app\\\\components\\\\PaymentSuccess.tsx\",\n                    lineNumber: 44,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\NextJS\\\\OnlineFoodStore\\\\frontend\\\\app\\\\components\\\\PaymentSuccess.tsx\",\n                lineNumber: 43,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\NextJS\\\\OnlineFoodStore\\\\frontend\\\\app\\\\components\\\\PaymentSuccess.tsx\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, this);\n}\n_s(PaymentSuccess, \"twMu5JIUZaFqnWaaBGxNNTLFqDU=\", false, function() {\n    return [\n        _store_store__WEBPACK_IMPORTED_MODULE_4__.useVinaTeaStore\n    ];\n});\n_c = PaymentSuccess;\nvar _c;\n$RefreshReg$(_c, \"PaymentSuccess\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vYXBwL2NvbXBvbmVudHMvUGF5bWVudFN1Y2Nlc3MudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUN5QztBQUNZO0FBQ1o7QUFDUTtBQUNsQjtBQUNHO0FBRW5CLFNBQVNPOztJQUN0QixNQUFNQyxPQUFPSiw2REFBZUEsQ0FBQyxDQUFDSyxRQUFVQSxNQUFNRDtJQUU5Q0wsZ0RBQVNBLENBQUM7UUFDUixJQUFJSyxNQUFNO1lBQ1JQLGtFQUFjQTtZQUVkLE1BQU1TLFlBQVk7Z0JBQ2hCLElBQUk7b0JBQ0YsTUFBTVYsc0RBQVdBLENBQUNRLEtBQUtHO29CQUN2QkMsUUFBUUMsSUFBSTtnQkFDZCxFQUFFLE9BQU9DLE9BQU87b0JBQ2RGLFFBQVFFLE1BQU1BO2dCQUNoQjtZQUNGO1lBQ0FKO1FBQ0Y7SUFDRixHQUFHO1FBQUNGO0tBQUs7SUFFVCxxQkFDRSw4REFBQ087UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNEO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDWCxtREFBS0E7b0JBQ0pZLEtBQUk7b0JBQ0pDLE9BQU87b0JBQ1BDLFFBQVE7b0JBQ1JDLEtBQUk7b0JBQ0pKLFdBQVU7Ozs7Ozs7Ozs7OzBCQUlkLDhEQUFDSztnQkFBR0wsV0FBVTswQkFBd0I7Ozs7OzswQkFDdEMsOERBQUNNO2dCQUFFTixXQUFVOzs7Ozs7MEJBQ2IsOERBQUNNOzBCQUFFOzs7Ozs7MEJBQ0gsOERBQUNDO2dCQUFLUCxXQUFVOzBCQUNkLDRFQUFDViwrQ0FBVUE7b0JBQ1RrQixPQUFPO29CQUNQQyxhQUFhLElBQU9DLE9BQU9DLFNBQVNDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS3JEO0dBMUN3QnJCOztRQUNUSCx5REFBZUE7OztLQURORyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29tcG9uZW50cy9QYXltZW50U3VjY2Vzcy50c3g/MzIxNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IHsgY2xlYXJEQkNhcnQgfSBmcm9tIFwiQC9saWIvY2FydFwiO1xyXG5pbXBvcnQgeyBjbGVhckxvY2FsQ2FydCB9IGZyb20gXCJAL3V0aWxzL2NhcnRTdG9yYWdlXCI7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlVmluYVRlYVN0b3JlIH0gZnJvbSBcIi4uL3N0b3JlL3N0b3JlXCI7XHJcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xyXG5pbXBvcnQgUGlsbEJ1dHRvbiBmcm9tIFwiLi9CdXR0b25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBheW1lbnRTdWNjZXNzKCkge1xyXG4gIGNvbnN0IHVzZXIgPSB1c2VWaW5hVGVhU3RvcmUoKHN0YXRlKSA9PiBzdGF0ZS51c2VyKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgIGNsZWFyTG9jYWxDYXJ0KCk7XHJcblxyXG4gICAgICBjb25zdCBjbGVhckNhcnQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGF3YWl0IGNsZWFyREJDYXJ0KHVzZXIuYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJDbGVhcmVkIGRhdGFiYXNlIGNhcnRcIik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgY2xlYXJDYXJ0KCk7XHJcbiAgICB9XHJcbiAgfSwgW3VzZXJdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXgtWzIwJV0gcm91bmRlZC0yeGwgYmctd2hpdGUgcC00IHRleHQtY2VudGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXgtYXV0byBteS00IGZsZXggaC0yNCB3LTI0IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYmctZ3JlZW4tMTAwIHB5LTVcIj5cclxuICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgIHNyYz1cIi9pbWFnZXMvZ3JlZW4tbWFyay5qcGdcIlxyXG4gICAgICAgICAgd2lkdGg9ezUxMn1cclxuICAgICAgICAgIGhlaWdodD17NTEyfVxyXG4gICAgICAgICAgYWx0PVwiUGF5bWVudCBPS1wiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJoLTEyIHctMTIgcm91bmRlZC1mdWxsXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LWxnIHRleHQtZ3JheS01MDBcIj5QYXltZW50IFN1Y2Nlc3MhPC9oMT5cclxuICAgICAgPHAgY2xhc3NOYW1lPVwiaC0yNCB3LTI0IGJnLWdyYXktNTAwXCI+PC9wPlxyXG4gICAgICA8cD5Zb3VyIHBheW1lbnQgaGFzIGJlZW4gcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS48L3A+XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMTBcIj5cclxuICAgICAgICA8UGlsbEJ1dHRvblxyXG4gICAgICAgICAgbGFiZWw9e1wiR28gdG8gSG9tZVBhZ2VcIn1cclxuICAgICAgICAgIGhhbmRsZUNsaWNrPXsoKSA9PiAod2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIil9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiY2xlYXJEQkNhcnQiLCJjbGVhckxvY2FsQ2FydCIsIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlVmluYVRlYVN0b3JlIiwiSW1hZ2UiLCJQaWxsQnV0dG9uIiwiUGF5bWVudFN1Y2Nlc3MiLCJ1c2VyIiwic3RhdGUiLCJjbGVhckNhcnQiLCJhY2Nlc3NUb2tlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImRpdiIsImNsYXNzTmFtZSIsInNyYyIsIndpZHRoIiwiaGVpZ2h0IiwiYWx0IiwiaDEiLCJwIiwic3BhbiIsImxhYmVsIiwiaGFuZGxlQ2xpY2siLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./app/components/PaymentSuccess.tsx\n"));

/***/ })

});