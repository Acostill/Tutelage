var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/tutelage";
var db = pgp(connectionString);

module.exports = db;
  