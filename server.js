require('dotenv').config();

const express = require('express'),
      app = express(),
      request = require('request');

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

app.get('/', (req,res) => res.sendFile(__dirname+'/public/index.html') );

app.listen(8080, () => console.log("Server Started"));