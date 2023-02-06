import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ModalContainer from "../../shared/Modal";
import useOutSideClick from "../../shared/useOutSideClick";
import SearchUser from "../search/SearchUser";

const NewMessageContainer = styled.div`
  height: 435px;
  width: 400px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
`;

const NewMessageHeader = styled.div`
  height: 42px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
`;

const CloseBtn = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
  cursor: pointer;
`;

const HeaderText = styled.div`
  width: 251px;
  height: 100%;
  color: ${(props) => props.theme.fontColor};
  display: flex;
  justify-content: center;
  line-height: 42px;
  font-size: 16px;
  font-weight: 600;
`;

const NextBtn = styled.div`
  width: 74px;
  height: 100%;
`;

const NextBtnText = styled.button`
  text-align: center;
  line-height: 42px;
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  border: none;
  background-color: inherit;
  width: 100%;
  cursor: ${(props) => (props.disabled ? "nond" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const SearchContainer = styled.div`
  height: 87px;
  padding: 10px 0 10px 0;
`;

const ReceiverContainer = styled.div`
  height: 30px;
  width: 100%;
`;

const Receiver = styled.div`
  height: 32px;
  width: 88px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  font-weight: 600;
`;

const SearchBar = styled.input`
  width: 305px;
  height: 32px;
  padding: 3px 15px;
  ::placeholder {
    color: ${(props) => props.theme.cloudyColor};
  }
`;

const SearchResultContainer = styled.div``;
function NewMessage({ onClose, opponentList, username }) {
  const modalRef = useRef(null);
  useOutSideClick(modalRef, () => onClose());

  const [keyword, setKeyword] = useState("");
  const [receiver, setReciever] = useState(null);
  const [existing, setExisting] = useState(false);

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const reciverFn = (e) => {
    setReciever(e);
  };

  const findRoomFn = () => {
    opponentList.map((room) => {
      room.users.map((user) => {
        if (user.username == receiver) {
          //페이지 이동
          window.location.href = `/direct/${username}/${room.id}`;
        }
      });
    });
    setExisting(false);
    return;
  };

  return (
    <ModalContainer>
      <NewMessageContainer ref={modalRef}>
        <NewMessageHeader>
          <CloseBtn>
            <FontAwesomeIcon icon={faRemove} size="xl" onClick={onClose} />
          </CloseBtn>
          <HeaderText>새로운 메시지</HeaderText>
          <NextBtn>
            <NextBtnText onClick={findRoomFn} disabled={!receiver}>
              다음
            </NextBtnText>
          </NextBtn>
        </NewMessageHeader>
        <SearchContainer>
          <ReceiverContainer>
            <Receiver>받는 사람:</Receiver>
          </ReceiverContainer>
          <SearchBar
            placeholder="검색..."
            type="text"
            value={keyword}
            onChange={onChange}
          ></SearchBar>
        </SearchContainer>
        <SearchResultContainer>
          <SearchUser
            keyword={keyword}
            option="checkBox"
            reciverFn={reciverFn}
          ></SearchUser>
        </SearchResultContainer>
      </NewMessageContainer>
    </ModalContainer>
  );
}
export default NewMessage;
