'use strict';

//Selecting the required element
const dice = document.querySelector('.dice');
const newButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

//variable Declaration
let currentScore, score, playerNumber, gameRules;

//Function to initialize game
const gameInit = function () {
  currentScore = 0;
  score = [0, 0];
  gameRules = true;
  dice.classList.remove('hidden');

  //Initialize Player 1
  playerNumber = 1;
  playerInit();
  gameElements('.player').classList.add('player--active');

  //Initialize Player 2
  playerNumber++;
  playerInit();

  // Resetting Player Number
  playerNumber--;
};

// Function to initilaize player
const playerInit = function () {
  gameElements('#current').textContent = 0;
  gameElements('#score').textContent = 0;
  gameElements('.player').classList.remove('player--active', 'player--winner');
};

//Function to dynamically intialize elements
let gameElements = value => {
  return document.querySelector(`${value}--${playerNumber}`);
};

gameInit();

//Function to switch style
const switchStyle = () => {
  gameElements('.player').classList.toggle('player--active');
};

//Function to switch player
const switchPlayer = function () {
  currentScore = 0;
  gameElements('#current').textContent = 0;
  switchStyle();
  playerNumber = playerNumber == 1 ? 2 : 1;
  switchStyle();
};

//Dice roll Button Functionality

rollButton.addEventListener('click', function () {
  if (gameRules) {
    //Generate random dice number
    const diceNumber = Math.ceil(Math.random() * 6);

    //Display the dice
    dice.src = `Images/dice-${diceNumber}.png`;
    dice.classList.remove('hidden');

    //Checking the dice number is 1 or not
    if (diceNumber !== 1) {
      //Updating Current Score
      currentScore += diceNumber;
      gameElements('#current').textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold button Functionality
holdButton.addEventListener('click', function () {
  if (gameRules) {
    score[playerNumber - 1] += currentScore;
  }
  gameElements('#score').textContent = score[playerNumber - 1];

  if (score[playerNumber - 1] >= 20) {
    gameRules = false;
    gameElements('.player').classList.add('player--winner');
    gameElements('.player').classList.remove('player--active');
    dice.classList.remove('hidden');
  } else {
    switchPlayer();
  }
});

//New Game Button Functionality
newButton.addEventListener('click', gameInit);
