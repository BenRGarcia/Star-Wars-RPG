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
      _imgSrc: "./assets/images/boba.jpg",
      _imgArenaSrc: "./assets/images/fight-boba.jpg",
      _imgAlt: "Picture of Boba Fett"
    },
    {
      _name: "Darth Maul",
      _healthPoints: 120,
      _baseAttackPower: 6,
      _attackPower: 6,
      _counterAttackPower: 15,
      _imgSrc: "./assets/images/darth.jpg",
      _imgArenaSrc: "./assets/images/fight-darth.png",
      _imgAlt: "Picture of Darth Maul"
    },
    {
      _name: "Hans Solo",
      _healthPoints: 150,
      _baseAttackPower: 6,
      _attackPower: 6,
      _counterAttackPower: 20,
      _imgSrc: "./assets/images/hans.jpg",
      _imgArenaSrc: "./assets/images/fight-hans.jpg",
      _imgAlt: "Picture of Hans Solo"
    },
    {
      _name: "Yoda",
      _healthPoints: 180,
      _baseAttackPower: 6,
      _attackPower: 6,
      _counterAttackPower: 25,
      _imgSrc: "./assets/images/yoda.jpg",
      _imgArenaSrc: "./assets/images/fight-yoda.jpg",
      _imgAlt: "Picture of Yoda"
    }
  ],

  _unavailable: [],

  // Returns chosen character object
  getCharacter(name) {
    // Method call example: availableCharacters.getCharacter("Yoda")
    for (let i = 0; i < this._characterArray.length; i++) {
      if (this._characterArray[i]._name === name) {
        let hero = this._characterArray[i]
        this.addToUnavailable(i);
        this.deleteCharacter(i);
        return hero;
      }
    }
  },

  // Add chosen character to _unavailable array
  addToUnavailable(index) {
    this._unavailable.push(this._characterArray[index])
  },

  // Remove character from available game play
  deleteCharacter(index) {
    this._characterArray.splice(index, 1);
  },

  // Put all characters from _unavailable back into _characterArray
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

  get heroImgSrc() {
    return this._hero._imgArenaSrc;
  },

  get heroImgAlt() {
    return this._hero._imgAlt;
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
    return this._enemy._healthPoints;
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
  }
};

/*
 *  View -  output representation of information
 */

const DOM = {
  render(stageNumber) {

    switch (stageNumber) {
      case '0':
        // New Round
        break;
      case '1':
        // After player clicks to choose character, chosen character zaps to arena area
          // render image to js-chosen-character (of chosen character) 
          $('#js-chosen-character').attr("src", gameProps.heroImgSrc);
          $('#js-chosen-character').attr("alt", gameProps.heroImgAlt);
          // render update to 'choose character' area (will now be empty)
          $('#js-character-section').detach();
          // render update to 'choose enemy' area (will be filled with remaining characters)
        break;
      case '2':
        // After player clicks to choose enemy
          // render update to js-chosen enemy (of chosen enemy)
          // render update to 'choose' enemy area (will remove the enemy just chosen)
        break;
      case '3':
        // During battle
          // Update js-game-alert1 & js-game-alert2 area with damage stats
        break;
      case '4':
        //
        break;
      case '5':
        //
        break;
      case '6':
        //
        break;
      case '7':
        //
        break;
      case '8':
        //
        break;
      case '9':
        //
        break;
      default:
        console.log(`Stage ${stage} failed to render!`);
        break;

    }
  }
};

/*
 * html element id's:
 *     js-chosen-character
 *     js-chosen-enemy
 *     js-game-alert
 *     js-hero-hp
 *     js-enemy-hp
 */

/*
 *  Controller - accepts input and converts it to commands for the model or view
 */

const gameEngine = {

  // Toggle invalid user input 
  _gameInProgress: false,

  chosenCharacter(name) {

    this._gameInProgress = true;

    // Pull character from object bank
    let hero = availableCharacters.getCharacter(name);

    // Send to gameProps, set as Hero
    gameProps.hero = hero;

    // updates to DOM
    DOM.render('1');

  },

  chosenEnemy() {},

  // After each 'attack'...

  // First, test if user is defeated
      // if yes, Alert to loss, reset game

  // Second, test if enemy is defeated
      // Alert to enemy defeat
      // Test if enemies remain, 
        // if not, alert to user won game, reset game
        // if so, player to choose next enemy

  reset() {
    this._gameInProgress = false;
  }
};

  // Battling: 1) enemy sustains damage, 2) character sustains damage
    // 1) gameCharacters.currentEnemy.damageSustained(currentCharacter.attackPower)
    //    gameCharacters.currentCharacter.increaseAttackPower();
    // 2) gameCharacters.currentCharacter.damageSustained(gameCharacters.currentEnemy.counterAttackPower);


// Shorthand for $( document ).ready()
$(function() {

  // No clicks here until game is over/reset
  if (!gameEngine._gameInProgress) {

    // User clicks chosen character
    $('#js-boba').on('click', () => {
      console.log(`character1 was just clicked!`);
      gameEngine.chosenCharacter("Boba Fett");
    });

    $('#js-darth').on('click', () => {
      console.log(`character2 was just clicked!`);
      gameEngine.chosenCharacter("Darth Maul");
    });

    $('#js-hans').on('click', () => {
      console.log(`character3 was just clicked!`);
      gameEngine.chosenCharacter("Hans Solo");
    });

    $('#js-yoda').on('click', () => {
      console.log(`character4 was just clicked!`);
      gameEngine.chosenCharacter("Yoda");
    });
  }

  // User chooses enemy to fight
  $('#js-enemy-1').on('click', () => {
    console.log(`enemy1 was just chosen as the enemy`);
    // set as enemy
  });

  $('#js-enemy-2').on('click', () => {
    console.log(`enemy2 was just chosen as the enemy`);
    // set as enemy
  });

  $('#js-enemy-3').on('click', () => {
    console.log(`enemy3 was just chosen as the enemy`);
    // set as enemy
  });

  // User clicks 'attack' button
  $().on('click', () => {
    console.log(`The 'attack' button was clicked`);
    // call attack/counter attack on character/current enemy
  });

  // User clicks 'reset' button, only visible after loss or win
  $().on('click', () => {
    console.log(`The 'reset' button was clicked`);
    // reset game props
  });
});