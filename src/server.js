const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getHome,
    '/home': htmlHandler.getHome,
    '/style.css': htmlHandler.getCSS,
    '/home.css': htmlHandler.getHomeCSS,
    '/create.css': htmlHandler.getCreateCSS,
    '/results.css': htmlHandler.getResultsCSS,
    '/poll.css': htmlHandler.getPollCSS,
    '/poll': htmlHandler.getPoll,
    '/question': jsonHandler.getQuestion,
    '/create': htmlHandler.getCreator,
    '/results': htmlHandler.getResults,
    '/resolve': jsonHandler.getName,
    '/bundle.js': htmlHandler.getBundle,
    '/home.js': htmlHandler.getHomeJS,
    '/create.js': htmlHandler.getCreateJS,
    '/results.js': htmlHandler.getResultsJS,
    '/poll.js': htmlHandler.getPollJS,
    notFound: htmlHandler.notFound,
  },
  HEAD: {
    '/resolve': jsonHandler.getNameMeta,
    '/question': jsonHandler.getQuestionMeta,
    notFound: jsonHandler.notFoundMeta,
  },
  POST: {
    '/addPoll': jsonHandler.addPoll,
    '/getResults': jsonHandler.getResults, // Written as POST to accept a secure key
    '/vote': jsonHandler.acceptVote,
  },
};

const parseBody = (request, response, callback) => {
  const body = [];

  request.on('error', (error) => {
    console.dir(error);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyObj = query.parse(bodyString);
    callback(request, response, bodyObj);
  });
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(request.url);
  console.log(parsedUrl.pathname);

  // If user goes directly to URL, attempt a GET request
  if (!urlStruct[request.method]) {
    if (urlStruct.GET[parsedUrl]) {
      urlStruct.GET[parsedUrl](request, response);
    } else {
      // If they go directly to a URL but it's not one handled by GET, then 404
      urlStruct.GET.notFound(request, response);
    }
  }

  // An accepted request method is given

  // If the method is POST, parse the body before giving it to the json handler
  if (request.method === 'POST' && urlStruct.POST[parsedUrl.pathname]) {
    parseBody(request, response, urlStruct.POST[parsedUrl.pathname]);
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    // If it's any other accepted method, handle it normally
    // Functions that need params (i.e. non-POST, with an ID):
    if (parsedUrl.pathname === '/resolve' || parsedUrl.pathname === '/question') {
      console.log(params);
      urlStruct[request.method][parsedUrl.pathname](request, response, params);
    // The rest
    } else {
      urlStruct[request.method][parsedUrl.pathname](request, response);
    }
  } else {
    // Unaccepted method
    urlStruct.GET.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
