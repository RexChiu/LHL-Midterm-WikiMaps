$(() => {
  //hardcoded to first user for time being
  //will need to get userid = 1 from session cookie?
  let userid = 1;
  $.getJSON(`/users/${userid}`).done(maps => {
    for (let map of maps) {
      var html = `
  <div class="mapTitle"><a href="${map.url}">${map.name}</a></div>
  <div class="map"><img src="${map.img_url}" alt="Google Map Static Image"></div>
  <div class="map_desc">
    <textarea rows="4" cols="50">
    ${map.desc}
    </textarea>
  </div>
  <div class="rating">${map.rating}
  
  </div>
  <div>points
    
  </div>`;
      $('.yourMapContainer').prepend(html);
    }
  });
  //favourite maps
  // $.getJSON('/users/${userid}/fav').done(maps => {
  //   for (let map of maps) {
  //     var html = `
  // <div class="mapTitle"><a href="${map.url}">${map.name}</a></div>
  // <div class="map"><img src="${map.img_url}" alt="Google Map Static Image"></div>
  // <div class="map_desc">
  //   <textarea rows="4" cols="50">
  //   ${map.desc}
  //   </textarea>
  // </div>
  // <div class="rating">${map.rating}

  // </div>
  // <div>points

  // </div>`;
  //     $('.yourMapContainer').prepend(html);
  //   }
  // });
  //
  //   $.getJSON('/users/${userid}/contributor').done(maps => {
  //     for (let map of maps) {
  //       var html = `
  //   <div class="mapTitle"><a href="${map.url}">${map.name}</a></div>
  //   <div class="map"><img src="${map.img_url}" alt="Google Map Static Image"></div>
  //   <div class="map_desc">
  //     <textarea rows="4" cols="50">
  //     ${map.desc}
  //     </textarea>
  //   </div>
  //   <div class="rating">${map.rating}

  //   </div>
  //   <div>points

  //   </div>`;
  //       $('.yourMapContainer').prepend(html);
  //     }
  //   });
});
