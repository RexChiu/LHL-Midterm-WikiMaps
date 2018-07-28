$(() => {
  var lat = $('#map').data().lat;
  var lng = $('#map').data().lng;

  map.setCenter({ lat: lat, lng: lng });

  //listener for submit button for sending points
  $('.send-points-btn').on('click', ev => {
    ev.preventDefault(); //prevent default event from occuring
    ev.stopImmediatePropagation();

    var markers = [];

    //grabs the map url/id
    var mapId = $('.map-url')
      .attr('href')
      .split('/maps/')[1];

    //loops through the mapMarkers and mapAddresess array and constructs a payload
    for (var i = 0; i < mapMarkers.length; i++) {
      var markerObj = {
        mapId: mapId,
        lat: mapMarkers[i].getPosition().lat(),
        lng: mapMarkers[i].getPosition().lng(),
        addr: mapAddresses[i]
      };
      markers.push(markerObj);
    }

    var payload = {
      markers: markers
    };

    //sends points to server
    $.post(`/maps/${mapId}/points`, payload)
      .done(resp => {
        console.log(resp);
      })
      .fail(err => console.log(err.message));
  });
});

//arrays to store the Google API generated Markers and Addresses
var mapMarkers = [];
var mapAddresses = [];

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.653, lng: -79.383 },
    zoom: 8
  });

  //add listener for clicks within the map
  map.addListener('click', function(event) {
    var byMap = $('#by-map-selector:checked').val();

    if (byMap) {
      //grab lat/lng
      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      console.log(latitude + ', ' + longitude);

      //add new marker onto map
      var marker = new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude
        },
        map: map
      });
      mapMarkers.push(marker);

      //grab address
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: {
            lat: latitude,
            lng: longitude
          }
        },
        function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0].formatted_address);
              mapAddresses.push(results[0].formatted_address);
            }
          }
        }
      );
    }
  });
}
