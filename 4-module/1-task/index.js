function makeFriendsList(friends) {
  // ваш код...
  let a = document.createElement('ul'), b = '';
  for (let c of friends) {
    b += `<li>${c.firstName} ${c.lastName}</li>`;
  }
  a.innerHTML = b;
  return a;
}
