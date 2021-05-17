// Assignment Code
var generateBtn = document.querySelector("#generate");
var input;
var userPassLength;
var charArr = [];
// generates pools of characters in their respective type
var allChar = generatePool(95, 32);
var upperCase = generatePool(26, 65);
var lowerCase = generatePool(26, 97);
var num = generatePool(10, 48);
var specialChar = generatePool(16, 32).concat(generatePool(7, 58))
                                      .concat(generatePool(6, 91))
                                      .concat(generatePool(4, 123));
// stores user's choice
var userChoice = {
  choiceUpper: false,
  choiceLower: false,
  choiceNum: false,
  choiceSpecial: false
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  // checks if user selected any types
  if (Array.isArray(charArr) && charArr.length) {
    passwordText.value = password;
    // exit option cont'd
  } else if (input === null) {
  } else {
    if (confirm("You did not select any type of characters for your password. Would you like to try again?")) {
      promptUserChoice();
    } else {
      alert("Understandable, have a great day.");
    }
  }
}

function generatePassword() {
  var passArr = [];
  var guaranteedArr = [];
  // random indexes to select a random character from their respective pool
  var upperRandx = Math.floor(Math.random() * upperCase.length);
  var lowerRandx = Math.floor(Math.random() * lowerCase.length);
  var numRandx = Math.floor(Math.random() * num.length);
  var specialRandx = Math.floor(Math.random() * specialChar.length);
  
  if (userChoice.choiceUpper) {
    guaranteedArr.push(upperCase[upperRandx]);
  }
  if (userChoice.choiceLower) {
    guaranteedArr.push(lowerCase[lowerRandx]);
  }
  if (userChoice.choiceNum) {
    guaranteedArr.push(num[numRandx]);
  }
  if (userChoice.choiceSpecial) {
    guaranteedArr.push(specialChar[specialRandx]);
  }
  // randomly generates the remaining characters
  for (var i = 0; i < userPassLength; i++) {
    var charRandx = Math.floor(Math.random() * charArr.length);

    passArr.push(charArr[charRandx]);
  }
  // randomly inserts guaranteed characters into passArr
  for (var i = 0; i < guaranteedArr.length; i++) {
    var passIdx = Math.floor(Math.random() * passArr.length);
    
    passArr.splice(passIdx, 0, guaranteedArr[i]);
  }
  
  return passArr.join('');
}

function promptUserChoice() {
  // resets previous user choice
  charArr = [];
  guaranteedArr = [];
  userPassLength = parseFloat(input);
  userChoice.choiceUpper = false;
  userChoice.choiceLower = false;
  userChoice.choiceNum = false;
  userChoice.choiceSpecial = false;

  input = prompt("How many characters would you like? Please choose an integer value between 8 and 128.");

  if (Number.isInteger(userPassLength) && userPassLength >= 8 && userPassLength <= 128) {
    alert("Your password will have a length of " + userPassLength + " characters.");
    if (confirm("Would you like uppercase letters in your password?")) {
      alert("Uppercase letters will be added.");
      // approves user's choice
      userChoice.choiceUpper = true;
      // offset the "guaranteed" character
      userPassLength--;
      // adds the user's choice to the potential pool
      charArr = charArr.concat(upperCase);
    } else {
      alert("Uppercase letters will not be added.");
    }

    if (confirm("Would you like lowercase letters in your password?")) {
      alert("Lowercase letters will be added.");
      userChoice.choiceLower = true;
      userPassLength--;
      charArr = charArr.concat(lowerCase);
    } else {
      alert("Lowercase letters will not be added.");
    }

    if (confirm("Would you like numbers in your password?")) {
      alert("Numbers will be added.");
      userChoice.choiceNum = true;
      userPassLength--;
      charArr = charArr.concat(num);
    } else {
      alert("Numbers will not be added.");
    }

    if (confirm("Would you like special characters in your password?")) {
      alert("Special characters will be added.");
      userChoice.choiceSpecial = true;
      userPassLength--;
      charArr = charArr.concat(specialChar);
    } else {
      alert("Special characters will not be added.");
    }
    // exit option
  } else if (input === null) {
    console.log("butter");
    alert("Understandable, have a great day.");
    // invalid option
  } else {
    alert("Your input was invalid. Please choose an integer value between 8 and 128.");
    console.log("sauce");
    promptUserChoice();
  }
}

// creates a pool of characters based on their utf-8 decimal values
function generatePool(length, start) {
  var result = [];

  for (var i = 0; i < length; i++) {
    result.push(String.fromCharCode(i + start));
  }
  return result;
}

// Add event listener to generate button
generateBtn.addEventListener("click", promptUserChoice);
generateBtn.addEventListener("click", writePassword);
