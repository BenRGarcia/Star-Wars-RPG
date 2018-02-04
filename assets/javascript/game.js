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
    return this._chosenCharacter[0];
  },

  // Test if all enemies defeated
  get enemiesRemain() {
    if (this._maxEnemyCount - this._enemies.length === 0) {
      return true;
    } else {
      return false;
    }
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
      // If max enemies have already been chosen
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
  },

  resetGame() {
    this._enemies = [];
    this._chosenCharacter = [];
    let object = {
        _enemies: this._enemies,
        _chosenCharacter: this._chosenCharacter
      };
    return object;
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



/*

new thoughts...

const chosenCharacter = object {
  name: "character1",
  image: ./path...,
  alt: "alt text",
  healthPoints: 100,
  attackPower: 6,

  methods...
}

const chosenEnemies = object {
  name: "character2",
  image: ./path/...,
  alt: "alt text",
  healthPoints: 150,
  counterAttackPower 15;

  methods...
}




ORRRRR...



const chosenCharacter = object {
  name: "character1",
  role: "chosenCharacter" OR "enemy";
  image: "./path...",
  alt: "alt text",
  healthPoints: 100,
  attackPower: 6,
  counterAttackPower: 15,

  methods...
}

refactor...



const gameCharacter = {
  name: "character1", 
  healthPoints: 100, 
  attackPower: 6, 
  imgSrc: "./path...",
  imgAlt: "text",

  inheritedMethods...
};



const gameEnemies = {[
  {
    name: "character2", 
    healthPoints: 100, 
    attackPower: 6, 
    imgSrc: "./path...",
    imgAlt: "text",

    inheritedMethods...
  },
  {
    name: "character3", 
    healthPoints: 100, 
    attackPower: 6, 
    imgSrc: "./path...",
    imgAlt: "text",

    inheritedMethods...
  },
  {
    name: "character4", 
    healthPoints: 100, 
    attackPower: 6, 
    imgSrc: "./path...",
    imgAlt: "text",

    inheritedMethods...
  }
]};


ORRRRR everybody in the same class... the easy way out:

const characterChoices = {[
  {
    name: "character1", 
    healthPoints: 100, 
    attackPower: 6,
    counterAttackPower: 15,
    imgSrc: "./path...",
    imgAlt: "text",

    inheritedMethods...
  },
  {
    name: "character2", 
    healthPoints: 120, 
    attackPower: 6,
    counterAttackPower: 15, 
    imgSrc: "./path...",
    imgAlt: "text",

    inheritedMethods...
  },
  {
    name: "character3", 
    healthPoints: 150, 
    attackPower: 6, 
    counterAttackPower: 15,
    imgSrc: "./path...",
    imgAlt: "text",

    inheritedMethods...
  },
  {
    name: "character4", 
    healthPoints: 180, 
    attackPower: 6, 
    counterAttackPower: 25,
    imgSrc: "./path...",
    imgAlt: "text",

    inheritedMethods...
  }
]};

*/