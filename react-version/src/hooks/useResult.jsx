import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ageState } from "../store/age";
import { confidenceLevelState } from "../store/confidenceLevel";
import { dataState } from "../store/data";

const useResult = () => {
  const age = useRecoilValue(ageState);
  const dataRecoil = useRecoilValue(dataState);
  const face = useRecoilValue(confidenceLevelState);

  const [grade, setGrade] = useState("");
  const [gradeDes1, setGradeDes1] = useState("");
  const [gradeDes2, setGradeDes2] = useState("");
  const [gradeDes3, setGradeDes3] = useState("");
  const [faceErr, setFaceErr] = useState(false);
  const [position, setPosition] = useState("");
  const [position1, setPosition1] = useState("");
  const [position2, setPosition2] = useState("");

  const [hrScore, setHrScore] = useState(dataRecoil.hr);
  const [msiScore, setMsiScore] = useState(dataRecoil.msi);
  const [psiScore, setPsiScore] = useState(dataRecoil.psi);

  // const [hrPoint, setHrPoint] = useState(0);
  // const [msiPoint, setMsiPoint] = useState(0);
  // const [psiPoint, setPsiPoint] = useState(0);

  let hrPoint = 0;
  let msiPoint = 0;
  let psiPoint = 0;

  useEffect(() => {
    if (face > 20) {
      setFaceErr(true);
    }

    // HR Score
    if (Number(age) <= 25) {
      if (Number(hrScore) >= 63 && Number(hrScore) <= 81) {
        setPosition("healthy");
        hrPoint = 50;
      } else if (
        (Number(hrScore) >= 59 && Number(hrScore) < 63) ||
        (Number(hrScore) > 81 && Number(hrScore) <= 85)
      ) {
        setPosition("normal");
        hrPoint = 40;
      } else if (
        (Number(hrScore) >= 56 && Number(hrScore) < 59) ||
        (Number(hrScore) > 85 && Number(hrScore) <= 88)
      ) {
        setPosition("caution");
        hrPoint = 30;
      } else if (
        (Number(hrScore) >= 52 && Number(hrScore) < 56) ||
        (Number(hrScore) > 88 && Number(hrScore) <= 92)
      ) {
        setPosition("warning");
        hrPoint = 20;
      } else if (
        (Number(hrScore) >= 0 && Number(hrScore) < 52) ||
        Number(hrScore) > 92
      ) {
        setPosition("danger");
        hrPoint = 10;
      }
    } else if (Number(age) > 25 || Number(age) <= 35) {
      if (Number(hrScore) >= 62 && Number(hrScore) <= 81) {
        setPosition("healthy");
        hrPoint = 50;
      } else if (
        (Number(hrScore) >= 58 && Number(hrScore) < 62) ||
        (Number(hrScore) > 81 && Number(hrScore) <= 85)
      ) {
        setPosition("normal");
        hrPoint = 40;
      } else if (
        (Number(hrScore) >= 55 && Number(hrScore) < 58) ||
        (Number(hrScore) > 85 && Number(hrScore) <= 88)
      ) {
        setPosition("caution");
        hrPoint = 30;
      } else if (
        (Number(hrScore) >= 51 && Number(hrScore) < 55) ||
        (Number(hrScore) > 88 && Number(hrScore) <= 92)
      ) {
        setPosition("warning");
        hrPoint = 20;
      } else if (
        (Number(hrScore) >= 0 && Number(hrScore) < 51) ||
        Number(hrScore) > 92
      ) {
        setPosition("danger");
        hrPoint = 10;
      }
    } else if (Number(age) > 36 || Number(age) <= 45) {
      if (Number(hrScore) >= 62 && Number(hrScore) <= 82) {
        setPosition("healthy");
        hrPoint = 50;
      } else if (
        (Number(hrScore) >= 58 && Number(hrScore) < 62) ||
        (Number(hrScore) > 82 && Number(hrScore) <= 86)
      ) {
        setPosition("normal");
        hrPoint = 40;
      } else if (
        (Number(hrScore) >= 55 && Number(hrScore) < 58) ||
        (Number(hrScore) > 86 && Number(hrScore) <= 89)
      ) {
        setPosition("caution");
        hrPoint = 30;
      } else if (
        (Number(hrScore) >= 51 && Number(hrScore) < 55) ||
        (Number(hrScore) > 89 && Number(hrScore) <= 93)
      ) {
        setPosition("warning");
        hrPoint = 20;
      } else if (
        (Number(hrScore) >= 0 && Number(hrScore) < 51) ||
        Number(hrScore) > 93
      ) {
        setPosition("danger");
        hrPoint = 10;
      }
    } else if (Number(age) > 46 || Number(age) <= 55) {
      if (Number(hrScore) >= 61 && Number(hrScore) <= 83) {
        setPosition("healthy");
        hrPoint = 50;
      } else if (
        (Number(hrScore) >= 57 && Number(hrScore) < 61) ||
        (Number(hrScore) > 83 && Number(hrScore) <= 87)
      ) {
        setPosition("normal");
        hrPoint = 40;
      } else if (
        (Number(hrScore) >= 54 && Number(hrScore) < 57) ||
        (Number(hrScore) > 87 && Number(hrScore) <= 90)
      ) {
        setPosition("caution");
        hrPoint = 30;
      } else if (
        (Number(hrScore) >= 50 && Number(hrScore) < 54) ||
        (Number(hrScore) > 90 && Number(hrScore) <= 94)
      ) {
        setPosition("warning");
        hrPoint = 20;
      } else if (
        (Number(hrScore) >= 0 && Number(hrScore) < 50) ||
        Number(hrScore) > 94
      ) {
        setPosition("danger");
        hrPoint = 10;
      }
    } else if (Number(age) > 56 || Number(age) <= 65) {
      if (Number(hrScore) >= 61 && Number(hrScore) <= 83) {
        setPosition("healthy");
        hrPoint = 50;
      } else if (
        (Number(hrScore) >= 57 && Number(hrScore) < 61) ||
        (Number(hrScore) > 83 && Number(hrScore) <= 87)
      ) {
        setPosition("normal");
        hrPoint = 40;
      } else if (
        (Number(hrScore) >= 54 && Number(hrScore) < 57) ||
        (Number(hrScore) > 87 && Number(hrScore) <= 90)
      ) {
        setPosition("caution");
        hrPoint = 30;
      } else if (
        (Number(hrScore) >= 50 && Number(hrScore) < 54) ||
        (Number(hrScore) > 90 && Number(hrScore) <= 94)
      ) {
        setPosition("warning");
        hrPoint = 20;
      } else if (
        (Number(hrScore) >= 0 && Number(hrScore) < 50) ||
        Number(hrScore) > 94
      ) {
        setPosition("danger");
        hrPoint = 10;
      }
    } else if (Number(age) > 65) {
      if (Number(hrScore) >= 63 && Number(hrScore) <= 81) {
        setPosition("healthy");
        hrPoint = 50;
      } else if (
        (Number(hrScore) >= 59 && Number(hrScore) < 63) ||
        (Number(hrScore) > 81 && Number(hrScore) <= 85)
      ) {
        setPosition("normal");
        hrPoint = 40;
      } else if (
        (Number(hrScore) >= 56 && Number(hrScore) < 59) ||
        (Number(hrScore) > 85 && Number(hrScore) <= 88)
      ) {
        setPosition("caution");
        hrPoint = 30;
      } else if (
        (Number(hrScore) >= 52 && Number(hrScore) < 56) ||
        (Number(hrScore) > 88 && Number(hrScore) <= 92)
      ) {
        setPosition("warning");
        hrPoint = 20;
      } else if (
        (Number(hrScore) >= 0 && Number(hrScore) < 52) ||
        Number(hrScore) > 92
      ) {
        setPosition("danger");
        hrPoint = 10;
      }
    }

    // PSI Score
    if (Number(psiScore) <= 0.1) {
      setPosition2("healthy");
      psiPoint = 25;
    } else if (Number(psiScore) > 0.1 && Number(psiScore) <= 0.5) {
      setPosition2("normal");
      psiPoint = 19.5;
    } else if (Number(psiScore) > 0.5 && Number(psiScore) <= 1) {
      setPosition2("caution");
      psiPoint = 14;
    } else if (Number(psiScore) > 1 && Number(psiScore) < 3) {
      setPosition2("warning");
      psiPoint = 8.5;
    } else if (Number(psiScore) >= 3) {
      setPosition2("danger");
      psiPoint = 4;
    }

    // MSI Score
    if (Number(msiScore) <= 0.1) {
      setPosition1("healthy");
      msiPoint = 25;
    } else if (Number(msiScore) > 0.1 && Number(msiScore) <= 0.5) {
      setPosition1("normal");
      msiPoint = 19.5;
    } else if (Number(msiScore) > 0.5 && Number(msiScore) <= 1) {
      setPosition1("caution");
      msiPoint = 14;
    } else if (Number(msiScore) > 1 && Number(msiScore) < 3) {
      setPosition1("warning");
      msiPoint = 8.5;
    } else if (Number(msiScore) >= 3) {
      setPosition1("danger");
      msiPoint = 4;
    }

    let totalScore = hrPoint + psiPoint + msiPoint;
    console.log(
      dataRecoil,
      hrScore,
      msiScore,
      psiScore,
      totalScore,
      hrPoint,
      psiPoint,
      msiPoint
    );

    // Total Score
    if (totalScore > 90) {
      setGrade("1");
      // setMsiScore(Number(msiScore) === 3 ? msiScore : msiScore.slice(0, 4));
      // setPsiScore(Number(psiScore) === 3 ? psiScore : psiScore.slice(0, 4));
      setGradeDes1("You are very healthy.");
      setGradeDes2("Try to improve your lifestyle");
      setGradeDes3("to stay healthy.");
    } else if (totalScore >= 70 && totalScore < 90) {
      setGrade("2");
      setGradeDes1("Your health is normal.");
      setGradeDes2("Please take care of your diet");
      setGradeDes3("and exercise steadily.");
    } else if (totalScore >= 60 && totalScore < 70) {
      setGrade("3");
      setGradeDes1("Take care of your health.");
      setGradeDes2("Refrain from eating greasy food and");
      setGradeDes3("don't forget that prevention is important!");
    } else if (totalScore >= 50 && totalScore < 60) {
      setGrade("4");
      setGradeDes1("Your health is not good.");
      setGradeDes2("We recommend you to exercise regularly");
      setGradeDes3("and get enough rest.");
    } else if (totalScore < 50) {
      setGrade("5");
      setGradeDes1("There is an urgent need for");
      setGradeDes2("improvement in health.");
      setGradeDes3("We recommend you consult a doctor.");
    }
  }, []);

  const handleClickOK = () => {
    window.close();
  };

  return {
    grade,
    gradeDes1,
    gradeDes2,
    gradeDes3,
    faceErr,
    position,
    position1,
    position2,
    dataRecoil,
    msiScore,
    psiScore,
    handleClickOK,
  };
};

export default useResult;
