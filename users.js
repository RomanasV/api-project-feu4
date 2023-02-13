fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(users => {
    console.log(users);
    const pageContent = document.querySelector('#page-content');
    
    const usersList = document.createElement('ul');
    usersList.classList.add('users-list', 'data-list');

    pageContent.append(usersList);

    users.forEach(user => {
      console.log(user.name);
      const userItem = document.createElement('li');
      userItem.classList.add('user-item');
      userItem.innerHTML = `<a href="./user.html">${user.name} (10)</a>`;

      usersList.append(userItem);
    })
  })