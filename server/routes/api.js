const express = require('express');
const router = express.Router();

router.get('/user/:id', async (req, res) => {
    try {
        const result = await req.app.locals.client.db("Kanban_Go").collection("Users").findOne({"_id": req.params.id});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
})

router.post('/user/:id', async (req, res) => {
    try {
        const result = await req.app.locals.client.db("Kanban_Go").collection("Users").insertOne({"_id": req.params.id, ...req.body});
        res.send(`Created listing: ${result.insertedId}`); 
    } catch (e) {
        console.error(e)
    }
})

router.put('/user/:id', async (req, res) => {
    try {
        const result = await req.app.locals.client.db("Kanban_Go").collection("Users").updateOne({"_id": req.params.id}, {$set: req.body});
        res.send(result);
    } catch (e) {
        console.error(e)
    }
})

module.exports = router;