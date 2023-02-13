fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
  .then(res => res.json())
  .then(posts => {
    const pageContent = document.querySelector('#page-content');
    
    const postsList = document.createElement('ul');
    postsList.classList.add('posts-list', 'data-list');

    pageContent.append(postsList);

    posts.map(post => {

      fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then(res => res.json())
        .then(user => {
          const postItem = document.createElement('li');
          postItem.classList.add('post-item');
          
          const postLink = document.createElement('a');
          postLink.textContent = post.title;
          postLink.href = './post.html';

          const postAuthor = document.createElement('a');
          postAuthor.textContent = `${user.name}`;
          postAuthor.href = './user.html';

          postItem.append(postLink, ' - ', postAuthor);

          postsList.append(postItem);
        })
    })
  })