const dotenv = require('dotenv');
dotenv.load();
var connectionString = process.env.DATABASE_URL;

var pgp = require("pg-promise")({});

var db = pgp(connectionString);

module.exports = db;
