const CONNECTION_STRING = "pg://postgres:er@dmin_2k17@ecoresource.ddns.net:5051/geo";
function Db() {
    this.pg = require("pg");
    this.client = new this.pg.Client(CONNECTION_STRING);
    this.getPoint = function (callback) {
        let $this = this, point = [];
        $this.client.connect();
        $this.client.query("SELECT gid, ST_AsGeoJSON(geom) as geom, water_pollution FROM river_pollution " +
            "WHERE water_pollution <> '' AND water_pollution IS NOT NULL LIMIT 1", [],
            function (err, res) {
                if (err) {
                    console.log(err);
                }

                res.rows.forEach(row => {
                    point['id'] = row.gid;
                    point['geom'] = JSON.parse(row.geom).coordinates;
                    point['water_pollution'] = parseFloat(row.water_pollution);
                    callback(point);
                });
                $this.client.end();
            });
    };
    this.updatePoint = function (id, value) {
        let $this = this;
        $this.client.connect();
        $this.client.query("UPDATE river_pollution " +
            "SET pollution_in_point_after_clearing = $2 WHERE gid = $1", [id, value],
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('row update with id: ' + id);
                }
                console.log('Client will end now!!!');
                $this.client.end();
            }
        );
    };
}

module.exports = new Db();

/*
var pg = require("pg");
var sleep = require('thread-sleep');
var client = new pg.Client(CONNECTION_STRING);
// var query = client.query("SELECT ST_AsGeoJSON(geom) FROM ecopoint1");
var count = 0, val = [];

function inserts(template, data) {
    if (!(this instanceof Inserts)) {
        return new Inserts(template, data);
    }
    this._rawDBType = true;
    this.formatDBType = function () {
        return data.map(d => '(' + pgp.as.format(template, d) + ')').join(',');
    };
}
function sliceInsert() {
    let dataArray = [];
    insert = inserts('$1, $2', dataArray);
    for (let j = 0; j < 500; j++) {
        index = (i == 0) ? j : j + (i * 500);
        dataArray.push([idArray[index], (0.5 + Math.random() * 101)]);
    }
    [dataArray.map(d => '(' + d + ')').join(',')]
    console.log(Inserts('$1, $2', dataArray));
    return;
    console.log([dataArray.map(d => '(' + d + ')').join(',')]);
    return;
}
function insertIntoDB() {
}
function updateDB(data) {
    var idArray = [];
    var updateEl = 0;
    data.rows.forEach(row => {
        idArray.push(row.gid);
    });

    for (let i = 0, arrayLength = Math.ceil(data.rowCount / 500); i < arrayLength; i++) {
        let dataArray = [];
        client.query(
            'UPDATE  pointrivermodel SET pollution_in_point = $1 WHERE gid = $2', [(0.5 + Math.random() * 101), idArray[i]],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('row update with id: ' + idArray[i]);
                }

                console.log('count = ' + count);
                count++;
                if (count == data.rowCount) {
                    console.log('Client will end now!!!');
                    client.end();
                }

                if (updateEl == 500) {
                    sleep(10000);
                    updateEl = 0;
                }

                updateEl++;
            });
    }
}
function pushCoordinatesInArray(data) {
    let x = new Array();
    let y = new Array();

    data.rows.forEach(row => {
        x.push(JSON.parse(row.st_asgeojson).coordinates[0]);
        y.push(JSON.parse(row.st_asgeojson).coordinates[1]);
    });
}
function pushIdInArray(data) {
    let idArray = [];
    data.rows.forEach(row => {
        idArray.push(row.gid);
    });
}
*/

/*client.connect();
 query.on("end", (data) => {
 console.log(data);
 client.end();
 });*/
