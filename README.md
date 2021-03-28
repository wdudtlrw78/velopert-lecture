## 학습내용 정리

### Redux

**- keyword**
- `Action` : 어떻게 업데이트를 하는지 정의하는 객체
  - `type`값 필수
```
ex)
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "learn redux",
  }
}
```

- `Action Creator` : paramater를 받아와서 액션 객체를 만들는 함수
```
export function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  }
}

// 화살표 함수로도 만들 수 있다.
export const changeInput = text => ({
  type: "CHANGE_INPUT",
  text,
})
```
- `Reducer`: 변화를 일으키는 함수
  - 만약 state가 숫자가 아닌 객체나 배열이면 불변성 유지 `Spread`, `concat` 사용
```
function counter(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - ;
    default:
      return state;   
  }
}
```
- `Store` : 하나의 애플리케이션당 하나의 Store를 만든다. Store 안에는 현재 App의 상태와 Reducer가 들어있으며 추가적으로 다음과 같이 내장되어있다.
  - `dispatch` : `dispatch({ type: 'INCREASE' })` 형태로 호출한다. 호출하게 되면 해당 `Aaction`이 `Reducer`에게 전달되어서 `Reducer` 함수에서 새로운 `State`를 반환해주면 `Store` 상태가 새로워진다.

  - `subscribe`: `Aaction`이 발생되어서 `State`가 업데이트 됬을 때 특정 함수 를 호출시킬 수 있다.

**- 3가지 규칙**
1. 하나의 애플리케이션엔 하나의 스토어가 있다.
2. 상태는 읽기전용이다. 즉, <b>불변성을 지켜야한다.</b> 특히 배열의 `map`,`filter`, `concat`, `slice` 등 사용하자
3. 변화를 일으키는 함수 리듀서는 <b>순수한 함수</b>여야 한다.
- `순수한 함수`: 리듀서 함수는 이전 상태와, 액션 객체를 파라미터로 받는다. 이전의 상태는 절대로 변경하지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환합니다. <b>똑같은 파라미터</b>로 호출된 리듀서 함수는 <b>언제나 똑같은 결과값</b>을 반환해야 한다.

**Ducks 패턴**
- 한 파일에 몰아서 사용하자
<br>

**- 컨테이너와 프리젠테이셔널 컴포넌트 분리 -**
<br>
![Redux](/images/Redux.png) 
<br>
<br>
**- Redux middleWare -**
```
const middleware = store => next => action => {
  // 하고싶은 작업
}

function middleware(store) {
  return function (next) {
    return function (action) {
      // 하고싶은 작업
    }
  }
}
```
![Redux middleware](/images/2.png) 
<br>
**- redux-logger -**
```
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
```
<br>

**- redux-thunk -**
- <b>액션 객체</b>가 아닌 <b>함수</b>를 디스패치 할 수 있다.
```
const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)
```
이를 활용하여
- thunk function
```
const getComments = () => (dispatch, getState) => {
  // 이 안에서는 액션을 dispatch 할 수도 있고
  // getState를 사용하여 현재 상태도 조회 할 수 있다.
  const id = getState().post.activeId;

  // 요청이 시작했음을 알리는 액션
  dispatch({ type: 'GET_COMMENTS' });

  // 댓글을 조회하는 프로미스를 반환하는 getComments 가 있다고 가정
  api
    .getComments(id) // 요청을하고
    .then(comments => dispatch({ type: 'GET_COMMENTS_SUCCESS', id, comments })) // 성공시
    .catch(e => dispatch({ type: 'GET_COMMENTS_ERROR', error: e })) // 실패시
};

// 컴포넌트에서
dispatch(getComments());
```
