SliderKz = require('../src/Services/SliderKz');

sk = new SliderKz();
sk.search({title: 'Heart of Steel', artist: 'Beast in Black'}).then(function(result) 
{
    console.log(result);
})
