const mysql = require('mysql');

function dataConnect(method) {
    const database = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB
    })
    
    database.connect((err) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log(method,"Successful connection to database...");
    });
    
    //database.query()
    
    database.end((err) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log(method, "Successful disconnection from database...");
    });
}

module.exports = dataConnect;