const {join} = require('path');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({path: join(__dirname, '../.env')})


async function dataConnect(method, id, body) {
    const uri = process.env.MONGO_DB_URI;
    const client = new MongoClient(uri);

    if(method === "GET") {
        try {
            await client.connect();
            const result = await client.db("Kanban_Go").collection("Users").findOne({"_id": id});
            return result; 
        } catch (e) {
            console.error(e);
    
        } finally {
            await client.close();
        }
    }

    if(method === "POST") {
        try {
            await client.connect();
            const result = await client.db("Kanban_Go").collection("Users").insertOne({"_id": id, ...body});
            console.log(`New listing created with the following id: ${result.insertedId}`); 
        } catch (e) {
            console.error(e)
        } finally {
            await client.close();
        }
    }
}


module.exports = dataConnect;