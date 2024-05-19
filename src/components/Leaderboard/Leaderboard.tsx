import useFetch from "src/hooks/useFetch";
import styles from "./Leaderboard.module.scss";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import api from "src/api";

export default function Leaderboard({ gameId, seconds }) {
  // const [data, error, isLoading] = useFetch(`/leaderboard/${gameId}`);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("0ksrnkn");

    async function effect() {
      try {
        let response = await api.get(`leaderboard/${gameId}`);
        console.log(response.data);

        if (seconds < response.data.toppers.at(-1).score) {
          const username = prompt("Enter name for leaderboard: ");
          await api.post(`/leaderboard/${gameId}`, {
            username,
            score: seconds.toFixed(1),
          });
          response = await api.get(`leaderboard/${gameId}`);
        }
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    effect();
  }, []);

  return (
    <div className={styles.Leaderboard}>
      {isLoading && <Loader size={200}></Loader>}
      {error && <p>{error.message}</p>}
      {data && (
        <ul className={styles.board}>
          {data.toppers.map((topper, index) => {
            return (
              <li key={index}>
                <span>{topper.username}</span>
                <span>{topper.score}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
