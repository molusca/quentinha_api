const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./routes/index');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', indexRouter);
app.listen(port);

module.exports = app;