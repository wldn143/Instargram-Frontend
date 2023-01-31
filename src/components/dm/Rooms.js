import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { ROOM_FRAGMENT } from "../../fragments";
import Avatar from "../auth/Avatar";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomFragment
    }
  }
  ${ROOM_FRAGMENT}
`;

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

function Rooms({ roomClick }) {
  const { data } = useQuery(SEE_ROOMS_QUERY);

  const RoomList = ({ id, users, messages }) => {
    let lastestPayload = messages[messages.length - 1].payload;
    let opponent = null;
    function onClick() {
      roomClick(id, opponent);
    }
    users.map((user) => {
      if (user.username !== "dy") opponent = user;
    });

    return (
      <RoomsContainer onClick={onClick}>
        <Avatar url={opponent.avatar} size={50} />
        <RoomsInfo>
          <UserName>{opponent.username}</UserName>
          <LatestPayload>{lastestPayload}</LatestPayload>
        </RoomsInfo>
      </RoomsContainer>
    );
  };

  return (
    <>
      {data?.seeRooms?.map((room) => (
        <RoomList key={room.id} {...room} />
      ))}
    </>
  );
}
export default Rooms;
