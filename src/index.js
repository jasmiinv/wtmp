/*let randomNumber = Math.floor(Math.random() * 100) + 1;
      const guesses = document.querySelector('.guesses');
      const lastResult = document.querySelector('.lastResult');
      const lowOrHi = document.querySelector('.lowOrHi');
      const guessSubmit = document.querySelector('.guessSubmit');
      const guessField = document.querySelector('.guessField');
      let guessCount = 1;
      let resetButton;

      function checkGuess() {
        let userGuess = Number(guessField.value);
        if (guessCount === 1) {
          guesses.textContent = 'Previous guesses: ';
        }

        guesses.textContent += userGuess + ' ';

        if (userGuess === randomNumber) {
          lastResult.textContent = 'Congratulations! You got it right!';
          lastResult.style.backgroundColor = 'green';
          lowOrHi.textContent = '';
          setGameOver();
        } else if (guessCount === 10) {
          lastResult.textContent = '!!!GAME OVER!!!';
          lowOrHi.textContent = '';
          setGameOver();
        } else {
          lastResult.textContent = 'Wrong!';
          lastResult.style.backgroundColor = 'red';
          if(userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!' ;
          } else if(userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
          }
        }

        guessCount++;
        guessField.value = '';
        guessField.focus();

        
    }
    guessSubmit.addEventListener('click', checkGuess);
      

      function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement('button');
        resetButton.textContent = 'Start new game';
        document.body.appendChild(resetButton);
        resetButton.addEventListener('click', resetGame);
      }

      function resetGame() {
        guessCount = 1;
        const resetParas = document.querySelectorAll('.resultParas p');
        for(let i = 0 ; i < resetParas.length ; i++) {
          resetParas[i].textContent = '';
        }

        resetButton.parentNode.removeChild(resetButton);
        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();
        lastResult.style.backgroundColor = 'white';
        randomNumber = Math.floor(Math.random() * 100) + 1;
      }
*/
      // uuus koodi 
import {StartGame, checkGuess, resetGame} from './guess';

StartGame();

// TODO: Develop better algorithm

const testGamePlay = () => {
  let guessCounter = 0;
  let myGuess = 50;
  let gameOver = false;
  while(!gameOver) {
    let correctGuess = checkGuess(myGuess);
    guessCounter++;
    if (correctGuess === 0) {
      gameOver = true;
      resetGame();
    } else if (correctGuess < 0){
      myGuess++;
    } else {
      myGuess--;
    }
  }
  return guessCounter;
};

testGamePlay();

let guessCounts = [];
for(let i=0; i<1000; i++) {
  guessCounts.push(testGamePlay());
}
console.log('guess counts', guessCounts);

let maxGuessCount = Math.max(...guessCounts);
console.log(maxGuessCount);
