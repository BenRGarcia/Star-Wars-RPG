/*
 *  Controller - accepts input and converts it to commands for the model or view
 */

// Pseudocode


/*
 *  View -  output representation of information
 */

 /*
HTML id list:
js-hero-section
js-enemy-section
js-chosen-hero
js-hero-hp
js-chosen-enemy
js-enemy-hp
js-game-alert1
js-game-alert2
js-
js-
 */

const DOM = {
  dummyFunction() {
    // Pseudocode naive solutions, just to get code ideas out:

    // Update 'Choose Hero' section with characters
    for (let i = 0; i < gameProps.availableCharacters.length; i++) {
      let newImg = $("<img>");
      newImg.attr("src", gameProps.availableCharacters[i].src);
      newImg.attr("alt", gameProps.availableCharacters[i].alt);
      newImg.attr("id", "js-character-" + (i + 1));
      $('#js-hero-section').append(newImg);
    }

    // Update 'Choose Enemy' section with characters
    for (let i = 0; i < gameProps.availableEnemies.length; i++) {
      let newImg = $("<img>");
      newImg.attr("src", gameProps.availableEnemies[i].src);
      newImg.attr("alt", gameProps.availableEnemies[i].alt);
      newImg.attr("id", "js-enemy-" + (i + 1));
    }

    // Remove all images from 'Choose Hero' section
    $('#js-hero-section').empty();

    // Add chosen hero to fight area
    $('#js-chosen-hero').attr("src", gameProps.hero.src);
    $('#js-chosen-hero').attr("alt", gameProps.hero.alt);

    // Add chosen enemy to fight area
    $('#js-chosen-enemy').attr("src", gameProps.enemy.src);
    $('#js-chosen-enemy').attr("alt", gameProps.enemy.alt);

    // Update game alert area
    $('#js-game-alert1').text(gameProps.gameAlert1);
    $('#js-game-alert2').text(gameProps.gameAlert2);

    // Update HP counters
    $('js-hero-hp').text(gameProps.heroHP);
    $('js-enemy-hp').text(gameProps.enemyHP);
  }
};


/*
 *  Model - Central component, independent of the user interface.
 *          Directly manages the data, logic and rules of the application.
 */

