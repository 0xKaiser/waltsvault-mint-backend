require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => console.log("Database Connected Failed", e));


app.use(routes);

app.listen(process.env.PORT||5000, () => { console.log('listening') })