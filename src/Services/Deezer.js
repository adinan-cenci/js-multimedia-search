var OnlineService = require('./OnlineService.js');

class Deezer extends OnlineService
{
    getRequestUrl()
    {
        return 'https://api.deezer.com/search?q='+encodeURIComponent(this.getMediaSearchQuery());
    }

    parseResponse(string)
    {
        var json        = JSON.parse(string);
        var results     = [];

        if (! json['data']) {
            return results;
        }

        for (var content of json['data']) {

            results.push(
            {
                'service'       : 'Deezer',
                'id'            : content.id,
                'title'         : content.title_short,
                'artist'        : content.artist.name,
                'thumbnail'     : content.album.cover_medium,
                'href'          : content.link,
                'preview'       : content.preview
            });
        }

        return results;
    }
}

module.exports = Deezer;
