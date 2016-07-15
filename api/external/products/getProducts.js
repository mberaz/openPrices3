module.exports.do = function(req, res, next) {

  var pg = require("pg")
  var conString = global.Settings.connectionString;
  var client = new pg.Client(conString);

  client.connect();

  var query = client.query("SELECT * FROM \"Products\" ORDER BY \"Name\"");
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  
  query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    res.json(result.rows);
  });
  
};
