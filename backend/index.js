const express = require('express')
const app = express()
const port = 3030
var cors = require('cors')
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())

const userSchema = new mongoose.Schema({
    userName: String, 
    email: String,
    password: String,   
});
const User = mongoose.model('Users', userSchema);

app.get('/', async (req, res) => {
    const data = await User.find()
    res.send(data)
})

app.post('/', async (req, res) => {
    const data = await User.create(req.body)
    res.send('Got a POST request')
})

app.delete('/:id', async (req, res) => {
    const {id} = req.params
    const data = await User.findByIdAndDelete(id)
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
    mongoose.connect("mongodb+srv://aslancaafarov:1pq0dh77990erP@ieltstrials.viknv.mongodb.net/").then(() => console.log("db connected"))
    console.log(`Example app listening on port ${port}`)
})