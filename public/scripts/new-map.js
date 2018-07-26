$(() => {
  $('.createNewMap').on('click', ev => {
    ev.preventDefault(); //prevent default event from occuring  })
    let $form = $('.mapDetails');
    //let $private = $('.privateCheck');
    let name = $form.find('.name').val();
    let type = $form.find('.types').val();
    let desc = $form.find('.desc').val();
    let public = true; //hard coded... was $private.find('.isPrivate').val();
    let lat = 43.653; //hard coded Toronto
    let lng = -79.383; // hard coded Toronto
    const data = {
      name,
      type,
      desc,
      public,
      lat,
      lng
    };
    console.log(data);
    //   .ajax({
    //       method: 'POST',
    //       url: '/maps',
    //       data: data
    //     })
    //     .done(users => {
    //       for (user of users) {
    //         $('<div>')
    //           .text(user.name)
    //           .appendTo($('body'));
    //       }
    //     });
  });
});

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.653, lng: -79.383 },
    zoom: 8
  });
}
