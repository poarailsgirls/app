var tecnopuc;
var global;
var ondeEstou;
var map;

function initMap() {
  tecnopuc = new google.maps.LatLng(-30.059601, -51.171705);
  global = new google.maps.LatLng(-30.059857, -51.170198);
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: tecnopuc,
    mapTypeControl: false
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      ondeEstou = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function() {});
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
