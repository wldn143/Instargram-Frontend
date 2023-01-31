import { faHeart, faImage, faSmile } from "@fortawesome/free-regular-svg-icons";
import {
  faInfoCircle,
  faPhone,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Avatar from "../auth/Avatar";

const RoomHeader = styled.div`
  height: 60px;
  padding: 0 20px 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.fontColor};
`;

const UserName = styled.div`
  margin-left: 10px;
`;

const Icons = styled.div`
  display: flex;
`;

const Icon = styled.div`
  width: 40px;
  padding: 10px;
  cursor: pointer;
`;

const RoomMain = styled.div`
  height: 430px;
`;

const RoomFooter = styled.div`
  height: 84px;
  padding: 20px;
`;

const InputBarContainer = styled.div`
  height: 44px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 20px;
`;

const InputBar = styled.div`
  display: flex;
  align-items: center;
  width: 543px;
  padding: 0 8px 0 11px;
`;

const TextBar = styled.textarea`
  width: 398px;
  height: 34px;
  border: none;
  resize: none;
  padding: 8px 9px;
  font-family: sans-serif;
  background-color: inherit;
  color: ${(props) => props.theme.fontColor};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) => props.theme.cloudyColor};
  }
`;

const MessagesContainer = styled.div`
  height: inherit;
  padding: 10px 10px 0 10px;
  overflow-x: hidden;
`;

const OpponentMessage = styled.div`
  display: flex;
`;

const MyMessage = styled.div`
  display: flex;
  justify-content: right;
`;

const PayloadContainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 10px;
`;

function Room({ id, opponent, messages }) {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  const Message = (message) => {
    let sender = message.user.username;

    return sender === opponent.username ? (
      <OpponentMessage id="you">
        <Avatar url={message.user.avatar} size={24} />
        <PayloadContainer>{message.payload}</PayloadContainer>
      </OpponentMessage>
    ) : (
      <MyMessage id="me">
        <PayloadContainer>{message.payload}</PayloadContainer>
      </MyMessage>
    );
  };

  return (
    <>
      <RoomHeader>
        <UserInfo>
          <Avatar url={opponent.avatar} size={24} />
          <UserName>{opponent.username}</UserName>
        </UserInfo>
        <Icons>
          <Icon>
            <FontAwesomeIcon icon={faPhone} size="lg" />
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faVideoCamera} size="lg" />
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faInfoCircle} size="lg" />
          </Icon>
        </Icons>
      </RoomHeader>
      <RoomMain>
        <MessagesContainer ref={scrollRef}>
          {messages &&
            messages.map((message) => (
              <Message key={message.id} {...message} />
            ))}
        </MessagesContainer>
      </RoomMain>
      <RoomFooter>
        <InputBarContainer>
          <InputBar>
            <Icon>
              <FontAwesomeIcon icon={faSmile} size="xl" />
            </Icon>
            <TextBar placeholder="Enter message..."></TextBar>
            <Icon>
              <FontAwesomeIcon icon={faImage} size="xl" />
            </Icon>
            <Icon>
              <FontAwesomeIcon icon={faHeart} size="xl" />
            </Icon>
          </InputBar>
        </InputBarContainer>
      </RoomFooter>
    </>
  );
}
export default Room;
