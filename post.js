import { createPageMainHeader } from './header.js';
import { firstLetterUpperCase } from './functions.js';
import { API_URL } from './config.js';

async function init() {
  const pageContent = document.querySelector('#page-content');
  pageContent.before(createPageMainHeader());

  // const urlParams = new URLSearchParams(location.search);

  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const id = urlParams.get('post_id');

  const res = await fetch(`${API_URL}/posts/${id}?_embed=comments`);
  const post = await res.json();
  let { title, body, comments } = post;

  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');
  
  pageContent.append(postWrapper);

  const postTitle = document.createElement('h1');
  postTitle.classList.add('post-title');
  postTitle.textContent = firstLetterUpperCase(title);

  const postBody = document.createElement('p');
  postBody.classList.add('post-body');
  postBody.textContent = firstLetterUpperCase(body);

  postWrapper.append(post.id, postTitle, postBody);

  comments.map(comment => {
    // console.log(comment);
    // console.log(comment.body);
    // console.log(comment.email);
    // console.log(comment.name);

    let { body, email, name } = comment;
    // console.log(body);
    // console.log(email);
    // console.log(name);
  })
}

init();