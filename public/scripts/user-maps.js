$(() => {
  //get the maps that belong to the user
<<<<<<< HEAD
  $.getJSON(`/users/maps`)
    .done(maps => {
      for (let map of maps) {
        //grabs the map url/id
        var mapId = map.url.split('/maps/')[1];
        var html = `
        <div class="mapTitle"><a href="${map.url}">${map.name}</a></div>
        <div class="map"><img src="${map.img_url}" alt="Google Map Static Image" class="img-thumbnail"></div>
        <div class="map_desc">
          <textarea rows="2" cols="40">
          ${map.desc}
          </textarea>
        </div>
        <div class="rating">${map.rating}</div>
        <div>points</div>`;
        $('.yourMapContainer').prepend(html);
      }
    })
    .fail(function() {
      console.log('User has no maps');
    });
  //favourite maps
  //get the maps that belong to the user
  $.getJSON(`/users/fav`)
    .done(maps => {
      for (let map of maps) {
        //grabs the map url/id
        var mapId = map.url.split('/maps/')[1];
        var html = `
        <div class="mapTitle"><a href="${map.url}">${map.name}</a></div>
        <div class="map"><img src="${map.img_url}" alt="Google Map Static Image"></div>
        <div class="map_desc">
          <textarea rows="4" cols="50">
          ${map.desc}
          </textarea>
        </div>
        <div class="rating">${map.rating}</div>
        <div>points</div>`;
        $('.favMapContainer').prepend(html);
      }
    })
    .fail(function() {
      console.log('User has no favourites');
    });
=======
  $.getJSON(`/users/maps`).done(maps => {
    for (let map of maps) {
      //grabs the map url/id
      var mapId = map.url.split('/maps/')[1];
      var html = `
  <div class="mapTitle"><a href="${map.url}">${map.name}</a></div>
  <div class="map"><img src="${map.img_url}" alt="Google Map Static Image" class="img-thumbnail"></div>
  <div class="map_desc">
    <textarea rows="2" cols="40">
    ${map.desc}
    </textarea>
  </div>
  <div>points
  </div>`;
      $('.yourMapContainer').prepend(html);
    }
  });
  //favourite maps
  //get the maps that belong to the user
  $.getJSON(`/users/fav`).done(maps => {
    for (let map of maps) {
      //grabs the map url/id
      var mapId = map.url.split('/maps/')[1];
      var html = `
  <div class="mapTitle"><a href="${map.url}">${map.name}</a></div>
  <div class="map"><img src="${map.img_url}" alt="Google Map Static Image"></div>
  <div class="map_desc">
    <textarea rows="4" cols="50">
    ${map.desc}
    </textarea>
  </div>
  <div>points
    
  </div>`;
      $('.favMapContainer').prepend(html);
    }
  });
>>>>>>> 90cfcd2f3f63d4c06f26b449e7b6104bbf70b1b7

  // </div>
  // <div>points
});
