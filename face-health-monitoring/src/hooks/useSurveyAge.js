import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ageState } from "../store/age";

const useSurveyAge = () => {
  const [validCheck, setValidCheck] = useState(false);
  const [ageRecoil, setAgeRecoil] = useRecoilState(ageState);
  const navigator = useNavigate();

  const handleChangeAge = (e) => {
    let { value } = e.target;

    let age = value.replace(/[^-0-9]/g, "");
    if (age >= 1) {
      setValidCheck(false);
      setAgeRecoil(age);
    } else {
      setValidCheck(true);
      setAgeRecoil("");
    }

    if (age > 110) {
      setValidCheck(true);
    }
  };

  const handleClickPrev = () => {
    navigator(-1);
  };

  const handleClickNext = () => {
    if (!validCheck) {
      navigator("/measure");
    }
  };

  return {
    ageRecoil,
    validCheck,
    handleChangeAge,
    handleClickPrev,
    handleClickNext,
  };
};

export default useSurveyAge;
