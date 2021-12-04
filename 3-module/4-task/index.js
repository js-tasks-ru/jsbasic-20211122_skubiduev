function showSalary(users, age) {
  // ваш код...
  let a = '';
  for (let b of users) {
    if (b.age <= age) {
      a += `${b.name}, ${b.balance}\n`;
    }
  }
  return a.slice(0, a.length - 1);
}
