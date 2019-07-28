Deezer = require('../src/Services/Deezer');

dz = new Deezer();
dz.search({'artist': 'Angra', 'title': 'Rebirth'}).then(function(result) 
{
    console.log(result);
})
