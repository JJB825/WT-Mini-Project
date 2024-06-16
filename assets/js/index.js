if (window.location.pathname == '/ride-booking') {
  $redirect = $('.drivers-list .driver-box .driver-details .accept-button');
  $redirect.click(function () {
    const name = $(this).attr('driver_name');
    const code = Math.random().toString(36).substring(2, 8);

    const request = {
      url: `http://localhost:3000/feedback?name=${name}&code=${code}`,
      method: 'GET',
    };

    $.ajax(request).done(function () {
      window.location.href = `/feedback?name=${name}&code=${code}`;
    });
  });
}

document
  .getElementById('feedbackForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Display an alert message
    alert('Thank you for your response');

    // Redirect to the specified URL
    window.location.href = 'http://localhost:3000/home';
  });
