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
    $.post('/users/login', requestPayload).then(response => {
      console.log('This is the response', response);
      window.location.href = 'http://localhost:8080/profile';
    });
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
    $.post('/users/register', requestPayload).then(response => {
      window.location.href = 'http://localhost:8080/profile';
    });
  });
  // LOGOUT BUTTON EVENT LISTENER
  $('#logout-btn').on('click', ev => {
    ev.preventDefault();
    $.post('/users/logout').then(res => {
      console.log(res);
    });
  });
});
