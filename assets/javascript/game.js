/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/

/*
 *  View -  output representation of information
 */

const DOM = {

  render(component) {

    switch (component) {

      // Renders 'Choose Hero' section based on gameProp.availableCharacters state
      case 'chooseHero':
        for (let i = 0; i < gameProps.availableCharacters.length; i++) {
          let newImg1 = $("<img>");
          newImg1.attr("src", gameProps.availableCharacters[i].src);
          newImg1.attr("alt", gameProps.availableCharacters[i].alt);
          newImg1.attr("class", "img-fluid character col ml-1 mr-1 mb-1");
          newImg1.attr("id", gameProps.availableCharacters[i].htmlId);
          $('#js-hero-section').append(newImg1);
        }
        break;

      // After user chooses their Hero, empty hero options section, add to FIGHT area
      case 'heroChosen':
        $('#js-hero-section').empty();
        let newImg2 = $("<img>");
        newImg2.attr("src", gameProps.chosenHero.src);
        newImg2.attr("alt", gameProps.chosenHero.alt);
        newImg2.attr("class", "img-fluid character col");
        newImg2.attr("id", gameProps.chosenHero.htmlId);
        $('#js-chosen-hero').append(newImg2);
        $('#js-hero-hp').text(gameProps.chosenHero.healthPoints);
        this.render("chooseEnemy");
        break;

      // Renders 'Choose Enemy' section based on gameProp.availableEnemies state
      case 'chooseEnemy':
        for (let i = 0; i < gameProps.availableEnemies.length; i++) {
          let newImg3 = $("<img>");
          newImg3.attr("src", gameProps.availableEnemies[i].src);
          newImg3.attr("alt", gameProps.availableEnemies[i].alt);
          newImg3.attr("class", "img-fluid character col ml-1 mr-1 mb-1");
          newImg3.attr("id", gameProps.availableEnemies[i].htmlId);
          $('#js-enemy-section').append(newImg3);
        }
        break;

      // After enemy choice, update Enemy Section w/ remaining choices, add Enemy in FIGHT area
      case 'enemyChosen':
        $('#js-enemy-section').empty();
        let newImg4 = $("<img>");
        newImg4.attr("src", gameProps.chosenEnemy.src);
        newImg4.attr("alt", gameProps.chosenEnemy.alt);
        newImg4.attr("class", "img-fluid character col");
        newImg4.attr("id", gameProps.chosenEnemy.htmlId);
        $('#js-chosen-enemy').append(newImg4);
        $('#js-enemy-hp').text(gameProps.chosenEnemy.healthPoints);
        this.render("chooseEnemy");
        break;

      case 'updateHP':
        $('#js-hero-hp').text(gameProps.chosenHero.healthPoints);
        $('#js-enemy-hp').text(gameProps.chosenEnemy.healthPoints);
        break;

      case 'ejectDefeatedEnemy':
        $('#js-chosen-enemy').empty();
        break;

      // When user presses 'RESET!', empty everything re-render initial state
      case 'newRound':
        $('#js-hero-section').empty();
        $('#js-enemy-section').empty();
        $('#js-chosen-hero').empty();
        $('#js-chosen-enemy').empty();
        $('#js-hero-hp').text("");
        $('#js-enemy-hp').text("");
        $('#js-alert-section').empty();
        $('#js-attack-reset-button').text("ATTACK!");
        this.render("chooseHero");
        break;

      // Render gameProps alerts
      case 'updateAlerts':
        $("#js-alert-section").empty();

        let p1 = $("<p>");
        p1.attr("class", "mb-0 pb-0");
        p1.text(gameProps.gameAlert1);
        $("#js-alert-section").append(p1)

        let p2 = $("<p>");
        p2.attr("class", "mb-0 pb-0");
        p2.text(gameProps.gameAlert2);
        $("#js-alert-section").append(p2)
        break;

      case 'toggleReset':
        $("#js-attack-reset-button").text("RESET!");
        break;

      default:
        break;
    }
  }
};

/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/

/*
 *  Controller - accepts input and converts it to commands for the model or view
 */

