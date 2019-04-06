class Search
{
    constructor()
    {
        this.returnFirstResults = false;
        this.services = [];
    }

    returnFirst(bool = true)
    {
        this.returnFirstResults = bool;
        return this;
    }

    addService(service)
    {
        this.services.push(service);
        return this;
    }

    async search(terms)
    {
        var gxi = this;

        return new Promise(async function(success, fail)
        {
            var all = [];
            for (let k in gxi.services) {
                let s = gxi.services[k];

                var results = await s.search(terms);

                if (results.length && gxi.returnFirstResults) {
                    return success(results);
                }

                all = all.concat(results);
            }

            return success(all);
        });
    }
}

module.exports = Search;
