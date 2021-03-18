import React from 'react';

function CreateUser({ username, email, onChange, onCreate }) {
  console.log('create User');
  return (
    <div>
      <input name="username" placeholder="계정명" onChange={onChange} value={username} />
      <input name="email" placeholder="이메일" onChange={onChange} value={email} />
      <button onClick={onCreate}>Create</button>
    </div>
  );
}

export default React.memo(CreateUser);
