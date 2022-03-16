const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'party',
    user: 'root',
    password: 'BigMilk2%'
})

module.exports = pool;