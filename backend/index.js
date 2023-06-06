const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

connectToMongo();
var app = express()
app.use(cors())


app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(process.env.PORT, () => {
  console.log(`iNotebook app listening on port ${process.env.PORT}`)
})