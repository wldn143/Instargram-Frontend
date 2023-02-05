import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Button from "../auth/Button";
import { follow, unfollow } from "../Feed/ToggleFollow";

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

const FollowBtn = styled(Button)`
  margin-top: 0px;
  width: 77px;
  height: 32px;
`;

const MeBtn = styled.div`
  width: 77px;
  height: 32px;
`;

function FollowOption({ username }) {
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
  return <>{data?.seeProfile ? getButton(data.seeProfile) : <MeBtn />}</>;
}
export default FollowOption;
