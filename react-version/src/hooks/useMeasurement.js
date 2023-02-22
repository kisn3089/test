import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ageState } from "../store/age";
import { genderState } from "../store/gender";
import { hrState } from "../store/hr";
import { msiState } from "../store/msi";
import { psiState } from "../store/psi";
import { respState } from "../store/resp";

const useMeasurement = () => {
  const [hrRecoil, setHrRecoil] = useRecoilState(hrState);
  const [psiRecoil, setPsiRecoil] = useRecoilState(psiState);
  const [msiRecoil, setMsiRecoil] = useRecoilState(msiState);
  const [respRecoil, setRespRecoil] = useRecoilState(respState);
  const [ageRecoil, setAgeRecoil] = useRecoilState(ageState);
  const [genderRecoil, setGenderRecoil] = useRecoilState(genderState);

  const [measuring, setMeasuring] = useState(false);
  const [noDetected, setNoDetected] = useState(false);
  const [noNetwork, setNoNetwork] = useState(false);

  const navigator = useNavigate();

  const getDataFnc = (hr, mentalStress, physicalStress) => {
    console.log(hr, mentalStress, physicalStress);
    setHrRecoil(hr);
    setPsiRecoil(physicalStress);
    setMsiRecoil(mentalStress);
    if (hr !== 0) {
      navigator("/result");
    }
  };

  const handleMeasuring = () => {
    setMeasuring(true);
  };

  const handleNetworkErr = () => {
    setNoNetwork(true);
  };

  const handleDetectedErr = () => {
    setNoDetected(true);
  };

  const handleClickErrBtn = () => {
    navigator("/measure");
  };

  const handleClickPrev = () => {
    navigator(-1);
  };

  const handleClickResultBtn = () => {
    navigator("/result");
  };

  return {
    measuring,
    noDetected,
    noNetwork,
    ageRecoil,
    genderRecoil,
    getDataFnc,
    handleMeasuring,
    handleNetworkErr,
    handleDetectedErr,
    handleClickErrBtn,
    handleClickPrev,
    handleClickResultBtn,
  };
};

export default useMeasurement;
