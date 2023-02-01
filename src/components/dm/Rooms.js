import { gql, useQuery } from "@apollo/client";
import { Link, useRouteMatch } from "react-router-dom";
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
  width: 233px;
  margin-left: 10px;
`;

const UserName = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const LatestPayload = styled.span`
  color: ${(props) => props.theme.cloudyColor};
`;

const UnreadIcon = styled.div`
  background-color: ${(props) => props.theme.accent};
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

function Rooms({ roomClick, myname }) {
  const { data } = useQuery(SEE_ROOMS_QUERY);
  const RoomList = ({ id, users, unreadTotal, messages }) => {
    let match = useRouteMatch();
    let unread = false;
    let latestMessage = messages[messages.length - 1];
    let latestSender = latestMessage?.user?.username;
    let opponent = null;

    function onClick() {
      roomClick(id, opponent);
    }

    users.map((user) => {
      if (user.username !== myname) opponent = user;
    });

    if (opponent) {
      if (opponent.username == latestSender && unreadTotal) {
        unread = true;
      }
    }

    if (opponent)
      return (
        <Link to={`${match.url}/${id}`}>
          <RoomsContainer onClick={onClick}>
            <Avatar url={opponent.avatar} size={50} />
            <RoomsInfo>
              <UserName>{opponent.username}</UserName>
              <LatestPayload>{latestMessage?.payload}</LatestPayload>
            </RoomsInfo>
            {unread ? <UnreadIcon /> : null}
          </RoomsContainer>
        </Link>
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
