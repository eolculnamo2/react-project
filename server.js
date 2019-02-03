require('dotenv').config();

const express = require('express'),
      app = express(),
      request = require('request');

import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './src/App.js';

app.get('/get-meetup-data', (req,res) => {
    request('https://api.meetup.com/reactjs-dallas/events?&sign=true&photo-host=public&page=1&key='+process.env.KEY, (error, response, body) => {
        if(error) {
            console.log(error);
        } else {
            res.send(body);
        }
    });
});

app.get('/get-meetup-rsvps', (req,res) => {
    request('https://api.meetup.com/reactjs-dallas/events/'+req.query.id+'/rsvps?&sign=true&photo-host=public&key='+process.env.KEY, (error, response, body) => {
        if(error) {
            console.log(error)
        } else {
            res.send(body);
        }
    });
});

app.get('/', (req,res) => {
    const reactDom = renderToString(<App/>);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <div id="app">${reactDom}</div>
</body>
<script src="vendors.js"></script>
<script src="bundle.js"></script>
</html>`;

    res.send(html);
});

app.listen(8080, () => console.log("Server Started"));