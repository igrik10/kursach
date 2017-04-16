const CONNECTION_STRING = "pg://postgres:er@dmin_2k17@ecoresource.ddns.net:5051/geo";

var pg = require("pg");
var client = new pg.Client(CONNECTION_STRING);
//var query = client.query("SELECT ST_AsGeoJSON(geom) FROM pointrivermodel limit 10");
// var query = client.query("SELECT gid FROM pointrivermodel");
var count = 0, val = [];

function insertIntoDB() {
    var query = client.query("SELECT gid FROM pointrivermodel");
    var idArray = [];
    data.rows.forEach(row => {
        idArray.push(row.gid);
    });


    for (var i = 0, arrayLength = Math.ceil(data.rowCount / 500); i < arrayLength; i++) {
        var dataArray = [];
        for (var j = 0; j < 500 * (i + 1); j++) {
            // val.push(Math.random());
            var index = (i == 0) ? j : j + (i * 500);

            dataArray.push([idArray[index], (0.5 + Math.random() * 101)]);
        }
        client.query(
            'INSERT INTO  pointrivermodel (gid, pollution_in_point) VALUES $1', Inserts('$1, $2', dataArray),
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('row inserted with id: ' + result.rows[0]);
                }

                count++;
                console.log('count = ' + count);
                if (count == arrayLength) {
                    console.log('Client will end now!!!');
                    client.end();
                }
            });
    }
}

function selectFromDB() {
    return "SELECT ST_AsGeoJSON(geom) FROM pointrivermodel limit 10";
}


client.connect();
query.on("end", (data) => {
    // let x = new Array();
    // let y = new Array();
    //
    // data.rows.forEach(row => {
    //     x.push(JSON.parse(row.st_asgeojson).coordinates[0]);
    //     y.push(JSON.parse(row.st_asgeojson).coordinates[1]);
    // });
    // console.log(x);
    // console.log(y);
    // var idArray = [];
    // data.rows.forEach(row => {
    //     idArray.push(row.gid);
    // });
    // console.log(idArray);
    client.end();
});
