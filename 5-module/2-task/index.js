function toggleText() {
  // ваш код...
  document.querySelector('.toggle-text-button').addEventListener('click', () => {
    let a = document.querySelector('#text');
    a.hidden = !a.hidden;
  });

}
