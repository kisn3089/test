import Button from "../../../atoms/Button";
import { AgeFooterWrapper } from "./style";

const AgeFooter = (props) => {
  const { invalid, handleClickNext } = props;

  return (
    <AgeFooterWrapper>
      <Button
        className={invalid ? "on" : ""}
        content="Start Measurement"
        handleClick={handleClickNext}
      />
    </AgeFooterWrapper>
  );
};

export default AgeFooter;
