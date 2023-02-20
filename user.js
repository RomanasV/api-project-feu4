import { API_URL } from './config.js';
import { fetchData, firstLetterUpperCase } from './functions.js';

async function init() {
  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const id = urlParams.get('user_id');
  
  const user = await fetchData(`${API_URL}/users/${id}?_embed=posts&_embed=albums`);

  const pageContent = document.querySelector('#page-content');
  const userInfo = renderUserInfo(user);
  const postsWrapper = renderPosts(user.posts, user.name);
  const albumsWrapper = renderAlbums(user.albums, user.name);
  pageContent.append(userInfo, postsWrapper, albumsWrapper);

}

function renderUserInfo(user) {
  let { name, email, phone, username, website } = user;
  let { city, street, suite, zipcode } = user.address;
  let { lat, lng } = user.address.geo;
  let companyName = user.company.name;

  const userInfoWrapper = document.createElement('div');
  userInfoWrapper.classList.add('user-info-wrapper');

  userInfoWrapper.innerHTML = `<h1>${name} (${username})</h1>
                               <ul>
                                <li>Email: <a href="mailto:${email}">${email}</a></li>
                                <li>Phone: <a href="tel:${phone}">${phone}</a></li>
                                <li>Website: <a href="${website}" target="_blank">${website}</a></li>
                                <li>Company: ${companyName}</li>
                                <li>Address: <a href="https://www.google.com/maps/place/${lat},${lng}" target="_blank">${street} ${suite}, ${city} (${zipcode})</a></li>
                               </ul>`;

  return userInfoWrapper;
}

function renderPosts(posts, name) {
  const postsWrapper = document.createElement('div');
  postsWrapper.classList.add('posts-wrapper');

  const sectionTitle = document.createElement('h2');

  postsWrapper.append(sectionTitle);

  if (posts.length === 0) {
    sectionTitle.textContent = 'No posts :(';
    return postsWrapper;
  }

  sectionTitle.textContent = name ? name + ' posts:' : 'Posts:';

  const postsList = document.createElement('ul');
  postsList.classList.add('posts-list');

  postsWrapper.append(postsList);

  posts.map(post => {
    const postItem = document.createElement('li');
    postItem.classList.add('post-item');

    const postTitle = document.createElement('a');
    postTitle.href = './post.html?post_id=' + post.id;
    postTitle.classList.add('post-title');
    postTitle.textContent = firstLetterUpperCase(post.title);

    postItem.append(postTitle);

    postsList.append(postItem);
  })

  return postsWrapper;
}

function renderAlbums(albums, name) {
  console.log(albums);
  console.log(name);

  const albumsWrapper = document.createElement('div');
  albumsWrapper.classList.add('albums-wrapper');

  const sectionTitle = document.createElement('h2');

  albumsWrapper.append(sectionTitle);

  if (albums.length === 0) {
    sectionTitle.textContent = 'No albums :(';
    return albumsWrapper;
  }

  sectionTitle.textContent = name ? name + ' albums:' : 'Albums:';

  const albumsList = document.createElement('ul');
  albumsList.classList.add('albums-list');

  albums.map(album => {
    console.log(album);
    console.log(album.title);
    console.log(album.id);

    const albumItem = document.createElement('li');
    albumItem.classList.add('album-item');

    const albumTitle = document.createElement('a');
    albumTitle.textContent = firstLetterUpperCase(album.title);
    albumTitle.href = './album.html?album_id=' + album.id;

    albumItem.append(albumTitle);

    albumsList.append(albumItem);
  })

  albumsWrapper.append(albumsList);
  return albumsWrapper;
}

init();