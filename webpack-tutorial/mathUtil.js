const PI = 3.14;
const getCircleArea = r => r * PI;

// commonJS
module.exports = {
  PI,
  getCircleArea
}
exports.PI = PI;
exports.getCircleArea = getCircleArea;

// ESM
export {
  PI,
  getCircleArea,
}