//Current Entry String and Arr to Be Joined into String

//String is to hold values and keep numbers together
var currentInput = "";
var currentEntry = [];

var calc = (function moduleF(){

//AC (Clear) Button Function
function clearInput(ac){
  
  document.getElementById("input").innerHTML = 0;
  document.getElementById("current-entry").innerHTML = 0;
  
  // clear current input back to empty string (reset)
  currentInput = "";
  currentEntry = [];
  
} // clearInput() bracket end

// Number Button Function
function buttonPress(button) {
  var operators = ["x", "+", "-", "/"];
  var counter = 0;
  var regex = /[^\S]/g;  
  var currentButton = document.getElementById(button).innerHTML; 
   //gets rid of all whitespace
  currentButton = currentButton.replace(regex, "");
  
  var checkIfOperator = operators.indexOf(currentButton);
  
    //DO NOT ALLOW TWO PERIODS IN A ROW
  if(currentButton == "." && checkForTwoDecimals()){
    return false;
  }
  
  if(currentEntry[currentEntry.length - 1] == "." && currentButton == "."){
    return false;
  }
  
  // When a number is pressed
  if (checkIfOperator === -1) {
    
    if(operators.indexOf(currentEntry[currentEntry.length -1]) !== -1){    
      currentInput = "";
    }
     
    currentInput += currentButton;
    currentEntry.push(currentButton);
  
    //Current Input Display
    document.getElementById("current-entry").innerHTML = currentEntry.length === 0 ? "0" : currentEntry.join("");
    document.getElementById("input").innerHTML = currentInput;    
  } else { //WHEN AN OPERATOR IS PRESSED:
      //Do Not Allow 2 operators back to back if statment
      // OR IF operator is first button hit
        //return false
      if(operators.indexOf(currentEntry[currentEntry.length -1]) !== -1 || currentEntry[0] === undefined){    
      return false;
      }
    
    // operator is clears conditionals, clear current input and place operator into the current input
    //push operator into the currentEntry array
    currentInput = "";
    currentInput += currentButton;
    currentEntry.push(currentButton);
    document.getElementById("input").innerHTML = currentButton;
  } // else (above ^) bracket end
  console.log(currentInput);
} // buttonPress() function bracket end


// CLEAR ENTRY FUNCTION
  // ce = current entry
function delEntry(ce){
  if(ce[0] === undefined){
    return false;
  }
  
  // If there's only 1 number left, call the clear input function
  if(ce.length === 1){
    clearInput();
    //else - delete characters one at a time
  } else if(ce.length > 1){
    
    ce.pop();
    currentInput = currentInput.split("");
    currentInput.pop();
    currentInput = currentInput.join("");
    
    if(currentInput.length === 0 ){
      currentInput = ce.join("");
    }
    
  document.getElementById("input").innerHTML = currentInput;
  document.getElementById("current-entry").innerHTML = ce.join("");
    
  }
}

//EQUALS FUNCTION
  // ce = current entry 
function equalsFunction(ce) {
  if(ce[0] === undefined){
    return false;
  } 
  
  // If a number is divided by 0, return error
  if(ce[ce.length - 1] == 0 && ce[ce.length - 2] == "/"){
    document.getElementById("input").innerHTML = "Error";
    // reset
    currentInput = "";
    currentEntry = [];
    document.getElementById("current-entry").innerHTML = "0";
    return false;
  }
  
  //turn currentEntry array into string so it can be put into eval function to be solved
  ce = ce.join("");
  
  //Since I used x for display, replace x with javascript * to multiply
  ce = ce.replace("x", "*");
  
  //store eval result
  var result = eval(ce);
  
  currentInput = result;
  currentEntry = [result];
  
  document.getElementById("input").innerHTML = result;
  document.getElementById("current-entry").innerHTML = result;
}
  
  // Function that Does not allow for more than 2 decimals in the same number
  function checkForTwoDecimals(){
    var regex = /[.]{1}/g;
    
    if(currentInput.search(regex) > -1) {
      return true;
    } else {
      return false;
    }
    
  }
  
return {
  clearInput: clearInput,
  delEntry: delEntry,
  buttonPress: buttonPress,
  equalsFunction: equalsFunction
}
  
  
})();
