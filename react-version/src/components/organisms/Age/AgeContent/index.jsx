import Input from "../../../atoms/Input";
import Text from "../../../atoms/Text";
import { AgeContentWrapper } from "./style";

const AgeContent = (props) => {
  const { AgeRecoil, handleClickNext } = props;

  return (
    <AgeContentWrapper>
      <Text content="How old are you?" />
      <Input />
    </AgeContentWrapper>
  );
};

export default AgeContent;
