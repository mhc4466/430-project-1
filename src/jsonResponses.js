const questions = {};
const users = {};

const respondJSON = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getResults = (request, response, body) => {
  const responseJSON = {};

  if (!body.key) {
    responseJSON.id = 'missingParams';
    responseJSON.message = 'Missing one or more fields';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (!questions[body.key]) {
    responseJSON.id = 'pollNotFound';
    responseJSON.message = 'The requested poll could not be found';
    return respondJSON(request, response, 404, responseJSON);
  }

  responseJSON.result = questions[body.key];
  responseJSON.message = `Retrieved poll "${questions[body.key].question}"`;
  return respondJSON(request, response, 200, responseJSON);
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  respondJSON(request, response, 200, responseJSON);
};

const addPoll = (request, response, body) => {
  const responseJSON = {
    message: 'Fields not all filled (server cannot currently handle any unfilled fields).',
  };
  let status = 204;

  if (!body.question || !body.choiceOne || !body.choiceTwo || !body.choiceThree || !body.choiceFour
    || !body.key) {
    responseJSON.id = 'missingParams';
    responseJSON.message = 'Missing one or more fields';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (!questions[body.key]) {
    status = 201;
    questions[body.key] = {};
  }

  questions[body.key].key = body.key;
  questions[body.key].question = body.question;
  questions[body.key].choiceOne = { text: body.choiceOne };
  questions[body.key].choiceOne.votes = 0;
  questions[body.key].choiceTwo = { text: body.choiceTwo };
  questions[body.key].choiceTwo.votes = 0;
  questions[body.key].choiceThree = { text: body.choiceThree };
  questions[body.key].choiceThree.votes = 0;
  questions[body.key].choiceFour = { text: body.choiceFour };
  questions[body.key].choiceFour.votes = 0;

  if (status === 201) {
    responseJSON.message = `Created question "${body.question}" successfully`;
    return respondJSON(request, response, status, responseJSON);
  }
  return respondJSONMeta(request, response, status);
};

module.exports = {
  getResults,
  getUsers,
  addPoll,
};
// const getUsersMeta = (request, response) => {
//  respondJSONMeta(request, response, 200);
// };
//
// const notReal = (request, response) => {
//  const responseJSON = {
//    id: 'notFound',
//    message: 'The page you are looking for could not be found',
//  };
//  respondJSON(request, response, 404, responseJSON);
// };
//
// const notRealMeta = (request, response) => {
//  respondJSONMeta(request, response, 404);
// };
//
// const notFound = (request, response) => {
//  const responseJSON = {
//    id: 'notFound',
//    message: 'The page you are looking for could not be found',
//  };
//  respondJSON(request, response, 404, responseJSON);
// };
//
// const notFoundMeta = (request, response) => {
//  respondJSONMeta(request, response, 404);
// };
//
// const addUser = (request, response, body) => {
//  const responseJSON = {
//    message: 'Name and age are both required.',
//  };
//  let status = 204;
//
//  if (!body.name || !body.age) {
//    responseJSON.id = 'missingParams';
//    responseJSON.message = 'Missing name and/or age';
//    return respondJSON(request, response, 400, responseJSON);
//  }
//
//  if (!users[body.name]) {
//    status = 201;
//    users[body.name] = {};
//  }
//
//  users[body.name].name = body.name;
//  users[body.name].age = body.age;
//
//  if (status === 201) {
//    responseJSON.message = 'Created successfully';
//    return respondJSON(request, response, status, responseJSON);
//  }
//  return respondJSONMeta(request, response, status);
// };
//
//
// module.exports = {
//  getUsers,
//  getUsersMeta,
//  notReal,
//  notRealMeta,
//  notFound,
//  notFoundMeta,
//  addUser,
// };
