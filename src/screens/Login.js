import { darkModeVar, isLoggedInVar } from "../apollo";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => isLoggedInVar(false)}>로그아웃</button>
      <button onClick={() => darkModeVar(false)}>to light</button>
      <button onClick={() => darkModeVar(true)}>to dark</button>
    </div>
  );
}
export default Login;
