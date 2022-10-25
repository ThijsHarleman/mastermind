//Game setup
var passcode = [];
var guess = [];
var attempNumber = 1;
var gamePlaying = true;
var passcodeLength = 5;

document.addEventListener("keydown", function(event) {
  enterKey(event.key);
  displayGuess(guess);
});

startGame();

//Functions
function startGame () {
  createPasscode();
  clearBoard();
  displayRules();
  guess = [];
  attemptNumber = 1;
  gamePlaying = true;
}

function createPasscode() {
  passcode = [];

  for (let i = 0; i < passcodeLength; i++) {
    passcode.push(Math.floor(Math.random()*10));
  }
}

function clearBoard() {
  for (i = 1; i < 9; i++) {
    document.querySelector(".attempt" + i).innerHTML = "_,".repeat(passcodeLength).slice(0, -1) + " - 0:0";
  }

  document.querySelector(".guess").innerHTML = "_,".repeat(passcodeLength).slice(0, -1);
}

function displayRules() {
  document.querySelector(".gameRules").innerHTML = "Kraak de code!<br><br>Voer " + passcodeLength + " cijfers in en druk op Enter om een code te toetsen.<br><br>Je code verschijnt bovenin het scherm, met ernaast twee getallen. Het linker getal geeft weer hoeveel van de cijfers in de getoetste code op de juiste plaats zijn ingevoerd. Het rechter getal geeft weer hoeveel van de cijfers in de getoetste code juist, maar op de verkeerde plaats zijn ingevoerd.<br><br>Je hebt 8 pogingen om de code te kraken.<br><br>Veel succes!"
}

function enterKey(pressedKey) {
  switch (pressedKey) {
    case "0":
      enterKeyToGuess(0);
    break;
    case "1":
      enterKeyToGuess(1);
    break;
    case "2":
      enterKeyToGuess(2);
    break;
    case "3":
      enterKeyToGuess(3);
    break;
    case "4":
      enterKeyToGuess(4);
    break;
    case "5":
      enterKeyToGuess(5);
    break;
    case "6":
      enterKeyToGuess(6);
    break;
    case "7":
      enterKeyToGuess(7);
    break;
    case "8":
      enterKeyToGuess(8);
    break;
    case "9":
      enterKeyToGuess(9);
    break;
    case "Backspace":
      guess.pop();
    break;
    case "Enter":
      if (gamePlaying){
        enterAttempt();
      } else {
        startGame();
      }
    break;
  }
}

function enterKeyToGuess(keyToEnter) {
  if (guess.length < passcodeLength && gamePlaying) {
    guess.push(keyToEnter);
  }
}

function displayGuess() {
  var shownGuess = [];

  for (i = 0; i < guess.length; i++) {
    shownGuess.push(guess[i]);
  }
  while (shownGuess.length < 5) {
    shownGuess.push("_");
  }

  document.querySelector(".guess").innerHTML = shownGuess;
}

function enterAttempt() {
  if (guess.length === passcodeLength && attemptNumber < 9) {
    document.querySelector(".attempt" + attemptNumber.toString()).innerHTML = guess + " - " + checkAttempt()[0] + ":" + checkAttempt()[1];

    attemptNumber++;

    if (checkAttempt()[0] === passcodeLength || attemptNumber === 9) {
      endGame();
    }

    guess = [];
  }
}

function checkAttempt() {
  var pins = [0,0];

  //Count red pins as first item in pins array (correct number in correct place)
  for (i = 0; i < passcodeLength; i++) {
    if (passcode[i] == guess[i]) {
      pins[0]++;
    }
  }

  //Count white pins as second item in pins array (correct number in wrong space)
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

  //Subtract red pins from white pins. Otherwise red pins are counted twice.
  pins[1] = pins[1] - pins[0];
  if (pins[1] < 0) {
    pins[1] = 0;
  }

  return pins;
}

function endGame() {
  if (checkAttempt()[0] === passcodeLength) {
    document.querySelector(".gameRules").innerHTML = "Je hebt de code gekraakt!<br><br>De correcte code was " + passcode + ".<br><br>Je hebt de code in " + (attemptNumber-1) + " pogingen gekraakt.<br><br>Druk op Enter om een nieuw spel te starten!";
  } else {
    document.querySelector(".gameRules").innerHTML = "Game Over<br><br>Het is je niet gelukt om de code te kraken...<br><br>De correcte code was " + passcode + ".<br><br>Druk op Enter om een nieuw spel te starten!";
  }
  gamePlaying = !gamePlaying;
}
