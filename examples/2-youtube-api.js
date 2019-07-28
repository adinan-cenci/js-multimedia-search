YoutubeApi = require('../src/Services/YoutubeApi.js');

yt = new YoutubeApi({apiKey: 'your-app-key-here'});

yt.search({'artist': 'Angra', 'title': 'Spread your fire'}).then(function(result)
{
    console.log(result);
}).catch(function(err)
{
    console.log(err)
})
