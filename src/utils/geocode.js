const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJ0aGFuZHBjcyIsImEiOiJja2N0NzF3b3MxMWpiMnlwZDlzdm84ODFsIn0.fXMzwzmKxDN7X7LZw_wnIA&limit=1`;
  
  request({ url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service', null);
    } else if (response.body.features.length == 0) {
      callback('Unable to find location. Try again.', null);
    } else {
      const { body } = response;
      const location = body.features[0].place_name;
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const latLng = {
        location,
        latitude,
        longitude
      };
      callback(null, latLng);
    }
  });
};

module.exports = geocode;