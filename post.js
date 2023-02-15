async function init() {
  // const urlParams = new URLSearchParams(location.search);

  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const id = urlParams.get('post_id');
  
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}?_embed=comments`);
  const post = await res.json();
  let { title, body, comments } = post;

  const pageContent = document.querySelector('#page-content');
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');
  
  pageContent.append(postWrapper);

  const postTitle = document.createElement('h1');
  postTitle.classList.add('post-title');
  postTitle.textContent = title;

  const postBody = document.createElement('p');
  postBody.classList.add('post-body');
  postBody.textContent = body;

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