import styled from "styled-components";

export const StyledMeasurePrepareBody = styled.div`
  width: 56.22188905547227vh;
  min-width: 375px;
  height: calc(100vh - 9.745127436281859vh);
  min-height: calc(100vh - 64px);
  position: relative;
  margin: 0 auto;
  /* backdrop-filter: blur(150px); */

  canvas {
    width: 100%;
    height: 100%;
  }
`;

export const Attention = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
`;

export const FaceWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background: #000000; */
  /* opacity: 0.4; */
  position: absolute;
  top: 0;
  left: 0;
`;

export const FaceSection = styled.div`
  width: 35.98200899550225vh;
  height: 35.98200899550225vh;
  min-width: 240px;
  min-height: 240px;
  border-radius: 50%;
  border: solid 10px #ffffff;
  backdrop-filter: opacity(0.3);
  position: absolute;
  top: 9.745127436281859vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  /* backdrop-filter: blur(150px); */
  overflow: hidden;
  /* opacity: 0; */
`;

export const CommentWrapper = styled.div`
  width: 50.22488755622189vh;
  height: 21.73913043478261vh;
  min-width: 335px;
  min-height: 145px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 4.497751124437781vh;
  /* left: 2.9985007496251876vh; */
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;

  span {
    height: 3.598200899550225vh;
    min-height: 24px;
    font-family: "notoSansLight";
    font-size: 2.39880059970015vh;
  }
`;
