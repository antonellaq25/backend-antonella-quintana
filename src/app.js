const express = require("express")
const router = require("./router/router")
const db = require('../db')
const cors = require('cors');
const app =express()

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(3000, () =>{
 console.log("listening on port 3000");
})