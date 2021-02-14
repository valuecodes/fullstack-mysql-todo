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
    const result = await databaseService.insertNewTodo(user,todo);
    res.json({
        data: result
    });
})

app.get('/getEverything', async (req,res) => {
    const data = await databaseService.getAll();
    res.json({
        data: data
    });
})

app.patch('/complete/:id', async(req,res) =>{
    const { id } = req.params
    const success = await databaseService.completeTodo(id);
    if(success){
        res.status(200).json({'success' : true})  
    }else{
        res.status(500);
    }
})

app.delete('/delete/:id', async(req,res) =>{
    const { id } = req.params
    console.log(id)
    const success = await databaseService.deleteTodo(id);
    if(success){
        res.status(200).json({'success' : true})
    }else{
        res.status(500);
    }
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})