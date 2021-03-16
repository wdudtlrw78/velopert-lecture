import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: 'momo1',
      email: 'momo1@gmail.com',
    },
    {
      id: 2,
      username: 'momo2',
      email: 'momo2@gmail.com',
    },
    {
      id: 3,
      username: 'momo3',
      email: 'momo3@gmail.com',
    },
  ];

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
