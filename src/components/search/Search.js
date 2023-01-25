import { gql, useApolloClient, useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { USER_FRAGMENT } from "../../fragments";
import ModalContainer from "../../shared/Modal";
import useOutSideClick from "../../shared/useOutSideClick";
import UserList from "../Feed/UserList";
import { FatText } from "../shared";
import Spinner from "../../shared/spinner.gif";
const SEARCH_USERS = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const SearchContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 669px;
  width: 397px;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(40%, -50%);
`;

const SearchHeader = styled.div`
  display: block;
  height: 70px;
  line-height: 75px;
  margin-left: 15px;
`;

const SearchHeaderText = styled(FatText)`
  font-size: 24px;
`;

const SearchBarContainer = styled.div`
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.div`
  background-color: #efefef;
  width: 365px;
  height: 40px;
  border-radius: 10px;
  display: flex;
`;

const Keyword = styled.input`
  width: 90%;
  height: 100%;
  padding-left: 10px;
`;

const DeleteBtn = styled.div`
  font-size: 15px;
  line-height: 40px;
  cursor: pointer;
`;

const SearchResultContainer = styled.div`
  height: 516px;
  border-top: 1px solid #efefef;
`;

function Search({ onClose }) {
  const modalRef = useRef(null);
  useOutSideClick(modalRef, () => onClose());

  let [keyword, setKeyword] = useState("");
  const [startQueryFn, { data, loading }] = useLazyQuery(SEARCH_USERS);

  const onChange = (e) => {
    setKeyword(e.target.value);

    startQueryFn({
      variables: { keyword: e.target.value },
    });
  };

  const deleteKeyword = () => {
    setKeyword("");
  };
  return (
    <ModalContainer>
      <SearchContainer ref={modalRef}>
        <SearchHeader>
          <SearchHeaderText>검색</SearchHeaderText>
        </SearchHeader>
        <SearchBarContainer>
          <SearchBar>
            <Keyword
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={onChange}
            />
            {keyword.length ? (
              loading ? (
                <img src={Spinner} alt="로딩중" width="5px" />
              ) : (
                <DeleteBtn onClick={deleteKeyword}>𝙓</DeleteBtn>
              )
            ) : (
              <></>
            )}
          </SearchBar>
        </SearchBarContainer>
        <SearchResultContainer>
          {keyword.length
            ? data?.searchUsers?.map((user) => (
                <UserList
                  key={user.id}
                  avatar={user.avatar}
                  username={user.username}
                  firstName={user.firstName}
                />
              ))
            : null}
        </SearchResultContainer>
      </SearchContainer>
    </ModalContainer>
  );
}
export default Search;
