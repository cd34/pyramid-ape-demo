/*
Set our initial variables
*/
cans = [
  ["diet", "dietcoke"], 
  ["cherry","cherrycoke"], 
];

/*
This reads the clicks from the Diet Coke/Coke Zero labels
*/
Ape.registerCmd('send', true, function(params, cmd) {
    var channel = Ape.getChannelByPubid(params.pipe);
    if (channel) {
      cans[0][1] = params.can
      channel.pipe.sendRaw('*coke', {'cans':[cans[0]]});
    }
});

/*
When a user joins, send them the entire state. Only when a person
logs in do they get the entire state. Otherwise, they will get 
channel updates of only the can changes
*/

Ape.addEvent('join', function (user, channel) {
  user.pipe.sendRaw('*coke', {'cans':cans});
});

/*
This allows us to send a json request to Ape to update the can on
the right
*/

Ape.registerCmd('updatecans', false, function(params, cmd) {
  if (params.password == 'testpasswd') {
    var channel = Ape.getChannelByName('*coke');
    if (channel) {
      cans[1][1] = params.can;
      channel.pipe.sendRaw('*coke', {'cans':[cans[1]]});
      return ["200", "ACCEPTED"];
    } else {
      return ["201", "NO_ONE_SIGNED_IN"];
    }
  } else {
    return ["400", "BAD_PASSWORD"];
  }
});
