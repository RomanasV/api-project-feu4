export default function searchForm() {
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