const gameEngine = {

  /*
   *  Category: Character choice clicked
   */

  character(targetClicked) {

    // Dynamically generated array of characters still in play
    let availableChars = [];
    for(let i = 0; i < gameProps.availableCharacters.length; i++) {
      availableChars.push(gameProps.availableCharacters[i].name);
    }
    for(let i = 0; i < gameProps.availableEnemies.length; i++) {
      availableChars.push(gameProps.availableEnemies[i].name);
    }

    // Screen out character clicks which are no longer available for selection
    if (availableChars.indexOf(targetClicked) !== -1) {

      // Ignore click if both hero and enemy are already chosen
      if (!Object.keys(gameProps.chosenHero).length > 0 ||
          !Object.keys(gameProps.chosenEnemy).length > 0)
      {
        // If hero not chosen and enemy not chosen...
        if (Object.keys(gameProps.chosenHero).length === 0 &&
            Object.keys(gameProps.chosenEnemy).length === 0) {
          // User click intent was to set hero
          gameProps.choseHero(targetClicked); // Finally... a gameProps method call
          DOM.render("heroChosen"); // which also auto calls render("chooseEnemy");
          DOM.render("updateAlerts");
        }

        // If hero was already chosen and enemy not chosen...
        if (Object.keys(gameProps.chosenHero).length > 0 &&
            Object.keys(gameProps.chosenEnemy).length === 0) {
          // User click intent was to set enemy
          DOM.render('ejectDefeatedEnemy');
          gameProps.choseEnemy(targetClicked); // Finally... a gameProps method call

          // Only after user chooses enemy do we update DOM
          if (Object.keys(gameProps.chosenEnemy).length > 0) {
            DOM.render("enemyChosen");
            DOM.render("updateAlerts");
          }
        }
      }
    }
  },

  /*
   *  Category: Attack/Reset button clicked
   */

  attackReset() {

    // If button says 'RESET!'
    if ($("#js-attack-reset-button").text() === "RESET!") {

      // Reset Game
      this.initializeRound();
    }

    // If button says 'ATTACK!'
    if ($("#js-attack-reset-button").text() === "ATTACK!") {

      // Ignore 'attack' inputs if no enemy chosen or if current enemy is defeated
      if (Object.keys(gameProps.chosenEnemy).length !== 0 &&
          !gameProps.isEnemyDefeated())
      {
        // Commence attack
        gameProps.commenceAttack();
        DOM.render("updateHP");
        DOM.render("updateAlerts");

        // Test if only hero defeated
        if (gameProps.isHeroDefeated()) {
          // Hero was defeated
          DOM.render("updateAlerts");

          // set 'RESET!' button
          this.setResetButton();
        }

        // Test if only enemy defeated
        if (gameProps.isEnemyDefeated()) {
          // Enemy was defeated
          DOM.render("updateAlerts");

          // Eject defeated enemy (ready to select next enemy)
          gameProps.ejectDefeatedEnemy();

          // Test if all enemies defeated
          if (gameProps.allEnemiesDefeated()) {
            // All enemies have been defeated
            DOM.render("updateAlerts");

            // Set 'RESET!' button
            this.setResetButton();
          }
        }

        // Test if hero & enemy defeated
        if (gameProps.areBothDefeated()) {
          // Hero and Enemy were slain in the same round
          DOM.render("updateAlerts");

          // Set 'RESET!' button
          this.setResetButton();
        }
      }
    }
  },

  setResetButton() {
    // Call DOM.render() to change text of ATTACK! button to say RESET!
    DOM.render("toggleReset");
  },

  initializeRound() {

    gameProps.resetGame();

    // Load characters to gameProps from characterBank
    for (let i = 0; i < characterBank.characterArray.length; i++) {
      // Clone objects
      let clonedObj = JSON.parse(JSON.stringify(characterBank.characterArray[i]));
      gameProps.addAvailableCharacters(clonedObj);
    }
    DOM.render("newRound");
  }
};

/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/

/*
 *  Model - Central component, independent of the user interface.
 *          Directly manages the data, logic and rules of the application.
 */

