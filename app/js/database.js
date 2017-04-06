console.log('database');
var pg = require("pg");
var conString = "pg://postgres:er@dmin_2k17@ecoresource.ddns.net:5051/geo";
var client = new pg.Client(conString);


client.connect();

var query = client.query("SELECT * FROM test_water");
//client.query("CREATE TABLE test_water ( water_polution float, cleaned_water float)");
var count = 0, val = [];
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
/*
var async = require("async");

var storeTeamData = function (val) {
    var query = "INSERT INTO test_water (water_polution, cleaned_water) VALUES($1, $2)";

    client.connect(function(err, client, done){
        if(err) return console.log(err);

        async.map(val, function(team){
            client.query(query, [team, 0]);
        }, function(error, results){
            console.log("Finished inserts!", error, results);
            client.end();
        });
    });
};

storeTeamData(val);
*/
query.on("end", (data) => {
    console.log(data);
    client.end();
});
