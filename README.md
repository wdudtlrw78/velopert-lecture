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
- 모듈들의 참조 관계를 해석해서 의존성 그래프를 만들고 그래프를 만들기 위해 어떤 모듈을 시작점으로 해석할지 결정하는 요소

Output
- Entry기점으로 의존성 그래프를 만들고 번들 과정을 거치면 output 요소에 설정된 정보를 기반으로 번들된 파일이 생성

기본 구조
1. 의존성 관계 포함된 src 폴더와 dist 폴더 분리
2. `npx webpack --target=node`
3.  dist 폴더에 main.js파일 생성

**Mode**
- Mode key를 통해 빌드환경을 구분 지어줄 수 있고 번들과정에서 개발모드인지 프로덕션모드인지에 따라 번들파일이 만들어지는 결과나 작업환경을 달라지게 설정할 수 있다.
1. Package.json
- `dependencies` : 어플리케이션 내부에 직접 포함되는 모듈 ( `--save` )
- `devDependencies` : 개발 과정에 필요한 모듈 ( `--save-dev` )
2. 개발환경과 프로덕션 환경
3. Mode & Webpack-merge

**Loader**
- 모듈을 해석할 때 js파일이나 json파일을 기본 모듈로 본다. 만약 다른 파일을 모듈로 해석할 때는 loader 요소 설정
- 다양한 모듈들을 입력받아 처리하는 역할
```
module.exports = {
  module: {
    rules: [loader1, loader2]
  }
}
```
**Plugin**
- 번들링의 전체적인 과정에 여러가지 설정을 할 수 있다.
```
module.exports = {
  plugins: [new Plugin({...option}), ...]
}
```

**- Handlebars(hbs) -**
- 템플릿 엔진인 Handlebars가 사용하는 템플릿 파일을 말한다.

**TemplateEnjin**
`Model` / `Template` / `View`
- 자바스크립트 코드로 연산된 결과를 변수에 넣고 변수를 뷰 파일에서도 사용할 수 있다
- 템플릿엔진 사용 이유 : 클라이언트 요청에 따라 웹문서 들어가는 내용(결과)이 달라질 수 있어서 정적인 부분과 동적인 부분을 따로 하기위해 사용
- app.js 내 html 코드를 쓰지않아도 됨
- 뷰 파일과 자바스크립트 코드를 한 파일에 정의하지않고 따로따로 사용할 수 있음 
- 자바스크립트로 연산된 결과를 뷰 파일에 쉽게 넣을 수 있음

**Caching**
- 데이터를 요청하고 받는 과정에서 비용이 발생한다.
- 데이터를 전달 받는데 걸리는 시간, 사용자가 데이터를 보고 기다리는 시간을 최소화시키는 것이 중요하는데 이를 이용하기 위해 필요한 것이 `Caching`이다.

- Caching`은 우리가 필요한 리소스들의 복사본과 같은 역할을 한다.
- 리소스의 내용이 변하지 않는다면 같은 내용을 서버에게 다시 요청할 필요가 없다.
- 서버의 요청하는 횟수가 줄어든다.
- 클라이언트는 서버보다 가까이에 위치한 데이터를 가져오기 때문에 사용자에게 훨씬 빨리 리소스를 전달하게 된다.
- `Caching`에는 여러가지의 종류들이 있고 이중 `Local Cache`은 사용자가 서버에 접속하는 환경의 `Cache`를 의미
  - 웹어플리케이션 서비스를 사용하기 위해서 브라우저를 이용할경우 브라우저 담긴 `Cache`가 `local Cache`에 해당된다

**Webpack을 통해 Caching을 효과적으로 이용하는 방법**
- 모듈들을 번들파일로 만들면 브라우저는 번들파일을 받고 웹어플리케이션을 동작시킨다.
- 지금까지 생성된 파일 기준으로 번들파일을 만들게 되면 브라우저는 같은이름으로 번들파일을 호출하게 된다.
- 브라우저가 `Caching`을 위반하는 규정은 `url`이다. 로드하는 리소스 이름이 같을경우 `Caching`을 이용하기 때문에 이전 파일이 호출된 결과로 보여지게 된다.
- 파일을 수정했을 경우 마치 수정이 안된것처럼 보인다.
- 이러한 문제를 방지하기 위해 번들파일의 이름에 `hash`값을 붙이는 것이다.
- 파일이 번들링 될 때만 `hash`값을 변경하는 것이다.
- 그러면 번들링이 되기 전까지는 같은 이름으로만 계속 사용되기 때문에 `Cache`을 이용하게 되고 수정사항이있어 코드를 수정하고 다시 번들링을 하게 되었을때 `hash`값이 바뀌기 때문에 `Cache`을 이용하지 않고 다시 새로운 번들파일을 로드하게 된다.
  1. hash
  ```
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  module.exports = {
    plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: 'bundle.[hash].js',
  },
  }
  ```
  2. content hash
  ```
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
   module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     injectType: 'singletonStyleTag',
          //   },
          // }, 충돌로 인해 주석 (MiniCssExtractPlugin)
          {
            loader: MiniCssExtractPlugin.loader
          },
    plugins: [
      new MiniCssExtractPlugin({
      filename: '[contenthash].css'
      }),
        ]
  ```
  3. chunk hash
  ```
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'venders',
          chunks: 'all',
        }
      }
    }
  },
  ```

**Minification & Mangling**
- 네트워크를 통해 전송되는 양이 커지면 사용자들에게 전달되는 콘텐츠의 도착 시간들이 늦어지게 되어서 소스코드와 리소스들의 최적화가 필요하다 

- 불필요한 코드들 (주석, console 등)을 제거하여 어플리케이션에만 필요한 코드들만 남게되어서 용량을 축소할 수 있다.

- `Mangle`: 표현의 난독화 - 변수 class 함수 등 한 두글자로 치환하는 과정 ( 분석하기가 어려움, 소스코드 압축)

  - `HTML` 문서 최적화 // https://github.com/jantimon/html-webpack-plugin#minification
  ```
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack',
      template: './template.hbs',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
      },
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
      },
    }),
  ],
  ```
  - CSS 최적화 
https://cssnano.co/
https://github.com/NMFR/optimize-css-assets-webpack-plugin
```
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
  ```
  - JavaSciprt 최적화 
    - `terser`
    ```
    const TerserWebpackplugin = require('terser-webpack-plugin');
    optimization: {
    minimize: true,
    minimizer: [new TerserWebpackplugin({
      cache: true,
    })],
  },
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
