$(() => {
  $.getJSON('/maps').done(maps => {
    for (let map of maps) {
      var html = ``;
      //grabs the map url/id
      var mapId = map.url.split('/maps/')[1];

      //grab the points
      $.get(`/maps/${mapId}/points`).done(points => {
        html = `
  <div class="card">
      <div class="map"><img class="card-img-top" src="${map.img_url}" alt="Google Map Static Image"></div>
    <div class="card-body">
      <div class="card-title mapTitle"><a href="${map.url}"><h5>${map.name}</h5></a></div>
      <div class="map_desc card-text">
        <p>${map.desc}</p>  
      </div>
      <div class="card-footer">  
        <div class="rating">${map.rating}</div>    
        <div class="points">points</div>`;
        //COMMENTED OUT POINT DETAILS WHILE STYLING.
        // for (var i = 0; i < points.length; i++) {
        //   html += `<div><ul>
        //   <li>Title: ${points[i].title}</li>
        //   <li>Desc: ${points[i].desc}</li>
        //   <li>Rating: ${points[i].rating}</li>
        //   <li>Address: ${points[i].addr}</li>
        //   <li>URL: ${points[i].url}</li>
        //   </ul></div>`;
        // }
        html += `
  </div>
    </div>
      </div>`;
        $('.mapContainer').append(html);
      });
    }
  });
});
