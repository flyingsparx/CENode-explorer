const http = require('http');
const fs = require('fs');
const CEServer = require('../CENode/src/CEServer.js');

const servers = [];

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
    '/nodes' (request, response) {
      const data = [];
      for (const server of servers) {
        if (server && server.node && server.node.agent) {
          data.push({
            name: server.node.agent.name, 
            port: server.port,
            conceptCount: server.node.concepts.length,
            instanceCount: server.node.instances.length
          });
        }
      }
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(data));
      console.log(data);
    }
  },
  'POST': {
    '/nodes/create' (request, response) {
      getRequestBody(request, body => {
        try {
          for (const server of servers) {
            if (server && server.node && server.node.agent && (server.node.agent.name.toLowerCase() === body.agent.toLowerCase() || server.port === body.port)){
              throw new Error('An agent with this name already exists');
            }
          }
          const server = new CEServer(body.agent, body.port);
          server.start();
          servers.push(server);
          response.writeHead(200);
          response.end(JSON.stringify(body));
        }
        catch (err) {
          response.writeHead(400);
          response.end();
        }
      });
    }
  },
  'DELETE': {
    '/nodes' (request, response) {
      const name = decodeURIComponent(request.url).match(/name=(.*)/);
      if (name) {
        for (const i in servers) {
          const server = servers[i];
          if (server && server.node && server.node.agent && server.node.agent.name.toLowerCase() === name[1].toLowerCase()) {
            server.stop();
            servers.splice(i, 1);
            break; 
          }
        }
      }
      response.writeHead(200);
      response.end();
    }
  }
};

http.createServer((request, response) => {
  const reservedRoutes = ['/', '/dist/build.js', '/static'];
  if (request.method === 'GET' && reservedRoutes.indexOf(request.url) >= 0 || request.url.indexOf('/static/') === 0){
    if (request.url === '/') {
      serveFile('./index.html', response);
    }
    else {
      serveFile('.' + request.url, response);
    }
  }
  else {
    const path = request.url.indexOf('?') > -1 ? request.url.slice(0, request.url.indexOf('?')) : request.url;
    if (request.method in api) {
      if (path in api[request.method]) {
        return api[request.method][path](request, response);
      }
      response.writeHead(404);
      return response.end('Not found');
    }
    response.writeHead(405);
    response.end('Not found');
  }
}).listen(3000);
