/*
 *  Controller - accepts input and converts it to commands for the model or view
 */

// Pseudocode


/*
 *  View -  output representation of information
 */

// Pseudocode


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
  _defeatedEnemies: [],

  // setter methods
    // set available characters

  set addAvailableCharacters(characterObject) {
    // Ensure character objects have required properties
    if (Object.keys(characterObject)indexOf("name")               !== -1 &&
        Object.keys(characterObject)indexOf("healthPoints")       !== -1 &&
        Object.keys(characterObject)indexOf("baseAttackPower")    !== -1 &&
        Object.keys(characterObject)indexOf("attackPower")        !== -1 &&
        Object.keys(characterObject)indexOf("counterAttackPower") !== -1 &&
        Object.keys(characterObject)indexOf("src")                !== -1 &&
        Object.keys(characterObject)indexOf("alt")                !== -1 &&) 
    {
      this._availableCharacters.push(characterObject);
      return characterObject;
    }
    else
    {
      console.log(`Character ${characterObject} not added! Required properties not present!`);
    }
  },

  // getter methods for view and controller
    // get hero
    // return object

  // gameplay methods
  

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