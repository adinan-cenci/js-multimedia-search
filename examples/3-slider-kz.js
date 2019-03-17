SliderKz = require('../src/Services/SliderKz');

sk = new SliderKz();
sk.search({'title': 'sword of retribution'}).then(function(result) 
{
    console.log(result);
})