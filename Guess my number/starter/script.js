'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct Number!';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
let score = 4;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //when there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = 'No number!';

    displayMessage('No number!');
  }
  //when secretnumber is higher than 20 or lower than 1
  else if (guess > 20 || guess < 1) {
    document.querySelector('.message').textContent =
      'You have to choose a number between 1 and 20';
  }
  //when player wins
  else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = 'Correct Number!';
    displayMessage('Correct Number!');

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
  //when guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? 'Too high!' : 'Too low!';

      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');

      score--;
      document.querySelector('.score').textContent = score;
    } else {
      //document.querySelector('.message').textContent = 'Game over! You lost';

      displayMessage('Game over! You lost');
      document.querySelector('.score').textContent = 0;
      document.querySelector('body').style.backgroundColor = '#FF0000';
    }
  }

  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too high!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'Game over! You lost';
  //     document.querySelector('.score').textContent = 0;
  //     document.querySelector('body').style.backgroundColor = '#FF0000';
  //   }
  // }

  // //when guess is too low
  // else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'Game over! You lost';
  //     document.querySelector('.score').textContent = 0;
  //     document.querySelector('body').style.backgroundColor = '#FF0000';
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 4;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing ...';

  displayMessage('Start guessing ...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
