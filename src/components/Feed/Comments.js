import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment";

const CommentsContatiner = styled.div`
  margin-top: 10px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-weight: 600;
  font-size: 10px;
  margin-top: 10px;
  display: block;
`;

function Comments({ author, caption, commentNumber, comments }) {
  return (
    <CommentsContatiner>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1
          ? `${commentNumber} comment`
          : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
    </CommentsContatiner>
  );
}

Comments.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};
export default Comments;
