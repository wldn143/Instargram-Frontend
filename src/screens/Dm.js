import { gql, useLazyQuery } from "@apollo/client";
import {
  faPaperPlane,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import Room from "../components/dm/Room";
import Rooms from "../components/dm/Rooms";

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

const DmContainer = styled.div`
  width: 938px;
  height: 580px;
  border: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  background-color: ${(props) => props.theme.bgColor};
`;

const RoomsContainer = styled.div`
  width: 349px;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.borderColor};
`;

const RoomsHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  padding: 0 0 0 28px;
  line-height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const UserName = styled.div`
  width: 230px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.theme.fontColor};
`;

const CreateMessageBtn = styled.div`
  width: 30px;
  padding-left: 10px;
`;

const RoomContainer = styled.div`
  height: 100%;
  width: 589px;
`;

const InitialConatiner = styled.div`
  width: 300px;
  height: 300px;
  margin: 180px 150px 150px 150px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InitialText1 = styled.span`
  display: block;
  font-size: 20px;
  padding: 12px;
`;

const InitialText2 = styled.span`
  display: block;
  text-align: center;
  color: #8e8e8e;
`;

const MButton = styled(Button)`
  width: 120px;
  margin: 25px;
`;

function Dm() {
  const { username } = useParams();

  const [clickedRoom, setClickedRoom] = useState(0);

  const roomClick = (id, opponent) => {
    setClickedRoom({ id, opponent });
  };

  const [startQueryFn, { data }] = useLazyQuery(SEE_ROOM_QUERY);

  useEffect(() => {
    clickedRoom && startQueryFn({ variables: { id: clickedRoom.id } });
  }, [clickedRoom]);

  return (
    <DmContainer>
      <RoomsContainer>
        <RoomsHeader>
          <UserName>{username}</UserName>
          <CreateMessageBtn>
            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
          </CreateMessageBtn>
        </RoomsHeader>
        <Rooms roomClick={roomClick} />
      </RoomsContainer>

      <RoomContainer>
        {clickedRoom ? (
          <Room
            roomId={clickedRoom.id}
            opponent={clickedRoom.opponent}
            messages={data?.seeRoom?.messages}
          />
        ) : (
          <InitialConatiner>
            <Column>
              <FontAwesomeIcon icon={faPaperPlane} size="3x" />
            </Column>
            <Column>
              <InitialText1>My Messages</InitialText1>
            </Column>
            <Column>
              <InitialText2>
                Send private photos or messages to friends
              </InitialText2>
            </Column>
            <Column>
              <MButton>Send Message</MButton>
            </Column>
          </InitialConatiner>
        )}
      </RoomContainer>
    </DmContainer>
  );
}
export default Dm;
