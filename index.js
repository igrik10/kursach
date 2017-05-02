const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const clearing = require('./app/js/mathForClearing');
const db = require('./app/js/database');

app.use(express.static('app'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/myaction', function (req, res) {
    clearing.setTime(req.body.time);
    clearing.setK1(req.body.k1);
    clearing.setK2(req.body.k2);
    clearing.setK3(req.body.k3);
    clearing.setSegmentsNumber(10);
    db.getPoint((response)=>{
        clearing.setWaterPolution(response['water_pollution']);
        let cleared = clearing.clear().toString();

        //db.updatePoint( response['id'], cleared );
        res.send('Result "' + cleared + '".');
    });
});

app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000/');
});