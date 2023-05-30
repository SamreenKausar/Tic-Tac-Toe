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
    return gameboard.every((value) => (value ? 'X' : 'O'));
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
      if (cell.textContent === 'X') {
        cell.classList.add('colorX');
      } if (cell.textContent === 'O') {
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
  const clearCells = function clearCell() {
    cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('colorX', 'colorO');
    });
  };
  const updateScore = function updateScore(score, name) {
    const span = document.getElementById(name);
    span.textContent = score;
  };
  return {
    paintCell, endGame, clearCells, updateScore,
  };
}());

// player factory function

const createPlayer = (name, mark) => {
  let score = 0;
  const color = `color${mark}`;
  const getscore = () => score;
  const increaseScore = () => {
    score += 1;
  };
  return {
    name, mark, color, getscore, increaseScore,
  };
};

// game Control Module

const gameControl = (function gameControl() {
  const player1 = createPlayer('player1', 'X');
  const player2 = createPlayer('player2', 'O');
  let circleTurn = false;
  const cells = document.querySelectorAll('.cell');
  const handleClick = function handleClick(e) {
    const index = e.target.dataset.number;
    const mark = circleTurn ? player2.mark : player1.mark;
    const textColor = circleTurn ? player2.color : player1.color;
    gameBoardModule.addMarksinArray(index, mark);
    displayGameboard.paintCell();
    if (gameBoardModule.checkForWin(mark)) {
      if (mark === 'X') {
        player1.increaseScore();
        displayGameboard.updateScore(player1.getscore(), player1.name);
      } else {
        player2.increaseScore();
        displayGameboard.updateScore(player2.getscore(), player2.name);
      }
      displayGameboard.endGame(false, textColor, mark);

      displayGameboard.clearCells();
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
