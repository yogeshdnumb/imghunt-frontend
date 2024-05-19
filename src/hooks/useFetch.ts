import { useState, useEffect } from "react";
import api from "src/api";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(url);

    async function effect() {
      try {
        const response = await api.get(url);
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    effect();
  }, []);

  return [data, error, isLoading];
}
