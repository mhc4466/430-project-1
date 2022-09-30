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

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ (() => {

eval("const handleResponse = async (response, doParse) => {\r\n    const content = document.querySelector('#content');\r\n    content.innerHTML = \"\";\r\n    \r\n    switch (response.status) {\r\n      case 200:\r\n        content.innerHTML = '<b>Success</b>';\r\n        break;\r\n      case 201: \r\n        content.innerHTML = '<b>Created</b>';\r\n        break;\r\n      case 204:\r\n        content.innerHTML = '<b>Updated (No content)</b>';\r\n        break;\r\n      case 400:\r\n        content.innerHTML = '<b>Bad request</b>';\r\n        break;\r\n      case 404:\r\n        content.innerHTML = '<b>Not found</b>';\r\n        break;\r\n      default:\r\n        content.innerHTML = '<b>Unexpected Error</b>';\r\n        break;\r\n    }\r\n    \r\n    if (doParse && response.status !== 204) {\r\n      let obj = await response.json();\r\n      console.log(obj);\r\n      \r\n      if (response.status === 200) {\r\n        content.innerHTML += `<p>${JSON.stringify(obj[\"users\"])}</p>`;\r\n      } else if (response.status !== 204) {\r\n        content.innerHTML += `<p>Message: ${obj.message}</p>`;\r\n      }\r\n    } \r\n};\r\nconst makePOSTRequest = async (form) => {\r\n  const action = form.getAttribute('action');\r\n  const method = form.getAttribute('method');\r\n  const nameField = form.querySelector('#nameField');\r\n  const ageField = form.querySelector('#ageField');\r\n  const data = `name=${nameField.value}&age=${ageField.value}`;\r\n  let response = await fetch(action, {\r\n    method: method,\r\n    headers: {\r\n      'Content-Type': 'application/x-www-form-urlencoded',\r\n      'Accept': 'application/json'\r\n    },\r\n    body: data\r\n  });\r\n  handleResponse(response, true);\r\n};\r\nconst makeRequest = async (form) => {\r\n  const urlField = form.querySelector('#urlField');\r\n  const methodField = form.querySelector('#methodSelect');\r\n  let action = urlField.value;\r\n  let method = methodField.value;\r\n  let response = await fetch(action, {\r\n    method: method,\r\n    headers: {\r\n      'Content-Type': 'application/x-www-form-urlencoded',\r\n      'Accept': 'application/json'\r\n    }\r\n  });\r\n  handleResponse(response, method === 'get');\r\n};\r\nconst init = () => {\r\n  const nameForm = document.querySelector('#nameForm');\r\n  const userForm = document.querySelector('#userForm');\r\n  const addUser = (e) => {\r\n    e.preventDefault();\r\n    makePOSTRequest(nameForm);\r\n    return false;\r\n  }\r\n  const requestUser = (e) => {\r\n    e.preventDefault();\r\n    makeRequest(userForm);\r\n    return false;\r\n  }\r\n  nameForm.addEventListener('submit', addUser);\r\n  userForm.addEventListener('submit', requestUser);\r\n}\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430-project-1/./client/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/client.js"]();
/******/ 	
/******/ })()
;