// Object to manage state of game
const gameProps = {
  availableCharacters: [],
  availableEnemies: [],
  chosenHero: {},
  chosenEnemy: {},
  gameAlert1: "",
  gameAlert2: "",

  // Add characters to availableCharacters array (controller to use 'for' loop)
  addAvailableCharacters(characterObj) {
      this.availableCharacters.push(characterObj);
      return characterObj;
  },

  // When user chooses hero
  choseHero(name) {
    for (let i = 0; i < this.availableCharacters.length; i++) {

      if (name === this.availableCharacters[i].name) {
        let hero = this.availableCharacters[i];
        this.gameAlert1 = `You have chosen ${hero.name} as your hero`;
        this.gameAlert2 = `Now, choose your enemy`;
        this.availableCharacters.splice(i, 1);
        this.chosenHero = hero;
        this.addRemainingToAvailableEnemies();
        return hero;
      }
    }
  },

  // Automatically called by chosenHero() to add non-hero characters to this.availableEnemies
  addRemainingToAvailableEnemies() {
    for (let i = 0; i < this.availableCharacters.length; i++) {
      this.availableEnemies.push(this.availableCharacters[i]);
    }
    this.availableCharacters = [];
    return this.availableCharacters;
  },

  // Set chosen enemy
  choseEnemy(name) {
    for (let i = 0; i < this.availableEnemies.length; i++) {
      if (name === this.availableEnemies[i].name) {
        let enemy = this.availableEnemies[i];
        this.gameAlert1 = `You have chosen ${enemy.name} as your enemy`;
        this.gameAlert2 = `Click ATTACK! to fight!`;
        this.chosenEnemy = enemy;
        this.removeFromAvailableEnemies(i);
        return enemy;
      }
    }
  },

  // Automatically called by chosenEnemy() to remove chosen enemy from available enemy array
  removeFromAvailableEnemies(index) {
    this.availableEnemies.splice(index, 1);
  },

  // Hero attacks, Enemy counter attacks
  commenceAttack() {
    // Attacks not allowed if hero or enemy defeated
    if (this.chosenHero.healthPoints > 0 &&
        this.chosenEnemy.healthPoints > 0)
    {
      // Hero attacks enemy
      this.chosenEnemy.healthPoints -= this.chosenHero.attackPower;
      this.gameAlert1 = `You inflicted ${this.chosenHero.attackPower} damage on ${this.chosenEnemy.name}!`;
      // Enemy attacks hero
      this.chosenHero.healthPoints -= this.chosenEnemy.counterAttackPower;
      this.gameAlert2 = `${this.chosenEnemy.name} inflicted ${this.chosenEnemy.counterAttackPower} damage on you!`;
      this.increaseHeroAttackPower();
    }
  },

  // Automatically called by gameProps.heroAttack();
  increaseHeroAttackPower() {
    this.chosenHero.attackPower += this.chosenHero.baseAttackPower;
  },

  // Test if Hero is defeated
  isHeroDefeated() {
    if (this.chosenHero.healthPoints <= 0 &&
        this.chosenEnemy.healthPoints > 0) 
    {
      this.gameAlert1 = `You were defeated in battle!`;
      this.gameAlert2 = `Click RESET! to try again!`;
      return true;
    } 
    else {
      return false;
    }
  },

  // Test if Enemy is defeated
  isEnemyDefeated() {
    if (this.chosenEnemy.healthPoints <= 0 &&
        this.chosenHero.healthPoints > 0)
    {
      this.gameAlert1 = `You defeated ${this.chosenEnemy.name}!`;
      this.gameAlert2 = `Choose another enemy to battle!`;
      return true;
    } 
    else {
      return false;
    }
  },

  areBothDefeated() {
    if (this.chosenEnemy.healthPoints <= 0 &&
        this.chosenHero.healthPoints <= 0) 
    {
      this.gameAlert1 = `Both you and ${this.chosenEnemy.name} were slain in battle!`;
      this.gameAlert2 = `Click RESET! to try again!`;
      return true;
    }
    else {
      return false;
    }
  },

  ejectDefeatedEnemy() {
    this.chosenEnemy = {};
  },

  allEnemiesDefeated() {
    if (this.availableEnemies.length === 0 &&
        Object.keys(this.chosenEnemy).length === 0)
    {
      this.gameAlert1 = `All enemies defeated!`;
      this.gameAlert2 = `You have won the game!`;
      return true;
    } 
    else {
      return false;
    }
  },

  // Set at gameProps back to empty
  resetGame() {
    this.availableCharacters = [];
    this.availableEnemies = [];
    this.chosenHero = {};
    this.chosenEnemy = {};
    this.gameAlert1 = "";
    this.gameAlert2 = "";
  }
};

/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/

const characterBank = {
  characterArray: [
    {
      name: "Boba Fett",
      htmlId: "js-boba-fett",
      healthPoints: 130,
      baseAttackPower: 8,
      attackPower: 8,
      counterAttackPower: 10,
      src: "./assets/images/boba.jpg",
      alt: "Picture of Boba Fett"
    },
    {
      name: "Darth Maul",
      htmlId: "js-darth-maul",
      healthPoints: 140,
      baseAttackPower: 8,
      attackPower: 8,
      counterAttackPower: 11,
      src: "./assets/images/darth.jpg",
      alt: "Picture of Darth Maul"
    },
    {
      name: "Hans Solo",
      htmlId: "js-hans-solo",
      healthPoints: 150,
      baseAttackPower: 8,
      attackPower: 8,
      counterAttackPower: 12,
      src: "./assets/images/hans.jpg",
      alt: "Picture of Hans Solo"
    },
    {
      name: "Yoda",
      htmlId: "js-yoda",
      healthPoints: 160,
      baseAttackPower: 8,
      attackPower: 8,
      counterAttackPower: 13,
      src: "./assets/images/yoda.jpg",
      alt: "Picture of Yoda"
    }
  ],

  getCharacter(index) {
    return this.characterArray[index];
  }
};

/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/

// Initialize game, listen for user clicks
$(function() { // This line is shorthand for $( document ).ready(function() {...});

  // Initialize game
  gameEngine.initializeRound();

  // Listen for clicks (Character clicks using 'delelated' events)
  $("body").on("click", "#js-boba-fett", () => {
    gameEngine.character("Boba Fett");
  });

  $("body").on("click", "#js-darth-maul", () => {
    gameEngine.character("Darth Maul");
  });

  $("body").on("click", "#js-hans-solo", () => {
    gameEngine.character("Hans Solo");
  });

  $("body").on("click", "#js-yoda", () => {
    gameEngine.character("Yoda");
  });

  $("#js-attack-reset-button").on('click', () => {
    gameEngine.attackReset("attack-reset");
  });
});

/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/