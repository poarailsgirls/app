var tecnopuc;
var global;
var ondeEstou;
var map;

var locations = [];

function initMap() {
  tecnopuc = new google.maps.LatLng(-30.059601, -51.171705);
  locations.push(['Tecnopuc', tecnopuc]);
  global = new google.maps.LatLng(-30.059857, -51.170198);
  locations.push(['Global', global]);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      ondeEstou = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      locations.push(['Você', ondeEstou]);
      map.setCenter(ondeEstou);
    }, function() {});
  }

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: tecnopuc,
  });

  var infowindow = new google.maps.InfoWindow();

  for (i = 0; i < locations.length; i++) {
    console.log(locations[i]);
    var marker = new google.maps.Marker({
      position: locations[i][1],
      map: map,
      title: locations[i][0]
    });
    // process multiple info windows
    (function(marker, i) {
      // add click event
      google.maps.event.addListener(marker, 'click', function() {
        if (infowindow) {
          infowindow.close();
        }
        infowindow = new google.maps.InfoWindow({
          content: locations[i][0]
        });
        infowindow.open(map, marker);
      });
    })(marker, i);
  }
}

$('#ondeEstou').on('click',function(){
  map.setCenter(ondeEstou);
});

$('#tecnopuc').on('click',function(){
  map.setCenter(tecnopuc);
});

$('#global').on('click',function(){
  map.setCenter(global);
});

$('a[href="#tabAgenda"]').on('click',function(){
  $("#map").hide();
});
$('a[href="#tabMapa"]').on('click',function(){
  $("#map").show();
});
$('a[href="#tabFotos"]').on('click',function(){
  $("#map").hide();
});
$('a[href="#tabInformacoesLinks"]').on('click',function(){
  $("#map").hide();
});
