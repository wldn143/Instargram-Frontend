import { faImages } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import styled from "styled-components";
import ModalContainer from "../../shared/Modal";
import useOutSideClick from "../../shared/useOutSideClick";
import { FatText } from "../shared";
import UploadForm from "./UploadForm";

const UploadContainer = styled.div`
  height: 492px;
  width: ${({ isSelected }) => (isSelected ? `785px` : `442px`)};
  border-radius: 15px;
  background-color: ${(props) => props.theme.bgColor};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const UploadHeader = styled.div`
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #efefef;
  text-align: center;
  line-height: 44px;
`;

const HeaderText = styled(FatText)`
  font-size: 16px;
  color: ${(props) => props.theme.fontColor};
`;

const UploadIconContainer = styled.div`
  height: 220px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  #icon {
    color: ${(props) => props.theme.fontColor};
  }
`;

const UploadButtonContainer = styled.div`
  input[type="file"] {
    display: none;
  }
  display: flex;
  justify-content: center;
  height: 160px;
`;

const UploadButton = styled.div`
  width: 120px;
  height: 35px;
  background-color: ${(props) => props.theme.accent};
  border-radius: 8px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
`;

const UploadText = styled(FatText)`
  color: white;
`;

function Upload({ onClose, user }) {
  const modalRef = useRef(null);
  useOutSideClick(modalRef, () => onClose());

  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();

  const onChange = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  return (
    <ModalContainer>
      <UploadContainer ref={modalRef} isSelected={imgFile}>
        <UploadHeader>
          <HeaderText>새 게시물 만들기</HeaderText>
        </UploadHeader>
        {imgFile ? (
          <UploadForm img={imgFile} user={user} />
        ) : (
          <>
            <UploadIconContainer>
              <FontAwesomeIcon id="icon" icon={faImages} size="5x" />
            </UploadIconContainer>
            <UploadButtonContainer>
              <label htmlFor="uploads">
                <UploadButton>
                  <UploadText>컴퓨터에서 선택</UploadText>
                </UploadButton>
              </label>
              <input
                id="uploads"
                type="file"
                accept="image/*"
                onChange={onChange}
                ref={imgRef}
              />
            </UploadButtonContainer>
          </>
        )}
      </UploadContainer>
    </ModalContainer>
  );
}
export default Upload;
