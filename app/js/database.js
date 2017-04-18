const CONNECTION_STRING = "pg://postgres:er@dmin_2k17@ecoresource.ddns.net:5051/geo";

var pg = require("pg");
var sleep = require('thread-sleep');
var client = new pg.Client(CONNECTION_STRING);
var query = client.query("SELECT gid FROM pointrivermodel");
// var query = client.query("SELECT ST_AsGeoJSON(geom) FROM pointrivermodel");
var count = 0, val = [];

function Inserts(template, data) {
    if (!(this instanceof Inserts)) {
        return new Inserts(template, data);
    }
    this._rawDBType = true;
    this.formatDBType = function () {
        return data.map(d => '(' + pgp.as.format(template, d) + ')').join(',');
    };
}


function insertIntoDB(data) {
    // var query = client.query("SELECT gid FROM pointrivermodel");
    var idArray = [];
    // var index = 0;
    var updateEl = 0;
    data.rows.forEach(row => {
        idArray.push(row.gid);
    });

 // console.log([[1,2],[3,4]].map(d => '(' + d + ')').join(',')); return;
    for (let i = 0, arrayLength = Math.ceil(data.rowCount / 500); i < arrayLength; i++) {
        let dataArray = [];
            // insert = Inserts('$1, $2', dataArray);
        /* for (let j = 0; j < 500; j++) {
             index = (i == 0) ? j : j + (i * 500);
             dataArray.push([idArray[index], (0.5 + Math.random() * 101)]);
         }*/
//[dataArray.map(d => '(' + d + ')').join(',')]
        // console.log(Inserts('$1, $2', dataArray)); return;
// console.log([dataArray.map(d => '(' + d + ')').join(',')]); return;
        client.query(
            'UPDATE  pointrivermodel SET pollution_in_point = $1 WHERE gid = $2', [(0.5 + Math.random() * 101), idArray[i]],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('row update with id: ' +  idArray[i]);
                }

                console.log('count = ' + count);
                count++;
                if (count == data.rowCount) {
                    console.log('Client will end now!!!');
                    client.end();
                }

                if (updateEl == 500)
                {
                    sleep(10000);
                    updateEl = 0;
                }

                updateEl++;
            });
    }
}

function selectFromDB() {
    return "SELECT ST_AsGeoJSON(geom) FROM pointrivermodel limit 10";
}

function pushCoordinatesInArray(data) {
    let x = new Array();
    let y = new Array();

    data.rows.forEach(row => {
        x.push(JSON.parse(row.st_asgeojson).coordinates[0]);
        y.push(JSON.parse(row.st_asgeojson).coordinates[1]);
    });
    // console.log(x);
    // console.log(y);
} //done

function pushIdInArray(data) {
    let idArray = [];
    data.rows.forEach(row => {
        idArray.push(row.gid);
    });
    // console.log(idArray);
}

client.connect();
query.on("end", (data) => {
    // pushCoordinatesInArray(data);
    insertIntoDB(data);
    // client.end();
});
