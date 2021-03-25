import React, { useEffect } from 'react';

function HistorySample({ history }) {
  const goBack = () => {
    history.goBack();
  }

  // 방문기록 남긴다.
  const goHome = () => {
    history.push('/');
  }

  // 방문기록 안남긴다.
  // const replaceToHome = () => {
  //   history.replace('/');
  // }

  useEffect(() => {
    console.log(history);
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    }
  }, [history]);
  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <button onClick={goHome}>홈으로</button>
      {/* <button onClick={replaceToHome}>홈으로(replace)</button> */}
    </div>
  );
}

export default HistorySample