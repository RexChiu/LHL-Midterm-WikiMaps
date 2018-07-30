$(() => {
  // EVENT LISTENERS TO LAUNCH MODALS
  $('#navlogin').on('click', () => {
    $('#loginModal').modal('show');
  });
  $('#navregister').on('click', () => {
    $('#registerModal').modal('show');
  });
  // LOGIN FORM BUTTON EVENT LISTENER
  $('#login-form-btn').on('click', ev => {
    ev.preventDefault();
    let requestPayload = {
      username: $('#login-username').val(),
      password: $('#login-password').val()
    };
    if (!requestPayload.username || !requestPayload.password) {
      alert('Please enter both a Username and a Password');
    } else {
      $.post('/users/login', requestPayload)
        .done(response => {
          console.log('This is the response', response);
          window.location.href = 'http://localhost:8080/profile';
        })
        .fail(err => {
          alert(err);
        });
    }
  });
  // REGISTER FORM BUTTON EVENT LISTENER
  $('#register-form-btn').on('click', ev => {
    ev.preventDefault();
    let requestPayload = {
      name: $('#register-name').val(),
      username: $('#register-username').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val(),
      password_confirm: $('#register-password_confirm').val()
    };
    $.post('/users/register', requestPayload)
      .done(response => {
        window.location.href = 'http://localhost:8080/profile';
      })
      .fail(err => {
        alert(err);
      });
  });
  // LOGOUT BUTTON EVENT LISTENER
  $('#logout-btn').on('click', ev => {
    ev.preventDefault();
    $.post('/users/logout')
      .done(res => {
        window.location.href = 'http://localhost:8080/';
      })
      .fail(err => {
        alert(err);
      });
  });
  // HOME BUTTON EVENT LISTENER
  $('#home-btn').on('click', ev => {
    ev.preventDefault();
    window.location.href = 'http://localhost:8080/';
  });
  // PROFILE BUTTON EVENT LISTENER
  $('#profile-btn').on('click', ev => {
    ev.preventDefault();
    window.location.href = 'http://localhost:8080/profile';
  });
  // NEW MAP BUTTON EVENT LISTENER
  $('#new-map-btn').on('click', ev => {
    ev.preventDefault();
    window.location.href = 'http://localhost:8080/maps/new';
  });
});
