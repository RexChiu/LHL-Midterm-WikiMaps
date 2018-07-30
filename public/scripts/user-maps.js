$(() => {
  //get the maps that belong to the user
  $.getJSON(`/users/maps`)
    .done(maps => {
      for (let map of maps) {
        //grabs the map url/id
        var mapId = map.url.split('/maps/')[1];
        var html = `<div class="row featurette">
        <div class="col-md-7 push-md-5">
          <h2 class="featurette-heading"><a href="${map.url}">${map.name}</a></h2>
          <p class="lead">${map.desc}</p>
        </div>
        <div class="col-md-5 pull-md-7">
          <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="${map.img_url}" data-holder-rendered="true"
            style="width: 500px; height: 500px;">
        </div>
      </div><hr class='featurette-divider">`;
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
        var html = `<div class="row featurette">
        <div class="col-md-7 push-md-5">
          <h2 class="featurette-heading"><a href="${map.url}">${map.name}</a></h2>
          <p class="lead">${map.desc}</p>
        </div>
        <div class="col-md-5 pull-md-7">
          <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="${map.img_url}" data-holder-rendered="true"
            style="width: 500px; height: 500px;">
        </div>
      </div><hr class='featurette-divider">`;
        $('.favMapContainer').prepend(html);
      }
    })
    .fail(function() {
      console.log('User has no favourites');
    });

  // </div>
  // <div>points
});
