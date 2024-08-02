require("dotenv").config();
const fs = require("fs");

console.log(__dirname);

const db = require("./connect");
const sql = fs.readFileSync(__dirname + "/setup.sql").toString();

db.query(sql)
  .then((data) => {
    db.end();
    console.log("Set up complete");
  })
  .catch((error) => console.log(error));
