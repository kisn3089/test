import "./age.css";

const input = document.getElementsByClassName("age-input");
const next = document.getElementsByClassName("next-btn");
const prev = document.getElementsByClassName("prev");
const des = document.getElementsByClassName("des");
const mobileType = navigator.userAgent.toLowerCase();

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
    if (
      mobileType.indexOf("iphone") > -1 ||
      mobileType.indexOf("ipad") > -1 ||
      mobileType.indexOf("ipod") > -1
    ) {
      return (document.location.href = "./mediapipe.html");
    } else {
      return (document.location.href = "./measure.html");
    }
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
  // sessionStorage.setItem("os", getAgentSystem());
  sessionStorage.setItem("os", detectMobileDevice(window.navigator.userAgent));
}

function detectMobileDevice(agent) {
  const mobileRegex = [/iPhone/i, /iPad/i, /iPod/i];

  return mobileRegex.some((mobile) => agent.match(mobile));
}

export function getAgentSystem() {
  // if (!("navigator" in window)) {
  //   return "unknown";
  // }

  // // Use the modern 'web hints' provied by
  // // 'userAgentData' if available, else use
  // // the deprecated 'platform' as fallback.
  // const platform = (
  //   navigator.userAgentData?.platform || navigator.platform
  // )?.toLowerCase();

  // if (platform.startsWith("win")) return "windows";
  // if (platform.startsWith("mac")) return "macos";
  // if (platform.startsWith("linux")) return "linux";
  // return "unknown";
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return true;
  } else return false;
}

init();
