// Game Board Module

const gameBoardModule = (function gameBoardModule() {
  const gameboard = new Array(9);
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const addMarksinArray = function addMarksinArray(index, mark) {
    if (gameboard[index] === undefined) {
      gameboard[index] = mark;
    }
  };
  const checkForWin = function checkForWin(mark) {
    return winningCombinations.some((combination) => combination.every(
      (index) => gameboard[index] === mark,
    ));
  };
  const isDraw = function isDraw() {
    return gameboard.every((value) => (value === 'X' || value === 'O'));
  };
  return {
    gameboard, addMarksinArray, checkForWin, isDraw,
  };
}());

// Dom Manupulation Module

const displayGameboard = (function displayGameboard() {
  const cells = document.querySelectorAll('.cell');
  const winMessage = document.querySelector('.winner');
  const winElement = document.querySelector('#win');
  const paintCell = function paintCell() {
    cells.forEach((cell) => {
      cell.textContent = gameBoardModule.gameboard[cell.dataset.number];
      if (gameBoardModule.gameboard[cell.dataset.number] === 'X') {
        cell.classList.add('colorX');
      } else {
        cell.classList.add('colorO');
      }
    });
  };
  const endGame = function endGame(draw, textColor, mark) {
    if (draw) {
      winMessage.classList.toggle('hidden');
      winElement.textContent = mark;
      winMessage.classList.add(textColor);
    } else {
      winMessage.classList.toggle('hidden');
      winElement.textContent = `${mark} Wins`;
      winMessage.classList.add(textColor);
    }
  };
  return { paintCell, endGame };
}());

// player factory function

const createPlayer = (name, mark) => {
  let score = 0;
  const increaseScore = () => {
    score += 1;
  };
  return { name, mark, increaseScore };
};

// game Control Module

const gameControl = (function gameControl() {
  let circleTurn = false;
  const cells = document.querySelectorAll('.cell');
  const handleClick = function handleClick(e) {
    const index = e.target.number;
    console.log(index);
    const mark = circleTurn ? 'O' : 'X';
    const textColor = circleTurn ? 'colorX' : 'colorO';
    gameBoardModule.addMarksinArray(index, mark);
    displayGameboard.paintCell();
    if (gameBoardModule.checkForWin(mark)) {
      displayGameboard.endGame(false, textColor, mark);
    }
    if (gameBoardModule.isDraw) {
      displayGameboard.endGame(true, 'drawColor', mark);
    } else {
      circleTurn = !circleTurn;
    }
  };
  const startGame = function startGame() {
    cells.forEach((cell) => {
      cell.addEventListener('click', handleClick, { once: true });
    });
  };

  return { startGame };
}());

const startBtn = document.querySelector('#startGame');
startBtn.addEventListener('click', gameControl.startGame);
