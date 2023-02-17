import { createPageMainHeader } from './header.js';
import { firstLetterUpperCase, fetchData } from './functions.js';

async function init() {
  const posts = await fetchData('https://jsonplaceholder.typicode.com/posts?_limit=15&_expand=user');

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
    postLink.textContent = firstLetterUpperCase(post.title);
    postLink.href = './post.html?post_id=' + post.id;

    const postAuthor = document.createElement('a');
    postAuthor.textContent = `${userName}`;
    postAuthor.href = './user.html?user_id=' + post.userId;

    postItem.append(postLink, ' - ', postAuthor);

    postsList.append(postItem);
  })

  return postsList;
}

init();
