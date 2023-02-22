import styled from "styled-components";

export const StyledMeasureBody = styled.div`
  width: 56.22188905547227vh;
  min-width: 375px;
  height: calc(100vh - 9.745127436281859vh);
  min-height: calc(100vh - 44px);
  position: relative;
  margin: 0 auto;

  /* video,
  canvas {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  } */

  .output_canvas {
    /* display: none; */
    /* position: absolute; */
    top: 0;
    left: 0;
  }

  .output_canvas2 {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
  }
`;

export const ProgressWraaper = styled.div`
  width: 40.47976011994003vh;
  height: 40.47976011994003vh;
  min-width: 270px;
  min-height: 270px;
  position: absolute;
  top: 9.745127436281859vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 333;

  .rotating {
    width: 100%;
    height: 100%;

    path {
      width: 100%;
      height: 100%;
    }
  }
`;

export const PrepareCommentWrapper = styled.div`
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

  span {
    height: 3.598200899550225vh;
    min-height: 24px;
    font-family: "notoSansLight";
    font-size: 2.39880059970015vh;
  }
`;

export const MeasuringCommentWrapper = styled.div`
  width: 50.22488755622189vh;
  height: 35.98200899550225vh;
  min-width: 335px;
  min-height: 240px;
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
  z-index: 999;

  span {
    height: 3.598200899550225vh;
    min-height: 24px;
    font-family: "notoSansLight";
    font-size: 2.39880059970015vh;
  }

  .bpm {
    /* width: 10.794602698650674vh;
    height: 4.497751124437781vh;
    min-width: 72px;
    min-height: 30px; */
    font-size: 2.9985007496251876vh;
    font-family: "notoSansBold";
    margin-bottom: 1.7991004497751124vh;
    color: #006fad;
  }
`;

export const Modal = styled.div`
  width: 56.22188905547227vh;
  min-width: 375px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ErrBox = styled.div`
  width: 50.22488755622189vh;
  height: 34.48275862068966vh;
  min-width: 335px;
  min-height: 230px;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
`;

export const ErrMessage = styled.div`
  width: 100%;
  height: 25.337331334332834vh;
  min-height: 169px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
`;
