
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  host: '127.0.0.1', // Replace with your database host
  user: 'root', // Replace with your database username
  password: 'Myfriendisdn1!', // Replace with your database password
  database: 'DatabaseManagementSystems' // Replace with your database name
});

// Export the pool to be used in other modules
module.exports = pool;

