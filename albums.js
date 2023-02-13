fetch('https://jsonplaceholder.typicode.com/albums?_limit=30')
  .then(res => res.json())
  .then(albums => {
    const pageContent = document.querySelector('#page-content');

    const albumsList = document.createElement('div');
    albumsList.classList.add('albums-list');

    pageContent.append(albumsList);

    albums.map(album => {
      fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
        .then(res => res.json())
        .then(user => {

          fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
            .then(res => res.json())
            .then(photos => {
              const title = album.title;
              const name = user.name;
              const photosNumber = photos.length;
              const randomIndex = Math.floor(Math.random() * photos.length);
              const randomPhoto = photos[randomIndex];

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
    })
  })

// 3. Tokiu pačiu principu, kaip ir vartotojų bei įrašų puslapiams, sukurti puslapį albumams (albums.html). Prie kiekvieno albumo turi būti:
// 3.1. Parašytas jo pavadinimas.
// 3.2. Parašytas vartotojo, sukūrusio šį albumą, vardas.
// 3.3. Albume esančių nuotraukų skaičius.
// 3.4. Viena nuotrauka.
// 3.5. Šis elementas turi būti nuoroda.