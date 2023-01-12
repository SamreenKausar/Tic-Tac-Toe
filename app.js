// GAME BOARD MODULE
const gameBoard = (function gameBoard() {
  const gameBoardArray = new Array(9);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const addMark = (index, mark) => {
    gameBoardArray[index] = mark;
  };
  const checkForWin = (mark) => winningCombinations.some((combination) => combination.every((index) => gameBoardArray[index] === mark));

  return { addMark, checkForWin };
}());

// PLAYER FACTORY FUNCTION
const players = (mark) => {
  let score = 0;

  const increaseScore = (win) => {
    if (win) {
      score += 1;
    }

    const returnscore = () => score;
    return { mark, returnscore, increaseScore };
  };
};
// DOM OBJECT MODULE
const domManupulation = (function domManupulation() {
  const cells = document.querySelectorAll('.cell');

  const getCellIndex = function getCellIndex() {
    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const index = e.target.dataset.number;
      });
    });
  };

  const paintCellsWithMark = (index, mark) => {
    cells[index].textContent = mark;
  };
  return { getCellIndex };
}());

// GAME CONTROL MODULE

const gameBoardController = (function gameBoardController() {
  const startGamebtn = document.querySelector('#startGame');
  const playfuntion = function playfuntion() {

  };

  startGamebtn.addEventListener('click', playfuntion);
}());

// GAME BOARD OBJECT
// const gameBoard = (function(){
//     const gameboard =[];
//     const addingValue = function(index, value){

//     }
//     return {
//         addingValue
//     }
// });

// // PLAYERS FACTORY FUNCTION

// const players = function(playerName){
//     let score =0;
//     let win =false;
//     const changeScore = (win)=>
//     {
//         if(!win){
//             score++;
//         }
//     };

//     return{ playerName, score, win, changeScore};

// }

// // DISPLAY CONTROLLER

// // game Board module
// const gameBoardController = (function(){
//     //properties
//     const cells = document.querySelectorAll('.cell');
//     const winMessage =document.querySelector('.winner');
//     const winElement =document.querySelector("#win");
//     const X = 'X';
//     const O = 'O';
//     const xColor = 'colorX';
//     const oColor = 'colorO';
//     const drawColor ='drawColor';
//     const winningCombinations = [
//         [0,1,2],
//         [3,4,5],
//         [6,7,8],
//         [0,3,6],
//         [1,4,7],
//         [2,5,8],
//         [0,4,8],
//         [2,4,6]
//     ]
//     let circleTurn = false;

//     cellArray = [...cells];
//     //Methods
//      const startGame = function(){
//         cells.forEach(cell =>{
//             cell.addEventListener('click', handleClick, {once: true});
//         });
//      }

//      const handleClick = function(e){
//         const cell= e.target;
//         const currentText = circleTurn ? O : X;
//         const textColor = circleTurn ? oColor : xColor;
//         // place a Mark
//         placeMark(cell, currentText, textColor);
//         // check for win
//         if(checkForWin(currentText)){
//             endGame(false, textColor, currentText);
//          }
//           // check for draw
//          if(isDraw()){
//             endGame(true, drawColor, 'Its a draw');

//          }else{
//             // switch turns
//             swapTurn();
//         }

//      }

//      const placeMark = function(cell, text, textColor){
//         cell.textContent = text;
//         cell.classList.add(textColor)

//      }
//      const swapTurn = function(){
//         circleTurn=!circleTurn;
//      }
//     const checkForWin = function(text){
//         return winningCombinations.some(combination =>{
//             return combination.every(index =>{
//                return cellArray[index].textContent===text;
//             })
//         })
//     }
//     const endGame = function(draw, textColor, currentText){
//         if(draw){
//             winMessage.classList.toggle('hidden');
//             winElement.textContent = currentText;
//             winMessage.classList.add(textColor);
//         }else {
//             winMessage.classList.toggle('hidden');
//             winElement.textContent = `${currentText} Wins`;
//             winMessage.classList.add(textColor);

//         }
//     }
//     const isDraw = function(){
//         return [...cells].every(element =>{
//             return element.classList.contains(xColor) || element.classList.contains(oColor);
//         });
//     }

//     return{startGame}

// })();
// const startGame  = document.querySelector('#startGame');
//  startGame.addEventListener('click',gameBoardController.startGame);
