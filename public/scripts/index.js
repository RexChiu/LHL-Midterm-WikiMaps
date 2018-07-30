$(() => {
  $.getJSON('/maps').done(maps => {
    if (maps.length != 0) {
      for (let map of maps) {
        var html = ``;
        //grabs the map url/id
        var mapId = map.url.split('/maps/')[1];

        //grab the points
        $.get(`/maps/${mapId}/points`).done(points => {
          html = `<div class="row featurette">
        <div class="col-md-7 push-md-5">
          <h2 class="featurette-heading"><a href="${map.url}">${map.name}</a></h2>
          <p class="lead">${map.desc}</p>
        `;
          for (var i = 0; i < points.length; i++) {
            html += `<div><ul>
          <li>Title: ${points[i].title}</li>
          <li>Desc: ${points[i].desc}</li>
          <li>Rating: ${points[i].rating}</li>
          <li>Address: ${points[i].addr}</li>
          <li>URL: ${points[i].url}</li>
          </ul></div>`;
          }
          html += `</div>
        <div class="col-md-5 pull-md-7">
          <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="${map.img_url}" data-holder-rendered="true"
            style="width: 500px; height: 500px;">
        </div>
      </div><hr class='featurette-divider">`;
          $('.mapContainer').append(html);
        });
      }
    } else {
      $('.mapContainer').append('<h1>You have no created any maps yet!</h1>');
    }
  });
});
