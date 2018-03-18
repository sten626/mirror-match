# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- "New window" icon on the version number link to the change log.
- Unit tests for the PlayerService.
- Ability to drop/undrop players at any time during the event from the players page.

### Changed
- Updated dependencies.

### Fixed
- Minor fixes to the PlayerService.

## [1.0.0-beta.2] - 2017-11-20
### Added
- A link to the app's change log from the version number in the page footer.

### Changed
- Displaying a player's true OMW%, GW%, and OGW% instead of the minimum of the 33% meant for tiebreaking.

### Fixed
- Problems with bad match submission restrictions.

## 1.0.0-beta.1 - 2017-11-18
### Added
- First stage of application.
- Swiss tournament matchmaking functionality that allows for byes, dropping, and should support any number of players.
- Standings page that lists all players in order based on tiebreakers.
  - Match points > OMW% > GW% > OGW%.

[Unreleased]: https://github.com/sten626/mirror-match/compare/1.0.0-beta.2...HEAD
[1.0.0-beta.2]: https://github.com/sten626/mirror-match/compare/1.0.0-beta.1...1.0.0-beta.2
