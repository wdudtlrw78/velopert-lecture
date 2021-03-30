const PI = 3.14;
const getCircleArea = r => r * PI;
const getSquareArea = d => d * d;

// commonJS
module.exports = {
  PI,
  getCircleArea,
  getSquareArea
}
// exports.PI = PI;
// exports.getCircleArea = getCircleArea;

// ESM
// export {
//   PI,
//   getCircleArea,
// }