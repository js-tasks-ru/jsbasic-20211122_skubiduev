function filterRange(arr, a, b) {
  // ваш код...
  let c = [];
  for (let d of arr) {
    if (d >= a && d <= b) {
      c.push(d);
    }
  }
  return c;
}
