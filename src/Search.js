class Search 
{
    constructor() 
    {
        this.services = [];
    }

    addService(service) 
    {
        this.services.push(service);
        return this;
    }

    search(terms) 
    {
        results = [];
        for (let k in this.services) {
            let s = this.services[k];
            results = results.concat(s.search(terms));
        }
        return results;
    }
}

module.exports = Search;