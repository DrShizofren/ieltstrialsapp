const express = require('express');
const app = express();
const port = 3030;
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    results: Array,
    isTeacher: Boolean,
    studentsList: Array
});
const User = mongoose.model('Users', userSchema);

app.get('/', async (req, res) => {
    try {
        const data = await User.find();
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

app.post('/', async (req, res) => {
    try {
        const data = await User.create(req.body);
        res.send(data);
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

app.put('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});
app.get('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const data = await User.findById(_id);
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

app.patch('/:_id/results', async (req, res) => {
    const { _id } = req.params;
    const { results } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { $push: { results } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send('Error updating user results');
    }
});

app.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(_id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
});


app.listen(port, () => {
    mongoose.connect("mongodb+srv://aslancaafarov:1pq0dh77990erP@ieltstrials.viknv.mongodb.net/")
        .then(() => console.log("DB connected"))
        .catch(err => console.log("DB connection error:", err));
    console.log(`Server running on port ${port}`);
});
