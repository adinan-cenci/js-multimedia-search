Youtube = require('../src/Services/Youtube');

yt = new Youtube({'artist': 'Angra', 'title': 'Rebirth'});
yt.search().then(function(result)
{
    console.log(result);
})
