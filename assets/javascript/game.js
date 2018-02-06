/*
 *  Controller - accepts input and converts it to commands for the model or view
 */

/*
 * HTML id's to listen for:
 *   * js-boba-fett
 *   * js-darth-maul
 *   * js-hans-solo
 *   * js-yoda
 *   * js-attack-reset-button
 * 
 * HTML id's manipulate:
 *   * js-hero-section
 *   * js-enemy-section
 *   * js-chosen-hero
 *   * js-chosen-enemy
 *   * js-hero-hp
 *   * js-enemy-hp
 */

// IMPORTANT! CALL THIS FUNCTION AT THE BOTTOM OF THIS FILE: 
// gameEngine.initializeRound();

// 'Controller' object
const gameEngine = {

  /*
   * gameEngine.controller(...) will be passed either:
   *   "boba-fett"
   *   "darth-maul"
   *   "hans-solo"
   *   "yoda"
   *   "attack-reset"
   */

  // controller method
  controller(targetClicked) {



    // If 'click' was the attack button
    if (targetClicked === "attack-reset") {
      // do some chain of action

      // Ignores if hero and enemy not chosen
      if (gameProps.chosenHero !== {} &&
          gameProps.chosenEnemy !== {}) 
      {
        // do stuff
      }

      if (gameProps.isGameOver) {
        // change text of attack button to 'RESET!'
      }
    }



    // If 'click' was a character button
    if (targetClicked === "boba-fett" ||
        targetClicked === "darth-maul" ||
        targetClicked === "hans-solo" ||
        targetClicked === "yoda")
    {
      // do some chain of action

      // If hero not chosen yet
      if (gameProps.chosenHero === {}) {
        // set as hero
        // render changes to DOM
      }

      // If hero chosen but enemy not chosen
      if (gameProps.chosenHero !== {} &&
          gameProps.chosenEnemy === {})
      {
        // set as enemy
        // render changes to DOM
      }

    }




    

    // If hero defeated
    if (gameProps.isHeroDefeated) {
      // do stuff
    }

    // If enemy defeated
    if (gameProps.isEnemyDefeated) {
      // do stuff
    }

    // If hero defeated all enemies
    if (gameProps.allEnemiesDefeated) {
      // do stuff
    }

  },

  // Set up new round of gameplay
  initializeRound() {
    gameProps.toggleGameOver;
    let characters = availableCharacters._characterArray;
    let characterCount = availableCharacters._characterArray.length;
    // Loop over all available characters to load into game
    for (let i = 0; i < characterCount; i++) {
      gameProps.addAvailableCharacters = characters[i];
    }
    // Render available characters to js-hero-section
    DOM.render("chooseHero");
    DOM.render("toggleButtonText");
  }
};

/*
 *  View -  output representation of information
 */

