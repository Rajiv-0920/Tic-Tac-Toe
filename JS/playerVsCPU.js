const O_CLASS = "o";
const X_CLASS = "x";
const CIRCLE = ` <i class="fa-sharp fa-regular fa-circle o"></i>`;
const X_MARK = `<i class="fa-solid fa-x x"></i>`;

let circleTurn;

const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach((item) => {
  item.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const item = e.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  const currentMark = circleTurn ? CIRCLE : X_MARK;
  userTurn(item, currentClass, currentMark);
  cpuTurn();
}

function userTurn(item, currentClass, currentMark) {
  item.classList.add(currentClass);
  item.innerHTML = currentMark;
}

function cpuTurn() {
  const randomMove = Math.random();
}
