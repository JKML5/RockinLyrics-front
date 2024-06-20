import { useEffect } from 'react';

function Concert() {
  useEffect(() => {
    // Récupération des titres existants
    fetch(`${import.meta.env.VITE_API_URL}/concert`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return <div>Concert</div>;
}

export default Concert;
