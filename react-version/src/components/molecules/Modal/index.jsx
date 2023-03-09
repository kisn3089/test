import React from "react";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import { ModalContent, ModalWrapper, TextWrapper } from "./style";

const Modal = (props) => {
  const { text1, text2, handleClickOK } = props;
  return (
    <ModalWrapper>
      <ModalContent>
        <TextWrapper>
          <Text content={text1} />
          <Text content={text2} />
        </TextWrapper>
        <Button content="OK" handleClick={handleClickOK} />
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
