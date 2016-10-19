function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: -30.059601, lng: -51.171705},
    mapTypeControl: false
  });

  var coordsDiv = document.getElementById('coords');
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
  map.addListener('mousemove', function(event) {
    coordsDiv.textContent =
        'lat: ' + Math.round(event.latLng.lat()) + ', ' +
        'lng: ' + Math.round(event.latLng.lng());
  });

  map.data.setStyle(function(feature) {
    return {
      title: feature.getProperty('name'),
      optimized: false
    };
  });
  map.data.addGeoJson(cities);
}

var cities = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {type: 'Point', coordinates: [-30.059601, -51.171705]},
    properties: {name: 'TecnoPuc'}
  }, {
    type: 'Feature',
    geometry: {type: 'Point', coordinates: [-30.059883, -51.170298]},
    properties: {name: 'Global'}
  }]
};
