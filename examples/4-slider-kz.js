SliderKz = require('../src/Services/SliderKz');

sk = new SliderKz({title: 'Heart of Steel', artist: 'Beast in Black'});
sk.search().then(function(result) 
{
    console.log(result);
})
