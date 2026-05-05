/*
 * Robot Gladiators
 * A prompt/alert-driven browser game. The code intentionally avoids DOM writes so
 * player-controlled text is never inserted into the page as HTML.
 */

"use strict";

/* GAME CONFIGURATION */

var GAME_CONFIG = {
  storageKeys: {
    highScore: "robot-gladiators.highScore",
    legacyHighScore: "highscore",
    playerName: "robot-gladiators.playerName",
    legacyPlayerName: "name"
  },
  playerDefaults: {
    health: 100,
    attack: 10,
    money: 10
  },
  skipPenalty: 10,
  winReward: 20,
  damageVariance: 3,
  playerNameMaxLength: 24,
  enemyHealthRange: {
    min: 40,
    max: 60
  },
  enemyAttackRange: {
    min: 10,
    max: 14
  },
  shop: {
    refillHealth: {
      cost: 7,
      amount: 20
    },
    upgradeAttack: {
      cost: 7,
      amount: 6
    }
  },
  enemies: [
    "Roborto",
    "Amy Android",
    "Robo Trumble"
  ]
};

var SHOP_ACTIONS = {
  REFILL: 1,
  UPGRADE: 2,
  LEAVE: 3
};

/* UTILITY FUNCTIONS */

// Generate a random integer from min up to, but not including, max.
var randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var normalizeInput = function(value) {
  if (value === null) {
    return "";
  }

  return String(value).trim();
};

var parseMenuChoice = function(value) {
  var normalizedValue = normalizeInput(value);

  if (!/^[0-9]+$/.test(normalizedValue)) {
    return null;
  }

  return parseInt(normalizedValue, 10);
};

var clampAtZero = function(value) {
  return Math.max(0, value);
};

var safeStorageGet = function(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn("Unable to read localStorage:", error);
    return null;
  }
};

var safeStorageSet = function(key, value) {
  try {
    window.localStorage.setItem(key, String(value));
    return true;
  } catch (error) {
    console.warn("Unable to write localStorage:", error);
    return false;
  }
};

var getStoredHighScore = function() {
  var storedScore = safeStorageGet(GAME_CONFIG.storageKeys.highScore);

  // Preserve scores from the original project key if the namespaced key is not present.
  if (storedScore === null) {
    storedScore = safeStorageGet(GAME_CONFIG.storageKeys.legacyHighScore);
  }

  var highScore = parseInt(storedScore, 10);

  if (Number.isNaN(highScore) || highScore < 0) {
    return 0;
  }

  return highScore;
};

var saveHighScore = function(score, playerName) {
  var savedScore = safeStorageSet(GAME_CONFIG.storageKeys.highScore, score);
  var savedName = safeStorageSet(GAME_CONFIG.storageKeys.playerName, playerName);

  return savedScore && savedName;
};

var formatStats = function(robot) {
  return robot.name + " — Health: " + robot.health + ", Attack: " + robot.attack + ", Money: " + robot.money;
};

var createEnemy = function(name) {
  return {
    name: name,
    health: randomNumber(GAME_CONFIG.enemyHealthRange.min, GAME_CONFIG.enemyHealthRange.max),
    attack: randomNumber(GAME_CONFIG.enemyAttackRange.min, GAME_CONFIG.enemyAttackRange.max)
  };
};

var calculateDamage = function(attackValue) {
  var minDamage = Math.max(1, attackValue - GAME_CONFIG.damageVariance);

  return randomNumber(minDamage, attackValue);
};

/* GAME FUNCTIONS */

// Function to check if player wants to fight or skip.
var fightOrSkip = function() {
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  var fightChoice = normalizeInput(promptFight).toLowerCase();

  while (fightChoice !== "fight" && fightChoice !== "skip") {
    window.alert("You need to provide a valid answer! Please enter FIGHT or SKIP.");
    promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    fightChoice = normalizeInput(promptFight).toLowerCase();
  }

  if (fightChoice === "skip") {
    var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");

    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight.");
      playerInfo.money = clampAtZero(playerInfo.money - GAME_CONFIG.skipPenalty);
      return true;
    }
  }

  return false;
};

var attackEnemy = function(enemy) {
  var damage = calculateDamage(playerInfo.attack);
  enemy.health = clampAtZero(enemy.health - damage);

  console.log(playerInfo.name + " attacked " + enemy.name + " for " + damage + " damage.");
  console.log(enemy.name + " now has " + enemy.health + " health remaining.");

  if (enemy.health <= 0) {
    window.alert(enemy.name + " has been defeated!");
    playerInfo.money += GAME_CONFIG.winReward;
    return true;
  }

  window.alert(enemy.name + " still has " + enemy.health + " health left.");
  return false;
};

