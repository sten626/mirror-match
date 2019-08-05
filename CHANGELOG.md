# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [v1.0.0-beta.6] - 2019-08-05

## Changed

- Updated dependencies to resolve security vulnerabilities.

## [v1.0.0-beta.5] - 2019-05-13

### Changed

- Updated dependencies to resolve security vulnerabilities.

## [v1.0.0-beta.4] - 2018-08-17

### Fixed

- Bug where the app would sometimes crash when pairing the last round.

## [v1.0.0-beta.3] - 2018-06-08

### Added

- "New window" icon on the version number link to the change log.
- Unit tests for the PlayerService.
- Ability to drop/undrop players at any time during the event from the players page.
- Ability to add players to the tournament at any time during the tournament.

### Changed

- Updated dependencies.
- New pairing algorithm; based on a weakly stable pairing algorithm for Stable Roommates Problem with master lists.

### Fixed

- Minor fixes to the PlayerService.
- Problem with MW% on players who dropped before the first round.
- Tiebreakers now used for pairing the final round.

## [v1.0.0-beta.2] - 2017-11-20

### Added

- A link to the app's change log from the version number in the page footer.

### Changed

- Displaying a player's true OMW%, GW%, and OGW% instead of the minimum of the 33% meant for tiebreaking.

### Fixed

- Problems with bad match submission restrictions.

## [v1.0.0-beta.1] - 2017-11-18

### Added

- First stage of application.
- Swiss tournament matchmaking functionality that allows for byes, dropping, and should support any number of players.
- Standings page that lists all players in order based on tiebreakers.
  - Match points > OMW% > GW% > OGW%.

[Unreleased]: https://github.com/sten626/mirror-match/compare/v1.0.0-beta.6...HEAD
[v1.0.0-beta.6]: https://github.com/sten626/mirror-match/compare/v1.0.0-beta.5...v1.0.0-beta.6
[v1.0.0-beta.5]: https://github.com/sten626/mirror-match/compare/v1.0.0-beta.4...v1.0.0-beta.5
[v1.0.0-beta.4]: https://github.com/sten626/mirror-match/compare/v1.0.0-beta.3...v1.0.0-beta.4
[v1.0.0-beta.3]: https://github.com/sten626/mirror-match/compare/v1.0.0-beta.2...v1.0.0-beta.3
[v1.0.0-beta.2]: https://github.com/sten626/mirror-match/compare/v1.0.0-beta.1...v1.0.0-beta.2
[v1.0.0-beta.1]: https://github.com/sten626/mirror-match/releases/tag/v1.0.0-beta.1
