import { API_URL } from './config.js';
import { fetchData, firstLetterUpperCase, getParams } from './functions.js';
import header from './header.js';
import searchForm from './searchForm.js';

async function init() {
  const searchQuery = getParams('search-query');
  const pageContent = document.querySelector('#page-content');

  pageContent.before(header(true));

  const form = searchForm();
  const allSearchResults = await renderAllSearchResults(searchQuery);
  pageContent.append(form, allSearchResults);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchInput = event.target['search-query'].value;

    document.querySelector('.all-search-results').remove();

    const searchInputResults = await renderAllSearchResults(searchInput);
    pageContent.append(searchInputResults);
  })
}

function searchResults(searchArr, searchCategory) {
  const resultsWrapper = document.createElement('div');
  resultsWrapper.classList.add('results-wrapper');
  
  const searchWrapperTitle = document.createElement('h2');

  resultsWrapper.append(searchWrapperTitle);

  if (searchArr.length === 0) {
    searchWrapperTitle.textContent = `No ${searchCategory}... :(`;
    return resultsWrapper;
  }

  searchWrapperTitle.textContent = `${firstLetterUpperCase(searchCategory)} (${searchArr.length}):`;

  const searchList = document.createElement('ul');
  searchList.classList.add('search-list');

  resultsWrapper.append(searchList);

  searchArr.map(item => {
    const searchItem = document.createElement('li');
    searchItem.classList.add('search-item');

    const searchLink = document.createElement('a');
    searchLink.text = item.title;
    searchLink.href = item.path;

    searchItem.append(searchLink);
    searchList.append(searchItem);
  })

  return resultsWrapper;
}

async function renderAllSearchResults(searchQuery) {
  const allSearchResults = document.createElement('div');
  allSearchResults.classList.add('all-search-results');

  if (!searchQuery) {
    console.error('Nera paieskos frazes... Pakeisti :)');
    return;
  }

  console.log(searchQuery);
  
  const users = await fetchData(`${API_URL}/users?q=${searchQuery}&_limit=10`);
  const posts = await fetchData(`${API_URL}/posts?q=${searchQuery}&_limit=10&_expand=user`);
  const albums = await fetchData(`${API_URL}/albums?q=${searchQuery}&_limit=10&_expand=user`);
  const comments = await fetchData(`${API_URL}/comments?q=${searchQuery}&_limit=10`);
  const photos = await fetchData(`${API_URL}/photos?q=${searchQuery}&_limit=10`);
  
  const usersSearchData = users.map(user => {
    const userData = {
      title: user.name,
      path: './user.html?user_id=' + user.id,
    };

    return userData;
  });

  const postsSearchData = posts.map(post => {
    return {
      title: `${firstLetterUpperCase(post.title)} (${post.user.name})`,
      path: './post.html?post_id=' + post.id,
    };
  })

  const albumsSearchData = albums.map(album => {
    return {
      title: `${firstLetterUpperCase(album.title)}, created by ${album.user.name}`,
      path: './album.html?album_id=' + album.id,
    }
  })

  const searchUsers = searchResults(usersSearchData, 'users');
  const searchPosts = searchResults(postsSearchData, 'posts');
  const searchAlbums = searchResults(albumsSearchData, 'albums');

  allSearchResults.append(searchUsers, searchPosts, searchAlbums);

  return allSearchResults;
}

init();