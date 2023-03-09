import Input from "../../../atoms/Input";
import Text from "../../../atoms/Text";
import { AgeContentWrapper } from "./style";

const AgeContent = (props) => {
  const { AgeRecoil, invalid, start, handleChangeAge } = props;

  return (
    <AgeContentWrapper>
      <Text content="How old are you?" />
      <Input id="age" handleChange={handleChangeAge} value={AgeRecoil} />
      {!invalid && !start ? (
        <Text className="invalid" content="Please enter a valid number." />
      ) : (
        <></>
      )}
    </AgeContentWrapper>
  );
};

export default AgeContent;
