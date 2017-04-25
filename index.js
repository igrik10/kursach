/*const http = require('http');
 const hostname = '127.0.0.1';
 const port = 3000;

 const nodeStatic = require('node-static');
 const file = new nodeStatic.Server('.');*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const clearing = require('./app/js/mathForClearing');
const db = require('./app/js/database');

app.use(express.static('app'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/myaction', function (req, res) {
    // let clearing = new Clearing();
    clearing.setTime(req.body.time);
    clearing.setSegmentsNumber(req.body.segment);
    clearing.setWaterPolution(73);
    db.getPoint();
    console.log('geo', db.getGeo());

    res.send('Result "' + clearing.clear() + '".');
});

app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000/');
});

/*
 const server = http.createServer((req, res) => {
 // res.statusCode = 200;
 // res.setHeader('Content-Type', 'text/plain');
 // res.end(() => { require('./app/js/mathForClearing')});
 // res.end(() => { require('./app/js/database')});
 file.serve(req, res);
 });

 server.listen(port, hostname, () => {
 console.log('Server running at http://' + hostname + ':' + port +'/');
 });
 */
