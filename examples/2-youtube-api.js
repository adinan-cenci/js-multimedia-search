YoutubeApi = require('../src/Services/YoutubeApi.js');

yt = new YoutubeApi({'artist': 'Angra', 'title': 'Spread your fire'}, {apiKey: 'your-app-key-here'});

yt.search().then(function(result)
{
    console.log(result);
}).catch(function(err)
{
    console.log(err)
})
