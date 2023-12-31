"use strict";

require("./result.css");

var okBtn = document.getElementsByClassName("ok-btn")[0];
var grade = document.getElementsByClassName("grade")[0];
var gradeDes1 = document.getElementsByClassName("grade-des1")[0];
var gradeDes2 = document.getElementsByClassName("grade-des2")[0];
var gradeDes3 = document.getElementsByClassName("grade-des3")[0];
var hrRate = document.getElementsByClassName("hr-rate")[0];
var msiRate = document.getElementsByClassName("msi-rate")[0];
var psiRate = document.getElementsByClassName("psi-rate")[0];
var positions = document.getElementsByClassName("my-position");
var err = document.getElementsByClassName("face-err")[0];
var hrScore = sessionStorage.getItem("hr");
var msiScore = sessionStorage.getItem("msi");
var psiScore = sessionStorage.getItem("psi");
var age = sessionStorage.getItem("age");
var face = sessionStorage.getItem("face");
var hrPoint;
var msiPoint;
var psiPoint;
hrRate.textContent = hrScore;
msiRate.textContent = msiScore.slice(0, 4);
psiRate.textContent = psiScore.slice(0, 4);
sessionStorage.setItem("age", "");
sessionStorage.setItem("gender", "");
err.classList.remove("on");

if (face > 20) {
  err.classList.add("on");
} // HR Score


if (Number(age) <= 25) {
  if (Number(hrScore) >= 63 && Number(hrScore) <= 81) {
    positions[0].classList.add("healthy");
    hrPoint = 50;
  } else if (Number(hrScore) >= 59 && Number(hrScore) < 63 || Number(hrScore) > 81 && Number(hrScore) <= 85) {
    positions[0].classList.add("normal");
    hrPoint = 40;
  } else if (Number(hrScore) >= 56 && Number(hrScore) < 59 || Number(hrScore) > 85 && Number(hrScore) <= 88) {
    positions[0].classList.add("caution");
    hrPoint = 30;
  } else if (Number(hrScore) >= 52 && Number(hrScore) < 56 || Number(hrScore) > 88 && Number(hrScore) <= 92) {
    positions[0].classList.add("warning");
    hrPoint = 20;
  } else if (Number(hrScore) >= 0 && Number(hrScore) < 52 || Number(hrScore) > 92) {
    positions[0].classList.add("danger");
    hrPoint = 10;
  }
} else if (Number(age) > 25 || Number(age) <= 35) {
  if (Number(hrScore) >= 62 && Number(hrScore) <= 81) {
    positions[0].classList.add("healthy");
    hrPoint = 50;
  } else if (Number(hrScore) >= 58 && Number(hrScore) < 62 || Number(hrScore) > 81 && Number(hrScore) <= 85) {
    positions[0].classList.add("normal");
    hrPoint = 40;
  } else if (Number(hrScore) >= 55 && Number(hrScore) < 58 || Number(hrScore) > 85 && Number(hrScore) <= 88) {
    positions[0].classList.add("caution");
    hrPoint = 30;
  } else if (Number(hrScore) >= 51 && Number(hrScore) < 55 || Number(hrScore) > 88 && Number(hrScore) <= 92) {
    positions[0].classList.add("warning");
    hrPoint = 20;
  } else if (Number(hrScore) >= 0 && Number(hrScore) < 51 || Number(hrScore) > 92) {
    positions[0].classList.add("danger");
    hrPoint = 10;
  }
} else if (Number(age) > 36 || Number(age) <= 45) {
  if (Number(hrScore) >= 62 && Number(hrScore) <= 82) {
    positions[0].classList.add("healthy");
    hrPoint = 50;
  } else if (Number(hrScore) >= 58 && Number(hrScore) < 62 || Number(hrScore) > 82 && Number(hrScore) <= 86) {
    positions[0].classList.add("normal");
    hrPoint = 40;
  } else if (Number(hrScore) >= 55 && Number(hrScore) < 58 || Number(hrScore) > 86 && Number(hrScore) <= 89) {
    positions[0].classList.add("caution");
    hrPoint = 30;
  } else if (Number(hrScore) >= 51 && Number(hrScore) < 55 || Number(hrScore) > 89 && Number(hrScore) <= 93) {
    positions[0].classList.add("warning");
    hrPoint = 20;
  } else if (Number(hrScore) >= 0 && Number(hrScore) < 51 || Number(hrScore) > 93) {
    positions[0].classList.add("danger");
    hrPoint = 10;
  }
} else if (Number(age) > 46 || Number(age) <= 55) {
  if (Number(hrScore) >= 61 && Number(hrScore) <= 83) {
    positions[0].classList.add("healthy");
    hrPoint = 50;
  } else if (Number(hrScore) >= 57 && Number(hrScore) < 61 || Number(hrScore) > 83 && Number(hrScore) <= 87) {
    positions[0].classList.add("normal");
    hrPoint = 40;
  } else if (Number(hrScore) >= 54 && Number(hrScore) < 57 || Number(hrScore) > 87 && Number(hrScore) <= 90) {
    positions[0].classList.add("caution");
    hrPoint = 30;
  } else if (Number(hrScore) >= 50 && Number(hrScore) < 54 || Number(hrScore) > 90 && Number(hrScore) <= 94) {
    positions[0].classList.add("warning");
    hrPoint = 20;
  } else if (Number(hrScore) >= 0 && Number(hrScore) < 50 || Number(hrScore) > 94) {
    positions[0].classList.add("danger");
    hrPoint = 10;
  }
} else if (Number(age) > 56 || Number(age) <= 65) {
  if (Number(hrScore) >= 61 && Number(hrScore) <= 83) {
    positions[0].classList.add("healthy");
    hrPoint = 50;
  } else if (Number(hrScore) >= 57 && Number(hrScore) < 61 || Number(hrScore) > 83 && Number(hrScore) <= 87) {
    positions[0].classList.add("normal");
    hrPoint = 40;
  } else if (Number(hrScore) >= 54 && Number(hrScore) < 57 || Number(hrScore) > 87 && Number(hrScore) <= 90) {
    positions[0].classList.add("caution");
    hrPoint = 30;
  } else if (Number(hrScore) >= 50 && Number(hrScore) < 54 || Number(hrScore) > 90 && Number(hrScore) <= 94) {
    positions[0].classList.add("warning");
    hrPoint = 20;
  } else if (Number(hrScore) >= 0 && Number(hrScore) < 50 || Number(hrScore) > 94) {
    positions[0].classList.add("danger");
    hrPoint = 10;
  }
} else if (Number(age) > 65) {
  if (Number(hrScore) >= 63 && Number(hrScore) <= 81) {
    positions[0].classList.add("healthy");
    hrPoint = 50;
  } else if (Number(hrScore) >= 59 && Number(hrScore) < 63 || Number(hrScore) > 81 && Number(hrScore) <= 85) {
    positions[0].classList.add("normal");
    hrPoint = 40;
  } else if (Number(hrScore) >= 56 && Number(hrScore) < 59 || Number(hrScore) > 85 && Number(hrScore) <= 88) {
    positions[0].classList.add("caution");
    hrPoint = 30;
  } else if (Number(hrScore) >= 52 && Number(hrScore) < 56 || Number(hrScore) > 88 && Number(hrScore) <= 92) {
    positions[0].classList.add("warning");
    hrPoint = 20;
  } else if (Number(hrScore) >= 0 && Number(hrScore) < 52 || Number(hrScore) > 92) {
    positions[0].classList.add("danger");
    hrPoint = 10;
  }
} // PSI Score


