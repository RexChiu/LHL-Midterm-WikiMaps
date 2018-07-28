$(() => {
  var lat = $('#map').data().lat;
  var lng = $('#map').data().lng;

  map.setCenter({ lat: lat, lng: lng });

  //listener for button for sending points
  $('.send-points-btn').on('click', ev => {
    ev.preventDefault(); //prevent default event from occuring
    ev.stopImmediatePropagation();

    //does not proceed further if either of arrays are empty
    if (mapMarkers.length == 0 || mapAddresses.length == 0) {
      return;
    }
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
  var geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.653, lng: -79.383 },
    zoom: 8
  });

  //add listener for submit button for address bar
  $('.search-btn').on('click', ev => {
    var byNameAddress = $('.by-name-address-selector:checked').val();

    //only runs code if By Name/Address radio is checked
    if (byNameAddress) {
      ev.preventDefault(); //prevent default event from occuring
      ev.stopImmediatePropagation();

      //grab address of bar
      var searchAddress = $('.name-address-search-bar').val();

      geocoder.geocode({ address: searchAddress }, function(results, status) {
        if (status === 'OK') {
          var return_location = results[0].geometry.location;
          map.setCenter(return_location);
          var marker = new google.maps.Marker({
            map: map,
            position: return_location
          });
          //adds marker onto the array
          mapMarkers.push(marker);
          //grabs and adds address onto the mapAddresses array
          grabAddress(geocoder, return_location.lat(), return_location.lng(), mapAddresses);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  });

  //add listener for clicks within the map
  map.addListener('click', function(event) {
    var byMap = $('.by-map-selector:checked').val();

    //only runs code if By Map radio is checked
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
      grabAddress(geocoder, latitude, longitude, mapAddresses);
    }
  });
}

//grabs the address using google API,
//pushes it into the address array in function due to async issues
function grabAddress(geocoder, lat, lng, addressArr) {
  //grab address using google geocoder API
  return geocoder.geocode(
    {
      location: {
        lat: lat,
        lng: lng
      }
    },
    function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          console.log('Found Address: ' + results[0].formatted_address);
          if (addressArr) {
            addressArr.push(results[0].formatted_address);
          }
          return results[0].formatted_address;
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }
  );
}
