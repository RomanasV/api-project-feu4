import { API_URL } from "./config.js";
import { createPageMainHeader } from "./header.js";

async function init() {
  const res = await fetch(`${API_URL}/users?_embed=posts`);
  const users = await res.json();

  const pageContent = document.querySelector('#page-content');
  const header = createPageMainHeader();
  const usersList = createListElement(users);
  pageContent.append(usersList);
  pageContent.before(header);
}

function createListElement(users) {
  const usersList = document.createElement('ul');
  usersList.classList.add('users-list', 'data-list');

  users.forEach(user => {
    const postsCount = user.posts.length;
    const userItem = document.createElement('li');
    userItem.classList.add('user-item');
    userItem.innerHTML = `<a href="./user.html">${user.name} (${postsCount})</a>`;

    usersList.append(userItem);
  })

  return usersList;
}

init();
