var OnlineService = require('./OnlineService.js');

class SliderKz extends OnlineService
{
    getRequestUrl()
    {
        return 'http://slider.kz/vk_auth.php?q='+encodeURIComponent(this.getMediaSearchQuery());
    }

    getRequestOptions()
    {
        return {'headers': {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36'}};
    }

    parseResponse(string)
    {
        var json    = JSON.parse(string);
        var k       = Object.keys(json.audios)[0];
        var results = [];

        for(let s of json.audios[k]) {
            results.push(
            {
                'service'   : 'SliderKz',
                'id'        : s.id,
                'duration'  : s.duration,
                'title'     : s.tit_art,
                'src'       : 'http://slider.kz/download/'+s.id+'/'+s.duration+'/'+s.url+'/'+s.tit_art+'.mp3?extra='+s.extra
            });
        }

        return results;
    }
}

module.exports = SliderKz;
