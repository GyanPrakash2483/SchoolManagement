import mysql from "mysql2";
import dotenv from "dotenv";
import "./types.js"

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "school"
});


// Initialize database
connection.query(
  `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      latitude FLOAT,
      longitude FLOAT
    )
  `,
  (err, res) => {
    if(err) throw err;
    console.log("Database Initialized.")
  }
)


/**
 * Adds a school's information to database.
 * Expect's validated inputs
 * Throws error when fails
 * 
 * @param {string} name - Name of the school
 * @param {string} address - Address of the school
 * @param {number} latitude - Latitude of school's location
 * @param {number} longitude - Longitude of school's location
 */
const addSchool = (name, address, latitude, longitude) => {
  connection.query(
    `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `,
    [name, address, latitude, longitude],
    (err, res) => {
      if(err) throw err;
      else console.log(res);
    }
  )
}

/**
 * Returns all schools stored in database
 * @returns {Promise<School[]>}
 */
const getSchools = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * from schools",
      (err, results) => {
        if(err) return reject(err);
        resolve(results);
      }
    )
  })
}

/**
 * Deletes all schools stored in the database
 */
const clearRecords = () => {
  connection.query(
    `
      DELETE FROM schools
    `,
    (err, res) => {
      if (err) throw err;
      else console.log(res);
    }
  );
}

const db = {
  addSchool,
  getSchools,
  clearRecords
}

export default db;