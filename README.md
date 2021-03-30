## 학습내용 정리

### Webpack

<b>- Module의 정의 -</b>
- 프로그램을 구성하는 내부의 코드가 기능별로 나뉘어져 있는 형태

<b>- Module의 표준 -</b>
1. CommonJs (Node.js)
2. ESM ( ECMAScript 2015 ~ )

Module Keyword : 가져오기
- CommonJs
  - `require` ( 모듈의 경로 )

- ESM
  - `import` 모듈_이름 from 모듈_위치

Module Keyword : 내보내기
- CommonJs
  - `module.exports` = {...}, 
  `module.exports` = 값, 
  `modue.exports.키_이름` = 값, 
  `exports.키_이름` = 값

- ESM
  - `export`
    `export default`

`npm i esm`은 nodeJs는 기본적으로 commonJs 형태이기 때문에 esm 모듈 설치
`npm -r esm index.js` -r 은 node 명령어 실행할 때 commonJs 표준말고 다른 모듈 표준도 설정할 수 있게 해준다.

<b>- Modeule의 종류 -</b>
1. Bulit-in Core Module ( 예: Node.js module )
2. Community-based Module ( 예: NPM )
3. Local Module ( 특정 프로젝트에 정의된 모듈 )

<b>- Bundle -</b>
- 서로 참조관계 있는 모듈들을 모아서 하나의 파일로 묶는 것을 Bundle이다.
- 모듈들의 의존성을 안전하게 유지시키면서 하나의 파일로 만드는 과정


**Bundle이 중요한이유**
1. 모든 모듈을 로드하기 위해 검색하는 시간이 단축된다.
2. 사용하지 않는 코드를 제거해준다.
3. 파일의 크기를 줄여준다.

**- Webpack -**

Entry & Output

Entry
- 모듈의 의존 관계를 이해하기 위한 시작점을 설정

Output
- Webpack이 생성하는 번들 파일에 대한 정보를 설정

기본 구조
1. 의존성 관계 포함된 src 폴더와 dist 폴더 분리
2. `npx webpack --target=node`
3.  dist 폴더에 main.js파일 생성

**Mode**
1. Package.json
- `dependencies` : 어플리케이션 내부에 직접 포함되는 모듈 ( `--save` )
- `devDependencies` : 개발 과정에 필요한 모듈 ( `--save-dev` )
2. 개발환경과 프로덕션 환경
3. Mode & Webpack-merge

**Loader**
- 다양한 모듈들을 입력받아 처리하는 역할
```
module.exports = {
  module: {
    rules: [loader1, loader2]
  }
}
```
### Redux

**- keyword**
- `Action` : 어떻게 업데이트를 하는지 정의하는 객체
  - `type`값 필수
```logResult
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
![Redux](/images/Redux.PNG) 
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
<br>

**- redux-saga -**
- 액션을 모니터링
- 비동기 작업을 진행 할 때 기존 요청을 취소 할 수 있다.
- 특정 액션이 발생 했을 때 이에 따라 다른 액션을 디스패치 하거나 자바스크립트 코드를 실행 할 수 있다.
- 웹소켓을 사용하는 경우 Channel 이라는 기능을 사용하여 더욱 효율적으로 코드를 관리 할 수 있다.
- 비동기 작업이 실패 했을 때 재시도 하는 기능을 구현 할 수 있다.
- 등 다양한 비동기 작업을 할 수 있다.

<b> Generator ! </b>
- 함수의 흐름을 특정 구간에 멈춰놓았다가 `yield` 다시 실행 `next()` 할 수 있다.
- 결과값을 여러번 내보낼 수 있다.
- redux-saga는 `Generator`에 기반한 미들웨어
```
function* generatorFunction() {
  console.log('test1');
  yield 1;
  console.log('test2');
  yield 2;
  console.log('function*');
  yield 3;
  return 4;
}
```
```
function* inifniteAddGenerator() {
    let result = 0;
    while(true) {
        result += yield result;
    }
}
undefined
 const add = inifniteAddGenerator();
undefined
add.next();
{value: 0, done: false}
add.next(10);
{value: 10, done: false}
add.next(20);
{value: 30, done: false}
add.next(30);
무한...
```
