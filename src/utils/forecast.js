const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=70e099f2a71edf320cc296f912b82c7c&query=${latitude},${longitude}`;

  request({ url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service', null);
    } else if (response.body.error) {
      callback('Unable to find location', null);
    } else {
      const { body } = response;
      callback(null, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
    }
  });
}

module.exports = forecast;