import styled from "styled-components";

const SAvatar = styled.div`
  width: ${(props) => (props.size ? props.size : 30)}px;
  height: ${(props) => (props.size ? props.size : 30)}px;
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

function Avatar({ url, size }) {
  return (
    <SAvatar size={size}>
      <Img src={url} />
    </SAvatar>
  );
}
export default Avatar;
