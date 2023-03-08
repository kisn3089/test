import Button from "../../../atoms/Button";
import { AgeFooterWrapper } from "./style";

const AgeFooter = (props) => {
  const { AgeRecoil, handleClickNext } = props;

  return (
    <AgeFooterWrapper>
      <Button
        className={AgeRecoil !== "" ? "on" : ""}
        content="Start Measurement"
        handleClick={handleClickNext}
      />
    </AgeFooterWrapper>
  );
};

export default AgeFooter;
