YoutubeApi = require('../src/Services/YoutubeApi');

yt = new YoutubeApi();
yt.credentials({'key': 'your-key-here'});

yt.search({'artistName': 'Angra', 'title': 'Spread your fire'}).then(function(result) 
{
    console.log(result);
})