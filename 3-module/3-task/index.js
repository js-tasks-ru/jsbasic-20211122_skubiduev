function camelize(str) {
  // ваш код...
  let a = str.split('-'), b = a[0];
  for (let c of a) {
    if (c !== b) {
      b += c.charAt(0).toUpperCase() + c.slice(1);
    }
  }
  return b;
}
