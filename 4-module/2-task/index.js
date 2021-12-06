function makeDiagonalRed(table) {
  // ваш код...
  let a = table.rows;
  for (let b = 0; b < a.length; b++) {
    a[b].cells[b].style.backgroundColor = 'red';
  }
}
