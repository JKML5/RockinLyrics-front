/**
 * Fetch songs from MongoDB
 */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSongsMongoDB } from '../store';

const useFetchSongs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/song`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(addSongsMongoDB(data));
      })
      .catch((error) => console.error(error));
  }, [dispatch]);
};

export default useFetchSongs;
