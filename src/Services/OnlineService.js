"use strict";

var Service    = require('./Service.js');
const http     = require('http');
const https    = require('https');
const url      = require('url');

class OnlineService extends Service
{
    async search(terms)
    {
        this.terms = terms;
        return OnlineService.makeRequest(this.getRequestUrl(), this.getRequestOptions()).then(async (response) =>
        {
            var data        = this.parseResponse(response);
            return          data.filter(this.compareWithTerms.bind(this));
        });
    }

    test(terms)
    {
        this.terms = terms;
        console.log(this.getMediaSearchQuery())
    }

    parseResponse(response)
    {
        // parse xml, parse json, scrap it...
        // it only needs to return an array of objects
    }

    getRequestUrl()
    {
        return 'http://the-web-site.com?q='+encodeURIComponent(this.getMediaSearchQuery());
    }

    getRequestOptions()
    {
        return {};
    }

    getMediaSearchQuery()
    {
        var query =
        (this.terms.artist ? this.terms.artist+' ' : '')+
        (this.terms.soundtrack && !this.terms.artist ? this.terms.soundtrack+' ' : '')+
        this.terms.title;

        return query;
    }
}

OnlineService.makeRequest = async function(address, options = {})
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
};

module.exports = OnlineService;
