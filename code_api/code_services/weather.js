const fetch = require('node-fetch');

async function getWeather(lang) {
  
  return fetch('https://i004gec4z3.execute-api.us-east-2.amazonaws.com/prod/weather')
    .then(response => {
      return response.json()
    })
    .then(responseJson => {
      if (responseJson != '') {
        const stringJSON = JSON.stringify(responseJson).slice(1, -1);
        const parseResponse = JSON.parse(stringJSON);

        return parseResponse;
      }
    })
    .catch(error => {
      console.error(error);
    });
}




module.exports = getWeather;
