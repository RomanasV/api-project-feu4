fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
  .then(res => res.json())
  .then(users => {
    const pageContent = document.querySelector('#page-content');
    
    const usersList = document.createElement('ul');
    usersList.classList.add('users-list', 'data-list');

    pageContent.append(usersList);

    users.forEach(user => {
      const postsCount = user.posts.length;
      const userItem = document.createElement('li');
      userItem.classList.add('user-item');
      userItem.innerHTML = `<a href="./user.html">${user.name} (${postsCount})</a>`;

      usersList.append(userItem);
    })
  })