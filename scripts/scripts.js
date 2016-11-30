var singlePlayer, x_o,
    playerOneTurn, computerTurn, playerTwoTurn,
    playerOne, computer, playerTwo,
    turns = 0, currentlyPlaying = true;

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
  $("#reset-message-div").fadeOut("fast");
  stateChange(-1, "#game-board");
  
  if(singlePlayer === true){
    singlePlayerSetUp();
  } else {
    turns = 0;
    currentlyPlaying = true;
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
  $("#reset-message-div").css("display", "none");
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

//Game Functionality

// WILL FINISH SINGLE PLAYER FUNCTIONALITY AT A LATER DATE
function singlePlayerPlay(squareNum) { 
  turns++;
  
  if(singlePlayer === false){
    twoPlayerPlay(squareNum);
    return false;
  }
  
}

function twoPlayerPlay(squareNum) {
  
    if(playerOneTurn === true) {
      if(playerOne === "X" && !$("#square" + squareNum).hasClass("active")){
        document.getElementById("square" +squareNum).innerHTML = "<div class='board-x'>X</div>";
        $("#square" + squareNum).addClass("active");
        playerOneTurn = false;
        playerTwoTurn = true;
        $("#player-one").slideUp();
        $("#player-two").slideDown();
      } else if(playerOne === "O" & !$("#square" + squareNum).hasClass("active")){
        document.getElementById("square" + squareNum).innerHTML = "<div class='board-o'>O</div>";
        $("#square" + squareNum).addClass("active");
        playerOneTurn = false;
        playerTwoTurn = true;
        $("#player-one").slideUp();
        $("#player-two").slideDown();
      }
  } else if(playerTwoTurn === true){
      if(playerTwo === "X" && !$("#square" + squareNum).hasClass("active")){
        document.getElementById("square" +squareNum).innerHTML = "<div class='board-x'>X</div>";
        $("#square" + squareNum).addClass("active");
        playerTwoTurn = false;
        playerOneTurn = true;
        $("#player-two").slideUp();
        $("#player-one").slideDown();
      } else if(playerTwo === "O" & !$("#square" + squareNum).hasClass("active")){
        document.getElementById("square" +squareNum).innerHTML = "<div class='board-o'>O</div>";
        $("#square" + squareNum).addClass("active");
        playerTwoTurn = false;
        playerOneTurn = true;
        $("#player-two").slideUp();
        $("#player-one").slideDown();
      }    
    }
  
    if(turns >= 9){
      document.getElementById("game-results").innerHTML = "The Game Resulted in a Tie!";
      currentlyPlaying = false;  
    } 
  
    if(currentlyPlaying === false){
      setTimeout(afterGameReset, 700);
    }
  
} // TWO PLAYER PLAY FUNCTION END

function afterGameReset() {
    if(currentlyPlaying === false){
      $("#player-one").slideUp();
      $("#player-two").slideUp();
      $("#game-board").addClass("none").fadeOut("slow");
      $("#reset-message-div").fadeIn("slow");
      for(let i = 1; i < 10; i++){
        $("#square" + i).removeClass("active");
        document.getElementById("square" + i).innerHTML = "";
      }
    }
}

