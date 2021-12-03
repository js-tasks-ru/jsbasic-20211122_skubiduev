function getMinMax(str) {
  // ваш код...
  let a = {}, b = str.split(' '), c = [];
  for (let d of b) {
    if (!Number.isNaN(+d)) {
      c.push(+d);
    }
  }
  for (let e = 0; e < c.length; e++) {
    if (e === 0) {
      a.min = c[e];
      a.max = c[e];
    } else {
      if (c[e] < a.min) {
        a.min = c[e];
      } else if (c[e] > a.max) {
        a.max = c[e];
      }
    }
  }
  return a;
}
