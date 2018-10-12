const express = require('express');
const redis = require("redis");


const app = express();

// let client = redis.createClient('ec2-52-53-232-39.us-west-1.compute.amazonaws.com:3005');
//
// client.on('connect', function(error) {
//   if (error) {
//     console.log('ERROR connecting to redis')
//   } else {
//     console.log('Connected to redis...')
//   }
// });



app.get('/checkout/:id', (req, res) => {

  axios.get('load-balancer-2-864280534.us-west-1.elb.amazonaws.com/?=' + req.params.id)
    .then(function(response) {
      // client.setex(req.params.id, 1000000, JSON.stringify(response.data));
      res.send(response.data);
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
