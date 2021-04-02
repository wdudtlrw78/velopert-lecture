import 'normalize.css';
import styles from './index.css';
import $ from 'jquery';
import js from './assets/1.png';

function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Hello Webpack3';

  const imgElement = document.createElement('img');
  imgElement.src = js;

  console.log(js);
  element.appendChild(imgElement);

  console.log(styles);
  element.classList = styles.helloWebpack;
  return element;
}

document.body.appendChild(component());

console.log($(`.${styles.helloWebpack}`).length);