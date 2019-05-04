$(document).ready(function() {

  var $formUsername = $('#form-username');
  var $formChat = $('#form-chat');
  var $preview = $('#preview');
  var $modalUsername = $('#modal-username');

  var ws = new WebSocket(`ws://${location.host}/chat`);

  var send  = function(data) {
    ws.send(JSON.stringify(data));
  }

  ws.onopen = () => {
    $modalUsername.modal('show');
  }

  ws.onmessage = (event) => {
    var data = JSON.parse(event.data);

    if (data.id === 1 && data.result) {
      $modalUsername.modal('hide');
    }

    if (data.id === 1 && data.error) {
      $formUsername.find('input').addClass('is-invalid');
      $formUsername.find('.invalid-feedback').text(data.error.message);
    }

    if (data.method === 'update') {
      $preview.append('<div class="mb-2">' + '<b>'+ data.params.username + '</b>:<br/>' + data.params.message + '</div>');
    }
  }

  $formUsername.on('submit', function(e) {
    e.preventDefault();
    var username = $(this).find('input').val();
    send({
      id: 1,
      method: 'username',
      params: {
        username: username
      }
    })
  });

  $formChat.on('submit', function(e) {
    e.preventDefault();
    send({
      method: 'message',
      params: {
        message: $(this).find('input').val()
      }
    })
  })

});