require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./src/db.js');

const port = process.env.PORT;
const app = express();
connect();

app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`Servidor escuchando por http://localhost:${port}`)
  });