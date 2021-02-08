const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const databaseService = require('./DatabaseService');
databaseService.connect();

app.post('/insert', async (req,res) =>{
    const { user,todo } = req.body
    console.log(req.body)
    const result = await databaseService.insertNewTodo(user,todo);
    res.json({
        data: result
    });
})

app.get('/getEverything', async (req,res) => {
    const data = await databaseService.getAll();
    console.log(data)
    res.json({
        data: data
    });
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})