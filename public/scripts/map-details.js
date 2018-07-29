//arrays to store all of the existing markers on the map
var stagedMapMarkers = [];
var mapId = null;
var map;

$(document).ready(() => {
  var lat = $('#map').data().lat;
  var lng = $('#map').data().lng;
  var zoom = $('#map').data().zoom;

  map.setCenter({ lat: lat, lng: lng });
  map.setZoom(zoom);

  //grabs the map url/id
  mapId = $('.map-url')
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

  //event listener for favourite map
  $('#favourite-btn').click(function() {
    $.ajax({
      url: `/maps/${mapId}/fav`,
      type: 'PUT',
      success: function(resp) {
        console.log(resp);
      }
    });
  });
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
          //grabs address, and sends to server
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

      //grab address and sends to server
      grabAddress(geocoder, latitude, longitude, map);
    }
  });
}

//grabs the address using google API,
//pushes it into the address array in function due to async issues
function grabAddress(geocoder, lat, lng, map) {
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
            title: $('#point-title').val(),
            desc: $('#point-desc').val(),
            mapId: mapId,
            lat: Number.parseFloat(lat).toPrecision(6),
            lng: Number.parseFloat(lng).toPrecision(6),
            addr: results[0].formatted_address
          };

          $.post(`/maps/${mapId}/points`, payload)
            .done(resp => {
              //successful post to server
              //add new marker onto map
              addPointsToMap(map, resp);
            })
            .fail(err => console.log(err.message));
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }
  );
}

//function to add the markers onto the map on load
function addPointsToMap(map, point) {
  var contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    `<h1 id="firstHeading" class="firstHeading">${point.title}</h1>` +
    '<div id="bodyContent">' +
    `<p>${point.desc}</p>` +
    `<p><img src="${point.img_url}" width=200 height=200></img></p>` +
    '</div>' +
    '</div>';

  //creates a infoWindow with the above HTML
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  console.log('lat: ', point.lat);
  console.log('lng: ', point.lng);

  //add new marker onto map
  var marker = new google.maps.Marker({
    position: {
      lat: Number(point.lat),
      lng: Number(point.lng)
    },
    map: map,
    title: point.url
  });
  addMarkerListener(marker, infowindow);
  stagedMapMarkers.push(marker);
}

//function to add the points onto the HTML page
function addPointsToHTML(point) {
  //adds point details onto the page
  var html = `
  <li>Title: ${point.title}, Desc: ${point.desc}, Address: ${point.addr}, URL: ${point.url}</li>`;
  $('.points-container').append(html);
}

//adds event listeners to each marker
function addMarkerListener(marker, infowindow) {
  marker.addListener('rightclick', function() {
    console.log('right clicked');
    console.log(`this.title=${this.title} || this=${this} || $this=${$(this)} $this.title=${$(this).title}`);
    for (let i = 0; i < stagedMapMarkers.length; i++) {
      if (stagedMapMarkers[i] === this) {
        $.ajax({
          url: `/maps/${mapId}/points`,
          data: {
            url: this.title,
            lat: this.position.lat(),
            lng: this.position.lng(),
            mapUrl: mapId
          },
          type: 'DELETE',
          success: function() {
            stagedMapMarkers[i].setMap(null);
            stagedMapMarkers.splice(i, 1);
            console.log(stagedMapMarkers);
          }
        });
      }
    }
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
