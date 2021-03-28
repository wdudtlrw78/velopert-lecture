// 미들웨어 직접 만듬
const myLogger = store => next => action => {
  console.log(action); // 액션이 디스패치할 때 콘솔에 출력
  console.log('\tPrev',store.getState()) // next 전
  const result = next(action) // 액션을 다음 미들웨어 또는 다음 미들웨어가 없다면 리듀서에개 전달
  console.log('\tNext',store.getState()) // 액션이 리듀서에서 처리가 모두 되고난 다음에 그 다음 상태를 가져와서 콘솔에다가 출력해준다.
  return result; // 컨테이너에서(CounterContainer) 디스패치됬을 때 결과물이 여기에서 리턴하는 result이다.
}

export default myLogger;