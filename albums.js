fetch('https://jsonplaceholder.typicode.com/albums?_limit=30&_embed=photos&_expand=user')
  .then(res => res.json())
  .then(albums => {
    const pageContent = document.querySelector('#page-content');

    const albumsList = document.createElement('div');
    albumsList.classList.add('albums-list');

    pageContent.append(albumsList);

    albums.map(album => {
      console.log(album)
      const title = album.title;
      const name = album.user.name;
      const photosNumber = album.photos.length;
      const randomIndex = Math.floor(Math.random() * album.photos.length);
      const randomPhoto = album.photos[randomIndex];

      const albumItem = document.createElement('div');
      albumItem.classList.add('album-item');

      const albumItemLink = document.createElement('a');
      albumItemLink.href = './album.html';

      const photoElement = document.createElement('img');
      photoElement.src = randomPhoto.thumbnailUrl;
      photoElement.title = randomPhoto.title;

      const albumTitle = document.createElement('h2');
      albumTitle.textContent = `${title} (${photosNumber}), author: ${name}`;
      
      albumItemLink.append(photoElement, albumTitle);
      albumItem.append(albumItemLink);
      
      albumsList.append(albumItem);
    })
  })
