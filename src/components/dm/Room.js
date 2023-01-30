import {
  faInfo,
  faInfoCircle,
  faPhone,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
function Room({ id, opponent }) {
  console.log(id, opponent);
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
    </>
  );
}
export default Room;
