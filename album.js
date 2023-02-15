async function init() {
  const id = 7;
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`);
  const album = await res.json();

  console.log(album);
  console.log(album.title);
  console.log(album.photos);
  console.log(album.user);

  let { title, photos, user } = album;
  console.log(title);
  console.log(photos);
  console.log(user);
  console.log(user.name);

  photos.map(photo => {
    console.log(photo);
    console.log(photo.title);
    console.log(photo.thumbnailUrl);
    console.log(photo.url);

    let { title, thumbnailUrl, url } = photo;
    console.log(title);
    console.log(thumbnailUrl);
    console.log(url);
  })
}

init();