import "./index.css";

const btns = document.getElementsByClassName("btn");
const next = document.getElementsByClassName("next-btn");
const maleIcon = document.getElementsByClassName("male-icon");
const femaleIcon = document.getElementsByClassName("female-icon");

const link = "./age.html";

function handleClick(event) {
  if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove("clicked");
    }
    event.target.classList.add("clicked");
  }

  if (event.target.value === "0") {
    if (sessionStorage.getItem("gender") === "0") {
      maleIcon[0].classList.remove("clicked");
      sessionStorage.setItem("gender", "");
      next[0].classList.remove("clicked");
    } else {
      maleIcon[0].classList.add("clicked");
      femaleIcon[0].classList.remove("clicked");
      sessionStorage.setItem("gender", 0);
      next[0].classList.add("clicked");
    }
  } else if (event.target.value === "1") {
    if (sessionStorage.getItem("gender") === "1") {
      femaleIcon[0].classList.remove("clicked");
      sessionStorage.setItem("gender", "");
      next[0].classList.remove("clicked");
    } else {
      femaleIcon[0].classList.add("clicked");
      maleIcon[0].classList.remove("clicked");
      sessionStorage.setItem("gender", 1);
      next[0].classList.add("clicked");
    }
  }
}

function handleClickNext() {
  if (sessionStorage.getItem("gender") !== "") {
    location.href = link;
  }
}

function init() {
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", handleClick);
  }
  next[0].addEventListener("click", handleClickNext);
}

init();
