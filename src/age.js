import "./age.css";

const input = document.getElementsByClassName("age-input");
const next = document.getElementsByClassName("next-btn");
const prev = document.getElementsByClassName("prev");
const des = document.getElementsByClassName("des");

const link = "./measure.html";

function handleChage(event) {
  next[0].classList.remove("clicked");
  if (event.target.value == "0") {
    event.target.value = null;
    des[0].classList.add("on");
    sessionStorage.setItem("age", "");
    next[0].classList.remove("clicked");
  } else {
    event.target.value !== "0";
    sessionStorage.setItem("age", event.target.value);
    des[0].classList.remove("on");
    next[0].classList.add("clicked");
  }
  if (event.target.value > 110) {
    des[0].classList.add("on");
    sessionStorage.setItem("age", "");
    next[0].classList.remove("clicked");
  }
  if (sessionStorage.getItem("age") == "") {
    next[0].classList.remove("clicked");
  }
}

function handleClickNext() {
  if (sessionStorage.getItem("age") !== "") {
    location.href = link;
  }
}

function handleClickPrev() {
  location.href = "./index.html";
  sessionStorage.setItem("age", "");
  sessionStorage.setItem("gender", "");
}

function init() {
  input[0].addEventListener("keyup", handleChage);
  next[0].addEventListener("click", handleClickNext);
  prev[0].addEventListener("click", handleClickPrev);
}

init();
