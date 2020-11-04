'use-strict'
const axios = require('axios');
require('dotenv').config()

let userDataUrl,
  userRepoUrl;

function sortByProperty(property) {
  return function(a, b) {
    if (a[property] < b[property]) 
      return 1;
    else if (a[property] > b[property]) 
      return -1;
    
    return 0;
  }
}

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
    const USER = parsedBody.username;
    const API_URL = `https://api.github.com/users/${USER}`;
    userDataUrl = `${API_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
    userRepoUrl = `${API_URL}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;

  } else if (event.httpMethod == 'GET') {
    axios.all([
     axios.get(userDataUrl),
     axios.get(userRepoUrl)
   ])
     .then(axios.spread((userData, userRepos) => {
      let data = userData.data;
      let repoData = ((userRepos.data).map(repo => {
       return {
         name: repo.name,
         description: repo.description,
         url: repo.svn_url,
         size: repo.size,
         stars: repo.stargazers_count,
         language: repo.language,
         forks: repo.forks
       }
     })) 
     repoData.sort(sortByProperty("stars"));
     data.repos = repoData;
     send(data);
     
   })).catch(err => {
     console.log(err);
     send(err);
   });
  }
}
