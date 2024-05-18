import { useState, useEffect } from "react";
import api from "src/api";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(url);

    async function get() {
      try {
        const response = await api.get(url);
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    }
    get();
  }, []);

  return [data, isError, isLoading];
}
