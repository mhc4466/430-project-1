const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const creator = fs.readFileSync(`${__dirname}/../hosted/create.html`);
const notFoundPage = fs.readFileSync(`${__dirname}/../hosted/404.html`);
const bundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getCreator = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(creator);
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

module.exports = {
  getIndex,
  getCSS,
  getCreator,
  notFound,
  getBundle,
};
