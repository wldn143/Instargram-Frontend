const unfollow = (cache, me, username) => {
  cache.modify({
    id: `User:${username}`,
    fields: {
      isFollowing(prev) {
        return false;
      },
      totalFollowers(prev) {
        return prev - 1;
      },
    },
  });

  cache.modify({
    id: `User:${me.username}`,
    fields: {
      totalFollowing(prev) {
        return prev - 1;
      },
    },
  });
};

const follow = (cache, me, username) => {
  cache.modify({
    id: `User:${username}`,
    fields: {
      isFollowing(prev) {
        return true;
      },
      totalFollowers(prev) {
        return prev + 1;
      },
    },
  });

  cache.modify({
    id: `User:${me.username}`,
    fields: {
      totalFollowing(prev) {
        return prev + 1;
      },
    },
  });
};

export { follow, unfollow };
