import React from "react";
import lottie from "lottie-web";
import animationData from "../../../assets/animation/ani_heartrate.json";

const Animation = () => {
  const container = document.querySelector("#container");

  // useEffect(() => {
  lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: animationData,
  });
  // }, []);

  return (
    <div
      id="container"
      style={{
        width: "14.3928035982009vh",
        height: "8.095952023988007vh",
        minWidth: "96px",
        minHeight: "54px",
        marginTop: "2.9985007496251876vh",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default Animation;
