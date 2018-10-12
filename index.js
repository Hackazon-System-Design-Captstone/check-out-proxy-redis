require('newrelic');

const express = require('express');
const redis = require("redis");
const axios = require('axios');
const bodyParser = require('body-parser')

const app = express();

// let client = redis.createClient();
//
// client.on('connect', function(error) {
//   if (error) {
//     console.log('ERROR connecting to redis')
//   } else {
//     console.log('Connected to redis...')
//   }
// });

app.use(express.static('./client/dist'));

let serverCluster = ['http://ec2-52-53-226-39.us-west-1.compute.amazonaws.com:3004/checkout/',
  'http://ec2-54-153-49-80.us-west-1.compute.amazonaws.com:3004/checkout/',
  'http://ec2-13-57-183-138.us-west-1.compute.amazonaws.com:3004/checkout/'
]
let count = 0;

app.get('/checkout/:id', (req, res) => {

  // client.get(req.params.id, (error, results) => {
  //
  //   if (results !== null) {
  //     res.send(JSON.parse(results))
  //   } else {
  //
  //     }
  //   })

console.log(serverCluster[count % 3])
  axios.get(serverCluster[count % 3] + req.params.id)
    .then(function({ data }) {
      // client.setex(req.params.id, 1000000, JSON.stringify(response.data));
      console.log(data)
      count++
      res.send(data);
    })
    .catch(function(error) {
      res.send(error);
    })


  // client.get(req.params.id, (error, results) => {
  //
  //   if (results !== null) {
  //     res.send(JSON.parse(results))
  //   } else {
  //
  //     //get request to load balancer
  //
  //     app.get('load-balancer-2-864280534.us-west-1.elb.amazonaws.com/?=:id', (error, results) => {
  //       if (error) {
  //         console.error(error)
  //       } else {
  //
  //       }
  //     })
  //
  //     client.setex(req.params.id, 1000000, JSON.stringify(result));
  //     res.send(result);
  //
  //
  //   }
  // })
})

app.get('/loaderio-4abc64da50cda623147ca41bd3f94574.txt', (req, res) => {
  res.send('loaderio-4abc64da50cda623147ca41bd3f94574')
})

app.listen(3005, () => console.log('Listening on port 3005...'));
