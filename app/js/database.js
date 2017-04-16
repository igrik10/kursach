const CONNECTION_STRING = "pg://postgres:er@dmin_2k17@ecoresource.ddns.net:5051/geo";

var pg = require("pg");
var client = new pg.Client(CONNECTION_STRING);
var query = client.query("SELECT ST_AsGeoJSON(geom) FROM pointrivermodel limit 10");
var count = 0, val = [];

function insertIntoDB(){
    for ( var i=0; i < 20;  i++)
    {
        val.push(Math.random());
        /*    client.query(
         'INSERT INTO test_water (water_polution, cleaned_water) VALUES($1, $2)', [Math.random(), 0],
         function(err, result) {
         if (err) {
         console.log(err);
         } else {
         console.log('row inserted with id: ' + result.rows[0].id);
         }

         count++;
         console.log('count = ' + count);
         if (count == 20) {
         console.log('Client will end now!!!');
         client.end();
         }
         });*/
    }
}

function selectFromDB(){
    return "SELECT ST_AsGeoJSON(geom) FROM pointrivermodel limit 10";
}

client.connect();
query.on("end", (data) => {
    let x = new Array();
    let y = new Array();

    data.rows.forEach(row => {
        x.push(JSON.parse(row.st_asgeojson).coordinates[0]);
        y.push(JSON.parse(row.st_asgeojson).coordinates[1]);
    });

    console.log(x);
    console.log(y);
    client.end();
});
