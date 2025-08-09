import mysql from "mysql2";
import dotenv from "dotenv";

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
 * 
 * @param {String} name - Name of the school
 * @param {String} address - Address of the school
 * @param {Number} latitude - Latitude of school's location
 * @param {Number} longitude - Longitude of school's location
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

const db = {
  addSchool
}

export default db;