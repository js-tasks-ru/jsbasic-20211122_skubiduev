function sumSalary(salaries) {
  // ваш код...
  let a = 0;
  for (let b in salaries) {
    if (typeof salaries[b] === 'number' && !Number.isNaN(salaries[b]) && Number.isFinite(salaries[b])) {
      a += salaries[b];
    }
  }
  return a;
}
