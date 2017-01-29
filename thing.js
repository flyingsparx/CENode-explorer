let server;
function startServer(port){
  server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    if (request.method === 'GET') {
      if (request.url === '/') {
        response.write('Hey');
        response.end();
      }
    }
  });
  server.listen(port);
}

function stopServer(){
  if (server){
    server.close();
  }
}
module.exports = {startServer, stopServer};
