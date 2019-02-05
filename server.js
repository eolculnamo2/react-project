require('dotenv').config();

const express = require('express'),
      app = express(),
      controller = require('./routes/controller');

app.use(express.static('build'));

app.use('/', controller);

app.listen(process.env.PORT || 8080, () => console.log("Server Started"));