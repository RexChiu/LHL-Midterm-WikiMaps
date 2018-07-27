$(() => {
  var lat = $('#map').data().lat;
  var lng = $('#map').data().lng;

  map.setCenter({ lat: lat, lng: lng });

  $('.send-points-btn').on('click', ev => {
    ev.preventDefault(); //prevent default event from occuring  })
    ev.stopImmediatePropagation();

    console.log(mapMarkers);

    var markers = [];
    var mapId = $('.map-url')
      .attr('href')
      .split('/maps/')[1];

    for (var i = 0; i < mapMarkers.length; i++) {
      var markerObj = {
        mapId: mapId,
        lat: mapMarkers[i].getPosition().lat(),
        lng: mapMarkers[i].getPosition().lng(),
        addr: mapAddresses[i]
      };
      markers.push(markerObj);
    }

    console.log(markers);

    var payload = {
      markers: markers
    };

    console.log('payload' + payload);
    console.log('mapId ' + mapId);

    $.post(`/maps/${mapId}/points`, payload)
      .done(resp => {
        console.log(resp);
      })
      .fail(err => console.log(err.message));
  });
});

var mapMarkers = [];
var mapAddresses = [];
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

    var marker = new google.maps.Marker({
      position: {
        lat: latitude,
        lng: longitude
      },
      map: map
    });
    mapMarkers.push(marker);

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
  });
}
