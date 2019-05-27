import { getLocation, getData } from 'react-native-weather-api';


export default function GetWeather() {
  let dataSource = [];

  fetch('http://api.apixu.com/v1/forecast.json?key=64700405af534cbe914184115192605&q=9.123185,-83.6931613&days=7')
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson != '') {
        const parseResponse = JSON.stringify(responseJson);
        if (parseResponse != '') {
          dataSource = JSON.parse(parseResponse);
        }
      }
    })
    .catch(error => {
      console.error(error);
    });

  console.log('datos api weather');
  console.log(dataSource);
  return dataSource;
}


