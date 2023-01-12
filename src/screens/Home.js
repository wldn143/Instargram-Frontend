import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import Photo from "../components/Feed/Photo";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments {
        payload
      }
      createdAt
      isMine
      isLiked
    }
  }
`;

function Home() {
  const history = useHistory();
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <div>
      <button onClick={() => logUserOut(history)}>로그아웃</button>
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}
export default Home;
