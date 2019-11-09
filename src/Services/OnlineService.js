"use strict";

var Service    = require('./Service.js');
const http     = require('http');
const https    = require('https');
const url      = require('url');

class OnlineService extends Service
{
    async search()
    {
        return OnlineService.httpRequest(this.getSearchUrl(), this.getRequestOptions()).then(async (response) =>
        {
            var results  = this.parseResponse(response);
            return       results.filter(this.isValid.bind(this));
        });
    }

    parseResponse(response)
    {
        // parse xml, parse json...
        // it only needs to return an array of objects
    }

    getSearchUrl()
    {
        return this.constructor.generateSearchUrl(this.terms, this.settings);
    }

    getRequestOptions()
    {
        return {};
    }

    static generateSearchUrl(terms, settings = null) 
    {
        var query = OnlineService.generateSearchQuery(terms);
        return 'http://the-web-site.com?q='+encodeURIComponent(query);
    }

    /**
     * It will generate a human readable string describing the music.
     */
    static generateSearchQuery(terms) 
    {
        var query =
        (terms.artist ? terms.artist+' ' : '') +
        (terms.soundtrack && !terms.artist ? terms.soundtrack+' ' : '') + 
        terms.title;

        return query;
    }

    static async httpRequest(address, options = {})
    {
        var myUrl     = url.parse(address);
        var protocol  = myUrl.protocol == 'https:' ? https : http;

        var defaultOptions =
        {
            hostname  : myUrl.hostname,
            port      : myUrl.port,
            path      : myUrl.path,
            agent     : false  // Create a new agent just for this one request
        };

        var options = {...defaultOptions, ...options};

        return new Promise(async function(success, fail)
        {
            protocol.get(options, (res) =>
            {
                if (res.statusCode !== 200) {
                    fail('Error: ' + res.statusCode);
                }

                res.setEncoding('utf8');

                let rawData = '';

                res.on('data', function(chunk)
                {
                    rawData += chunk;
                });

                res.on('end', function()
                {
                    success(rawData);
                });
            });
        });
    }
}

module.exports = OnlineService;
