const O_CLASS = "o";
const X_CLASS = "x";
const CIRCLE = ` <i class="fa-sharp fa-regular fa-circle o"></i>`;
const X_MARK = `<i class="fa-solid fa-x x"></i>`;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gridItems = document.querySelectorAll(".grid-item");
const board = document.getElementById("board");
const container = document.querySelector(".container");
const winState = document.querySelector(".winning-state");
const winnerChoose = document.querySelector(".winner-choice");
const winPlayer = document.querySelector(".player");
const score = document.querySelectorAll(".score");
const winner = document.querySelector(".winner");
const showTurnBg = document.querySelector(".outer.turn");
const showTurn = document.querySelector(".show-turn");
const playerPick = document.querySelectorAll(".text");
const loading = document.querySelector(".loading-animation");
const restartBtn = document.getElementById("restart");

let circleTurn;
let firstChoose = JSON.parse(localStorage.getItem("userChoose"));
firstChoose = firstChoose === "x" ? X_MARK : CIRCLE;
showTurnBg.innerHTML = firstChoose;

window.addEventListener("DOMContentLoaded", () => {
  loading.classList.add("show");
  container.classList.add("hide");
  setTimeout(() => {
    container.classList.remove("hide");
    loading.classList.remove("show");
    startGame();
  }, 2000);
});
function startGame() {
  loading.classList.remove("show");
  container.classList.remove("loading");
  circleTurn = false;
  gridItems.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("win");
    item.classList.remove(X_CLASS);
    item.classList.remove(O_CLASS);
    item.removeEventListener("click", handleClick);
    item.addEventListener("click", handleClick, { once: true });
  });
  board.classList.remove(O_CLASS);
  board.classList.add(X_CLASS);
  showTurn.innerHTML = "";
  showTurn.innerHTML = X_MARK + "<span> Turn</span>";
  container.classList.remove("blur");
  winState.classList.remove("show");
}

function handleClick(e) {
  const item = e.target;
  const currentMark = circleTurn ? CIRCLE : X_MARK;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  placeMark(item, currentClass, currentMark);
  if (checkWins(currentClass)) {
    board.classList.remove(O_CLASS);
    board.classList.remove(X_CLASS);
    gridItems.forEach((item) => {
      item.removeEventListener("click", handleClick);
    });
    endGame(false, currentMark, currentClass);
  } else if (isDraw()) {
    endGame(true, currentMark, currentClass);
  } else {
    swapTurns();
    boardHoverClass(currentClass);
  }
}

function placeMark(item, currentClass, currentMark) {
  item.classList.add(currentClass);
  item.innerHTML = currentMark;
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function boardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  showTurn.innerHTML = "";
  if (circleTurn) {
    board.classList.add(O_CLASS);
    showTurn.innerHTML = CIRCLE + "<span> Turn</span>";
  } else {
    board.classList.add(X_CLASS);
    showTurn.innerHTML = X_MARK + "<span> Turn</span>";
  }
}

function checkWins(currentClass) {
  var isWin = false;
  winConditions.forEach((e) => {
    if (
      gridItems[e[0]].classList.contains(currentClass) &&
      gridItems[e[1]].classList.contains(currentClass) &&
      gridItems[e[2]].classList.contains(currentClass)
    ) {
      gridItems[e[0]].classList.add("win");
      gridItems[e[1]].classList.add("win");
      gridItems[e[2]].classList.add("win");
      isWin = true;
    }
  });
  return isWin;
  // return winConditions.some((condition) => {
  //   return condition.every((index) => {
  //     return gridItems[index].classList.contains(currentClass);
  //   });
  // });
}
var countPlayer1 = 0;
var countPlayer2 = 0;
var countTie = 0;
function endGame(darw, currentMark, currentClass) {
  if (darw) {
    winPlayer.innerHTML = "MATCH DRAW!";
    winner.innerHTML = "MATCH HAS BEEN DRAW!";
    countTie++;
    score[1].innerHTML = countTie;
    container.classList.add("blur");
    winState.classList.add("show");
  } else {
    setTimeout(() => {
      container.classList.add("blur");
      winState.classList.add("show");
      if (currentClass === "x") {
        winPlayer.innerHTML = "PLAYER 1 WON!";
        winner.innerHTML = `<span class="winner-choice">${currentMark}
      </span>TAKES THE ROUND`;
        countPlayer1++;
        score[0].innerHTML = countPlayer1;
      } else {
        winPlayer.innerHTML = "PLAYER 2 WON!";
        winner.innerHTML = `
      <span class="winner-choice">${currentMark}</span>
      TAKES THE ROUND`;
        countPlayer2++;
        score[2].innerHTML = countPlayer2;
      }
      winnerChoose.innerHTML = currentMark;
    }, 2000);
  }

  const nextRoundBtn = document.getElementById("next-round");
  const quitBtn = document.getElementById("quit");
  quitBtn.addEventListener("click", quitGame);
  nextRoundBtn.addEventListener("click", startGame);
}

function isDraw() {
  return [...gridItems].every((item) => {
    return item.classList.contains(X_CLASS) || item.classList.contains(O_CLASS);
  });
}

function quitGame() {
  loading.classList.add("show");
  container.classList.add("loading");
  winState.classList.remove("show");
  setTimeout(() => {
    history.back();
  }, 2000);
}

restartBtn.addEventListener("click", () => {
  loading.classList.add("show");
  container.classList.add("loading");
  setTimeout(() => {
    countPlayer1 = 0;
    countPlayer2 = 0;
    countTie = 0;
    score[1].innerHTML = countTie;
    score[0].innerHTML = countPlayer1;
    score[2].innerHTML = countPlayer2;
    startGame();
  }, 2000);
});
