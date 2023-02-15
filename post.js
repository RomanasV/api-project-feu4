async function init() {
  const id = 25;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}?_embed=comments`);
  const post = await res.json();
  console.log(post);
  console.log(post.title);
  console.log(post.body);
  console.log(post.comments);

  let { title, body, comments } = post;
  
  console.log(title);
  console.log(body);
  console.log(comments);

  comments.map(comment => {
    console.log(comment);
    console.log(comment.body);
    console.log(comment.email);
    console.log(comment.name);

    let { body, email, name } = comment;
    console.log(body);
    console.log(email);
    console.log(name);
  })
}

init();