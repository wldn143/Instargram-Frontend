import styled from "styled-components";
import Avatar from "../auth/Avatar";
import { FatText } from "../shared";

const UploadFormContainer = styled.div`
  display: flex;
`;

const ImgPreview = styled.div`
  width: 448px;
  height: 448px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  border-right: 1px solid #efefef;
`;
const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const CaptionFormContainer = styled.div`
  width: 320px;
`;
const CaptionHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 15px;
`;
const UserName = styled(FatText)`
  color: ${(props) => props.theme.fontColor};
  margin-left: 15px;
`;
const CaptionForm = styled.div`
  height: 250px;
  border-bottom: 1px solid #efefef;
`;
const Caption = styled.textarea`
  width: 95%;
  height: 100%;
`;
function UploadForm({ img, user }) {
  return (
    <UploadFormContainer>
      <ImgPreview>
        <Img src={img} alt="image" />
      </ImgPreview>
      <CaptionFormContainer>
        <CaptionHeader>
          <Avatar url={user.avatar} lg={true} />
          <UserName>{user.username}</UserName>
        </CaptionHeader>
        <CaptionForm>
          <Caption placeholder="Write a caption..."></Caption>
        </CaptionForm>
      </CaptionFormContainer>
    </UploadFormContainer>
  );
}
export default UploadForm;
