import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../auth/Avatar";
import CheckBoxOption from "../userList/CheckBoxOption";
import FollowOption from "../userList/FollowOption";

const UserContainer = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const UserTextContainer = styled.div`
  width: ${(props) => (props.option === "checkBox" ? 250 : 213)}px;
  margin: 0px 10px 0px 10px;
`;

const UserText1 = styled.div`
  font-weight: 700;
  margin-bottom: 3px;
  color: ${(props) => props.theme.color};
`;

const UserText2 = styled.div`
  color: #a8a8a8;
`;

function UserList({ avatar, username, firstName, option }) {
  const [followOption, setFollowOption] = useState(false);
  const [checkBoxOption, setcheckBoxOption] = useState(false);

  useEffect(() => {
    if (option === "follow") setFollowOption(true);
    if (option === "checkBox") setcheckBoxOption(true);
  }, [option]);

  return (
    <UserContainer>
      <Link to={`/users/${username}`}>
        <Avatar url={avatar} size={44} />
      </Link>

      <UserTextContainer option={option}>
        <Link to={`/users/${username}`}>
          <UserText1>{username}</UserText1>
        </Link>
        <UserText2>{firstName}</UserText2>
      </UserTextContainer>
      {followOption ? <FollowOption username={username} /> : null}
      {checkBoxOption ? <CheckBoxOption username={username} /> : null}
    </UserContainer>
  );
}
export default UserList;