// Object to manage state of game
const gameProps = {
  _availableCharacters: [],
  _chosenHero: {},
  _availableEnemies: [],
  _chosenEnemy: {},
  _gameAlert1: "",
  _gameAlert2: "",

  get gameAlert1() {
    return this._gameAlert1;
  },

  get gameAlert2() {
    return this._gameAlert2;
  },

  get availableCharacters() {
    return this._availableCharacters;
  },

  get hero() {
    return this._chosenHero;
  },

  get availableEnemies() {
    return this._availableEnemies;
  },

  get enemy() {
    return this._chosenEnemy;
  },

  get heroHP() {
    return this._chosenHero.healthPoints;
  },

  get enemyHP() {
    return this._chosenEnemy.healthPoints;
  },

  // Add characters to this._availableCharacters array (controller to use 'for' loop)
  set addAvailableCharacters(characterObject) {
    // Ensure character objects have required properties
    if (
        Object.keys(characterObject).indexOf("name")               !== -1 &&
        Object.keys(characterObject).indexOf("healthPoints")       !== -1 &&
        Object.keys(characterObject).indexOf("baseAttackPower")    !== -1 &&
        Object.keys(characterObject).indexOf("attackPower")        !== -1 &&
        Object.keys(characterObject).indexOf("counterAttackPower") !== -1 &&
        Object.keys(characterObject).indexOf("src")                !== -1 &&
        Object.keys(characterObject).indexOf("alt")                !== -1) 
    {
      this._availableCharacters.push(characterObject);
      return characterObject;
    }
    else
    {
      console.log(`Character ${characterObject} not added! Required properties not present!`);
    }
  },

  // When user chooses hero
  chosenHero(name) {
    // Loop over objects in this._availableCharacters array
    for (let i = 0; i < this._availableCharacters.length; i++) {
      // If character name matches chosen name
      if (name === this._availableCharacters[i].name) {
        let hero = this._availableCharacters[i];
        // Remove hero name from _availableCharacters array
        this._availableCharacters.splice(index, 1);
        // Make hero this._chosenHero
        this._chosenHero = hero;
        // Call function that moves remaining characters to enemy array
        addRemainingToAvailableEnemies();
        // return chosen hero object
        return hero;
      }
    }
  },

  // Automatically called by chosenHero() to add non-hero characters to this._availableEnemies
  addRemainingToAvailableEnemies() {
    // Loop over available characters, add to available enemy array
    for (let i = 0; i < availableCharacters.length; i++) {
      this._availableEnemies.push(this._availableCharacters[i]);
    }
    // Make this._availableCharacters an empty array
    this._availableCharacters = [];
    return this._availableCharacters;
  },

  // Set chosen enemy
  chosenEnemy(name) {
    // Remove previous enemy, if any
    this._chosenEnemy = {};
    // Loop over _availableEnemies array, make chosen enemy if name match
    for (let i = 0; i < this._availableEnemies.length; i++) {
      if (name === this._availableEnemies[i].name) {
        let enemy = this._availableEnemies[i];
        this._chosenEnemy = enemy;
        removeFromAvailableEnemies(i);
        return enemy;
      }
    }
  },

  // Auromatically called by chosenEnemy() to remove chosen enemy from available enemy array
  removeFromAvailableEnemies(index) {
    this._availableEnemies.splice(index, 0);
  },

  // Hero sustains damage from enemy
  heroDamageSustained(points) {},

  // Enemy sustains damage from hero
  enemyDamageSustained(points) {},

  // Hero attacks enemy
  heroAttack() {
    let points = this._chosenHero.attackPower;
    this._chosenEnemy.healthPoints -= points;
    this._gameAlert2 = `${this._chosenEnemy.name} sustained ${points} damage points`;
    this.increaseHeroAttackPower();
  },

  increaseHeroAttackPower() {
    this._chosenHero.attackPower += this._chosenHero.baseAttackPower;
  },

  // Enemy counter attacks hero
  enemyAttack() {
    let points = this._chosenEnemy.counterAttackPower;
    this._chosenHero.healthPoints -= points;
    this._gameAlert1 = `You sustained ${points} damage points`;
  },

  // Test if Hero is defeated
  isHeroDefeated() {
    if (this._chosenHero.healthPoints <= 0) {
      this._gameAlert1 = ``;
      this._gameAlert2 = "";
      return true;
    } else {
      return false;
    }
  },

  // Test if Enemy is defeated
  isEnemyDefeated() {
    if (this._chosenEnemy.healthPoints <= 0) {
      this._gameAlert1 = ``;
      this._gameAlert2 = "";
      return true;
    } else {
      return false;
    }
  },

  // Set at gameProps back to empty
  resetGame() {
    this._availableCharacters = [];
    this._chosenHero = {};
    this._availableEnemies = [];
    this._chosenEnemy = {};
    this._gameAlert1 = "";
    this._gameAlert2 = "";
  }
};

// Object to manage characters available for game play
const availableCharacters = {
  _characterArray: [
    {
      name: "Boba Fett",
      healthPoints: 100,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 10,
      src: "./assets/images/boba.jpg",
      alt: "Picture of Boba Fett"
    },
    {
      name: "Darth Maul",
      healthPoints: 120,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 15,
      src: "./assets/images/darth.jpg",
      alt: "Picture of Darth Maul"
    },
    {
      name: "Hans Solo",
      healthPoints: 150,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 20,
      src: "./assets/images/hans.jpg",
      alt: "Picture of Hans Solo"
    },
    {
      name: "Yoda",
      healthPoints: 180,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 25,
      src: "./assets/images/yoda.jpg",
      alt: "Picture of Yoda"
    }
  ],

  getCharacter(index) {
    return this._characterArray[index];
  }
};