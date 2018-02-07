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
          newImg1.attr("class", "img-fluid character mb-2");
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
        newImg2.attr("class", "img-fluid character mb-2");
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
          newImg3.attr("class", "img-fluid character mb-2");
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
        newImg4.attr("class", "img-fluid character mb-2");
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
        console.log(`Component ${component} failed to render!`);
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
    console.log(`gameEngine.character() availableChars array is: ${availableChars}`);

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
          
          
        } else {/* Do nothing b/c hero and enemy presently chosen */}
      }
      else {
        console.log(`Game did nothing with that character click b/c hero and enemy already chosen.`);
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
      // gameProps.resetGame();
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
      console.log(`${characterObj.name} was added to gameProps.availableCharacters array`);
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
        console.log(`The chosen hero was ${hero.name}`);
        return hero;
      }
    }
  },

  // Automatically called by chosenHero() to add non-hero characters to this.availableEnemies
  addRemainingToAvailableEnemies() {
    for (let i = 0; i < this.availableCharacters.length; i++) {
      this.availableEnemies.push(this.availableCharacters[i]);
      console.log(`${this.availableCharacters[i]} was just added to the gameProps.availableEnemies array`);
    }
    this.availableCharacters = [];
    console.log(`gameProps.availableCharacters should now be an empty array,`);
    console.log(`its current contents are:`);
    for (let i = 0; i < this.availableCharacters.length; i++) {
      console.log(`${i + 1}) ${this.availableCharacters[i].name}`);
    }
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
        console.log(`${enemy.name} was just chosen as the enemy.`);
        this.removeFromAvailableEnemies(i);
        return enemy;
      }
    }
  },

  // Automatically called by chosenEnemy() to remove chosen enemy from available enemy array
  removeFromAvailableEnemies(index) {
    this.availableEnemies.splice(index, 1);
    console.log(`${this.chosenEnemy.name} should have been removed from the gameProps.availableEnemies array,`);
    console.log(`gameProps.availableEnemies array's current contents are:`);
    for (let i = 0; i < this.availableEnemies.length; i++) {
      console.log(`${i + 1}) ${this.availableEnemies[i].name}`);
    }
  },

  // Hero attacks, Enemy counter attacks
  commenceAttack() {
    console.log(`Attack commenced!`);
    // Attacks not allowed if hero or enemy defeated
    if (this.chosenHero.healthPoints > 0 &&
        this.chosenEnemy.healthPoints > 0)
    {
      console.log(`Before attack, ${this.chosenEnemy.name}'s healthPoints were at: ${this.chosenEnemy.healthPoints}`);
      this.chosenEnemy.healthPoints -= this.chosenHero.attackPower;
      this.gameAlert1 = `You inflicted ${this.chosenHero.attackPower} damage on ${this.chosenEnemy.name}!`;
      console.log(`After attack, ${this.chosenEnemy.name}'s healthPoints are at: ${this.chosenEnemy.healthPoints}`);
      console.log(`Before attack, ${this.chosenHero.name}'s healthPoints were at: ${this.chosenHero.healthPoints}`);
      this.chosenHero.healthPoints -= this.chosenEnemy.counterAttackPower;
      this.gameAlert2 = `${this.chosenEnemy.name} inflicted ${this.chosenEnemy.counterAttackPower} damage on you!`;
      console.log(`After attack, ${this.chosenHero.name}'s healthPoints are at: ${this.chosenHero.healthPoints}`);
      this.increaseHeroAttackPower();
    }
  },

  // Automatically called by gameProps.heroAttack();
  increaseHeroAttackPower() {
    this.chosenHero.attackPower += this.chosenHero.baseAttackPower;
    console.log(`${this.chosenHero.name}'s attackPower increased by ${this.chosenHero.baseAttackPower} and is now: ${this.chosenHero.attackPower}`);
  },

  // Test if Hero is defeated
  isHeroDefeated() {
    if (this.chosenHero.healthPoints <= 0 &&
        this.chosenEnemy.healthPoints > 0) 
    {
      console.log(`Hero ${this.chosenHero.name} was defeated!`);
      this.gameAlert1 = `You were defeated in battle!`;
      this.gameAlert2 = `Click RESET! to try again!`;
      return true;
    } 
    else {
      console.log(`Hero ${this.chosenHero.name} is not defeated!`);
      return false;
    }
  },

  // Test if Enemy is defeated
  isEnemyDefeated() {
    if (this.chosenEnemy.healthPoints <= 0 &&
        this.chosenHero.healthPoints > 0)
    {
      console.log(`Enemy ${this.chosenEnemy.name} was defeated!`);
      this.gameAlert1 = `You defeated ${this.chosenEnemy.name}!`;
      this.gameAlert2 = `Choose another enemy to battle!`;
      return true;
    } 
    else {
      console.log(`Enemy ${this.chosenEnemy.name} is not defeated!`);
      return false;
    }
  },

  areBothDefeated() {
    if (this.chosenEnemy.healthPoints <= 0 &&
        this.chosenHero.healthPoints <= 0) 
    {
      console.log(`${this.chosenHero.name} and ${this.chosenEnemy.name} were both slain in battle`);
      this.gameAlert1 = `Both you and ${this.chosenEnemy.name} were slain in battle!`;
      this.gameAlert2 = `Click RESET! to try again!`;
      return true;
    }
    else {
      console.log(`${this.chosenHero.name} and ${this.chosenEnemy.name} were NOT both slain in battle`);
      return false;
    }
  },

  ejectDefeatedEnemy() {
    this.chosenEnemy = {};
    console.log(`gameProps.chosenEnemy object reset to empty object.`);
    console.log(`To verify, the number of its keys (which should be zero) is: ${Object.keys(this.chosenEnemy).length}`);
  },

  allEnemiesDefeated() {
    if (this.availableEnemies.length === 0 &&
        Object.keys(this.enemy).length === 0)
    {
      console.log(`All enemies have been defeated`);
      this.gameAlert1 = `All enemies defeated!`;
      this.gameAlert2 = `You have won the game!`;
      return true;
    } 
    else {
      console.log(`All enemies have NOT been defeated`);
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
      healthPoints: 100,
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
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 25,
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