import styled from "styled-components";

export const ResultDataWrapper = styled.div`
  width: 89.333vw;
  max-width: 670px;
  text-align: left;
  margin-top: 7.496251874062969vh;

  span {
    font-size: 2.9985007496251876vh;
    font-family: "notoSansBold";
  }
`;

export const ResultBoxWrapper = styled.div`
  width: 89.333vw;
  max-width: 670px;
  height: 30.284857571214392vh;
  max-height: 404px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 2.9985007496251876vh;
  margin: 2.9985007496251876vh 0;
  padding: 2.9985007496251876vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DataWrapper = styled.div`
  width: 100%;
  text-align: left;

  span {
    font-size: 2.39880059970015vh;
    font-family: "notoSans";
    line-height: 3.598200899550225vh;

    &.data {
      font-size: 7.496251874062969vh;
      font-family: "notoSansBold";
      margin-right: 1.4992503748125938vh;
    }
  }
`;

export const StageWrapper = styled.div`
  width: 78.667vw;
  max-width: 590px;
  height: 2.9985007496251876vh;
  max-height: 40px;
  text-align: left;
  position: relative;

  svg.stage {
    width: 100%;
    height: 100%;
  }

  svg.my {
    width: 6.933vw;
    max-width: 52px;
    height: 2.9985007496251876vh;
    max-height: 40px;
    position: absolute;
    top: -3.7481259370314843vh;
    left: 6%;
    &.normal {
      left: 25%;
    }
    &.caution {
      left: 45%;
    }
    &.warning {
      left: 65%;
    }
    &.danger {
      left: 85%;
    }
  }
`;
