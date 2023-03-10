import { MENU_ITEMS } from './config.js';
import searchForm from './searchForm.js';

function header(hideSearchForm) {
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
  
  if (!hideSearchForm) {
    headerElement.append(searchForm());
  }
  headerElement.append(nav);
  return headerElement;
}

export default header;