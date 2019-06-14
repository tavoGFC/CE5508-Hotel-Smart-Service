const fetch = require('node-fetch');

async function getWeather(lang) {

  fetch(`"http://api.apixu.com/v1/forecast.json?key=64700405af534cbe914184115192605&q=9.123185,-83.6931613&days=7&lang=${lang}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
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
