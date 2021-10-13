const {join} = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config({path: join(__dirname, '../.env')})


async function dataConnect() {
    const uri = process.env.MONGO_DB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);

    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

dataConnect().catch(console.error);

// function dataConnect(method) {
//     const database = mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB
//     })
    
//     database.connect((err) => {
//         if(err) {
//             console.error(err);
//             return;
//         }
//         console.log(method,"Successful connection to database...");
//     });
    
//     //database.query()
    
//     database.end((err) => {
//         if(err) {
//             console.error(err);
//             return;
//         }
//         console.log(method, "Successful disconnection from database...");
//     });
// }

module.exports = dataConnect;