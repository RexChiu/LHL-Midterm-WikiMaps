$(() => {
  $.getJSON('/maps').done(maps => {
    for (let map of maps) {
      console.log(map);
      var html = `
  <div class="mapTitle"><a href="${map.url}">${map.name}</a></div>
  <div class="map"><img src="${map.img_url}" alt="Google Map Static Image"></div>
  <div class="map_desc">
    <textarea rows="4" cols="50">
    ${map.desc}
    </textarea>
  </div>
  <div>points
    <ul>
      <li>point 1</li>
      <li>point 1</li>
      <li>point 1</li>
      <li>point 1</li>
      <li>point 1</li>
    </ul>
    <div>
    <p></p>
  </div>`;
      $('.mapContainer').append(html);
    }
  });
});
