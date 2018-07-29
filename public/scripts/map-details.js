//arrays to store the Google API generated Markers and Addresses
var unstagedMapMarkers = [];
var unstagedMapAddresses = [];

//arrays to store all of the existing markers on the map
var stagedMapMarkers = [];

var map;

$(document).ready(() => {
  var lat = $('#map').data().lat;
  var lng = $('#map').data().lng;

  map.setCenter({ lat: lat, lng: lng });

  //grabs the map url/id
  var mapId = $('.map-url')
    .attr('href')
    .split('/maps/')[1];

  //grab the points and add onto the map and HTML page
  $.get(`/maps/${mapId}/points`).done(points => {
    //loops through the points, creates a marker, and add to stagedMapMarkers
    for (var i = 0; i < points.length; i++) {
      addPointsToMap(map, points[i]);
      addPointsToHTML(points[i]);
    }
  });

  //   //listener for button for sending points
  //   $('.send-points-btn').on('click', ev => {
  //     ev.preventDefault(); //prevent default event from occuring
  //     ev.stopImmediatePropagation();

  //     //does not proceed further if either of arrays are empty
  //     if (unstagedMapMarkers.length == 0 || unstagedMapAddresses.length == 0) {
  //       return;
  //     }
  //     var markers = [];

  //     //loops through the unstagedMapMarkers and mapAddresess array and constructs a payload
  //     for (var i = 0; i < unstagedMapMarkers.length; i++) {
  //       var markerObj = {
  //         mapId: mapId,
  //         lat: unstagedMapMarkers[i].getPosition().lat(),
  //         lng: unstagedMapMarkers[i].getPosition().lng(),
  //         addr: unstagedMapAddresses[i]
  //       };
  //       markers.push(markerObj);
  //     }

  //     var payload = {
  //       markers: markers
  //     };

  //     console.log('Sending Payload: ' + JSON.stringify(payload));

  //     //sends points to server
  //     $.post(`/maps/${mapId}/points`, payload)
  //       .done(resp => {
  //         //successful post to server, clear out unstaged arrays
  //         stagedMapMarkers = stagedMapMarkers.concat(unstagedMapMarkers);
  //         unstagedMapMarkers = [];
  //         unstagedMapAddresses = [];
  //         console.log(resp);
  //         console.log('Staged Markers: ' + stagedMapMarkers);
  //       })
  //       .fail(err => console.log(err.message));
  //   });
});

function initMap() {
  var geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.653, lng: -79.383 },
    zoom: 8,
    disableDefaultUI: true
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
          unstagedMapMarkers.push(marker);
          //grabs and adds address onto the unstagedMapAddresses array
          grabAddress(geocoder, return_location.lat(), return_location.lng(), marker);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    } else {
      alert("set radio button to 'By Name/Address'");
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
      unstagedMapMarkers.push(marker);

      //grab address
      grabAddress(geocoder, latitude, longitude, marker);
    }
  });
}

//grabs the address using google API,
//pushes it into the address array in function due to async issues
function grabAddress(geocoder, lat, lng, marker) {
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
          //grabs the map url/id
          var mapId = $('.map-url')
            .attr('href')
            .split('/maps/')[1];

          //sends point to server
          var payload = {
            mapId: mapId,
            lat: lat,
            lng: lng,
            addr: results[0].formatted_address
          };

          $.post(`/maps/${mapId}/points`, payload)
            .done(resp => {
              //successful post to server, clear out unstaged arrays
              marker.setTitle(resp);
              stagedMapMarkers.push(marker);
              console.log('response: ' + resp);
              console.log('Staged Markers: ' + stagedMapMarkers);
            })
            .fail(err => console.log(err.message));
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }
  );
}

//function to add the markers onto the map
function addPointsToMap(map, point) {
  //add new marker onto map
  var marker = new google.maps.Marker({
    position: {
      lat: point.lat,
      lng: point.lng
    },
    map: map
  });
  stagedMapMarkers.push(marker);
}

//function to add the points onto the HTML page
function addPointsToHTML(point) {
  //adds point details onto the page
  var html = `
  <li>Title: ${point.title}, Desc: ${point.desc}, Address: ${point.addr}, URL: ${point.url}</li>`;
  $('.points-container').append(html);
}
