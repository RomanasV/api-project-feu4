import { fetchData } from "./functions.js";
import { API_URL } from "./config.js";

async function init() {
  const id = 5;
  const post = await fetchData(API_URL + '/posts/' + id);
  // console.log(post);

  // fetch('https://jsonplaceholder.typicode.com/posts/1', {
  //   method: 'PUT',
  //   body: JSON.stringify({
  //     id: 1,
  //     title: 'naujas pavadinimas',
  //     body: 'naujas turinys',
  //     userId: 1,
  //   }),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));


  // fetch('https://jsonplaceholder.typicode.com/posts/1', {
  //   method: 'PATCH',
  //   body: JSON.stringify({
  //     userId: 5
  //   }),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));


  // fetch('https://jsonplaceholder.typicode.com/posts/1', {
  //   method: 'DELETE',
  // });
}

init();