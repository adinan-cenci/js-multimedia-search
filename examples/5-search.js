Youtube     = require('../src/Services/Youtube');
SliderKz    = require('../src/Services/SliderKz');
Search      = require('../src/Search');

sh = new Search();
yt = new Youtube();
sk = new SliderKz();


sh.addService(yt).addService(sk);

sh.search({'artist': 'Angra', 'title': 'Rebirth'}).then(async function(result)
{
    console.log(result);
})
