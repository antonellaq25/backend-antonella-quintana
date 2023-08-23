require('dotenv').config();
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
const mongoURI = dbUrl;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error to connect db'))
db.once('open', ()=> {
    console.log('Successfully connected to db')
});

module.exports =db;