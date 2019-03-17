Youtube = require('../src/Services/Youtube');

yt = new Youtube();
yt.search({'artistName': 'Angra', 'title': 'Rebirth'}).then(function(result) 
{
    console.log(result);
})
