async function init() {
  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const id = urlParams.get('user_id');
  
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}?_embed=posts&_embed=albums`);
  const user = await res.json();
  console.log(user.posts);
  console.log(user.albums);
  
  console.log(user);
  console.log(user.name);
  console.log(user.email);
  console.log(user.phone);
  console.log(user.username);
  console.log(user.website);
  console.log(user.company.name);
  console.log(user.address);
  console.log(user.address.city);
  console.log(user.address.street);
  console.log(user.address.suite);
  console.log(user.address.zipcode);
  console.log(user.address.geo);
  console.log(user.address.geo.lat);
  console.log(user.address.geo.lng);

  let { name, email, phone, username, website, posts, albums } = user;
  let { city, street, suite, zipcode } = user.address;
  let { lat, lng } = user.address.geo;
  let companyName = user.company.name;

  console.log(name);
  console.log(email);
  console.log(phone);
  console.log(username);
  console.log(website);
  console.log(companyName);
  console.log(city);
  console.log(street);
  console.log(suite);
  console.log(zipcode);
  console.log(lat);
  console.log(lng);

  // const postsRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
  // const posts = await postsRes.json();

  // const albumsRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`);
  // const albums = await albumsRes.json();

  console.log(posts);

  posts.map(post => {
    console.log(post);
    console.log(post.title);
    console.log(post.id);
  })

  console.log(albums);

  albums.map(album => {
    console.log(album);
    console.log(album.title);
    console.log(album.id);
  })
}

init();