var Service = require('./Service.js');

class FileSystem extends Service 
{
    /*
    constructor() 
    {
        this.dirs     = [];
        this.files    = [];
    }

    addDir(dir) 
    {
        this.dirs.push(dir);
        this.dirs = array_unique(this.dirs);
        return this;
    }

    search(terms) 
    {
        this.terms = terms;
        this.checkDirs();
        this.scanDirs();
        data = this.readMetaDataFromFiles();
        return array_filter(data, array(this, 'compareWithparameters'));
    }

    checkDirs() 
    {
        if (! this.dirs) {
            throw new \Exception('No directory informed', 1);
        }

        nonExistentDirs = array_filter(this.dirs, function(dir) 
        {
            return !(file_exists(dir) && is_dir(dir));
        });

        if (nonExistentDirs) {
            throw new \Exception('Especified directories don\'t exist: '.implode(', ', nonExistentDirs), 1);
        }
    }

    readMetaDataFromFile(file) 
    {
        reader = new Reader(file);

        data['href'] = file;
        data['src'] = file;

        if (t = reader->getTitle()) {
            data['title'] = t;
        }

        if (empty(data['title'])) {
            data['title'] = basename(file);
        }

        if (t = reader->getArtist()) {
            data['artist'] = t;
        }

        return data;
    }

    readMetaDataFromFiles() 
    {
        data = array();
        foreach (this.files as f) {
            data[] = this.readMetaDataFromFile(f);
        }
        return data;
    }

    scanDirs() 
    {
        this.files = array();
        foreach (this.dirs as dir) {
            this.files = array_merge(this.files, self::scanForMp3Files(dir));
        }
    }

    scanForMp3Files(directory) 
    {
        return array_filter(self::getFilesRecusirvely(directory), function(file)
        {
            return preg_match('/\.mp3/', file);
        });
    }

    getFilesRecusirvely(directory) 
    {
        entries    = self::scanDir(directory);
        files      = array_filter(entries, 'is_file');
        dirs       = array_filter(entries, 'is_dir');

        foreach (dirs as dir) {
            files = array_merge(files, self::getFilesRecusirvely(dir.'/'));
        }

        return files;
    }

    scanDir(dir) 
    {
        contents = scandir(dir);
        contents = array_filter(contents, function(entr) {
            return entr != '.' && entr != '..';
        });

        contents = array_map(function(d) use (dir) 
        {
            return dir.d;
        }, contents);

        return contents;
    }
    */
}
