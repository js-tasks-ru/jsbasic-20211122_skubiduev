function isEmpty(obj) {
  // ваш код...
  let a = true;
  for (let b in obj) {
    a = false;
  }
  return a;
}
