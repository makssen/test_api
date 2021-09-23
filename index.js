const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const postRouter = require('./routes/postRouter');
const authRouter = require('./routes/authRouter');


const PORT = process.env.PORT;
const db = process.env.DB;

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/auth', authRouter);
app.use('/api', postRouter);

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