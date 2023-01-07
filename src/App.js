import { useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
//router 먼저 import해주지 않으면 오류남...;;;;;;;;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  console.log(darkMode);
  return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
          <Switch>
            <Route path="/" exact>
              {isLoggedIn ? <Login /> : <Home />}
            </Route>
            <NotFound />
          </Switch>
        </Router>
        <GlobalStyles />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
