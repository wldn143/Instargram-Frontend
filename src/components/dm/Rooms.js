import { useState } from "react";
import styled from "styled-components";
import Avatar from "../auth/Avatar";

const RoomsContainer = styled.div`
  display: flex;
  padding: 8px 20px 8px 20px;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #efefef;
  }
`;

const RoomsInfo = styled.div`
  width: 241px;
  margin-left: 10px;
`;

const UserName = styled.div`
  color: ${(props) => props.theme.fontColor};
`;
const LatestPayload = styled.span`
  color: ${(props) => props.theme.cloudyColor};
`;
function Rooms({ id, users, messages, roomClick }) {
  let lastestPayload = messages[messages.length - 1].payload;
  let opponent = null;
  users.map((user) => {
    if (user.username !== "dy") opponent = user;
  });

  function onClick() {
    roomClick(id, opponent);
  }
  return (
    <>
      <RoomsContainer onClick={onClick}>
        <Avatar url={opponent.avatar} size={50} />
        <RoomsInfo>
          <UserName>{opponent.username}</UserName>
          <LatestPayload>{lastestPayload}</LatestPayload>
        </RoomsInfo>
      </RoomsContainer>
    </>
  );
}
export default Rooms;
