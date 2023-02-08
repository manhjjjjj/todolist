const mysql2 = require("mysql2");

let poot = mysql2.createPool({
    user:"root",
    password:"lebamanh",
    host:"localhost",
    database:"todo_schema",
});

module.exports = poot.promise();
