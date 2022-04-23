const mysql = require('mysql2');

const { DATABASE } = require('./index');

const pool = mysql.createPool({
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    user: DATABASE.USER,
    password: DATABASE.PASSWORD,
    database: DATABASE.NAME,
    debug: true
}).promise();

module.exports = pool;
