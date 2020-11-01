'use-strict'
const axios = require('axios');
require('dotenv').config()
let URL;

exports.handler = function(event, context, callback) {
  
  const send = body => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(body)
    });
}
  
  if (event.httpMethod == 'POST') {
    const parsedBody = JSON.parse(event.body);
    console.log(parsedBody);
    const USER = parsedBody.username;
    const API_URL = `https://api.github.com/users/${USER}`;
    console.log(API_URL);
    URL = `${API_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
    console.log(URL);
  } else if (event.httpMethod == 'GET') {
    console.log(URL);
    axios.get(URL)
      .then(res => send(res.data))
      .catch(err => send(err));
  }
}
