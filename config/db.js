// db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Kosongkan jika tanpa password
  database: "hospital",
});

connection.connect((err) => {
  if (err) {
    console.error("Gagal connect ke database:", err);
  } else {
    console.log('Berhasil connect ke MySQL database "hospital"');
  }
});

module.exports = connection;
