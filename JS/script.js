const btns = document.querySelectorAll(".btn");
const userChoice = document.querySelector(".user-choose");
const choices = document.querySelectorAll(".choice");
const container = document.querySelector(".container");
const loading = document.querySelector(".loading-animation");

window.addEventListener("DOMContentLoaded", () => {
  loading.classList.add("show");
  container.classList.add("loading");
  setTimeout(() => {
    loading.classList.remove("show");
    container.classList.remove("loading");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.dataset.play === "vsCpu"
          ? (location.href = "cpu.html")
          : (location.href = "vsPlayer.html");
      });
    });
    // Player Picks
    let user = false;
    choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        choice.dataset.choice === "x"
          ? userChoice.classList.remove("active")
          : userChoice.classList.add("active");
        checkUserChoice();
      });
    });
    checkUserChoice();
  }, 2000);
});

function checkUserChoice() {
  user = userChoice.classList.contains("active");
  user = user === true ? "o" : "x";
  localStorage.setItem("userChoose", JSON.stringify(user));
}
