fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(users => {
    const pageContent = document.querySelector('#page-content');
    
    const usersList = document.createElement('ul');
    usersList.classList.add('users-list', 'data-list');

    pageContent.append(usersList);

    users.forEach(user => {
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        .then(res => res.json())
        .then(posts => {
          const userItem = document.createElement('li');
          userItem.classList.add('user-item');
          userItem.innerHTML = `<a href="./user.html">${user.name} (${posts.length})</a>`;
    
          usersList.append(userItem);
        })
    })
  })