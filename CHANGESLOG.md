# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- The search terms must be passed through the constructor instead of the 
search method and can't be changed after instantiation.
- the search method no longer receives parameters.
- In the previous iteration, the interface for search results diferenciated resources 
from urls in the "thumbnail" and "thumbnailSrc" proprieties. thumbnailSrc is now 
deprecated and removed, the thumbnail property will support both data types.

### Added
- Added support for SoundCloud.

### Removed
- Class Search deprecated and removed.
