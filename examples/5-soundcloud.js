const SoundCloud = require('../src/Services/SoundCloud');
var sc;

SoundCloud.getNewClientId().then( (clientId) => 
{
	sc = new SoundCloud({'artist': 'Angra', 'title': 'Rebirth'}, {clientId});

	sc.search().then(function(result) 
	{
	    console.log(result);
	});
	
});
