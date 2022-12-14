const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../hosted/create.html`);
const home = fs.readFileSync(`${__dirname}/../hosted/home.html`);

const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const homeCss = fs.readFileSync(`${__dirname}/../hosted/home.css`);
const createCss = fs.readFileSync(`${__dirname}/../hosted/create.css`);
const resultsCss = fs.readFileSync(`${__dirname}/../hosted/results.css`);
const pollCss = fs.readFileSync(`${__dirname}/../hosted/poll.css`);

const creator = fs.readFileSync(`${__dirname}/../hosted/create.html`);
const results = fs.readFileSync(`${__dirname}/../hosted/results.html`);
const poll = fs.readFileSync(`${__dirname}/../hosted/poll.html`);
const notFoundPage = fs.readFileSync(`${__dirname}/../hosted/404.html`);

const bundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);
const homeJS = fs.readFileSync(`${__dirname}/../client/home.js`);
const createJS = fs.readFileSync(`${__dirname}/../client/create.js`);
const resultsJS = fs.readFileSync(`${__dirname}/../client/results.js`);
const pollJS = fs.readFileSync(`${__dirname}/../client/poll.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getHome = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(home);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getHomeCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(homeCss);
  response.end();
};

const getCreateCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(createCss);
  response.end();
};

const getResultsCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(resultsCss);
  response.end();
};

const getPollCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(pollCss);
  response.end();
};

const getPoll = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(poll);
  response.end();
};

const getCreator = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(creator);
  response.end();
};

const getResults = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(results);
  response.end();
};

const notFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(notFoundPage);
  response.end();
};

const getBundle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(bundle);
  response.end();
};

const getHomeJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(homeJS);
  response.end();
};

const getCreateJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(createJS);
  response.end();
};

const getResultsJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(resultsJS);
  response.end();
};

const getPollJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(pollJS);
  response.end();
};

module.exports = {
  getIndex,
  getHome,
  getCSS,
  getHomeCSS,
  getCreateCSS,
  getResultsCSS,
  getPollCSS,
  getPoll,
  getCreator,
  getResults,
  notFound,
  getBundle,
  getHomeJS,
  getCreateJS,
  getResultsJS,
  getPollJS,
};
