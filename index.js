require('newrelic');

const express = require('express');
const redis = require("redis");
const axios = require('axios');
const bodyParser = require('body-parser')

const app = express();

let client = redis.createClient();

client.on('connect', function(error) {
  if (error) {
    console.log('ERROR connecting to redis')
  } else {
    console.log('Connected to redis...')
  }
});

app.use(express.static('./client/dist'));

let serverCluster = ['http://ec2-52-53-226-39.us-west-1.compute.amazonaws.com:3004/checkout/',
  'http://ec2-54-153-49-80.us-west-1.compute.amazonaws.com:3004/checkout/',
  'http://ec2-13-57-183-138.us-west-1.compute.amazonaws.com:3004/checkout/'
]
let count = 0;

app.get('/checkout/:id', (req, res) => {

  client.get(req.params.id, (error, results) => {

    if (error) {
      console.log('ERROR', error)
    }

    if (results !== null) {
      res.send(JSON.parse(results))
    } else {

      axios.get(serverCluster[count % 3] + req.params.id)
      .then(function({ data }) {
        // console.log(data)
        client.setex(req.params.id, 1000000, JSON.stringify(data));
        count++
        res.send(data);
      })
      .catch(function(error) {
        res.send('ERROR');
      })
      }
    })


})

app.get('/loaderio-aeda5d5017132ef5233d323fdea1967b.txt', (req, res) => {
  res.send('loaderio-aeda5d5017132ef5233d323fdea1967b')
})

app.listen(3005, () => console.log('Listening on port 3005...'));
