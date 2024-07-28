import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback((url, method = 'GET', body = null) => {
    setLoading(true);

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        return data;
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        throw error;
      });
  }, []);

  return { fetchData, data, loading, error };
};

export default useFetch;
