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

eval("const handleResponse = async (response, doParse) => {\r\n    const content = document.querySelector('#content');\r\n    content.innerHTML = \"\";\r\n    \r\n    switch (response.status) {\r\n      case 200:\r\n        content.innerHTML = '<b>Success</b>';\r\n        break;\r\n      case 201: \r\n        content.innerHTML = '<b>Created</b>';\r\n        break;\r\n      case 204:\r\n        content.innerHTML = '<b>Updated (No content)</b>';\r\n        break;\r\n      case 400:\r\n        content.innerHTML = '<b>Bad request</b>';\r\n        break;\r\n      case 404:\r\n        content.innerHTML = '<b>Not found</b>';\r\n        break;\r\n      default:\r\n        content.innerHTML = '<b>Unexpected Error</b>';\r\n        break;\r\n    }\r\n    \r\n    if (doParse && response.status !== 204) {\r\n      let obj = await response.json();\r\n      console.log(obj);\r\n      \r\n      if (response.status === 200) {\r\n        content.innerHTML += `<p>${JSON.stringify(obj[\"users\"])}</p>`;\r\n      } else if (response.status !== 204) {\r\n        content.innerHTML += `<p>Message: ${obj.message}</p>`;\r\n      }\r\n    } \r\n};\r\n\r\nconst handleResult = async (response) => {\r\n  handleResponse(response);\r\n  let results = document.querySelector('#results');\r\n  results.innerHTML = '';\r\n\r\n  if (response.status !== 200) {\r\n    results.innerHTML += '<h2>Could not retrieve results</h2>';\r\n  } else {\r\n    let obj = await response.json();\r\n    console.log(obj);\r\n    let result = obj.result;\r\n\r\n    results.innerHTML += '<h2>Results:</h2>';\r\n    results.innerHTML += `<h3>${result.question}</h3>`;\r\n    results.innerHTML += `<b>${result.choiceOne.text}: </b>${result.choiceOne.votes}<br>`;\r\n    results.innerHTML += `<b>${result.choiceTwo.text}: </b>${result.choiceTwo.votes}<br>`;\r\n    results.innerHTML += `<b>${result.choiceThree.text}: </b>${result.choiceThree.votes}<br>`;\r\n    results.innerHTML += `<b>${result.choiceFour.text}: </b>${result.choiceFour.votes}<br>`;\r\n  }\r\n\r\n}\r\n\r\nconst submitQuestion = async (form) => {\r\n  const action = form.getAttribute('action');\r\n  const method = form.getAttribute('method');\r\n\r\n  const questionField = form.querySelector('#questionField');\r\n  const choiceOneField = form.querySelector('#choiceOneField');\r\n  const choiceTwoField = form.querySelector('#choiceTwoField');\r\n  const choiceThreeField = form.querySelector('#choiceThreeField');\r\n  const choiceFourField = form.querySelector('#choiceFourField');\r\n  const keyField = form.querySelector('#keyField');\r\n\r\n  let data = `question=${questionField.value}`;\r\n  data += `&choiceOne=${choiceOneField.value}`;\r\n  data += `&choiceTwo=${choiceTwoField.value}`;\r\n  data += `&choiceThree=${choiceThreeField.value}`;\r\n  data += `&choiceFour=${choiceFourField.value}`;\r\n  data += `&key=${keyField.value}`;\r\n\r\n  let response = await fetch(action, {\r\n    method: method,\r\n    headers: {\r\n      'Content-Type': 'application/x-www-form-urlencoded',\r\n      'Accept': 'application/json'\r\n    },\r\n    body: data\r\n  });\r\n  handleResponse(response, true);\r\n};\r\n\r\nconst makeRequest = async (form) => {\r\n  const action = form.getAttribute('action');\r\n  const method = form.getAttribute('method');\r\n\r\n  const keyField = form.querySelector('#keyField');\r\n\r\n  const data = `key=${keyField.value}`;\r\n\r\n  let response = await fetch(action, {\r\n    method: method,\r\n    headers: {\r\n      'Content-Type': 'application/x-www-form-urlencoded',\r\n      'Accept': 'application/json'\r\n    },\r\n    body: data\r\n  });\r\n  handleResult(response);\r\n};\r\n\r\nconst init = () => {\r\n  const createPollForm = document.querySelector('#createPollForm');\r\n  const getPollForm = document.querySelector('#getPollForm');\r\n  const addPoll = (e) => {\r\n    e.preventDefault();\r\n    submitQuestion(createPollForm);\r\n    return false;\r\n  }\r\n  const getPoll = (e) => {\r\n    e.preventDefault();\r\n    makeRequest(getPollForm);\r\n    return false;\r\n  }\r\n  createPollForm.addEventListener('submit', addPoll);\r\n  getPollForm.addEventListener('submit', getPoll);\r\n}\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430-project-1/./client/client.js?");

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