Deezer = require('../src/Services/Deezer');

dz = new Deezer();
dz.search({'artistName': 'Angra', 'title': 'Rebirth'}).then(function(result) 
{
    console.log(result);
})