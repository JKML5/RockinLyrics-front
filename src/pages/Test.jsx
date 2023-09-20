function Test() {
  // TODO JK Chargement des paroles de chanson depuis le backend
  fetch(`http://localhost:3000/api/songs`).then((response) =>
    response
      .text()
      .then((songsBackend) => {
        console.log(songsBackend);
      })
      .catch((error) => console.error(error)),
  );
}

export default Test;
