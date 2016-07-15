
var knex = require('knex')({
  client: global.Settings.dbClient,
  connection:  global.Settings.connectionObject
});

module.exports = knex;