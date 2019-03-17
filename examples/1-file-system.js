FileSystem = require('../src/Services/FileSystem');

fs = new FileSystem();
fs.addDir('/home/adinancenci/Música/');

fs.search({'artistName': 'Martin O\'Donnell'}).then(function(result) 
{
    console.log(result);
})