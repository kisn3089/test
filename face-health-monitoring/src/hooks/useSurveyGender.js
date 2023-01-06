import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { genderState } from "../store/gender";

const useSurveyGender = () => {
  const [isActive, setIsActive] = useState("");
  const [validCheck, setValidCheck] = useState(false);
  const [genderRecoil, setGenderRecoil] = useRecoilState(genderState);

  const navigator = useNavigate();

  const handleClickGender = (e) => {
    const { id } = e.target;

    if (id === genderRecoil) {
      setGenderRecoil("");
      setIsActive("");
      setValidCheck(false);
    }
    setGenderRecoil(id === "Male" ? "0" : "1");
    setIsActive(id);
    setValidCheck(true);
  };

  const handleClickNext = () => {
    if (genderRecoil !== "") {
      navigator("/survey");
    }
  };

  return {
    isActive,
    validCheck,
    handleClickGender,
    handleClickNext,
  };
};

export default useSurveyGender;