const DOM = {

  render(component) {

    switch (component) {

      // Add characters to 'Choose Hero' section
      case "chooseHero":
        // Loop over availableCharacters array 
        for (let i = 0; i < gameProps.availableCharacters.length; i++) {
          let newImg = $("<img>");
          newImg.attr("src", gameProps.availableCharacters[i].src);
          newImg.attr("alt", gameProps.availableCharacters[i].alt);
          newImg.attr("class", "img-fluid character mb-2");
          newImg.attr("id", gameProps.availableCharacters[i].htmlId);
          $('#js-hero-section').append(newImg);

        }
        break;

      // Remove characters from 'Choose Hero' section, chosen hero to fight area
      case "heroChosen":
        $('#js-chosen-hero').attr("src", gameProps.hero.src);
        $('#js-chosen-hero').attr("alt", gameProps.hero.alt);
        // $('#js-chosen-hero').attr("id", gameProps.hero.htmlId);
        $('#js-hero-section').empty();
        break;

      // Update 'Choose Enemy' section with characters
      case "chooseEnemy":
        for (let i = 0; i < gameProps.availableEnemies.length; i++) {
          let newImg = $("<img>");
          newImg.attr("src", gameProps.availableEnemies[i].src);
          newImg.attr("alt", gameProps.availableEnemies[i].alt);
          newImg.attr("class", "img-fluid character mb-2");
          newImg.attr("id", gameProps.availableEnemies[i].htmlId);
          $('#js-enemy-section').append(newImg);
        }
        break;

      // Add chosen enemy to fight area, update remaining enemy section
      case "enemyChosen":
        $('#js-chosen-enemy').attr("src", gameProps.enemy.src);
        $('#js-chosen-enemy').attr("alt", gameProps.enemy.alt);
        // $('#js-chosen-enemy').attr("id", gameProps.enemy.htmlId);
        this.render('chooseEnemy');
        break;

      // Update game alert area
      case "updateAlerts":
        $('#js-game-alert1').text(gameProps.gameAlert1);
        $('#js-game-alert2').text(gameProps.gameAlert2);
        break;

      // When enemy is defeated
      case "enemyDefeated":
        $('#js-chosen-enemy').attr("src", "./assets/images/question.svg");
        $('#js-chosen-enemy').attr("alt", "Picture of ...");
        break;

      // Update HP counters
      case "updateHP":
        $('js-hero-hp').text(gameProps.heroHP);
        $('js-enemy-hp').text(gameProps.enemyHP);
        break;

      // Toggle attack/reset button text
      case "toggleButtonText":
        if (gameProps.isGameOver) {
          $("#js-attack-reset-button").text("ATTACK!");
        } else {
          $("#js-attack-reset-button").text("RESET!");
        }
        break;

      // Reset game
      case "newRound":
        this.render("chooseHero");
        $('#js-chosen-hero').attr("src", "./assets/images/question.svg");
        $('#js-chosen-hero').attr("alt", "Picture of ...");
        $('#js-chosen-enemy').attr("src", "./assets/images/question.svg");
        $('#js-chosen-enemy').attr("alt", "Picture of ...");
        $("#js-hero-hp").text("");
        $("#js-hero-hp").text("");
        break;

      default:
        console.log(`Component ${component} did not render! No matching case!`);
        break;
    }
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
  _isGameOver: false,

  get isGameOver() {
    return this._isGameOver;
  },

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

  // Automatically called by chosenEnemy() to remove chosen enemy from available enemy array
  removeFromAvailableEnemies(index) {
    this._availableEnemies.splice(index, 0);
  },

  // Hero attacks enemy
  heroAttack() {
    let points = this._chosenHero.attackPower;
    this._chosenEnemy.healthPoints -= points;
    this._gameAlert1 = `${this._chosenEnemy.name} sustained ${points} damage points`;
    this.increaseHeroAttackPower();
  },

  increaseHeroAttackPower() {
    this._chosenHero.attackPower += this._chosenHero.baseAttackPower;
  },

  // Enemy counter attacks hero
  enemyAttack() {
    let points = this._chosenEnemy.counterAttackPower;
    this._chosenHero.healthPoints -= points;
    this._gameAlert2 = `You sustained ${points} damage points`;
  },

  // Test if Hero is defeated
  isHeroDefeated() {
    if (this._chosenHero.healthPoints <= 0) {
      this._gameAlert1 = `You were defeated! Click 'RESET' to try again!`;
      this._gameAlert2 = "";
      return true;
    } else {
      return false;
    }
  },

  // Test if Enemy is defeated
  isEnemyDefeated() {
    if (this._chosenEnemy.healthPoints <= 0) {
      this._gameAlert1 = `You defeated ${this._enemy.name}`;
      this._gameAlert2 = "";
      return true;
    } else {
      return false;
    }
  },

  removeDefeatedEnemy() {
    this._chosenEnemy = {};
  },

  allEnemiesDefeated() {
    if (this.availableEnemies.length === 0 &&
        this.enemy === {})
    {
      return true;
    } 
    else 
    {
      return false;
    }
  },

  toggleGameOver() {
    if (this._isGameOver === false) {
      this._isGameOver = true;
    } else {
      this._isGameOver = false;
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
      htmlId: "js-boba-fett",
      healthPoints: 100,
      isDefeated: false,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 10,
      src: "./assets/images/boba.jpg",
      alt: "Picture of Boba Fett"
    },
    {
      name: "Darth Maul",
      htmlId: "js-darth-maul",
      healthPoints: 120,
      isDefeated: false,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 15,
      src: "./assets/images/darth.jpg",
      alt: "Picture of Darth Maul"
    },
    {
      name: "Hans Solo",
      htmlId: "js-hans-solo",
      healthPoints: 150,
      isDefeated: false,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 20,
      src: "./assets/images/hans.jpg",
      alt: "Picture of Hans Solo"
    },
    {
      name: "Yoda",
      htmlId: "js-yoda",
      healthPoints: 180,
      isDefeated: false,
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

// Initialize game, listen for user clicks
$(function() { // This line is shorthand for $( document ).ready(function() {...});

  // Initialize game
  gameEngine.initializeRound();

  // Listen for clicks
  $("#js-boba-fett").on('click', () => {
    gameEngine.controller("boba-fett");
  });

  $("#js-darth-maul").on('click', () => {
    gameEngine.controller("darth-maul");
  });

  $("#js-hans-solo").on('click', () => {
    gameEngine.controller("hans-solo");
  });

  $("#js-yoda").on('click', () => {
    gameEngine.controller("yoda");
  });

  $("#js-attack-reset-button").on('click', () => {
    gameEngine.controller("attack-reset");
  });
});
