/*
 *  Model - Central component, independent of the user interface.
 *          Directly manages the data, logic and rules of the application.
 */

// Object to manage characters available for game
const availableCharacters = {
  _characterArray: [
    {
      _name: "Boba Fett",
      _healthPoints: 100,
      _baseAttackPower: 6,
      _attackPower: 6,
      _counterAttackPower: 10,
      _imgSrc: "../images/boba.jpg",
      _imgArenaSrc: "../images/fight-boba.jpg",
      _imgAlt: "Picture of Boba Fett"
    },
    {
      _name: "Darth Maul",
      _healthPoints: 120,
      _baseAttackPower: 6,
      _attackPower: 6,
      _counterAttackPower: 15,
      _imgSrc: "../images/darth.jpg",
      _imgArenaSrc: "../images/fight-darth.png",
      _imgAlt: "Picture of Darth Maul"
    },
    {
      _name: "Hans Solo",
      _healthPoints: 150,
      _baseAttackPower: 6,
      _attackPower: 6,
      _counterAttackPower: 20,
      _imgSrc: "../images/hans.jpg",
      _imgArenaSrc: "../images/fight-hans.jpg",
      _imgAlt: "Picture of Hans Solo"
    },
    {
      _name: "Yoda",
      _healthPoints: 180,
      _baseAttackPower: 6,
      _attackPower: 6,
      _counterAttackPower: 25,
      _imgSrc: "../images/yoda.jpg",
      _imgArenaSrc: "../images/fight-yoda.jpg",
      _imgAlt: "Picture of Yoda"
    }
  ],

  _unavailable: [],

  // Returns chosen character object
  getCharacter(name) {
    // Method call example: availableCharacters.getCharacter("Yoda")
    for (let i = 0; i < this._characterArray.length; i++) {
      if (this._characterArray[i]._name === name) {
        this.addToUnavailable(i);
        this.deleteCharacter(i);
        return this._characterArray[i];
      }
    }
  },

  // Add chosen character to _unavailable array
  addToUnavailable(index) {
    this._unavailable.push(this._characterArray[i])
  }

  // Remove character from available game play
  deleteCharacter(index) {
    this._characterArray.splice(index, 1);
  },

  resetCharacters() {
    for (let i = 0; i < this._unavailable.length; i++) {
      this._characterArray.push(this._unavailable[i]);
    }
    this._unavailable = [];
  }
};

// Object to manage the state of game
const gameProps = {
  _hero: {},
  _enemy: {},

  set hero(characterObj) {
    if (Object.keys(characterObj).indexOf("_healthPoints")    !== -1 &&
        Object.keys(characterObj).indexOf("_baseAttackPower") !== -1 &&
        Object.keys(characterObj).indexOf("_attackPower")     !== -1 &&
        Object.keys(characterObj).indexOf("_imgSrc")          !== -1 &&
        Object.keys(characterObj).indexOf("_imgAlt")          !== -1 &&
        Object.keys(characterObj).indexOf("_imgArenaSrc")     !== -1) 
    {
      this._hero = characterObj;
      return characterObj;
    }
    else {
      console.log(`Hero: ${characterObj} not set! Required properties not present!`);
    }
  },

  set enemy(characterObj) {
    if (Object.keys(characterObj).indexOf("_healthPoints")       !== -1 &&
        Object.keys(characterObj).indexOf("_counterAttackPower") !== -1 &&
        Object.keys(characterObj).indexOf("_imgSrc")             !== -1 &&
        Object.keys(characterObj).indexOf("_imgAlt")             !== -1 &&
        Object.keys(characterObj).indexOf("_imgArenaSrc")        !== -1)
    {
      this._enemy = characterObj;
      return characterObj;
    }
    else {
      console.log(`Enemy: ${characterObj} not set! Required properties not present!`);
    }
  },

  get enemyName() {
    return this._enemy._name;
  },

  get heroHP() {
    return this._hero._healthPoints;
  },

  get enemyHP() {
    return this._enemy._healthPoints;
  },

  get heroAttackPower() {
    return this._hero._attackPower;
  },

  get enemyCounterAttackPower() {
    return this._enemy._counterAttackPower;
  },

  increaseHeroAttackPower() {
    this._hero._attackPower += this._hero._baseAttackPower;
    return this._attackPower;
  },

  damageToHero(points) {
    if (typeof points === "number") {
      this._hero._healthPoints -= points;
    }
    return this._hero._healthPoints;
  },

  damageToEnemy(points) {
    if (typeof points === "number") {
      this._enemy._healthPoints -= points;
    }
    return this._hero._healthPoints;
  },

  isHeroDefeated() {
    if (this._hero._healthPoints <= 0) {
      return true;
    } else {
      return false;
    }
  },

  resetGameProps() {
    this._enemy = {};
    this._hero = {};
  },

  isEnemyDefeated() {
    if (this._enemy._healthPoints <= 0) {
      return true;
    } else {
      return false;
    }
  },
};

/*
 *  View -  output representation of information
 */

/*
 * html element id's:
 *     js-game-alert
 *     js-chosen-character
 *     js-chosen-enemy
 *     js-character-1
 *     js-character-2
 *     js-character-3
 *     js-character-4
 *     js-enemy-1
 *     js-enemy-2
 *     js-enemy-3
 *     js-attack-reset-button
 */

/*
 *  Controller - accepts input and converts it to commands for the model or view
 */

 //const arena(name, role) {

  // 'role' is either 'character' or 'enemy'
    // gameCharacters.chooseCharacter() or gameCharacters.chooseEnemy()

  // Battling: 1) enemy sustains damage, 2) character sustains damage
    // 1) gameCharacters.currentEnemy.damageSustained(currentCharacter.attackPower)
    //    gameCharacters.currentCharacter.increaseAttackPower();
    // 2) gameCharacters.currentCharacter.damageSustained(gameCharacters.currentEnemy.counterAttackPower);

  // After each 'attack'...

    // First, test if user is defeated
      // if yes, Alert to loss, reset game

    // Second, test if enemy is defeated
      // Alert to enemy defeat
      // Test if enemies remain, 
        // if not, alert to user won game, reset game
        // if so, player to choose next enemy
 //};

// Shorthand for $( document ).ready()
$(function() {

  // User clicks chosen character
  $('#js-character-1').on('click', () => {
    console.log(`character1 was just clicked!`);
    arena.func("character1", "chosenCharacter");
  });

  $('#js-character-2').on('click', () => {
    console.log(`character2 was just clicked!`);
    arena.func("character2", "chosenCharacter");
  });

  $('#js-character-3').on('click', () => {
    console.log(`character3 was just clicked!`);
    arena.func("character3", "chosenCharacter");
  });

  $('#js-character-4').on('click', () => {
    console.log(`character4 was just clicked!`);
    arena.func("character4", "chosenCharacter");
  });

  // User chooses enemy to fight
  $('#js-enemy-1').on('click', () => {
    console.log(`character1 was just chosen as the enemy`);
    arena.func("character1", "chosenEnemy");
  });

  $('#js-enemy-2').on('click', () => {
    console.log(`character2 was just chosen as the enemy`);
    arena.func("character2", "chosenEnemy");
  });

  $('#js-enemy-3').on('click', () => {
    console.log(`character3 was just chosen as the enemy`);
    arena.func("character3", "chosenEnemy");
  });

  // User clicks 'attack' button

  // User clicks 'reset' button, only visible after loss or win
});