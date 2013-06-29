/*
Update the elements based on the id and state
*/

function _update_can(id, state) {
  $('#'+id).attr('src', state+'.png');
  $('#'+id).attr('alt', state);
  $('#status-'+id).html(state);
  if ( (state == 'cokezero') || (state == 'blackcherryvanillacoke') ) {
    $('#status-'+id).attr('class', 'alert-message error');
  } else {
    $('#status-'+id).attr('class', 'alert-message success');
  }
};

/* 
Handle received Events and update the html based on the data
*/

function recvEvent(event) {
  if (event['cans']) {
    for (loop in event.cans) {
// avoid __proto__
      if (parseInt(loop) == loop) {
        _update_can(event.cans[loop][0], event.cans[loop][1]);
      }
    }
  }
}

/*
Set up the Ape Client
*/

var client = new APE.Client();
client.load({'channel': '*coke'});
client.addEvent('load', function() {                
  client.core.start({'name': new Date().getTime().toString()});
});

/*
Set up the event - when raw packets are received on the channel *coke, 
call recvEvent
*/

client.onRaw('*coke', function(params) {
  recvEvent(params.data);
});

/*
This is the event called when one clicks on the Diet Coke or
Coke Zero button.
*/

client.addEvent('multiPipeCreate', function(pipe) {
  $('[id^=l-]').click(function() {
    cell = $(this).attr('id').substring(2);
    pipe.request.send('send', {'can': cell});
  });
});

/*
Handle the post to Pyramid to update and simulate a server based 
message.
*/

$('[name^=cherry]').change(function() {
$.post("http://pyramidape.cd34.com/post", 
       {'can':$(this).attr('value')}, 
       { xhrFields: {
           withCredentials: false,
         }
       })
});
