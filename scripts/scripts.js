var singlePlayer, x_o,
    playerOneTurn, computerTurn, playerTwoTurn,
    playerOne, computer, playerTwo;

var gameMethod = (function gameSetUp(){
  
//Hides Players tabs on top of tic tac toe box
$("#player-one").hide();
$("#player-two").hide();

// Function that transitions Beginning question content to the next content
function stateChange(newState, content) {
    setTimeout(function () {
        if (newState == -1) {
          $(content).fadeIn(2000);
          if(content === "#x-o"){
           $(".player-options").css("width", "105px");
          }else {
            $(".player-options").css("width", "350px");
          }
        }
    }, 1000);
}

// FUNCTION TO DETERMINE IF GAME IS ONE PLAYER OR TWO AND MOVES TO NEXT PAGE
function setPlayers(numPlayers){
  numPlayers === 'one' ? singlePlayer = true : singlePlayer = false;

  $("#intro").fadeOut();
  stateChange(-1, "#x-o");
}

// Second Question Asking User for X or O
function x_or_o(letterChoice){
  letterChoice === 'x' ? x_o = "x" : x_o = "o";

  $("#x-o").fadeOut("fast");
  stateChange(-1, "#game-board");
  
  if(singlePlayer === true){
    singlePlayerSetUp();
  } else {
    twoPlayerSetUp();
  }
}

// FUNCTION THAT BINDS TO BACK BUTTON WHEN CHOOSING X OR O
function goBack(current){
  singlePlayer = "";

  $(current).fadeOut();
  stateChange(-1, "#intro");
}

// RESET ALL FUNCTION THAT TAKES YOU TO BEGINNING OF APPLICATION
function reset(){
  singlePlayer = "";
  $("#player-one").slideUp();
  $("#player-two").slideUp();

  $("#x-o").css("display", "none");
  $("#game-board").css("display", "none");
  stateChange(-1, "#intro");
}
  
  //Public properties and methods
  return {
    singlePlayer: singlePlayer,
    x_o: x_o,
    reset: reset,
    goBack: goBack,
    setPlayers: setPlayers,
    x_or_o: x_or_o
  };

  
})();

// Generate Who gets first turn of the game 
function generateFirstTurn(){
  
  let num = Math.floor(Math.random() * 2);
  
  if(num === 0){
    $("#player-one").slideDown();
    playerOneTurn = true;
    computerTurn = false;
    playerTwoTurn = false;
  } else if(num === 1) {
    $("#player-two").slideDown();
    computerTurn = true;
    playerTwoTurn = true;
    playerOneTurn = false;
  }
  
}

//Single Player Game Set Up
function singlePlayerSetUp(){
  //set's Player 2's tab text to "Computer"
  document.getElementById("compOrPlayer").textContent = "Computer's";
  
  if(x_o === "x"){
    playerOne = "X";
    computer = "O";
    document.getElementById("player-one-letter").textContent = playerOne;
    document.getElementById("player-two-letter").textContent = computer;
  } else {
    playerOne = "O";
    computer = "X";
    document.getElementById("player-one-letter").textContent = playerOne;
    document.getElementById("player-two-letter").textContent = computer;
  }
  
  setTimeout(generateFirstTurn, 1000);
  
  
}

//Two Player Game SetUp
function twoPlayerSetUp(){
  document.getElementById("compOrPlayer").textContent = "Player 2's";
  
  if(x_o === "x"){
    playerOne = "X";
    playerTwo = "O";
    document.getElementById("player-one-letter").textContent = playerOne;
    document.getElementById("player-two-letter").textContent = playerTwo;
  } else {
    playerOne = "O";
    playerTwo = "X";
    document.getElementById("player-one-letter").textContent = playerOne;
    document.getElementById("player-two-letter").textContent = playerTwo;
  }
  
  setTimeout(generateFirstTurn, 1000);
  
}

/*
Game Functionality
function singlePlayerPlay(squareNum) {
  
  while(computerTurn === true){
    
  } else {
    
  }
  
}

function twoPlayerPlay() {
  
}
*/