if (Number(psiScore) <= 0.1) {
  positions[2].classList.add("healthy");
  psiPoint = 25;
} else if (Number(psiScore) > 0.1 && Number(psiScore) <= 0.5) {
  positions[2].classList.add("normal");
  psiPoint = 19.5;
} else if (Number(psiScore) > 0.5 && Number(psiScore) <= 1) {
  positions[2].classList.add("caution");
  psiPoint = 14;
} else if (Number(psiScore) > 1 && Number(psiScore) < 3) {
  positions[2].classList.add("warning");
  psiPoint = 8.5;
} else if (Number(psiScore) >= 3) {
  positions[2].classList.add("danger");
  psiPoint = 4;
} // MSI Score


if (Number(msiScore) <= 0.1) {
  positions[1].classList.add("healthy");
  msiPoint = 25;
} else if (Number(msiScore) > 0.1 && Number(msiScore) <= 0.5) {
  positions[1].classList.add("normal");
  msiPoint = 19.5;
} else if (Number(msiScore) > 0.5 && Number(msiScore) <= 1) {
  positions[1].classList.add("caution");
  msiPoint = 14;
} else if (Number(msiScore) > 1 && Number(msiScore) < 3) {
  positions[1].classList.add("warning");
  msiPoint = 8.5;
} else if (Number(msiScore) >= 3) {
  positions[1].classList.add("danger");
  msiPoint = 4;
}

var totalScore = hrPoint + psiPoint + msiPoint; // Total Score

if (totalScore > 90) {
  grade.classList.add("one");
  grade.textContent = "Grade 1";
  gradeDes1.textContent = "You are very healthy.";
  gradeDes2.textContent = "Try to improve your lifestyle";
  gradeDes3.textContent = "to stay healthy.";
} else if (totalScore >= 70 && totalScore < 90) {
  grade.classList.add("two");
  grade.textContent = "Grade 2";
  gradeDes1.textContent = "Your health is normal.";
  gradeDes2.textContent = "Please take care of your diet";
  gradeDes3.textContent = "and exercise steadily.";
} else if (totalScore >= 60 && totalScore < 70) {
  grade.classList.add("three");
  grade.textContent = "Grade 3";
  gradeDes1.textContent = "Take care of your health.";
  gradeDes2.textContent = "Refrain from eating greasy food and";
  gradeDes3.textContent = "don't forget that prevention is important!";
} else if (totalScore >= 50 && totalScore < 60) {
  grade.classList.add("four");
  grade.textContent = "Grade 4";
  gradeDes1.textContent = "Your health is not good.";
  gradeDes2.textContent = "We recommend you to exercise regularly";
  gradeDes3.textContent = "and get enough rest.";
} else if (totalScore < 50) {
  grade.classList.add("five");
  grade.textContent = "Grade 5";
  gradeDes1.textContent = "There is an urgent need for";
  gradeDes2.textContent = "improvement in health.";
  gradeDes3.textContent = "We recommend you consult a doctor.";
}

okBtn.addEventListener("click", function () {
  sessionStorage.setItem("hr", "");
  sessionStorage.setItem("psi", "");
  sessionStorage.setItem("msi", "");
  sessionStorage.setItem("gender", "");
  sessionStorage.setItem("age", "");
  location.href = "./index.html";
});