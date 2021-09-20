const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');


const PORT = process.env.PORT;
const db = process.env.DB;

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', postRouter);
app.use('/api', userRouter);

const startApp = async() => {
    try {
        await mongoose
            .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

        app.listen(PORT, (err) => err ? console.log(err) : console.log(`Port listening: http://localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

startApp();