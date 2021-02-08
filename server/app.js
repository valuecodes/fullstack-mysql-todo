const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const databaseService = require('./DatabaseService');
databaseService.connect();

app.get('/getEverything', async (request, response) => {
    const data = await databaseService.getAll();

    response.json({
        data: data
    });
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})