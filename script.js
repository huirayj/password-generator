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

  passwordText.value = password;

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
