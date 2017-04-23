const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const nodeStatic = require('node-static');
const file = new nodeStatic.Server('.');

const server = http.createServer((req, res) => {
    file.serve(req, res);
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end(() => { require('./app/js/mathForClearing')});
    // res.end(() => { require('./app/js/database')});
});

server.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port +'/');
});
