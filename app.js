const http = require('http');
const fs = require('fs');

function serveFile (filename, response) {
  var fileStream = fs.createReadStream(filename);
  fileStream.pipe(response);
}

http.createServer((request, response) => {
  if (request.method === 'GET'){
    if (request.url === '/') {
      serveFile('./index.html', response);
    }
    else if (request.url === '/dist/build.js') {
      serveFile('./dist/build.js', response);
    }
  }
}).listen(3000);
