import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { genderState } from "../store/gender";

const useGender = () => {
  const [genderRecoil, setGenderRecoil] = useRecoilState(genderState);
  const navigator = useNavigate();

  const handleClickGender = useCallback(
    (e) => {
      const { id } = e.target;
      let gender = id === genderRecoil ? "" : id;
      setGenderRecoil(gender);
    },
    [genderRecoil]
  );

  const handleClickNext = () => {
    if (genderRecoil !== "") {
      navigator("./age");
    }
  };

  return { genderRecoil, handleClickGender, handleClickNext };
};

export default useGender;
