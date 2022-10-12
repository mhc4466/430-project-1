/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/home.js":
/*!************************!*\
  !*** ./client/home.js ***!
  \************************/
/***/ (() => {

eval("const updatePrompt = (source) => {\r\n    const prompt = document.querySelector('#prompt');\r\n    \r\n    prompt.innerHTML = \"\";\r\n    let form = document.createElement('form');\r\n\r\n    //For responding to or viewing results of a poll, prompt user for extra details\r\n    switch (source) {\r\n        case 'respond':\r\n            prompt.innerHTML += \"<h2>Enter Poll ID</h2>\";\r\n            form.id = \"respondPollForm\";\r\n            form.action = \"/poll\";\r\n            form.method = \"get\";\r\n            form.innerHTML += \r\n                `<label for=\"id\">ID: </label>\r\n                <input id=\"idField\" type=\"text\" name=\"id\" value=\"ABC123\"/>\r\n                <input type=\"submit\" value=\"Find Poll\" />`;\r\n            prompt.appendChild(form);\r\n            break;\r\n        case 'create':\r\n            let x = 1;\r\n            break;\r\n        case 'results':\r\n            prompt.innerHTML += \"<h2>Enter Poll ID</h2>\";\r\n            form.id = \"resultsPollForm\";\r\n            form.action = \"/results\";\r\n            form.method = \"get\";\r\n            form.innerHTML += \r\n                `<label for=\"id\">ID: </label>\r\n                <input id=\"idField\" type=\"text\" name=\"id\" value=\"ABC123\"/>\r\n                <input type=\"submit\" value=\"Find Poll Results\" />`;\r\n            prompt.appendChild(form);\r\n            break;\r\n        default:\r\n            console.log(\"Unexpected client error\");\r\n            break;\r\n    }\r\n}\r\n\r\nconst init = () => {\r\n    const respondButton = document.querySelector('#respondButton');\r\n    const createButton = document.querySelector('#createButton');\r\n    const resultsButton = document.querySelector('#resultsButton');\r\n\r\n    respondButton.addEventListener('click', () => updatePrompt('respond'));\r\n    createButton.addEventListener('click', () => updatePrompt('create'));\r\n    resultsButton.addEventListener('click', () => updatePrompt('results'));\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430-project-1/./client/home.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/home.js"]();
/******/ 	
/******/ })()
;