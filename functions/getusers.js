const axios = require('axios');
require('dotenv').config()

exports.handler = function(event, context, callback) {

  const API_URL = "https://api.github.com/users";
  const URL = `${API_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;

  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  }

  const getUsers = () => {
    axios.get(URL)
      .then(res => send(res.data))
      .catch(err => send(err));
  }

  if (event.httpMethod == 'GET') {
    getUsers();
  }

}