const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT || 5183);
const host = process.env.HOST || '127.0.0.1';
const root = path.join(process.cwd(), 'dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const requested = path.join(root, urlPath === '/' ? 'index.html' : urlPath);

    if (!requested.startsWith(root)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(requested, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      res.writeHead(200, { 'content-type': types[path.extname(requested)] || 'application/octet-stream' });
      res.end(data);
    });
  })
  .listen(port, host, () => {
    console.log(`Serving dist at http://${host}:${port}`);
  });
