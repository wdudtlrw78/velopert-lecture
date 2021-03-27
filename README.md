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