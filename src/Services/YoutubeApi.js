var OnlineService = require('./OnlineService.js');

class YoutubeApi extends OnlineService 
{
    getRequestUrl() 
    {
        return 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key='+this.credentials.key+'&q='+encodeURIComponent(this.getMediaSearchQuery());
    }
    
    parseResponse(string) 
    {
        var json       = JSON.parse(string);
        var results    = [];

        for (var content of json.items) {           
            results.push(
            {
                'id'            : content.id.videoId, 
                'title'         : content.snippet.title, 
                'thumbnailSrc'  : content.snippet.thumbnails.medium.url, 
                'href'          : 'http://youtube.com/watch?v='+content.id.videoId
            });
        }

        return results;
    }
}
