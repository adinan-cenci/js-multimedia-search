var OnlineService = require('./OnlineService.js');

class Youtube extends OnlineService
{
    async search()
    {
        return OnlineService.httpRequest(this.getSearchUrl(), this.getRequestOptions()).then(async (html) =>
        {
            var response    = Youtube.scrapJson(html);
            var results     = this.parseResponse(response);
            return          results.filter(this.isValid.bind(this));
        });
    }

    getRequestOptions()
    {
        return {'headers': {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36'}};
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
                'service'       : 'YouTube',
                'id'            : content.videoRenderer.videoId,
                'title'         : content.videoRenderer.title.runs[0].text,
                'thumbnail'     : content.videoRenderer.thumbnail.thumbnails[0].url,
                'href'          : 'http://youtube.com/watch?v='+content.videoRenderer.videoId
            });
        }

        return results;
    }

    static scrapJson(html)
    {
        var matches = html.match(/window\[\"ytInitialData\"\] ?= ?(.+);\n +window/);
        if (! matches) {
            return null;
        }

        return matches[1];
    }

    static generateSearchUrl(terms, settings = null) 
    {
        var query = OnlineService.generateSearchQuery(terms);
        return 'https://www.youtube.com/results?search_query='+encodeURIComponent(query);
    }
}

module.exports = Youtube;
