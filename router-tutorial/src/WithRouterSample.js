import React from 'react';
import { withRouter } from 'react-router-dom';

// location은 어디에서 불러오든 똑같은 정보를 읽는 반면,
// match는 현재 컴포넌트가 랜더링된 위치 기준으로 읽는다. Profile -> withRouterSample

// witRoter로 감싸주면 Route아닌 곳에서도 location, match, history 사용할 수 있다.
// 주로 조건부에서 사용한다 예를 들어서 로그인 성공했을 때 특정경로 이동 아니면 가만히 등
function WithRouterSample({ location, match, history }) {
  return (
    <div>
      <h4>location</h4>
      <textarea value={JSON.stringify(location, null, 2)} readOnly />
      <h4>match</h4>
      <textarea value={JSON.stringify(match, null, 2)} readOnly />
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
}

export default withRouter(WithRouterSample)