SoundCloud = require('../src/Services/SoundCloud');

var cliendId;

SoundCloud.getNewClientId().then( (id) => 
{
	cliendId = id;
	console.log(cliendId);
});
