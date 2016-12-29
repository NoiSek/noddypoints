export function randomRange(min, max, decimals=0) {
  let result = Math.random() * (max - min + 1) + min;

  if (decimals === 0) {
    result = Math.floor(result);
  } else {
    result = Math.floor(result * (10 * decimals)) / decimals;
  }

  return result;
}

export function commafy(num) {
  var parts = (''+(num < 0 ? -num : num)).split("."), s=parts[0], L, i = L = s.length, o='';

  while(i--) {
    o = (i === 0 ? '' : ((L-i) % 3 ? '' : ',')) + s.charAt(i) + o;
  }

  return (num < 0 ? '-' : '') + o + (parts[1] ? '.' + parts[1] : '');
}
