Deezer = require('../src/Services/Deezer');

dz = new Deezer({'artist': 'Angra', 'title': 'Rebirth'});
dz.search().then(function(result) 
{
    console.log(result);
})
