Youtube = require('../src/Services/Youtube');

yt = new Youtube();
yt.search({'artist': 'Angra', 'title': 'Rebirth'}).then(function(result)
{
    console.log(result);
})
