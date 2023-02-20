import { fetchData, firstLetterUpperCase } from './functions.js';
import createPageMainHeader from './header.js';

async function init() {
  const id = 7;
  const album = await fetchData(`https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`);

  const pageContent = document.querySelector('#page-content');

  pageContent.before(createPageMainHeader());

  const albumWrapper = renderAlbumPage(album);

  pageContent.append(albumWrapper);
}

function renderAlbumPage(album) {
  const albumWrapper = document.createElement('div');
  albumWrapper.classList.add('album-wrapper');

  let { title, photos, user } = album;
  const albumTitle = document.createElement('h1');
  albumTitle.textContent = firstLetterUpperCase(title);

  const albumAuthor = document.createElement('span');
  albumAuthor.innerHTML = `Album created by <a href="./user.html?user_id=${user.id}">${user.name}</a>`;

  const albumPhotosList = document.createElement('div');
  albumPhotosList.classList.add('album-photos-list');

  albumWrapper.append(albumTitle, albumAuthor, albumPhotosList);

  photos.map(photo => {
    let { title, thumbnailUrl, url } = photo;

    const photoLink = document.createElement('a');
    photoLink.target = '_blank';
    photoLink.href = url;

    const photoElement = document.createElement('img');
    photoElement.src = thumbnailUrl;
    photoElement.alt = title;

    photoLink.append(photoElement);

    albumPhotosList.append(photoLink);
  })

  return albumWrapper;
}

init();