$(() => {
  $('.createNewMap').on('click', ev => {
    ev.preventDefault(); //prevent default event from occuring  })
    let $form = $('.mapDetails');
    //let $private = $('.privateCheck');
    let name = $form.find('.name').val();
    let type = $form.find('.types').val();
    let desc = $form.find('.desc').val();
    let public = true; //hard coded... was $private.find('.isPrivate').val();
    let lat = map.getCenter().lat();
    let lng = map.getCenter().lng();
    const data = {
      name,
      type,
      desc,
      public,
      lat,
      lng
    };

    $.post('/maps', data)
      .done(resp => console.log(resp))
      .fail(err => console.log(err.message));
  });
});

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.653, lng: -79.383 }, //hard coded center toronto
    zoom: 8
  });
}
