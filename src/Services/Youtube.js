var OnlineService = require('./OnlineService.js');

class Youtube extends OnlineService 
{
    search(terms) 
    {
        this.terms      = terms;
        var gxi = this;
        return OnlineService.makeRequest(this.getRequestUrl(), this.getRequestOptions()).then(function(html) 
        {
            var string      = gxi.scrapJson(html);
            var data        = gxi.parseResponse(string);
            return          data.filter(gxi.compareWithparameters.bind(gxi));
        });
    }

    getRequestUrl() 
    {
        return 'https://www.youtube.com/results?search_query='+encodeURIComponent(this.getMediaSearchQuery());
    }

    getRequestOptions() 
    {
        return {'headers': {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36'}};
    }
    
    scrapJson(html) 
    {
        var matches = html.match(/window\[\"ytInitialData\"\] = (.+);\n    window/);
        if (! matches) {
            return null;
        }

        return matches[1];
    }

    parseResponse(string) 
    {
        var json       = JSON.parse(string);
        var results    = [];

        if (! json.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents) {
            return [];
        }

        for (var content of json.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents) {
            if (!content.videoRenderer || !content.videoRenderer.videoId) {
                continue;
            }
            
            results.push(
            {
                'id'            : content.videoRenderer.videoId, 
                'title'         : content.videoRenderer.title.simpleText, 
                'thumbnailSrc'  : content.videoRenderer.thumbnail.thumbnails[0].url, 
                'href'          : 'http://youtube.com/watch?v='+content.videoRenderer.videoId
            });
        }

        return results;
    }
}

dz = new Youtube();
dz.search({artistName: 'Angra', title: 'Rebirth'}).then(function(res) 
{
    console.log(res);
});

module.exports = Youtube;