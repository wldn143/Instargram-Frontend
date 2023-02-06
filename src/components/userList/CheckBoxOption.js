import { useState } from "react";
import styled from "styled-components";

const CheckBoxContainer = styled.button`
  width: 40px;
  height: 40px;
  padding: 8px;
  border: none;
  cursor: pointer;
  background-color: inherit;
`;

const Circle = styled.div`
  width: 22px;
  height: 22px;
  border-color: ${(props) => props.theme.fontColor};
  border: 1.5px solid ${(props) => (props.isSelected ? "#0095f6" : "black")};
  border-radius: 50%;
  background-color: ${(props) => (props.isSelected ? "#0095f6" : "inherit")};
  color: white;
  font-size: 18px;
`;

function CheckBoxOption({ username, reciverFn }) {
  const [selectedUser, setSelectedUser] = useState(false);
  const clickBox = () => {
    if (!selectedUser) reciverFn(username);
    else reciverFn(null);

    let prev = selectedUser;
    setSelectedUser(!prev);
  };
  return (
    <>
      <CheckBoxContainer>
        <Circle onClick={clickBox} isSelected={selectedUser}>
          {selectedUser ? "✓" : null}
        </Circle>
      </CheckBoxContainer>
    </>
  );
}
export default CheckBoxOption;
