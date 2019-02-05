const express = require('express'),
      path = require('path'),
      request = require('request'),
      router = express.Router();


router.get('/get-meetup-data', (req,res) => {
    request('https://api.meetup.com/reactjs-dallas/events?&sign=true&photo-host=public&page=1&key='+process.env.KEY, (error, response, body) => {
        if(error) {
            console.log(error);
        } else {
            res.send(body);
        }
    });
});

router.get('/get-meetup-rsvps', (req,res) => {
    request('https://api.meetup.com/reactjs-dallas/events/'+req.query.id+'/rsvps?&sign=true&photo-host=public&key='+process.env.KEY, (error, response, body) => {
        if(error) {
            console.log(error)
        } else {
            res.send(body);
        }
    });
});

router.get('/', (req,res) => res.sendFile(path.join(__dirname,'..','/public/index.html')) );

module.exports = router;