// game Board module
const gameBoard = (function(){
    //properties
    const cells = document.querySelectorAll('.cell');
    const winMessage =document.querySelector('.winner');
    const winElement =document.querySelector("#win");
    const X = 'x';
    const O = 'o';
    const xColor = 'colorX';
    const oColor = 'colorO';
    const drawColor ='drawColor';
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let circleTurn = false;
    cellArray = [...cells];
    //Methods
     const startGame = function(){
        cells.forEach(cell =>{
            cell.addEventListener('click', handleClick, {once: true});
        });
     }

     const handleClick = function(e){
        const cell= e.target;
        const currentText = circleTurn ? O : X;
        const textColor = circleTurn ? oColor : xColor;
        // place a Mark
        placeMark(cell, currentText, textColor);
        // check for win
        if(checkForWin(currentText)){
            endGame(false, textColor, currentText);
         }
          // check for draw
         if(isDraw()){
            endGame(true, drawColor, 'Its a draw');
         
         }else{
            // switch turns
            swapTurn();   
        }

     }

     const placeMark = function(cell, text, textColor){
        cell.textContent = text;
        cell.classList.add(textColor)
       
     }
     const swapTurn = function(){
        circleTurn=!circleTurn;
     }
    const checkForWin = function(text){
        return winningCombinations.some(combination =>{
            return combination.every(index =>{
               return cellArray[index].textContent===text;
            })
        })
    }
    const endGame = function(draw, textColor, currentText){
        if(draw){
            winMessage.classList.toggle('hidden');
            winElement.textContent = currentText;
            winMessage.classList.add(textColor);
        }else {
            winMessage.classList.toggle('hidden');
            winElement.textContent = `${currentText}Wins`;
            winMessage.classList.add(textColor);
  
        }
    }
    const isDraw = function(){
        return [...cells].every(element =>{
            return element.classList.contains(xColor) || element.classList.contains(oColor);
        });
    }
    return{startGame}
   
})();

 gameBoard.startGame();