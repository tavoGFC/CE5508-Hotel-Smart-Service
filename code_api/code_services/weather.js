const fetch = require('node-fetch');

async function getWeather(lang) {

  await fetch(`"http://api.apixu.com/v1/forecast.json?key=64700405af534cbe914184115192605&q=9.123185,-83.6931613&days=7&lang=${lang}`)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson != '') {
        const weather = responseJson.forecast.forecastday.map(function (item, index) {
          return { key: index, date: item.date, temp: item.day.avgtemp_c, condition: item.day.condition.text, icon: 'http://' + item.day.condition.icon };
        });
        return weather;
      }
    })
    .catch(error => {
      console.error(error);
    });
}




module.exports = getWeather;
