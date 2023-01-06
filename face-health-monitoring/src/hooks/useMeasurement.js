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

  const getDataFnc = (hr, mentalStress, physicalStress, resp) => {
    console.log(hr, mentalStress, physicalStress, resp);
    setHrRecoil(hr);
    setPsiRecoil(physicalStress);
    setMsiRecoil(mentalStress);
    setRespRecoil(resp);
    if (hr !== 0) {
      navigator("/result");
    }
  };

  //   ctx.save();
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
  //   if (results.multiFaceLandmarks) {
  //     for (const landmarks of results.multiFaceLandmarks) {
  //       drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, {
  //         color: "#C0C0C070",
  //         lineWidth: 1,
  //       });
  //       drawConnectors(ctx, landmarks, FACEMESH_RIGHT_EYE, {
  //         color: "#FF3030",
  //       });
  //       drawConnectors(ctx, landmarks, FACEMESH_RIGHT_EYEBROW, {
  //         color: "#FF3030",
  //       });
  //       drawConnectors(ctx, landmarks, FACEMESH_RIGHT_IRIS, {
  //         color: "#FF3030",
  //       });
  //       drawConnectors(ctx, landmarks, FACEMESH_LEFT_EYE, { color: "#30FF30" });
  //       drawConnectors(ctx, landmarks, FACEMESH_LEFT_EYEBROW, {
  //         color: "#30FF30",
  //       });
  //       drawConnectors(ctx, landmarks, FACEMESH_LEFT_IRIS, {
  //         color: "#30FF30",
  //       });
  //       drawConnectors(ctx, landmarks, FACEMESH_FACE_OVAL, {
  //         color: "#E0E0E0",
  //       });
  //       drawConnectors(ctx, landmarks, FACEMESH_LIPS, { color: "#E0E0E0" });
  //     }
  //   }
  //   ctx.restore();
  // }

  // const faceMesh = new FaceMesh({
  //   locateFile: (file) => {
  //     return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  //   },
  // });
  // faceMesh.setOptions({
  //   maxNumFaces: 1,
  //   refineLandmarks: true,
  //   minDetectionConfidence: 0.5,
  //   minTrackingConfidence: 0.5,
  // });
  // faceMesh.onResults(onResults);

  // const camera = new Camera(video, {
  //   onFrame: async () => {
  //     await faceMesh.send({ image: video });
  //   },
  //   width: 1280,
  //   height: 720,
  // });
  // camera.start();

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
