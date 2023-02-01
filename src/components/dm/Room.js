import { gql, useMutation } from "@apollo/client";
import { faHeart, faImage, faSmile } from "@fortawesome/free-regular-svg-icons";
import {
  faInfoCircle,
  faPhone,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Avatar from "../auth/Avatar";

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

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

const InputBar = styled.form`
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

const MessageContainer = styled.div`
  margin-bottom: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 8px;
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
  border-radius: 25px;
  padding: 16px;
`;

function Room({ roomId, opponent, messages }) {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const { data: userData } = useUser();

  const updateSendMessage = (cache, result) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;

    if (ok && userData?.me) {
      const newPayload = {
        __typename: "Message",
        id,
        payload,
        user: {
          ...userData.me,
        },
        read: false,
      };

      const newCachePayload = cache.writeFragment({
        fragment: gql`
          fragment BsName on Message {
            id
            payload
            user {
              username
              avatar
            }
          }
        `,
        data: newPayload,
      });

      cache.modify({
        id: `Room:${roomId}`,
        fields: {
          messages(prev) {
            return [...prev, newCachePayload];
          },
        },
      });
    }
  };

  const [sendMessage, { data, loading }] = useMutation(SEND_MESSAGE_MUTATION, {
    update: updateSendMessage,
  });

  const onValid = async (payload) => {
    await sendMessage({ variables: { payload, roomId } });
  };

  const pressEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const data = e.target.value;
      return handleSubmit(onValid(data));
    }
  };

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  const Message = (message) => {
    let sender = message.user.username;

    return sender === opponent.username ? (
      <OpponentMessage>
        <AvatarContainer>
          <Avatar url={message.user.avatar} size={24} />
        </AvatarContainer>
        <PayloadContainer>{message.payload}</PayloadContainer>
      </OpponentMessage>
    ) : (
      <MyMessage>
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
              <MessageContainer key={message.id}>
                <Message {...message} />
              </MessageContainer>
            ))}
        </MessagesContainer>
      </RoomMain>
      <RoomFooter>
        <InputBarContainer>
          <InputBar onKeyPress={pressEnter}>
            <Icon>
              <FontAwesomeIcon icon={faSmile} size="xl" />
            </Icon>
            <TextBar
              ref={register({ required: true })}
              name="payload"
              placeholder="Enter message..."
            />
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
