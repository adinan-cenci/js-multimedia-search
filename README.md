A library to find music on the Internet.

There are dozens of audio streaming providers out there, this is an attempt to standardize how to search for musics and read the results from different sources. The library currently supports the following services:

- YouTube
- Deezer
- SliderKz
- SoundCloud

## How to use it

Let's use Deezer as an example:

```js
const Deezer    = require('multimedia-search').Deezer;
var dz          = new Deezer({title: 'Rebirth', artist: 'Angra'});

dz.search().then( (results) =>
{
    console.log(results);
});
```

Will result in the array:

```json
[
    {
        "service": "Deezer",
        "id": 127372473,
        "title": "Rebirth",
        "artist": "Angra",
        "thumbnail": "https://cdns-images.dzcdn.net/[...]-80-0-0.jpg",
        "href": "https://www.deezer.com/track/127372473",
        "preview": "https://cdns-preview-9.dzcdn.net/stream/c-[...]-4.mp3"
    },
    {
        "service": "Deezer",
        "id": 348808651,
        "title": "Rebirth",
        "artist": "Angra",
        "thumbnail": "https://cdns-images.dzcdn.net/[...]-80-0-0.jpg",
        "href": "https://www.deezer.com/track/348808651",
        "preview": "https://cdns-preview-8.dzcdn.net/stream/c-[...]-3.mp3"
    },
    {
        "service": "Deezer",
        "id": 93539544,
        "title": "Rebirth",
        "artist": "Angra",
        "thumbnail": "https://cdns-images.dzcdn.net/[...]-80-0-0.jpg",
        "href": "https://www.deezer.com/track/93539544",
        "preview": "https://cdns-preview-8.dzcdn.net/stream/c-[...]-2.mp3"
    },
    {
        "service": "Deezer",
        "id": 128324271,
        "title": "Rebirth (Live)",
        "artist": "Angra",
        "thumbnail": "https://cdns-images.dzcdn.net/[...]-80-0-0.jpg",
        "href": "https://www.deezer.com/track/128324271",
        "preview": "https://cdns-preview-d.dzcdn.net/stream/c-[...]-4.mp3"
    }
]
```

## The interface

If you wish to extend the library to accommodate other services, you may follow the interface described below.

### Service

**constructor(terms, settings = {})**
*@param object terms*. An object describing the media to search for, it MUST support ( but may not be limited to ) the attributes: 

- title
- artist
- soundtrack

*@param object settings*. A settings object that may differ from vendor to vendor, optional. Use it to pass API credentials and other informations.

**search()**
Returns a promise to be resolved once the search is completed. The promise must return an array of objects describing the results.
*@return Promise*

The result objects may be described with one or more of the following proprieties:

- id
- title
- artist
- album
- href: Web-page
- src: URL to a playable resource
- thumbnail: A picture or an URL to one

**isValid(result)**
It will be used to filter the search results.
@param object result. 

### OnlineService

It extends Service.

**static generateSearchUrl(terms, settings = null)**
Return an URL to be used in search requests. 
*@param object terms*. Object describing the music we are looking for.
*@param object settings.* Optional, object containing API credentials, depends on the vendor.
*@return string*






