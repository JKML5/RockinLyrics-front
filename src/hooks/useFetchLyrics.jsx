import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLyrics } from '../store';

export default function useFetchLyrics(id) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/lyrics/${id}.html`)
      .then((response) => response.text())
      .then((lyrics) => {
        dispatch(addLyrics(id, lyrics));
      })
      .catch((error) => console.error(error));
  }, [dispatch, id]);
}
