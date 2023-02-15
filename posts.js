async function init() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15&_expand=user');
  const posts = await res.json();

  const pageContent = document.querySelector('#page-content');
  const header = createPageMainHeader();
  const postsList = createPostsListElement(posts);
  pageContent.append(postsList);
  pageContent.before(header);
}

function createPostsListElement(posts) {
  const postsList = document.createElement('ul');
  postsList.classList.add('posts-list', 'data-list');

  posts.map(post => {
    const userName = post.user.name;
    
    const postItem = document.createElement('li');
    postItem.classList.add('post-item');
    
    const postLink = document.createElement('a');
    postLink.textContent = post.title;
    postLink.href = './post.html?post_id=' + post.id;

    const postAuthor = document.createElement('a');
    postAuthor.textContent = `${userName}`;
    postAuthor.href = './user.html?user_id=' + post.userId;

    postItem.append(postLink, ' - ', postAuthor);

    postsList.append(postItem);
  })

  return postsList;
}

function createPageMainHeader() {
  const header = document.createElement('header');
  const nav = document.createElement('nav');
  nav.classList.add('main-navigation');
  const menuList = document.createElement('ul');
  menuList.classList.add('menu');

  const menuItems = [
    {
      title: 'Home',
      path: 'index.html',
    },
    {
      title: 'Posts',
      path: 'posts.html',
    },
    {
      title: 'Users',
      path: 'users.html',
    },
    {
      title: 'Albums',
      path: 'albums.html',
    },
  ];

  menuItems.forEach(menuItem => {
    // let title = menuItem.title;
    // let path = menuItem.path;
    let { title, path } = menuItem;

    const menuItemElement = document.createElement('li');
    menuItemElement.classList.add('menu-item');

    if (location.pathname === '/' + path) {
      menuItemElement.classList.add('active');
    }

    const menuLink = document.createElement('a');
    menuLink.textContent = title;
    menuLink.href = './' + path;

    menuItemElement.append(menuLink);
    menuList.append(menuItemElement);
  })

  nav.append(menuList);
  header.append(nav);
  return header;
}

init();
