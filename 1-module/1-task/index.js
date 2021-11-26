function factorial(n) {
  // ваш код...
  if (n === 0 || n === 1) {
    return 1;
  }
  let b = n;
  for (let a = n - 1; a > 1; a--) {
    b *= a;
  }
  return b;
}
