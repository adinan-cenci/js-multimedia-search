var OnlineService = require('./OnlineService.js');

/**
 * 2019-11-09 NOTE: For some years now, sound cloud has stopped 
 * accepting the registration of new apps. So, as a hack this class makes uses 
 * of soundcloud's website search feature. 
 *
 * This feature needs a "client_id" parameter which seems to be session unique.
 * 
 * Unfortunaly
 *
 * For some reason, quotes inside strings are not being scaped, generating errors
 */

class SoundCloud extends OnlineService
{
    parseResponse(string)
    {
        var json        = JSON.parse(string);
        var results     = [];

        if (! json['collection']) {
            return results;
        }

        for (var content of json['collection']) {

            if (content.kind != 'track') {
                continue;
            }

            results.push(
            {
                'service'       : 'SoundCloud',
                'id'            : content.id,
                'title'         : content.title,
                'thumbnail'     : ( content.artwork_url || null ),
                'href'          : content.permalink_url
            });
        }

        return results;
    }

    static generateSearchUrl(terms, settings = null) 
    {
        var query       = OnlineService.generateSearchQuery(terms);
        return 'https://api-v2.soundcloud.com/search?q='+encodeURIComponent(query)+'&client_id='+settings.clientId+'&limit=20&offset=0&app_locale=en';
    }

    static randomString(length) 
    {
        var string = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charsLength = characters.length;
        
        for ( var i = 0; i < length; i++ ) {
            string += characters.charAt(Math.floor(Math.random() * charsLength));
        }

        return string;
    }


    static async getNewClientId() 
    {
        var opts   = {'headers': {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36'}};

        try {
            var html   = await OnlineService.httpRequest('https://soundcloud.com', opts);
            var script = SoundCloud.getScriptUrlFromHtml(html);

            if (! script) {
                return Promise.reject(new Error('Unable to generate a new ID'));
            }

            var json = await OnlineService.httpRequest(script, opts);
            var id   = SoundCloud.getClientIdFromJson(json);

            if (id) {
                return Promise.resolve(id);
            } else {
                return Promise.reject('Unable to read new ID');
            }

        } catch(e) {
            return Promise.reject(new Error(e));
        }
    }

    static getScriptUrlFromHtml(html) 
    {
        var results = [...html.matchAll(/<script crossorigin src="(https:\/\/a-v2.sndcdn.com\/assets\/[^"]+)"><\/script>/g)];

        if (! results.length) {
            return null;
        }

        return results[results.length-1][1];
    }

    static getClientIdFromJson(string) 
    {
        var results = [...string.matchAll(/\{client_id:"([^"]+)"\}/g)];

        if (! results.length) {
            return null;
        }

        return results[0][1];
    }
}

module.exports = SoundCloud;
