// Bootstrap
import 'bootstrap/js/src/util';
import 'bootstrap/js/src/dropdown';
import 'bootstrap/js/src/collapse';

import { introJs } from 'intro.js';
import template  from 'lodash.template';

import axios from 'axios';
import googleApi from 'load-google-maps-api';
import Cookie from 'js-cookie';
import { normalize } from 'utils/string';
import { createOption } from 'utils/dom';
import { findLocation } from 'utils/geolocation';
import GoogleMap from 'google-map';
import tableHtml from "google-map/template/table.html";
import popupSample from "google-map/template/sample_popup.html";

class View {
  constructor() {
    this.states = {};

    // Create Google Map Instance
    this.googleMap = new GoogleMap({
      rootId: 'map',
      contentTemplate: tableHtml
    });

    if(!Cookie.get('introDisplayed')) {
      this.displayTutorial();
    }

    document.querySelector('.help').onclick = () => {
      this.displayTutorial();
    }

    this.loadStates().then(() => {
      let stateId = Cookie.get('stateId');

      this.hideModal();

      if(stateId) {
        this.selectState(stateId);
        document.getElementById('states').value = stateId;
      } else if(Cookie.get('geolocation')) {
        let geolocation = Cookie.getJSON('geolocation');
        this.setLocation(geolocation.location, geolocation.address);
      } else {
        // First tome, load location
        findLocation()
          .then(response => {
            Cookie.set('geolocation', response, { expires: 7 });
            this.setLocation(response.location, response.address);
          })
          .catch((reason) => {
            this.selectState(14);
            document.getElementById('states').value = 14;
          });
      }
    });

  }

  displayTutorial() {
    let view = template(popupSample)();
    let form = document.querySelector('.search-bar form');
    let map = document.querySelector('.map');

    Cookie.set('introDisplayed', true , { expires: 1 });

    introJs()
      .setOptions({
        skipLabel: 'Saltar',
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        doneLabel: 'Ok',
        showStepNumbers: true,
        steps: [{
            intro: 'Bienvenido! A continuación te mostramos como identificar a tu diputado.'
          }, {
            element: form,
            intro: 'Primero deberás indicarnos el estado en el que vives.'
          }, {
            element: map,
            intro: 'Posteriormente te mostraremos los distritos que componen tu estado.',
            position: 'bottom-middle-aligned'
          }, {
            element: map,
            intro: 'Deberás identificar el distrito donde vives y al dar clic sobre el.',
            position: 'bottom-middle-aligned'
          }, {
            element: map,
            intro: `<span class="mb-2">Te mostraremos el diputado que te representa: </span>
                      ${view}
                    <span class="block mt-3">Selecciona "Ver más" para acceder a su perfil y desempeño.</span>`,
            position: 'bottom-middle-aligned'
          }]
      }).start();
  }

  hideModal() {
    document.getElementById('modal').className += " d-none";
  }

  setLocation(location, address) {
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

    // Save selection
    Cookie.set('stateId', stateId, { expires: 7 });

    // Inform selection to google analytics select_content 	items, promotions, content_type, content_id
    if(gtag) gtag('event', 'select_content', { 'items': [state.name], 'content_type': 'state', 'content_id': stateId });
  }
}

let opts = {
  key: ''
};

// Awaiting for google api to load
googleApi(opts).then(function() {
  let view = new View();
});
