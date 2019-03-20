class Service 
{
    constructor() 
    {
        this.terms = [];
    }

    getResults(terms) 
    {
        this.terms = terms;
    }

    compareWithparameters(result) 
    {
        if (!result.artist && !result.title) {
            return false;
        }

        if (
            result.artist && 
            this.terms.artistName && 
            !this.compareArtist(result.artist, this.terms.artistName)
        ) {
            return false;
        }

        if (! this.terms.title) {
            return true;
        }

        let title;
        title = this.terms.artistName ? result.title.replace(this.terms.artistName, '') : result.title;
        title = this.terms.soundtrack ? title.replace(this.terms.soundtrack, '') : title;

        if (Service.similarEnough(title, this.terms.title)) {
            return true;
        }

        return false;
    }

    compareArtist(hayStack, artistName) 
    {
        hayStack = Array.isArray(hayStack) ? hayStack : [hayStack];

        for(var ar of hayStack) {
            if (Service.similarEnough(artistName, ar)) {
                return true;
            }
        }

        return false;
    }
}

Service.similarEnough = function(string1, string2, tolerance = 70) 
{
    perc = Service.compare(string1, string2);
    return perc >= tolerance;
}

Service.stripString = function(string) 
{
    string = string.toLowerCase();
    for(s of ['-', '_', ':', '=', '[', ']', '(', ')', '|', ' - ', 'with lyrics', 'lyrics', 'official video', 'legendado']) {
        string = string.replace(s, '');
    }
    return string;
}

Service.compare = function(var1, var2) 
{
    var1 = Service.stripString(var1);
    var2 = Service.stripString(var2);

    return Service.similar_text(var1, var2);
}

// Source: https://searchcode.com/codesearch/view/69253319/
Service.similar_text = function(first, second, percent = 1) 
{
    if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
        return 0;
    }

    first += '';
    second += '';

    var pos1 = 0,
    pos2 = 0,
    max = 0,
    firstLength = first.length,
    secondLength = second.length,
    p, q, l, sum;
    max = 0;

    for (p = 0; p < firstLength; p++) {
        for (q = 0; q < secondLength; q++) {
            for (l = 0; (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++);
                if (l > max) {
                    max = l;
                    pos1 = p;
                    pos2 = q;
                }
        }
    }

    sum = max;

    if (sum) {
        if (pos1 && pos2) {
            sum += this.similar_text(first.substr(0, pos2), second.substr(0, pos2));
        }

        if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
            sum += this.similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
        }
    }

    if (! percent) {
        return sum;
    }

    return (sum * 200) / (firstLength + secondLength);    
}

module.exports = Service;