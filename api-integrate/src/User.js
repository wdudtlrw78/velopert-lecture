
import { getUser, useUserDispatch, useUsersState } from './UsersContext';
import React, { useEffect } from 'react';


function User({ id }) {
  const state = useUsersState();
  const dispatch = useUserDispatch();

  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id])

  const { loading, data: user, error } = state.user;

  if (loading) return <div>로딩중..</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email: </b> {user.email}
      </p>
    </div>
  );
}

export default User