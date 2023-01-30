import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { PHOTO_FRAGMENT } from "../../fragments";
import Avatar from "../auth/Avatar";
import { FatText } from "../shared";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String!) {
    uploadPhoto(file: $file, caption: $caption) {
      ...PhotoFragment
    }
  }
  ${PHOTO_FRAGMENT}
`;

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

const CaptionForm = styled.form`
  height: 250px;
`;

const Caption = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  background-color: inherit;
  resize: none;
  :focus {
    outline: none;
  }
  padding: 10px 0 0 15px;
  font-family: sans-serif;
  color: ${(props) => props.theme.fontColor};
`;

const CaptionFooter = styled.div`
  height: 40px;
`;

const SubmitButton = styled.button`
  background-color: inherit;
  float: right;
  border: none;
  font-size: 14px;
  font-weight: 600;
  height: 100%;
  cursor: pointer;
  color: ${(props) => props.theme.accent};
  :hover {
    color: ${(props) => props.theme.fontColor};
  }
`;

function UploadForm({ img, url, user }) {
  const { register, handleSubmit } = useForm();

  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev];
          },
        },
      });
      window.location.reload(true);
    }
  };

  const [uploadPhoto, { data, loading }] = useMutation(UPLOAD_PHOTO_MUTATION, {
    update: updateUploadPhoto,
  });

  const onValid = async (data) => {
    if (loading) return;
    const { caption } = data;
    const file = url;
    await uploadPhoto({ variables: { file, caption } });
  };

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
        <CaptionForm onSubmit={handleSubmit(onValid)}>
          <Caption
            ref={register({ maxLength: { value: 2200 } })}
            name="caption"
            placeholder="Write a caption..."
          ></Caption>
          <CaptionFooter>
            <SubmitButton type="submit">submit</SubmitButton>
          </CaptionFooter>
        </CaptionForm>
      </CaptionFormContainer>
    </UploadFormContainer>
  );
}
export default UploadForm;
