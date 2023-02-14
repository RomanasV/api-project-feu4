async function init() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=30&_embed=photos&_expand=user');
  const albums = await res.json();

  if (!albums.length || albums.length === 0) {
    return;
  }

  const pageContent = document.querySelector('#page-content');
  const header = createPageMainHeader();
  const albumsList = createAlbumsListElement(albums);

  pageContent.append(albumsList);
  pageContent.before(header);
}

function createAlbumsListElement(albums) {
  const albumsList = document.createElement('div');
  albumsList.classList.add('albums-list');

  albums.map(album => {
    const albumItem = createAlbumItemElement(album);
    albumsList.append(albumItem);
  })

  return albumsList;
}

function createAlbumItemElement(album) {
  const title = album.title;
  const name = album.user.name;
  const photosNumber = album.photos.length;
  const randomIndex = Math.floor(Math.random() * album.photos.length);
  const randomPhoto = album.photos[randomIndex];

  const albumItem = document.createElement('div');
  albumItem.classList.add('album-item');

  const albumItemLink = document.createElement('a');
  albumItemLink.href = './album.html';

  const photoElement = document.createElement('img');
  photoElement.src = randomPhoto.thumbnailUrl;
  photoElement.title = randomPhoto.title;

  const albumTitle = document.createElement('h2');
  albumTitle.textContent = `${title} (${photosNumber}), author: ${name}`;
  
  albumItemLink.append(photoElement, albumTitle);
  albumItem.append(albumItemLink);
  
  return albumItem;
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