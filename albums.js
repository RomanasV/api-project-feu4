async function init() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=30&_embed=photos&_expand=user');
  const albums = await res.json();

  const pageContent = document.querySelector('#page-content');
  const albumsList = createAlbumsListElement(albums);

  pageContent.append(albumsList);
}

function createAlbumsListElement(albums) {
  const albumsList = document.createElement('div');
  albumsList.classList.add('albums-list');

  albums.map(album => {
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
    
    albumsList.append(albumItem);
  })

  return albumsList;
}

init();