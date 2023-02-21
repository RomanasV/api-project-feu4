import createPageMainHeader from './header.js';
import { fetchData, firstLetterUpperCase, getParams } from './functions.js';
import { API_URL } from './config.js';

async function init() {
  const pageContent = document.querySelector('#page-content');
  pageContent.before(createPageMainHeader());

  const id = getParams('post_id');

  const post = await fetchData(`${API_URL}/posts/${id}?_embed=comments&_expand=user`);
  let { title, body, comments, user } = post;

  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  const postContent = renderPostContent(title, body, user, id);
  const postComments = renderPostComments(comments);
  const otherAuthorPosts = document.createElement('a');
  otherAuthorPosts.textContent = 'Other posts by ' + user.name;
  otherAuthorPosts.href = './posts.html?user_id=' + user.id;
  
  postWrapper.append(postContent, postComments, otherAuthorPosts);
  pageContent.append(postWrapper);
}

function renderPostContent(title, body, user, id) {
  const postContent = document.createElement('div');
  postContent.classList.add('post-content');

  const postTitle = document.createElement('h1');
  postTitle.classList.add('post-title');
  postTitle.textContent = firstLetterUpperCase(title);

  const postAuthor = document.createElement('span');
  postAuthor.innerHTML = `Author: <a href="./user.html?user_id=${user.id}">${user.name}</a>`;

  const postBody = document.createElement('p');
  postBody.classList.add('post-body');
  postBody.textContent = firstLetterUpperCase(body);

  const postEditLink = document.createElement('a');
  postEditLink.textContent = 'Edit Post';
  postEditLink.href = './edit-post.html?post_id=' + id;

  postContent.append(postTitle, postAuthor, postBody, postEditLink);

  return postContent;
}

function renderPostComments(comments) {
  const postComments = document.createElement('div');
  postComments.classList.add('post-comments');

  const sectionTitle = document.createElement('h2');

  postComments.append(sectionTitle);

  if (comments.length === 0) {
    sectionTitle.textContent = 'No comments. By the first one...';
    return postComments;
  }

  sectionTitle.textContent = 'Comments:';

  const commentsList = document.createElement('div');
  commentsList.classList.add('comments-list');
  
  comments.map(comment => {
    let { body, email, name, id } = comment;

    const commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');

    commentItem.innerHTML = `<h3 class="comment-name">${firstLetterUpperCase(name)}</h3>
                             <span class="comment-author">Email: ${email}</span>
                             <p class="comment-body">${firstLetterUpperCase(body)}</p>`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove';

    removeButton.addEventListener('click', () => {
      fetchData(`${API_URL}/comments/${id}`, {
        method: 'DELETE',
      })

      commentItem.remove();
    })

    commentItem.append(removeButton);
    commentsList.append(commentItem);
  })

  postComments.append(commentsList);
  return postComments;
}

init();