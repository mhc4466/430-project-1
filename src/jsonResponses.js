const example = {
  id: 'example',
  key: 'xyz987',
  question: 'Apples?',
  choiceOne: { text: 'One1', votes: 0 },
  choiceTwo: { text: 'Two2', votes: 0 },
  choiceThree: { text: 'Three3', votes: 0 },
  choiceFour: { text: 'Four4', votes: 0 },
};

const questions = { example };

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

  if (!body.id) {
    responseJSON.id = 'missingParams';
    responseJSON.message = 'Missing one or more fields';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (!questions[body.id]) {
    responseJSON.id = 'pollNotFound';
    responseJSON.message = 'The requested poll could not be found';
    return respondJSON(request, response, 404, responseJSON);
  }

  if (body.key !== questions[body.id].key) {
    responseJSON.id = 'invalidKey';
    responseJSON.message = 'An incorrect key was entered for the requested poll';
    return respondJSON(request, response, 403, responseJSON);
  }
  
  responseJSON.result = questions[body.id];
  responseJSON.message = `Retrieved poll "${questions[body.id].question}"`;
  return respondJSON(request, response, 200, responseJSON);
};

const getName = (request, response, params) => {
  const responseJSON = {};

  // If requested question can't be found, error
  if (!questions || !questions[params['/resolve?id']]) {
    responseJSON.id = 'pollNotFound';
    responseJSON.message = 'The requested poll could not be found';
    return respondJSON(request, response, 404, responseJSON);
  }

  // Otherwise, return the name requested
  responseJSON.name = questions[params['/resolve?id']].question;
  return respondJSON(request, response, 200, responseJSON);
};

const getNameMeta = (request, response, params) => {
  // If requested question can't be found, error
  if (!questions || !questions[params['/resolve?id']]) {
    return respondJSONMeta(request, response, 404);
  }

  // Otherwise, report success
  return respondJSONMeta(request, response, 200);
};

const addPoll = (request, response, body) => {
  // Preemptively declare failure, overwritten in event of success
  const responseJSON = {
    message: 'Fields not all filled (server cannot currently handle any unfilled fields).',
  };
  // Preemptively declare update, overwritten in event of new question
  let status = 204;

  // If any parameter is missing, return invalid request
  if (!body.question || !body.choiceOne || !body.choiceTwo || !body.choiceThree || !body.choiceFour
    || !body.id || !body.key) {
    responseJSON.id = 'missingParams';
    responseJSON.message = 'Missing one or more fields';
    return respondJSON(request, response, 400, responseJSON);
  }

  // Status code of "created" if question ID doesn't already exist
  if (!questions[body.id]) {
    status = 201;
    questions[body.id] = {};
  }

  // Refreshes the question entry with the given parameters. Votes cleared
  questions[body.id].id = body.id;
  questions[body.id].key = body.key;
  questions[body.id].question = body.question;
  questions[body.id].choiceOne = {
    text: body.choiceOne,
    votes: 0,
  };
  questions[body.id].choiceTwo = {
    text: body.choiceTwo,
    votes: 0,
  };
  questions[body.id].choiceThree = {
    text: body.choiceThree,
    votes: 0,
  };
  questions[body.id].choiceFour = {
    text: body.choiceFour,
    votes: 0,
  };

  if (status === 201) {
    responseJSON.message = `Created question "${body.question}" successfully`;
    return respondJSON(request, response, status, responseJSON);
  }
  return respondJSONMeta(request, response, status);
};

const getQuestion = (request, response, params) => {
  const responseJSON = {};

  // If requested question can't be found, error
  if (!questions || !questions[params['/question?id']]) {
    responseJSON.id = 'pollNotFound';
    responseJSON.message = 'The requested poll could not be found';
    return respondJSON(request, response, 404, responseJSON);
  }

  // Otherwise, return the whole question
  responseJSON.question = questions[params['/question?id']];
  return respondJSON(request, response, 200, responseJSON);
};

const getQuestionMeta = (request, response, params) => {
  // If requested question can't be found, error
  if (!questions || !questions[params['/question?id']]) {
    return respondJSONMeta(request, response, 404);
  }

  // Otherwise, report success
  return respondJSONMeta(request, response, 200);
};

const acceptVote = (request, response, body) => {
  const responseJSON = {};

  // If requested question can't be found, error
  if (!questions || !questions[body.id]) {
    responseJSON.id = 'pollNotFound';
    responseJSON.message = 'The requested poll could not be found';
    return respondJSON(request, response, 404, responseJSON);
  }

  // Otherwise, update the votes and inform success
  switch (body.choice) {
    case '1':
      questions[body.id].choiceOne.votes++;
      break;
    case '2':
      questions[body.id].choiceTwo.votes++;
      break;
    case '3':
      questions[body.id].choiceThree.votes++;
      break;
    case '4':
      questions[body.id].choiceFour.votes++;
      break;
    default:
      console.log('Choice parameters was not correct');
      break;
  }
  responseJSON.message = 'Successfully Voted';
  return respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  getResults,
  getName,
  getNameMeta,
  addPoll,
  getQuestion,
  getQuestionMeta,
  acceptVote,
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
