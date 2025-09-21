const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'your pg admin password',
    host: 'localhost',
    port: 5433,
    database: 'event_management'
});
module.exports = pool