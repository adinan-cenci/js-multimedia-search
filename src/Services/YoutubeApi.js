var OnlineService = require('./OnlineService.js');

class YoutubeApi extends OnlineService
{
    parseResponse(string)
    {
        var json       = JSON.parse(string);
        var results    = [];

        for (var content of json.items) {
            results.push(
            {
                'service'       : 'YouTubeApi',
                'id'            : content.id.videoId,
                'title'         : content.snippet.title,
                'thumbnailSrc'  : content.snippet.thumbnails.medium.url,
                'href'          : 'http://youtube.com/watch?v='+content.id.videoId
            });
        }

        return results;
    }

    static generateSearchUrl(terms, settings = null) 
    {
        var query = OnlineService.generateSearchQuery(terms);
        return 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key='+settings.apiKey+'&q='+encodeURIComponent(query);
    }
}

module.exports = YoutubeApi;
