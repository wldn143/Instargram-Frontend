import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const CommentContatiner = styled.div`
  margin-bottom: 7px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const CommentDeleteBtn = styled.button`
  outline: 0;
  border: 0;
  background-color: inherit;
  margin-left: 10px;
  opacity: 0.3;
  cursor: pointer;
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;
function Comment({ id, author, payload, isMine, photoId }) {
  const deleteCommentUpdate = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({
        id: `Comment:${id}`,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update: deleteCommentUpdate,
  });
  const onDeleteClick = () => {
    deleteComment({
      variables: {
        id,
      },
    });
  };
  return (
    <CommentContatiner>
      <FatText>{author}</FatText>
      <CommentCaption id={id}>
        {payload.split(" ").map((word, index) =>
          /#[\w]+/g.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? (
        <CommentDeleteBtn onClick={onDeleteClick}>🅇</CommentDeleteBtn>
      ) : null}
    </CommentContatiner>
  );
}
Comment.propTypes = {
  isMine: PropTypes.bool,
  id: PropTypes.number,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};
export default Comment;
