import styled from "styled-components";
const Button = styled.button`
  border: none;
  border-radius: 8px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
  cursor: pointer;
`;

export default Button;
