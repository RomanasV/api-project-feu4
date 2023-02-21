import { fetchData, firstLetterUpperCase, getParams } from './functions.js';
import { API_URL } from './config.js';

async function init() {
  const createPostForm = document.getElementById('create-post-form');
  const userSlelectELemenet = createPostForm.user;
  const titleElement = createPostForm.title;
  const bodyElement = createPostForm.body;

  const submitButton = createPostForm.submit;
  
  const users = await fetchData(`${API_URL}/users`);

  users.map(user => {
    const userOptionElement = document.createElement('option');
    userOptionElement.textContent = user.name;
    userOptionElement.value = user.id;

    userSlelectELemenet.append(userOptionElement);
  })

  submitButton.removeAttribute('disabled');

  const postId = getParams('post_id');
  const postToEdit = await fetchData(`${API_URL}/posts/${postId}`);
  userSlelectELemenet.value = postToEdit.userId;
  titleElement.value = postToEdit.title;
  bodyElement.value = postToEdit.body;

  createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    const userId = Number(event.target.user.value);

    const newPost = await fetchData(`${API_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        id: postId,
        title,
        body,
        userId
      }),
    });

    const newPostElement = await createNewPostElement(newPost);

    const previousPostItem = document.querySelector('.post-item');
    if (previousPostItem) {
      previousPostItem.remove();
    }
    
    createPostForm.after(newPostElement);

    event.target.reset();
  })
}

async function createNewPostElement(postData) {
  let { body, title, id, userId } = postData;
  const user = await fetchData(`${API_URL}/users/${userId}`);
  
  const postItem = document.createElement('div');
  postItem.classList.add('post-item');

  postItem.innerHTML = `<h2 class="post-title">${firstLetterUpperCase(title)} (id: ${id})</h2>
                        <span class="post-author">Author: ${user.name}</span>
                        <p class="post-body">${firstLetterUpperCase(body)}</p>`;

  return postItem;
}

init();


