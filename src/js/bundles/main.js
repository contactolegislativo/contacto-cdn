import axios from 'axios';
import googleApi from 'load-google-maps-api';
import Cookie from 'js-cookie';
import { normalize } from 'utils/string';
import { createOption } from 'utils/dom';
import { findLocation } from 'utils/geolocation';
import GoogleMap from 'google-map';
import tableHtml from "google-map/template/table.html";

class View {
  constructor() {
    this.states = {};

    // Create Google Map Instance
    this.googleMap = new GoogleMap({
      rootId: 'map',
      contentTemplate: tableHtml
    });

    this.loadStates().then(() => {
      // If geolocation is in cookies
      if(Cookie.get('geolocation')) {
        let geolocation = Cookie.getJSON('geolocation');
        this.setLocation(geolocation.location, geolocation.address);
      } else {
        // First tome, load location
        findLocation().then(response => {
          Cookie.set('geolocation', response, { expires: 7 });
          this.setLocation(response.location, response.address);
        });
      }
    });
  }

  setLocation(location, address) {
    document.getElementById('modal').className += " d-none";
    // Update map location
    this.googleMap.move(location);
    // Identify state
    let stateName = normalize(address.county.toLowerCase()).toUpperCase();
    let _self = this;
    for(var key in _self.states) {
      if(_self.states[key].name.trim() === stateName) {
          document.getElementById(_self.states[key].id + '').selected = true;
          this.selectState(_self.states[key].id);
      }
    }
  }

  loadStates() {
    let request = axios.get('/districts/index.json');

    request.then((response) => {
      var select = document.getElementById('states');
      response.data.forEach((state) => {
        var stateOption = createOption(state);
        select.appendChild(stateOption);
        this.states[state.id] = state;
      });

      select.onchange = (event) => {
        this.selectState(event.target.value);
      };

      select.onchange.bind(this);
    });

    return request;
  }

  selectState(stateId) {
    let state = this.states[stateId];
    let districts = parseInt(state.districts);
    //console.log(state);
    this.googleMap.move(state);
    this.googleMap.removeLayers();
    for(var i = 0; i < districts ; i++) {
      axios.get(`/districts/state/${stateId}/${i + 1}.json`).then((response) => {
        this.googleMap.addLayer(response.data);
      });
    }
    // Inform selection to google analytics select_content 	items, promotions, content_type, content_id
    gtag('select_content', 'UA-92111911-1', { items: [state.name], content_type: 'state', content_id: stateId });
  }
}

let opts = {
  api: '<Insert your Google Maps API key>'
};

// Awaiting for google api to load
googleApi(opts).then(function() {
  let view = new View();
});
