// File establishes connection to database

const { Client } = require("pg");

const audio = "audiofile";
const client = new Client(`postgres://localhost:5432/${audio}`);

// export for use in other files
module.exports = client;
