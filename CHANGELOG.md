# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2022-10-15
### Added
- Auth0 public key to api build step.
- Created auth function to check auth0 login.
- Added error message for unauthenticated users trying to create hazard.
- Added custom map pins.
- Added hover over message.

### Fixed
- Serverless lambda prisma build step.

### Changed
- Moved from v2 `httpApi` to v1 `http` due to authorizer conflict.

## [0.1.0] - 2022-10-14
### Added
- Initialised the project using vite, react and typescript.
- Created a basic readme.
- Added mapbox mapping functionality.
- Added tailwindcss.
- Added serverless framework api.