A library to find musics.

### Services

The library currently supports the following services:

- YouTube
- Deezer
- SliderKz

## How to use it

Let's use Deezer as an example:

```js
const Deezer  	= require('multimedia-search').Deezer;
var dz 			= new Youtube();

dz.search({title: 'Heart of Steel', artist: 'Beast in Black'}).then( (results) => 
{
	console.log(results);
});
```

Will result in the array:

```json
[
    {
        service: 'Deezer',
        id: 127372473,
        title: 'Rebirth',
        artist: 'Angra',
        thumbnailSrc:'https://cdns-images.dzcdn.net/[...]-80-0-0.jpg',
        href: 'https://www.deezer.com/track/127372473',
        preview: 'https://cdns-preview-9.dzcdn.net/stream/c-[...]-4.mp3'
    },
    {
        service: 'Deezer',
        id: 348808651,
        title: 'Rebirth',
        artist: 'Angra',
        thumbnailSrc:'https://cdns-images.dzcdn.net/[...]-80-0-0.jpg',
        href: 'https://www.deezer.com/track/348808651',
        preview: 'https://cdns-preview-8.dzcdn.net/stream/c-[...]-3.mp3'
    },
    {
        service: 'Deezer',
        id: 93539544,
        title: 'Rebirth',
        artist: 'Angra',
        thumbnailSrc:'https://cdns-images.dzcdn.net/[...]-80-0-0.jpg',
        href: 'https://www.deezer.com/track/93539544',
        preview: 'https://cdns-preview-8.dzcdn.net/stream/c-[...]-2.mp3'
    },
    {
        service: 'Deezer',
        id: 128324271,
        title: 'Rebirth (Live)',
        artist: 'Angra',
        thumbnailSrc:'https://cdns-images.dzcdn.net/[...]-80-0-0.jpg',
        href: 'https://www.deezer.com/track/128324271',
        preview:'https://cdns-preview-d.dzcdn.net/stream/c-[...]-4.mp3'
    }
]
```

### Searching in multiple services at once

```javascript
const Search  = require('multimedia-search').Search;
const Deezer  = require('multimedia-search').Deezer;
const Youtube = require('multimedia-search').Youtube;

var sh = new Search();
sh.addService(new Deezer()).addService(new Youtube());

sh.returnFirst(false); // If true, the serch will stop at the first service that returns something

sh.search({title: 'Magic Never Dies', artist: 'Power Quest'}).then( (results) =>
	console.log(results);
);
```

## Extending

If you wish to extend the library, you may follow the interface described below.

| Method                |                                                              |
| --------------------- | ------------------------------------------------------------ |
| constructor(settings) | Accepts an settings object that may differ from vendor to vendor.<br />Use it to pass API credentials and other informations.<br />@param object settings |
| search(terms)         | Returns a promise to be resolved once the search is done.<br />@param object terms An object describing the media to search for, it MUST support ( but may not be limited to ) the attributes: "title", "artist" and "soundtrack".<br />@return Promise |

