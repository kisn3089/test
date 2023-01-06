import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ageState } from "../store/age";
import { hrState } from "../store/hr";
import { msiState } from "../store/msi";
import { psiState } from "../store/psi";
import { respState } from "../store/resp";

const useResult = () => {
  const hrRecoil = useRecoilValue(hrState);
  const psiRecoil = useRecoilValue(psiState);
  const msiRecoil = useRecoilValue(msiState);
  const respRecoil = useRecoilValue(respState);
  const ageRecoil = useRecoilValue(ageState);

  const [hrLevel, setHrLevel] = useState("");
  const [psiLevel, setPsiLevel] = useState("");
  const [msiLevel, setMsiLevel] = useState("");
  const [respLevel, setRespLevel] = useState("");
  const [totalLevel, setTotalLevel] = useState("");

  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");

  const [totalScore, setTotalScore] = useState(0);

  let hrScore;
  let msiScore;
  let psiScore;
  let respScore;
  let total;

  const navigator = useNavigate();

  useEffect(() => {
    // HR Score
    if (Number(ageRecoil) <= 25) {
      if (Number(hrRecoil) >= 63 && Number(hrRecoil) <= 81) {
        setHrLevel("healthy");
        hrScore = 50;
      } else if (
        (Number(hrRecoil) >= 59 && Number(hrRecoil) < 63) ||
        (Number(hrRecoil) > 81 && Number(hrRecoil) <= 85)
      ) {
        setHrLevel("normal");
        hrScore = 40;
      } else if (
        (Number(hrRecoil) >= 56 && Number(hrRecoil) < 59) ||
        (Number(hrRecoil) > 85 && Number(hrRecoil) <= 88)
      ) {
        setHrLevel("caution");
        hrScore = 30;
      } else if (
        (Number(hrRecoil) >= 52 && Number(hrRecoil) < 56) ||
        (Number(hrRecoil) > 88 && Number(hrRecoil) <= 92)
      ) {
        setHrLevel("warning");
        hrScore = 20;
      } else if (
        (Number(hrRecoil) >= 0 && Number(hrRecoil) < 52) ||
        Number(hrRecoil) > 92
      ) {
        setHrLevel("danger");
        hrScore = 10;
      }
    } else if (Number(ageRecoil) > 25 || Number(ageRecoil) <= 35) {
      if (Number(hrRecoil) >= 62 && Number(hrRecoil) <= 81) {
        setHrLevel("healthy");
        hrScore = 50;
      } else if (
        (Number(hrRecoil) >= 58 && Number(hrRecoil) < 62) ||
        (Number(hrRecoil) > 81 && Number(hrRecoil) <= 85)
      ) {
        setHrLevel("normal");
        hrScore = 40;
      } else if (
        (Number(hrRecoil) >= 55 && Number(hrRecoil) < 58) ||
        (Number(hrRecoil) > 85 && Number(hrRecoil) <= 88)
      ) {
        setHrLevel("caution");
        hrScore = 30;
      } else if (
        (Number(hrRecoil) >= 51 && Number(hrRecoil) < 55) ||
        (Number(hrRecoil) > 88 && Number(hrRecoil) <= 92)
      ) {
        setHrLevel("warning");
        hrScore = 20;
      } else if (
        (Number(hrRecoil) >= 0 && Number(hrRecoil) < 51) ||
        Number(hrRecoil) > 92
      ) {
        setHrLevel("danger");
        hrScore = 10;
      }
    } else if (Number(ageRecoil) > 36 || Number(ageRecoil) <= 45) {
      if (Number(hrRecoil) >= 62 && Number(hrRecoil) <= 82) {
        setHrLevel("healthy");
        hrScore = 50;
      } else if (
        (Number(hrRecoil) >= 58 && Number(hrRecoil) < 62) ||
        (Number(hrRecoil) > 82 && Number(hrRecoil) <= 86)
      ) {
        setHrLevel("normal");
        hrScore = 40;
      } else if (
        (Number(hrRecoil) >= 55 && Number(hrRecoil) < 58) ||
        (Number(hrRecoil) > 86 && Number(hrRecoil) <= 89)
      ) {
        setHrLevel("caution");
        hrScore = 30;
      } else if (
        (Number(hrRecoil) >= 51 && Number(hrRecoil) < 55) ||
        (Number(hrRecoil) > 89 && Number(hrRecoil) <= 93)
      ) {
        setHrLevel("warning");
        hrScore = 20;
      } else if (
        (Number(hrRecoil) >= 0 && Number(hrRecoil) < 51) ||
        Number(hrRecoil) > 93
      ) {
        setHrLevel("danger");
        hrScore = 10;
      }
    } else if (Number(ageRecoil) > 46 || Number(ageRecoil) <= 55) {
      if (Number(hrRecoil) >= 61 && Number(hrRecoil) <= 83) {
        setHrLevel("healthy");
        hrScore = 50;
      } else if (
        (Number(hrRecoil) >= 57 && Number(hrRecoil) < 61) ||
        (Number(hrRecoil) > 83 && Number(hrRecoil) <= 87)
      ) {
        setHrLevel("normal");
        hrScore = 40;
      } else if (
        (Number(hrRecoil) >= 54 && Number(hrRecoil) < 57) ||
        (Number(hrRecoil) > 87 && Number(hrRecoil) <= 90)
      ) {
        setHrLevel("caution");
        hrScore = 30;
      } else if (
        (Number(hrRecoil) >= 50 && Number(hrRecoil) < 54) ||
        (Number(hrRecoil) > 90 && Number(hrRecoil) <= 94)
      ) {
        setHrLevel("warning");
        hrScore = 20;
      } else if (
        (Number(hrRecoil) >= 0 && Number(hrRecoil) < 50) ||
        Number(hrRecoil) > 94
      ) {
        setHrLevel("danger");
        hrScore = 10;
      }
    } else if (Number(ageRecoil) > 56 || Number(ageRecoil) <= 65) {
      if (Number(hrRecoil) >= 61 && Number(hrRecoil) <= 83) {
        setHrLevel("healthy");
        hrScore = 50;
      } else if (
        (Number(hrRecoil) >= 57 && Number(hrRecoil) < 61) ||
        (Number(hrRecoil) > 83 && Number(hrRecoil) <= 87)
      ) {
        setHrLevel("normal");
        hrScore = 40;
      } else if (
        (Number(hrRecoil) >= 54 && Number(hrRecoil) < 57) ||
        (Number(hrRecoil) > 87 && Number(hrRecoil) <= 90)
      ) {
        setHrLevel("caution");
        hrScore = 30;
      } else if (
        (Number(hrRecoil) >= 50 && Number(hrRecoil) < 54) ||
        (Number(hrRecoil) > 90 && Number(hrRecoil) <= 94)
      ) {
        setHrLevel("warning");
        hrScore = 20;
      } else if (
        (Number(hrRecoil) >= 0 && Number(hrRecoil) < 50) ||
        Number(hrRecoil) > 94
      ) {
        setHrLevel("danger");
        hrScore = 10;
      }
    } else if (Number(ageRecoil) > 65) {
      if (Number(hrRecoil) >= 63 && Number(hrRecoil) <= 81) {
        setHrLevel("healthy");
        hrScore = 50;
      } else if (
        (Number(hrRecoil) >= 59 && Number(hrRecoil) < 63) ||
        (Number(hrRecoil) > 81 && Number(hrRecoil) <= 85)
      ) {
        setHrLevel("normal");
        hrScore = 40;
      } else if (
        (Number(hrRecoil) >= 56 && Number(hrRecoil) < 59) ||
        (Number(hrRecoil) > 85 && Number(hrRecoil) <= 88)
      ) {
        setHrLevel("caution");
        hrScore = 30;
      } else if (
        (Number(hrRecoil) >= 52 && Number(hrRecoil) < 56) ||
        (Number(hrRecoil) > 88 && Number(hrRecoil) <= 92)
      ) {
        setHrLevel("warning");
        hrScore = 20;
      } else if (
        (Number(hrRecoil) >= 0 && Number(hrRecoil) < 52) ||
        Number(hrRecoil) > 92
      ) {
        setHrLevel("danger");
        hrScore = 10;
      }
    }

    // PSI Score
    if (Number(psiRecoil) <= 0.1) {
      setPsiLevel("healthy");
      psiScore = 15;
    } else if (Number(psiRecoil) > 0.1 && Number(psiRecoil) <= 0.5) {
      setPsiLevel("normal");
      psiScore = 12;
    } else if (Number(psiRecoil) > 0.5 && Number(psiRecoil) <= 1) {
      setPsiLevel("caution");
      psiScore = 9;
    } else if (Number(psiRecoil) > 1 && Number(psiRecoil) < 3) {
      setPsiLevel("warning");
      psiScore = 6;
    } else if (Number(psiRecoil) >= 3) {
      setPsiLevel("danger");
      psiScore = 3;
    }

    // MSI Score
    if (Number(msiRecoil) <= 0.1) {
      setMsiLevel("healthy");
      msiScore = 15;
    } else if (Number(msiRecoil) > 0.1 && Number(msiRecoil) <= 0.5) {
      setMsiLevel("normal");
      msiScore = 12;
    } else if (Number(msiRecoil) > 0.5 && Number(msiRecoil) <= 1) {
      setMsiLevel("caution");
      msiScore = 9;
    } else if (Number(msiRecoil) > 1 && Number(msiRecoil) < 3) {
      setMsiLevel("warning");
      msiScore = 6;
    } else if (Number(msiRecoil) >= 3) {
      setMsiLevel("danger");
      msiScore = 3;
    }

    // Resp Score
    if (Number(respRecoil) >= 6 && Number(respRecoil) <= 12) {
      setRespLevel("healthy");
      respScore = 20;
    } else if (Number(respRecoil) > 12 && Number(respRecoil) <= 18) {
      setRespLevel("normal");
      respScore = 15;
    } else if (Number(respRecoil) > 18 && Number(respRecoil) <= 21) {
      setRespLevel("caution");
      respScore = 10;
    } else if (Number(respRecoil) > 21 && Number(respRecoil) <= 24) {
      setRespLevel("warning");
      respScore = 5;
    } else if (Number(respRecoil) > 24 || Number(respRecoil) < 6) {
      setRespLevel("danger");
      respScore = 0.5;
    }

    total = hrScore + psiScore + msiScore + respScore;
    setTotalScore(total);

    // Total Score
    if (totalScore > 90) {
      setTotalLevel("one");
      setComment1("You are very healthy.");
      setComment2("Try to improve your lifestyle");
      setComment3("to stay healthy.");
    } else if (totalScore >= 70 && totalScore < 90) {
      setTotalLevel("two");
      setComment1("Your health is normal.");
      setComment2("Please take care of your diet");
      setComment3("and exercise steadily.");
    } else if (totalScore >= 60 && totalScore < 70) {
      setTotalLevel("three");
      setComment1("Take care of your health.");
      setComment2("Refrain from eating greasy food and");
      setComment3("don't forget that prevention is important!");
    } else if (totalScore >= 50 && totalScore < 60) {
      setTotalLevel("four");
      setComment1("Your health is not good.");
      setComment2("We recommend you to exercise regularly");
      setComment3("and get enough rest.");
    } else if (totalScore < 50) {
      setTotalLevel("five");
      setComment1("There is an urgent need for");
      setComment2("improvement in health.");
      setComment3("We recommend you consult a doctor.");
    }
  }, []);

  console.log(
    hrRecoil,
    psiRecoil,
    msiRecoil,
    respRecoil,
    totalScore,
    hrLevel,
    psiLevel,
    msiLevel,
    respLevel,
    totalLevel,
    comment1,
    comment2,
    comment3
  );

  const handleClickClose = () => {
    navigator("/");
  };

  return {
    hrRecoil,
    psiRecoil: String(psiRecoil).slice(0, 4),
    msiRecoil: String(msiRecoil).slice(0, 4),
    respRecoil,
    totalScore,
    hrLevel,
    psiLevel,
    msiLevel,
    respLevel,
    totalLevel,
    comment1,
    comment2,
    comment3,
    handleClickClose,
  };
};

export default useResult;
