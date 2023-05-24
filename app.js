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
  const addMarksinArray = (index, mark) => {
    if (gameboard[index] === undefined) {
      gameboard[index] = mark;
    }
  };
  const checkForWin = (mark) => winningCombinations.some(
    (combination) => combination.every(
      (index) => gameboard[index] === mark,
    ),
  );
  return { gameboard, addMarksinArray, checkForWin };
}());

// Dom Manupulation Module

const displayGameboard = (function displayGameboard() {
  const cells = document.querySelectorAll('.cell');

  const paintCell = () => {
    cells.forEach((cell) => {
      cell.textContent = gameBoardModule.gameboard[cell.dataset.number];
      if (gameBoardModule.gameboard[cell.dataset.number] === 'x') {
        cell.classList.add('colorX');
      } else {
        cell.classList.add('colorO');
      }
    });
  };
  return { paintCell };
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
  const circleTurn = false;
  const win = false;
  const draw = false;
  const cells = document.querySelectorAll('.cell');
  const startGame = function startGame() {
    cells.forEach((cell) => {
      cell.addEventListener('click', handleClick, { once: true });
    });
  };
  const handleClick = function handleClick(e) {
    const index = e.target.number;
    console.log(index);
    const mark = circleTurn ? 'O' : 'X';
    gameBoardModule.addMarksinArray(index, mark);
    displayGameboard.paintCell();
  };
  return{startGame}
}());

const startBtn = document.querySelector('#startGame');
startBtn.addEventListener('click', gameControl.startGame);
