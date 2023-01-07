import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
};
export const darkTheme = {
  fontColor: "white",
  bgColor: "#000",
};
export const GlobalStyles = createGlobalStyle`
body{
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.fontColor};
}
`;
