/**
 * Fetch songs from MongoDB
 */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSongsMongoDB } from '../store';

const useFetchSongs = () => {
  const dispatch = useDispatch();
  const url = `${import.meta.env.VITE_API_URL}/song`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispatch(addSongsMongoDB(data));
      })
      .catch((error) => console.error(error));
  }, [dispatch]);
};

export default useFetchSongs;
