var fs = require('fs');
var axios = require('axios');
var async = require('async');

var data = fs.readFileSync('./src/html/districts/index.json','utf8');
var states = JSON.parse(data);

var geolocate = function(state, callback) {
  let url = `http://nominatim.openstreetmap.org/search/?state=${state.name}&countrycodes=MX&format=json`
  axios.get(url).then(response => {
    if(response.data.length > 0) {
      console.log(' + ' + response.data[0].display_name)
      callback(null, {
        id: state.id,
        name: state.name.trim(),
        displayName: response.data[0].display_name,
        lat: response.data[0].lat,
        lng: response.data[0].lon,
        districts: state.districts
      });
    } else {
      console.log(' - ' + state.name);
      callback(null, {
        id: state.id,
        name: state.name,
        districts: state.districts
      });
    }
  });
}

async.mapSeries(states, geolocate, function(err, result){
  fs.writeFileSync('./src/html/districts/index-ext.json', JSON.stringify(result));
  console.log(result);
});
