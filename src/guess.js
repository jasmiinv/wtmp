const minLimit = 1, maxLimit = 100;
const maxGuessCount = 100;

let randomNumber = Math.floor(Math.random() * maxLimit) + minLimit;
console.log('random number', randomNumber);

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const resultText = document.querySelector('.resultText');

let guessCount = 1;
let startTime;
let resetButton;


const resetGame = () => {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');

  for (const p of resetParas) {
    p.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * maxLimit) + minLimit;
  console.log('random number', randomNumber);
};

const getResultText = (startTime, endTime, numberOfGuesses) => {
  if (numberOfGuesses === 1) {
    return 'Damn, you are a one lucky --beep--!';
  }
  return `It took ${((endTime - startTime)/1000)} seconds and
          ${numberOfGuesses} tries to guess it right.`;
};

const setGameOver = () => {
  resultText.textContent = getResultText(startTime, Date.now(), guessCount);
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
};


const checkGuess = (input) => {
  // console.log('checkguess input', input);
  let userGuess;
  // -1: too low, 0: correct, 1: too high
  let guessDirection;
  if (typeof input === 'object') {
    userGuess = Number(guessField.value);
  } else {
    userGuess = input;
  }

  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
    startTime = Date.now();
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
    return 0;
  } else if (guessCount === maxGuessCount) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
      return -1;
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
      return 1;
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
};

const StartGame = () => {
  guessSubmit.addEventListener('click', checkGuess);
};

export {StartGame, checkGuess, resetGame};