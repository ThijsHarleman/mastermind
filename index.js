//Game setup
var passcode = [];
var guess = [];
var attempNumber = 1;
var totalAttempts = 8;
var numberOfAttemptRows = document.querySelectorAll(".attemptRow").length;
var difficulty = 2;
var gamePlaying = true;
var passcodeLength = 5;

document.addEventListener("keydown", function(event) {
  enterKey(event.key);
  displayGuess(guess);
});

startGame();

//Functions
function startGame() {
  determinePasscodeLength();
  createPasscode();
  clearBoard();
  displayRules();
  guess = [];
  attemptNumber = 1;
  gamePlaying = true;
}

function determinePasscodeLength() {
  passcodeLength = (difficulty + 3);
}

function createPasscode() {
  passcode = [];

  for (let i = 0; i < passcodeLength; i++) {
    passcode.push(Math.floor(Math.random() * 10));
  }
}

function clearBoard() {
  for (i = 1; i <= numberOfAttemptRows; i++) {
    if (i <= totalAttempts) {
      document.querySelector(".attempt" + i).innerHTML =
      "_,".repeat(passcodeLength).slice(0, -1) + " - 0:0";
    } else {
      document.querySelector(".attempt" + i).innerHTML = "";
    }
  }

  document.querySelector(".guess").innerHTML =
  "_,".repeat(passcodeLength).slice(0, -1);
  document.querySelector(".optionsMenu").innerHTML = "[O]pties";
}

function displayRules() {
  document.querySelector(".gameRules").innerHTML = "Kraak de code!<br><br>Voer "
  + passcodeLength + " cijfers in en druk op Enter om een code te toetsen."
  + "<br><br>Je code verschijnt bovenin het scherm, met ernaast twee getallen. "
  + "Het linker getal geeft weer hoeveel van de cijfers in de getoetste code "
  + "op de juiste plaats zijn ingevoerd. Het rechter getal geeft weer hoeveel "
  + "van de cijfers in de getoetste code juist, maar op de verkeerde plaats "
  + "zijn ingevoerd.<br><br>Je hebt " + totalAttempts + " pogingen om de code "
  + "te kraken.<br><br>Veel succes!";
}

function displayOptions() {
  gamePlaying = false;
  document.querySelector(".gameRules").innerHTML = "";
  document.querySelector(".attempt1").innerHTML = "Moeilijkheidsgraad:";
  document.querySelector(".attempt2").innerHTML = "[1] Beginner";
  document.querySelector(".attempt3").innerHTML = "[2] Gevorderde";
  document.querySelector(".attempt4").innerHTML = "[3] Expert";

  document.querySelector(".attempt" + (difficulty + 1)).innerHTML += " <"

  for (i = 5; i <= numberOfAttemptRows; i++) {
    document.querySelector(".attempt" + i).innerHTML = "";
  }
  document.querySelector(".guess").innerHTML = "";
  document.querySelector(".optionsMenu").innerHTML = "";
}

function setDifficulty(pressedKey) {
  difficulty = pressedKey;
  displayOptions();
}

function enterKey(pressedKey) {
  var numberKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (numberKeys.includes(parseInt(pressedKey)) && gamePlaying) {
    enterKeyToGuess(parseInt(pressedKey));
  } else if (numberKeys.slice(1, 4).includes(parseInt(pressedKey))) {
    setDifficulty(parseInt(pressedKey));
  } else if (pressedKey == "Backspace") {
    guess.pop();
  } else if (pressedKey == "Enter") {
    if (gamePlaying) {
      enterAttempt();
    } else {
      startGame();
    }
  } else if (pressedKey == "o") {
    guess = [];
    displayOptions();
  }
}

function enterKeyToGuess(keyToEnter) {
  if (guess.length < passcodeLength) {
    guess.push(keyToEnter);
  }
}

function displayGuess() {
  var shownGuess = [];

  for (i = 0; i < guess.length; i++) {
    shownGuess.push(guess[i]);
  }
  while (shownGuess.length < passcodeLength && gamePlaying) {
    shownGuess.push("_");
  }

  document.querySelector(".guess").innerHTML = shownGuess;
}

function enterAttempt() {
  if (guess.length === passcodeLength && attemptNumber <= totalAttempts) {
    document.querySelector(".attempt" + attemptNumber.toString()).innerHTML =
    guess + " - " + checkAttempt()[0] + ":" + checkAttempt()[1];

    attemptNumber++;

    if (checkAttempt()[0] === passcodeLength
    || attemptNumber === (totalAttempts + 1)) {
      endGame();
    }

    guess = [];
  }
}

function checkAttempt() {
  var pins = [0, 0];

  //Count red pins as first item in pins array (correct number in correct place)
  for (i = 0; i < passcodeLength; i++) {
    if (passcode[i] == guess[i]) {
      pins[0]++;
    }
  }

  //Count white pins as second item in pins array (correct number in any place)
  for (i = 0; i < 10; i++) {
    var iOccurrencesInAttempt = 0;
    var iOccurrencesInPasscode = 0;

    for (num = 0; num < passcodeLength; num++) {
      if (guess[num] == i) {
        iOccurrencesInAttempt++;
      }
    }

    for (num = 0; num < passcodeLength; num++) {
      if (passcode[num] == i) {
        iOccurrencesInPasscode++;
      }
    }

    pins[1] += Math.min(iOccurrencesInAttempt, iOccurrencesInPasscode);

  }

  //Subtract red pins from white pins.
  //White pins now equal correct number in wrong place.
  pins[1] = pins[1] - pins[0];
  if (pins[1] < 0) {
    pins[1] = 0;
  }

  return pins;
}

function endGame() {
  if (checkAttempt()[0] === passcodeLength) {
    document.querySelector(".gameRules").innerHTML = "Je hebt de code gekraakt!"
    + "<br><br>De correcte code was " + passcode + ".<br><br>Je hebt de code "
    + "in " + (attemptNumber - 1) + " pogingen gekraakt.<br><br>Druk op Enter "
    + "om een nieuw spel te starten!";
  } else {
    document.querySelector(".gameRules").innerHTML = "Game Over<br><br>Het is "
    + "je niet gelukt om de code te kraken...<br><br>De correcte code was "
    + passcode + ".<br><br>Druk op Enter om een nieuw spel te starten!";
  }
  gamePlaying = !gamePlaying;
}
