/*
 *  Model - Central component, independent of the user interface.
 *          Directly manages the data, logic and rules of the application.
 */

// Parent character class
class Character {

  constructor(name, healthPoints) {
    this._name = name;
    this._healthPoints = healthPoints;
  }

  get name() {
    return this._name;
  }

  get healthPoints() {
    return this._healthPoints;
  }

  damageSustained(points) {
    if (typeof points === "number") {
      this._healthPoints -= points;
    }
    return points;
  }

  isDefeated() {
    if (this.healthPoints <= 0) return true;
    else return false;
  }
}

// Child class, inherits from Character
class ChosenCharacter extends Character {

  constructor(name, healthPoints, attackPower) {
    super(name, healthPoints);
    this._increaseAttackPower = attackPower;
    this._attackPower = attackPower;
  }

  get attackPower() {
    return this._attackPower;
  }

  increaseAttackPower() {
    this._attackPower += this._increaseAttackPower;
    return this._attackPower;
  }
}

// Child class, inherits from Character
class ChosenEnemy extends Character {

  constructor(name, healthPoints, counterAttackPower) {
    super(name, healthPoints);
    this._counterAttackPower = counterAttackPower;
  }

  get counterAttackPower() {
    return this._counterAttackPower;
  }
}

// Object to dynamically create character/enemy objects 
const gameCharacters = {
  _maxEnemyCount: 3,
  _maxCharacterCount: 1,
  _enemies: [],
  _chosenCharacter: [],

  get currentEnemy() {
    return this._enemies[0];
  },

  get currentCharacter() {
    return this._chosenCharacter;
  },

  // Create enemy object, push to enemy array
  chooseEnemy(enemyName, healthPoints, counterAttackPower) {
    // Parameter validation
    if (typeof enemyName === "string" &&
        typeof healthPoints === "number" &&
        typeof counterAttackPower === "number")
    { 
      // Limit total # of enemies created to this._maxEnemyCount
      if (this._enemies.length < this._maxEnemyCount) {
        var newEnemy = new ChosenEnemy(enemyName, healthPoints, counterAttackPower);
        this._enemies.unshift(newEnemy);
        return newEnemy;
      }
      // If 3 enemies have already been chosen
      else {
        console.log(`Enemy ${enemyName} not created! _maxEnemyCount reached!`);
      }
    }
    // If arguments passed are incorrect type
    else {
      console.log(`Enemy ${enemyName} not created! Invalid Parameters!`);
    }
  },

  // Create chosen character, push to chosen character array
  chooseCharacter(characterName, healthPoints, counterAttackPower) {
    
    // Parameter validation
    if (typeof characterName === "string" &&
        typeof healthPoints === "number" &&
        typeof counterAttackPower === "number")
    { 
      // Limit total 'characters chosen' created to _maxCharacterCount
      if (this._chosenCharacter.length < this._maxCharacterCount) {
        var character = new ChosenCharacter(characterName, healthPoints, counterAttackPower);
        this._chosenCharacter.push(character);
        return character;
      }
      // If character has already been chosen
      else {
        console.log(`Character '${characterName}' not created! _maxCharacterCount reached!`);
      }
    }
    // If arguments passed are incorrect type
    else {
      console.log(`Character '${characterName}' not created! Invalid Parameters!`);
    }
  }
}

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
 *     js-enemy-4
 *     js-attack-reset-button
 */

/*
 *  Controller - accepts input and converts it to commands for the model or view
 */

 const gameEngine(role) {
  // 'role' is either 'character' or 'enemy'

 }

// Shorthand for $( document ).ready()
$(function() {

  // User chooses character, remaining characters pushed to enemy list

  // User chooses enemy to fight
});