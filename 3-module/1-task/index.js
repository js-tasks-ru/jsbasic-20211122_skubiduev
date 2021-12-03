function namify(users) {
  // ваш код...
  let a = [];
  for (let b in users) {
    a.push(users[b].name);
  }
  return a;
}
