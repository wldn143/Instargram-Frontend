import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContatiner = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
`;
function Comment({ author, payload }) {
  return (
    <CommentContatiner>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContatiner>
  );
}
Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};
export default Comment;
