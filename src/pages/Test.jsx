import React, { useEffect, useState } from 'react';

function Test() {
  const [songsBackend, setSongsBackend] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/songs`)
      .then((response) => response.json())
      .then((data) => {
        setSongsBackend(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Liste des chansons</h1>
      <ul>
        {songsBackend.map((song) => (
          <li key={song._id}>
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
