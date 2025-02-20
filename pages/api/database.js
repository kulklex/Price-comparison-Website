require('dotenv').config();

const mysql = require("mysql2");

// Creating a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'priceComparison',
  connectionLimit: 10,
});

/**
 * Function to execute SQL queries using a connection from the pool.
 * @param {string} sql - The SQL query to be executed.
 * @param {Array} params - An array of parameters to be used in the SQL query.
 * @returns {Promise} - A promise that resolves with the query results or rejects with an error.
 */
function query(sql, params) {
  return new Promise((resolve, reject) => {
    // Acquiring a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.query(sql, params, (queryErr, results) => {
        connection.release(); // Releasing the connection
        console.log("Connected to sql..")
        if (queryErr) {
          return reject(queryErr);
        }

        resolve(results);
      });
    });
  });
}

module.exports = {
  query,
};
