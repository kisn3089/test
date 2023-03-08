import styled from "styled-components";

export const GenderContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-family: "notoSansBold";
    font-size: 2.9985007496251876vh;
    margin-bottom: 5.997001499250375vh;
  }

  button {
    width: 87.467vw;
    max-width: 656px;
    height: 11.99400299850075vh;
    font-size: 2.39880059970015vh;
    font-family: "notoSansBold";
    background-color: #fff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 2.9985007496251876vh;

    svg {
      width: 8vw;
      max-width: 60px;
      height: 8vw;
      max-height: 60px;
      margin-right: 10px;
    }

    &.female-selected,
    &.male-selected {
      color: #ffffff;
      background: #006fad;
    }
  }
`;
