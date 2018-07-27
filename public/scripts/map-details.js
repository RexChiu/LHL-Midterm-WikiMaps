$(() => {
  var lat = $('#map').data().lat;
  var lng = $('#map').data().lng;

  map.setCenter({ lat: lat, lng: lng });
});

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.653, lng: -79.383 },
    zoom: 8
  });

  map.addListener('click', function(event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    console.log(latitude + ', ' + longitude);
  });
}
