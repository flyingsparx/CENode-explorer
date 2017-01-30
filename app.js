const http = require('http');
const fs = require('fs');
const CEServer = require('../CENode/src/CEServer.js');

const nodes = [];

function getRequestBody (request, callback) {
  let body = '';
  request.on('data', chunk => body += chunk);
  request.on('end', () => callback(JSON.parse(body)));
}

function serveFile (filename, response) {
  var fileStream = fs.createReadStream(filename);
  fileStream.pipe(response);
}

const api = {
  'GET': {
    
  },
  'POST': {
    '/nodes/create' (request, response) {
      getRequestBody(request, body => {
        try {
          CEServer.startServer(body.agent, body.port);
          response.writeHead(200);
          response.end(JSON.stringify(body));
        }
        catch (err) {
          response.writeHead(400);
          response.end();
        }
      });
    }
  }
};

http.createServer((request, response) => {
  const reservedRoutes = ['/', '/dist/build.js'];
  if (request.method === 'GET' && reservedRoutes.indexOf(request.url) >= 0){
    if (request.url === '/') {
      serveFile('./index.html', response);
    }
    else if (request.url === '/dist/build.js') {
      serveFile('./dist/build.js', response);
    }
  }
  else {
    if (request.method in api) {
      if (request.url in api[request.method]) {
        return api[request.method][request.url](request, response);
      }
      response.writeHead(404);
      return response.end('Not found');
    }
    response.writeHead(405);
    response.end('Not found');
  }
}).listen(3000);
