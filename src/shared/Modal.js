import { createPortal } from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

function ModalContainer({ children }) {
  return createPortal(
    <Overlay>{children}</Overlay>,
    document.getElementById("modal")
  );
}
export default ModalContainer;
