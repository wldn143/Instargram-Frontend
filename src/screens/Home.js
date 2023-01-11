import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";

function Home() {
  const history = useHistory();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut(history)}>로그아웃</button>
    </div>
  );
}
export default Home;
