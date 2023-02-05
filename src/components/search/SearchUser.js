import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import styled from "styled-components";
import { USER_FRAGMENT } from "../../fragments";
import UserList from "../Feed/UserList";

const SEARCH_USERS = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const SearchResultContainer = styled.div`
  height: 516px;
  border-top: 1px solid #efefef;
`;

function SearchUser({ keyword, option }) {
  const [startQueryFn, { data, loading }] = useLazyQuery(SEARCH_USERS);

  useEffect(() => {
    startQueryFn({
      variables: { keyword },
    });
  }, [keyword]);

  return (
    <>
      <SearchResultContainer>
        {keyword.length
          ? data?.searchUsers?.map((user) => (
              <UserList
                key={user.id}
                avatar={user.avatar}
                username={user.username}
                firstName={user.firstName}
                option={option}
              />
            ))
          : null}
      </SearchResultContainer>
    </>
  );
}
export default SearchUser;
