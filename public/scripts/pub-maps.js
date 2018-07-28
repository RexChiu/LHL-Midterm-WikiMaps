$(() => {
  $.getJSON('/maps').done(maps => {
    for (let map of maps) {
      var html = ``;
      //grabs the map url/id
      var mapId = map.url.split('/maps/')[1];

      //grab the points
      $.get(`/maps/${mapId}/points`).done(points => {
        html = `
  <div class="mapTitle"><a href="${map.url}">${map.name}</a></div>
  <div class="map"><img src="${map.img_url}" alt="Google Map Static Image"></div>
  <div class="map_desc">
    <textarea rows="4" cols="50">
    ${map.desc}
    </textarea>
  </div>
  <div class="rating">${map.rating}
  </div>
  <div>points</div>`;
        for (var i = 0; i < points.length; i++) {
          html += `<ul>
          <li>Title: ${points[i].title}</li>
          <li>Desc: ${points[i].desc}</li>
          <li>Rating: ${points[i].rating}</li>
          <li>Address: ${points[i].addr}</li>
          <li>URL: ${points[i].url}</li>
          </ul>`;
        }
        $('.mapContainer').append(html);
      });
    }
  });
});
