require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./src/db.js');
const userRouter = require('./src/routes/user')
const folderRouter = require('./src/routes/folder')
const songRouter = require('./src/routes/song')

const port = process.env.PORT;
const app = express();
connect();

app.use(express.json())
app.use(cors())

app.use('/users', userRouter);
app.use('/folders', folderRouter);
app.use('/songs', songRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando por http://localhost:${port}`)
  });