import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Avatar from "../auth/Avatar";
import Button from "../auth/Button";
import { follow, unfollow } from "./ToggleFollow";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      isMe
      isFollowing
    }
  }
`;

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const UserTextContainer = styled.div`
  width: 213px;
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

const FollowBtn = styled(Button)`
  margin-top: 0px;
  width: 77px;
  height: 32px;
`;

const MeBtn = styled.div`
  width: 77px;
  height: 32px;
`;

function UserList({ avatar, username, firstName }) {
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  const client = useApolloClient();
  const { data: userData } = useUser();

  const unfollowUserCompleted = (data) => {
    const {
      unfollowUser: { ok },
    } = data;
    if (!ok) return;
    else {
      const { cache } = client;
      const { me } = userData;
      unfollow(cache, me, username);
      console.log(client);
    }
  };

  const followUserCompleted = (data) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) return;
    else {
      const { cache } = client;
      const { me } = userData;
      follow(cache, me, username);
      console.log(client);
    }
  };

  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: unfollowUserCompleted,
  });

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });

  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <MeBtn />;
    }
    if (isFollowing) {
      return <FollowBtn onClick={unfollowUser}>Unfollow</FollowBtn>;
    } else {
      return <FollowBtn onClick={followUser}>Follow</FollowBtn>;
    }
  };

  return (
    <UserContainer>
      <Link to={`/users/${username}`}>
        <Avatar lg url={avatar} />
      </Link>

      <UserTextContainer>
        <Link to={`/users/${username}`}>
          <UserText1>{username}</UserText1>
        </Link>
        <UserText2>{firstName}</UserText2>
      </UserTextContainer>
      {data?.seeProfile ? getButton(data.seeProfile) : <MeBtn />}
    </UserContainer>
  );
}
export default UserList;
