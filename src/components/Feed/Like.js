import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { USER_FRAGMENT } from "../../fragments";
import ModalContainer from "../../shared/Modal";
import { useRef } from "react";
import useOutSideClick from "../../shared/useOutSideClick";
import UserList from "./UserList";

const SEE_PHOTO_LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const LikesContatiner = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 400px;
  width: 400px;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LikesHeader = styled.div`
  width: 100%;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const LikesHeaderText = styled.h1`
  width: 300px;
  font-size: 18px;
  text-align: center;
`;

const CloseBtnContainer = styled.div`
  display: flex;
  width: 50px;
  align-items: center;
`;

const CloseBtn = styled.button`
  width: 50px;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

function Like({ photoId, username, onClose }) {
  const modalRef = useRef(null);
  useOutSideClick(modalRef, () => onClose());

  const { data, loading } = useQuery(SEE_PHOTO_LIKES_QUERY, {
    variables: { id: photoId },
  });

  return (
    <ModalContainer>
      <LikesContatiner ref={modalRef}>
        <LikesHeader>
          <LikesHeaderText>Likes</LikesHeaderText>
          <CloseBtnContainer>
            <CloseBtn onClick={() => onClose()}>𝙓</CloseBtn>
          </CloseBtnContainer>
        </LikesHeader>
        <div>
          {data?.seePhotoLikes?.map((user) => (
            <UserList
              key={user.id}
              avatar={user.avatar}
              username={user.username}
              firstName={user.firstName}
            />
          ))}
        </div>
      </LikesContatiner>
    </ModalContainer>
  );
}
export default Like;
