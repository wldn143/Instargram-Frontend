import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;
export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    firstName
    lastName
    avatar
    isFollowing
    isMe
  }
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomFragment on Room {
    id
    unreadTotal
    messages {
      id
      payload
    }
    users {
      username
      avatar
    }
  }
`;
