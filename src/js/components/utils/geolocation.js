import axios from 'axios';

var findLocation = function() {
  let url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDT1BiMuP2K1Z6l2ZTEwugOMlPAFX_aA_U';
  return new Promise((resolve, reject) => {
    axios.post(url, {})
     .then(response => {
       let payload = { location: response.data.location };
       let url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${payload.location.lat}&lon=${payload.location.lng}&zoom=18&addressdetails=1`;
       axios.get(url, {})
         .then(response => {
            payload.address = response.data.address;
            resolve(payload);
         }, response => {
            reject('OpenStreetMap API: Failed to identify location');
         });
     }, response => {
       console.log('There has been an error on geolocation!');
       reject('Google API: Failed to identify location');
     });
  });
}

var exports = module.exports = {
  findLocation: findLocation
}
