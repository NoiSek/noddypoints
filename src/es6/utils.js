export function randomRange(min, max, decimals=0) {
  let result = Math.random() * (max - min + 1) + min;

  if (decimals === 0) {
    result = Math.floor(result);
  } else {
    result = Math.floor(result * (10 * decimals)) / decimals;
  }

  return result;
}
