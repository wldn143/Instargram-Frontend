import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import Photo from "../components/Feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;
function Home() {
  const history = useHistory();
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {/* <button onClick={() => logUserOut(history)}>로그아웃</button> */}
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}
export default Home;
