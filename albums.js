import { fetchData } from "./functions.js";
import createPageMainHeader from "./header.js";

async function init() {
  const albums = await fetchData('https://jsonplaceholder.typicode.com/albums?_limit=30&_embed=photos&_expand=user');

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

init();