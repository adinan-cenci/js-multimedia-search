var OnlineService = require('./OnlineService.js');

class Deezer extends OnlineService
{
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

    static generateSearchUrl(terms, settings = null) 
    {
        var query = OnlineService.generateSearchQuery(terms);
        return 'https://api.deezer.com/search?q='+encodeURIComponent(query);
    }
}

module.exports = Deezer;
