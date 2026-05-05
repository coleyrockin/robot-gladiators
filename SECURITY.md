# Security Policy

## Supported Scope

Robot Gladiators is a static educational browser game. The supported surface area is:

- `index.html`
- `assets/js/game.js`
- Project documentation in this repository

There is no backend service, package dependency tree, authentication system, or deployment configuration in the current project.

## Current Security Posture

- No external scripts, styles, fonts, analytics, or CDN assets are loaded.
- Player input is collected through browser prompts and is not written into the DOM as HTML.
- Prompt input is trimmed and validated before it controls game choices.
- Player names are capped in length before storage.
- `localStorage` access is wrapped in `try/catch` so browser storage restrictions do not crash gameplay.
- High-score data is non-sensitive and stored locally in the player's browser.

## Reporting a Vulnerability

If this project is used in a public portfolio or class setting, report issues privately to the repository owner rather than opening public exploit details first.

Useful details to include:

- A short description of the issue
- Steps to reproduce
- Browser and operating system
- Expected behavior vs. actual behavior
- Any console errors

## Out of Scope

- Social engineering
- Attacks requiring physical access to a player's device
- Browser vulnerabilities unrelated to this project's code
- Issues caused by modified local copies outside this repository
