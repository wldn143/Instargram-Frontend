import { isLoggedInVar } from "../apollo";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(true)}>로그인</button>
    </div>
  );
}
export default Home;
