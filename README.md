# Robot Gladiators

Browser-based robot fighting game where players battle through rounds of enemy robots using attacks and repair items.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## About

Robot Gladiators is a turn-based combat game that runs in the browser using `window.prompt` and `window.confirm` dialogs. Players name their robot, fight through a gauntlet of enemy bots, and manage health and currency between rounds. The game tracks high scores across sessions and introduces core programming concepts like loops, conditionals, and state management.

## Features

- Name your robot and enter the arena
- Turn-based combat with attack, skip, and flee options
- In-game shop to restore health between rounds
- High score leaderboard with localStorage
- Randomized enemy stats for replayability
- Progressive difficulty across rounds

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | JavaScript (ES6+) |
| UI | Browser dialogs (prompt / confirm / alert) |
| Persistence | localStorage |

## Getting Started

```bash
git clone https://github.com/coleyrockin/robot-gladiators.git
cd robot-gladiators
```

Open `index.html` in your browser to start battling.

## Project Structure

```
├── assets/
│   └── js/        # Game logic
├── index.html     # Entry point
└── README.md
```

---

Built by [Boyd Roberts](https://github.com/coleyrockin)
