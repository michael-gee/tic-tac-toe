var singlePlayer;
var x_o;

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

function x_or_o(letterChoice){
  letterChoice === 'x' ? x_o = "x" : x_o = "o";

  $("#x-o").fadeOut();
  stateChange(-1, "#game-board");
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

  $("#x-o").css("display", "none");
  $("#game-board").css("display", "none");
  stateChange(-1, "#intro");
}
