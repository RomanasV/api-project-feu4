import { MENU_ITEMS } from './config.js';

function header() {
  const headerElement = document.createElement('header');
  const nav = document.createElement('nav');
  nav.classList.add('main-navigation');
  const menuList = document.createElement('ul');
  menuList.classList.add('menu');

  MENU_ITEMS.forEach(menuItem => {
    let { title, path } = menuItem;

    const menuItemElement = document.createElement('li');
    menuItemElement.classList.add('menu-item');

    if (location.pathname === '/' + path) {
      menuItemElement.classList.add('active');
    }

    const menuLink = document.createElement('a');
    menuLink.textContent = title;
    menuLink.href = './' + path;

    menuItemElement.append(menuLink);
    menuList.append(menuItemElement);
  })

  nav.append(menuList);
  headerElement.append(searchForm(), nav);
  return headerElement;
}

function searchForm() {
  const form = document.createElement('form');
  form.classList.add('search-form');
  // form.setAttribute('action', './search.html');
  form.action = './search.html';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search...';
  searchInput.name = 'search-query';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Search';

  form.append(searchInput, submitButton);

  return form;
}

export default header;