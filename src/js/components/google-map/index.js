import template  from 'lodash.template';
import infoBoxFactory from './infobox';

var carto = {
  "pri": ["#d7301f","#b30000","#7f0000"],
  "pan": ["#74a9cf","#3690c0","#0570b0","#045a8d"],
  "prd": ["#ffff00"],
  "morena": ["#ec7014","#cc4c02","#993404","#662506"],
  "pve": ["#74c476","#41ab5d","#238b45","#006d2c"],
  "movimiento ciudadano": ["#FFA500"],
  "else": ["#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c"]
}

class GoogleMap {
  constructor(options) {
    this.viewGenerator = options.viewGenerator;
    this._template = template(options.contentTemplate);
    this.layers = [];
    this.map = new google.maps.Map(document.getElementById(options.rootId), {
      zoom: 6,
      center: new google.maps.LatLng(23.6364699,-102.55284089999999)
    });

    // Define style for features
    this.map.data.setStyle(function(feature) {
      let chart = feature.f.deputySet.deputy.party;
      if(!carto.hasOwnProperty(chart))
        chart = "else";
      let colors = carto[chart];

      return ({
        fillColor: colors[feature.f.district % colors.length],
        strokeColor: colors[feature.f.district % colors.length],
        strokeWeight: 1
      });
    });

    let _self = this;

    // Add listener for click
    this.map.data.addListener('click', function(event) {
      // console.log(event.feature)
      // There is not box
      if(!_self.infoBox) {
        // Create new InfoBox
        _self.infoBox = infoBoxFactory({
          id: event.feature.f.district,
          latlng: event.latLng,
          map: _self.map,
          title: `Distrito ${event.feature.f.district}`,
          content: _self._template(event.feature.f),
          onClose: _self.closeInfoBox.bind(_self)
        });
        let deputy = event.feature.f.deputySet.deputy;
        // Inform selection to google analytics view_item 	items
        gtag('event', 'view_item', { items: [ `Dip. ${deputy.displayName} |  ${deputy.state}, Distrito ${deputy.area}` ] });
      } else if(_self.infoBox.id !== event.feature.f.district) {
        // There is an active box but user is requesting another one
        _self.infoBox.setMap(null);
        _self.infoBox = infoBoxFactory({
          id: event.feature.f.district,
          latlng: event.latLng,
          map: _self.map,
          title: `Distrito ${event.feature.f.district}`,
          content: _self._template(event.feature.f),
          onClose: _self.closeInfoBox.bind(_self)
        });
        let deputy = event.feature.f.deputySet.deputy;
        // Inform selection to google analytics view_item 	items
        gtag('event', 'view_item', { items: [ `Dip. ${deputy.displayName} |  ${deputy.state}, Distrito ${deputy.area}` ] });
      }
    });
  }

  closeInfoBox(event) {
    if(this.infoBox) {
      this.infoBox.setMap(null);
      this.infoBox = null;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  addLayer(layer) {
    var feature = this.map.data.addGeoJson(layer);
    this.layers.push(feature[0]);
  }

  removeLayers() {
    this.layers.forEach(layer => {
      this.map.data.remove(layer);
    });
    if(this.infoBox) this.infoBox.setMap(null);
  }

  move(location) {
    this.map.setCenter(location);
    this.map.setZoom(8);
  }
}

export default GoogleMap;
