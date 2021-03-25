import React from 'react';
import WithRouterSample from './WithRouterSample';

const profileData = {
  momo: {
    name: '모영식',
    description: 'Frontend Engineer @ MOMO'
  },
  degradation: {
    name: '렌고쿠 코쥬로',
    description: '귀멸의 칼날에 나오는 귀살대 영웅 중 1명',
  },
}

function Profile({ match }) {
  const { username } = match.params;
  const profile = profileData[username];

  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>
  }
  return (
    <div>
      <h3>{username} ({profile.name})</h3>
      <p>
        {profile.description}
      </p>
      <WithRouterSample />
    </div>
  );
}

export default Profile