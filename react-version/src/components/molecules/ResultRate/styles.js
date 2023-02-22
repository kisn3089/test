import styled from "styled-components";

export const StyledResultRate = styled.div`
  width: 50.22488755622189vh;
  height: 30.284857571214392vh;
  min-width: 335px;
  min-height: 202px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  box-sizing: border-box;
  padding: 2.9985007496251876vh;
  margin-bottom: 4.497751124437781vh;
`;

export const ScoreWraaper = styled.div`
  display: flex;
  margin-top: 4.197901049475262vh;
  margin-bottom: 6.5967016491754125vh;
  align-items: baseline;
`;

export const StatusBar = styled.div`
  position: relative;
`;

export const MyStatus = styled.div`
  position: absolute;
  top: -3.598200899550225vh;

  &.healthy {
    /* left: 2.098950524737631vh; */
    left: 14px;
  }

  &.normal {
    /* left: 11.094452773613193vh; */
    left: 74px;
  }

  &.caution {
    /* left: 20.089955022488756vh; */
    left: 134px;
  }

  &.warning {
    /* left: 29.08545727136432vh; */
    left: 194px;
  }

  &.danger {
    /* left: 38.08095952023988vh; */
    left: 254px;
  }
`;
