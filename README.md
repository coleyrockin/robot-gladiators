# Robot Gladiators

Browser-based robot fighting game where players battle through rounds of enemy robots using attacks, upgrades, and repair items.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

Robot Gladiators is a lightweight browser game built with vanilla JavaScript. Players name a robot, battle through a three-enemy gauntlet, earn money for wins, make shop decisions between rounds, and try to set a local high score.

The project intentionally keeps the original prompt/alert gameplay style while organizing the code like a maintainable portfolio project: central configuration, input validation, localStorage safety checks, and documentation for future improvements.

## Features

- Prompt-driven turn-based combat against three robot opponents
- Randomized enemy health, enemy attack, turn order, and damage rolls
- Player choices to fight, skip, refill health, or upgrade attack
- Money rewards and skip penalties with guardrails against negative balances
- Local high-score persistence with a namespaced storage key and legacy score migration support
- Defensive handling for invalid prompt input and unavailable `localStorage`
- No framework, build step, CDN, or external runtime dependency

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | JavaScript (ES6+) |
| UI | Browser dialogs (`prompt`, `confirm`, `alert`) |
| Persistence | `localStorage` |
| Runtime | Static HTML in a modern browser |

## Controls and Usage

1. Clone the repository:

   ```sh
   git clone https://github.com/coleyrockin/robot-gladiators.git
   cd robot-gladiators
   ```

2. Open `index.html` directly in a modern browser.
3. Enter a robot name when prompted.
4. During each player turn, type `FIGHT` to attack or `SKIP` to avoid the battle.
5. Between rounds, choose whether to visit the shop.
6. In the shop, enter:
   - `1` to refill health
   - `2` to upgrade attack
   - `3` to leave
7. Open the browser console if you want to follow detailed combat logs.

No package install is required.

## Project Structure

```text
robot-gladiators/
├── assets/
│   └── js/
│       └── game.js      # Game configuration, state, helpers, and gameplay loop
├── index.html           # Static page shell and no-JavaScript fallback
├── README.md            # Project overview and usage notes
├── ROADMAP.md           # Staged future improvement plan
└── SECURITY.md          # Security scope and reporting notes
```

## Security and Accessibility Notes

- The game does not insert player-provided values into the DOM, which avoids common unsafe HTML injection paths.
- Prompt values are trimmed and validated before they control game flow.
- Player names are length-limited before being logged or saved.
- High scores use namespaced `localStorage` keys; reads and writes are wrapped so private browsing or blocked storage does not crash the game.
- The app does not load external scripts, styles, fonts, analytics, or CDN assets.
- `index.html` includes language, viewport, description metadata, a visible heading, and a `<noscript>` fallback.
- Gameplay relies on browser modal dialogs, which is intentionally simple but not ideal for screen readers or keyboard flow. A future UI should use semantic controls and an accessible live region.

## Verification

Run these checks from the project root:

```sh
node --check assets/js/game.js
git diff --check
python3 - <<'PY'
from html.parser import HTMLParser
HTMLParser().feed(open('index.html', encoding='utf-8').read())
print('index.html parsed')
PY
```

Manual smoke test:

1. Open `index.html` in a browser.
2. Play at least one round using both valid and invalid prompt responses.
3. Confirm the shop accepts only `1`, `2`, or `3`.
4. Finish a game and verify high-score behavior does not throw errors in the console.

## Future Improvements

- Replace prompt/alert gameplay with a semantic in-page interface.
- Add automated browser tests for fight, skip, shop, and high-score flows.
- Add a reset high-score control.
- Introduce difficulty levels and enemy variety.
- Persist richer game history without storing sensitive user data.

See [ROADMAP.md](./ROADMAP.md) for a staged improvement plan.

---

Built by [Boyd Roberts](https://github.com/coleyrockin).
