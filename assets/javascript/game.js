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

// Object to manage characters available for game
const availableCharacters = {
  _characterArray: [
    {
      name: "Boba Fett",
      healthPoints: 100,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 10,
      imgSrc: "./assets/images/boba.jpg",
      imgAlt: "Picture of Boba Fett"
    },
    {
      name: "Darth Maul",
      healthPoints: 120,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 15,
      imgSrc: "./assets/images/darth.jpg",
      imgAlt: "Picture of Darth Maul"
    },
    {
      name: "Hans Solo",
      healthPoints: 150,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 20,
      imgSrc: "./assets/images/hans.jpg",
      imgAlt: "Picture of Hans Solo"
    },
    {
      name: "Yoda",
      healthPoints: 180,
      baseAttackPower: 6,
      attackPower: 6,
      counterAttackPower: 25,
      imgSrc: "./assets/images/yoda.jpg",
      imgAlt: "Picture of Yoda"
    }
  ]
};