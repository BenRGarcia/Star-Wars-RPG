

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

class ChosenEnemy extends Character {

  constructor(name, healthPoints, counterAttackPower) {
    super(name, healthPoints);
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

const gameCharacters = {
  _maxEnemyCount: 3,
  _maxCharacterCount: 1,
  _enemies: [],
  _chosenCharacter: [],

  // Create enemy object, push to enemy array
  chooseEnemy(enemyName, healthPoints, counterAttackPower) {
    // Parameter validation
    if (typeof enemyName === "string" &&
        typeof healthPoints === "number" &&
        typeof counterAttackPower === "number")
    { // Limit total enemies created to _maxEnemyCount
      if (this._enemies.length < this._maxEnemyCount) {
        let newEnemy = new ChosenEnemy(enemyName, healthPoints, counterAttackPower);
        this._enemies.push(newEnemy);
        return newEnemy;
      }
    } else console.log(`Enemy ${enemyName} not created! Invalid Parameters!`);
  }



  // Create chosen character, push to chosen character array
}
