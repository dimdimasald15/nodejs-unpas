const http = require('http');
const fs = require('fs');
const host = '127.0.0.1';
const port = 3000;

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write('Error: File not found');
    } else {
      res.write(data);
    }
    res.end();
  });
};
// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/html',
  });

  const url = req.url;
  switch (url) {
    case '/about':
      renderHTML('./about.html', res);
      break;
    case '/contact':
      renderHTML('./contact.html', res);
      break;
    default:
      renderHTML('./index.html', res);
      break;
  }
});

server.listen(port, host, '', function () {
  console.log(`server is listening on port ${host}:${port}`);
});
