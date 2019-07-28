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
        return new Promise(async (success, fail) =>
        {
            var all = [];
            for (let k in this.services) {
                let s = this.services[k];

                var results = await s.search(terms);

                if (results.length && this.returnFirstResults) {
                    return success(results);
                }

                all = all.concat(results);
            }

            return success(all);
        });
    }
}

module.exports = Search;
