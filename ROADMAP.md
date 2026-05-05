# Robot Gladiators Roadmap

This roadmap keeps the project practical: preserve the beginner-friendly JavaScript game while making each stage stronger for a portfolio review.

## Stage 1 — Stabilize the Current Game

- Keep prompt/alert gameplay working end-to-end.
- Add smoke-test notes for fight, skip, shop, replay, and high-score paths.
- Continue tightening input validation around prompt values.
- Document any browser quirks with blocked pop-ups, blocked storage, or private browsing.

## Stage 2 — Improve Maintainability

- Split configuration, game state, storage, and UI adapters into separate modules.
- Add a tiny test harness for pure helpers such as parsing, damage rolls, and score handling.
- Replace repeated strings with reusable message builders.
- Add linting/formatting once the project has package tooling.

## Stage 3 — Build an Accessible UI

- Replace modal prompts with semantic HTML controls.
- Add a combat log using an accessible live region.
- Provide keyboard-friendly buttons for fight, skip, refill, upgrade, and replay.
- Keep game state visible on screen: health, attack, money, opponent stats, and round number.

## Stage 4 — Expand Gameplay

- Add difficulty levels that tune enemy health, attack, rewards, and shop prices.
- Introduce more enemy types with distinct combat behavior.
- Add defensive moves, critical hits, or repair-over-time mechanics.
- Add a high-score reset and optional game-history view.

## Stage 5 — Portfolio Polish

- Add screenshots or a short demo GIF after the UI exists.
- Add automated browser tests for core flows.
- Publish through a static host only after security and accessibility checks pass.
- Write a short case-study section explaining refactor decisions and tradeoffs.
