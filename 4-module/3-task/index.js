function highlight(table) {
  // ваш код...
  let a = table.rows;
  for (let b of a) {
    if (b.cells[3].getAttribute('data-available') === 'true') {
      b.classList.add('available');
    } else if (b.cells[3].getAttribute('data-available') === 'false') {
      b.classList.add('unavailable');
    } else {
      b.setAttribute('hidden', 'hidden');
    }

    if (b.cells[2].textContent === 'm') {
      b.classList.add('male');
    } else {
      b.classList.add('female');
    }

    if (+b.cells[1].textContent < 18) {
      b.style.textDecoration = 'line-through';
    }
  }
}