var attackPlayer = function(enemy) {
  var damage = calculateDamage(enemy.attack);
  playerInfo.health = clampAtZero(playerInfo.health - damage);

  console.log(enemy.name + " attacked " + playerInfo.name + " for " + damage + " damage.");
  console.log(playerInfo.name + " now has " + playerInfo.health + " health remaining.");

  if (playerInfo.health <= 0) {
    window.alert(playerInfo.name + " has been defeated!");
    return true;
  }

  window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
  return false;
};

// Fight function with an enemy object holding name, health, and attack values.
var fight = function(enemy) {
  var isPlayerTurn = Math.random() <= 0.5;
  var fightSkipped = false;

  while (playerInfo.health > 0 && enemy.health > 0 && !fightSkipped) {
    if (isPlayerTurn) {
      fightSkipped = fightOrSkip();

      if (!fightSkipped && attackEnemy(enemy)) {
        break;
      }
    } else if (attackPlayer(enemy)) {
      break;
    }

    isPlayerTurn = !isPlayerTurn;
  }
};

var visitShopBetweenRounds = function(isLastRound) {
  if (playerInfo.health <= 0 || isLastRound) {
    return;
  }

  if (window.confirm("The fight is over. Visit the store before the next round?")) {
    shop();
  }
};

// Function to start a new game.
var startGame = function() {
  playerInfo.reset();

  for (var i = 0; i < GAME_CONFIG.enemies.length; i++) {
    if (playerInfo.health <= 0) {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }

    var enemy = createEnemy(GAME_CONFIG.enemies[i]);

    console.log(formatStats(playerInfo));
    console.log(enemy);

    window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    fight(enemy);
    visitShopBetweenRounds(i === GAME_CONFIG.enemies.length - 1);
  }

  endGame();
};

// Function to end the entire game.
var endGame = function() {
  var highScore = getStoredHighScore();

  window.alert("The game has now ended. Let's see how you did!");

  if (playerInfo.money > highScore) {
    var wasHighScoreSaved = saveHighScore(playerInfo.money, playerInfo.name);
    var saveMessage = wasHighScoreSaved ? "" : " Your browser did not allow saving this score locally.";

    window.alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!" + saveMessage);
  } else {
    window.alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
  }

  if (window.confirm("Would you like to play again?")) {
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// Go to shop between battles function.
var shop = function() {
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );
  var shopOption = parseMenuChoice(shopOptionPrompt);

  while (shopOption !== SHOP_ACTIONS.REFILL && shopOption !== SHOP_ACTIONS.UPGRADE && shopOption !== SHOP_ACTIONS.LEAVE) {
    window.alert("You did not pick a valid option. Try again.");
    shopOptionPrompt = window.prompt("Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    shopOption = parseMenuChoice(shopOptionPrompt);
  }

  switch (shopOption) {
    case SHOP_ACTIONS.REFILL:
      playerInfo.refillHealth();
      break;
    case SHOP_ACTIONS.UPGRADE:
      playerInfo.upgradeAttack();
      break;
    case SHOP_ACTIONS.LEAVE:
      window.alert("Leaving the store.");
      break;
  }
};

// Function to set name.
var getPlayerName = function() {
  var name = normalizeInput(window.prompt("What is your robot's name?"));

  while (name === "") {
    name = normalizeInput(window.prompt("Your robot needs a name. What is your robot's name?"));
  }

  if (name.length > GAME_CONFIG.playerNameMaxLength) {
    name = name.slice(0, GAME_CONFIG.playerNameMaxLength);
    window.alert("Robot name shortened to " + GAME_CONFIG.playerNameMaxLength + " characters: " + name);
  }

  console.log("Your robot's name is " + name);
  return name;
};

/* GAME INFORMATION / VARIABLES */

var playerInfo = {
  name: getPlayerName(),
  health: GAME_CONFIG.playerDefaults.health,
  attack: GAME_CONFIG.playerDefaults.attack,
  money: GAME_CONFIG.playerDefaults.money,
  reset: function() {
    this.health = GAME_CONFIG.playerDefaults.health;
    this.money = GAME_CONFIG.playerDefaults.money;
    this.attack = GAME_CONFIG.playerDefaults.attack;
  },
  refillHealth: function() {
    var refill = GAME_CONFIG.shop.refillHealth;

    if (this.money >= refill.cost) {
      window.alert("Refilling player's health by " + refill.amount + " for " + refill.cost + " dollars.");
      this.health += refill.amount;
      this.money -= refill.cost;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    var upgrade = GAME_CONFIG.shop.upgradeAttack;

    if (this.money >= upgrade.cost) {
      window.alert("Upgrading player's attack by " + upgrade.amount + " for " + upgrade.cost + " dollars.");
      this.attack += upgrade.amount;
      this.money -= upgrade.cost;
    } else {
      window.alert("You don't have enough money!");
    }
  }
};

/* RUN GAME */
startGame();
