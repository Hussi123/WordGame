
const inputs = document.querySelector(".inputs"),
  resetBtn = document.querySelector(".reset-btn"),
  hint = document.querySelector(".hint span"),//guess-left
  guessLeft = document.querySelector(".guess-left span"),//guess-left
  wrongLetters = document.querySelector(".wrong-letters span"),
  typingInput = document.querySelector(".typing-input");

let word, maxGuesses, correct = [], incorrect = [];

function randomWords() {
  let randObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = randObj.word;
  maxGuesses = 8; correct = []; incorrect = [];

  hint.innerText = randObj.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetters.innerText = incorrect;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled />`
  };

  inputs.innerHTML = html;
};
randomWords();

function initGame(e) {
  let key = e.target.value;
  if (key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key}`) && !correct.includes(key)) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correct.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--;
      incorrect.push(` ${key}`);
    }
    guessLeft.innerText = maxGuesses
    wrongLetters.innerText = incorrect;
  }
  typingInput.value = "";

  setTimeout(()=>{
      if (correct.length === word.length) {
        alert(`Congurats! You foun the word ${word.toUpperCase()}`)
        randomWords();
      } else if (maxGuesses < 1) {
        alert("Game over !")
        for (let i = 0; i < word.length; i++) {
          inputs.querySelectorAll("input")[i].value = word[i];
        }
      }
  } , 1000);
}


resetBtn.addEventListener("click", randomWords);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
