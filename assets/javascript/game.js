

/*

html element id's:

js-game-alert

js-chosen-character
js-chosen-enemy

js-character-1
js-character-2
js-character-3
js-character-4

js-enemy-1
js-enemy-2
js-enemy-3
js-enemy-4

js-attack-reset-button

*/

/* Pseudocode Classes
Character Properties:
  -healthPoints (starting healthPoints)
  -function damageSustained(points) (decrease HP's remaining)

chosen character properties
  -attackPower (if they are chosen character)

chosen enemy properties
  -counterAttackPower (if they are enemy)
*/

class Character {

  constructor(healthPoints) {
    this._healthPoints = healthPoints;
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

class ChosenCharacter extends Character {

  constructor(healthPoints, attackPower) {
    super(healthPoints);
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

class ChosenEnemy extends Character {

  constructor(healthPoints, counterAttackPower) {
    super(healthPoints)
    this._counterAttackPower = counterAttackPower;
  }

  get counterAttackPower() {
    return this._counterAttackPower;
  }
}


// const character1 = new ChosenCharacter(100, 10);

// const character2 = new ChosenEnemy(120, 5);
// const character3 = new ChosenEnemy(200, 5);
// const character4 = new ChosenEnemy(200, 5);

// Dynamically create character/enemy objects 
// with below function call:


const createObject = {
  enemyCount: 0,
  characterCount: 0,

  enemy(characterNumber) {

  },

  // function call ex. createObject.character('character1');
  character(characterNumber) {
    if (this.characterCount < 1) {
      const characterNumber = new ChosenCharacter(100, 10);
      this.characterCount++;
      return characterNumber;
    }
  }
}