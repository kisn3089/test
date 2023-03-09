import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { ageState } from "../store/age";

const useAge = () => {
  const [ageRecoil, setAgeRecoil] = useRecoilState(ageState);
  const [invalid, setInvalid] = useState(false);
  const [start, setStart] = useState(true);
  const navigator = useNavigate();

  const handleChangeAge = (e) => {
    const { value } = e.target;
    let age = value.replace(/[^-0-9]/g, "");
    setStart(false);
    if (age === 0) {
      setAgeRecoil("");
      setInvalid(false);
    } else {
      if (age > 0 && age < 110) {
        setAgeRecoil(String(age));
        setInvalid(true);
      } else {
        setAgeRecoil(String(age));
        setInvalid(false);
      }
    }
  };

  const handleClickPrev = () => {
    navigator(-1);
  };

  const handleClickNext = () => {
    if (invalid) {
      navigator("/measure");
    }
  };

  return {
    ageRecoil,
    invalid,
    start,
    handleChangeAge,
    handleClickPrev,
    handleClickNext,
  };
};

export default useAge;
