import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faCompass,
  faPaperPlane,
  faPlusSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./auth/Avatar";
import Search from "./search/Search";
import Upload from "./Upload/Upload";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  cursor: pointer;
  margin-left: 15px;
  input[type="file"] {
    position: absolute;
    display: none;
  }
  label {
    cursor: pointer;
  }
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  let [searchMode, setSearchMode] = useState(false);
  let [uploadMode, setUploadMode] = useState(false);
  const { data } = useUser();
  const url = data?.me?.avatar;
  const me = data?.me;
  return (
    <>
      <SHeader>
        <Wrapper>
          <Column>
            <Link to={routes.home}>
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Link>
          </Column>
          <Column>
            {isLoggedIn ? (
              <IconsContainer>
                <Icon>
                  <Link to={`/direct/${data?.me?.username}`}>
                    <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                  </Link>
                </Icon>
                <Icon>
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    size="lg"
                    onClick={() => setUploadMode(true)}
                  />
                </Icon>
                <Icon>
                  <FontAwesomeIcon
                    icon={faSearch}
                    size="lg"
                    onClick={() => setSearchMode(true)}
                  />
                </Icon>
                <Icon>
                  <Link to={routes.home}>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                  </Link>
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faCompass} size="lg" />
                </Icon>
                <Icon>
                  {url ? (
                    <Link to={`/users/${data?.me?.username}`}>
                      <Avatar url={url}></Avatar>
                    </Link>
                  ) : (
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  )}
                </Icon>
              </IconsContainer>
            ) : (
              <Link href={routes.home}>
                <Button>Login</Button>
              </Link>
            )}
          </Column>
        </Wrapper>
      </SHeader>
      {searchMode ? (
        <Search
          onClose={() => {
            setSearchMode(false);
          }}
        />
      ) : null}

      {uploadMode ? (
        <Upload
          onClose={() => {
            setUploadMode(false);
          }}
          user={me}
        />
      ) : null}
    </>
  );
}
export default Header;
