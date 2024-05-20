import useFetch from "src/hooks/useFetch";
import styles from "./Leaderboard.module.scss";
import Loader from "../Loader/Loader";
import { Home } from "react-feather";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "src/api";

export default function Leaderboard({ gameId, seconds }) {
  // const [data, error, isLoading] = useFetch(`/leaderboard/${gameId}`);
  const [isTopper, setIsTopper] = useState(false);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [username, setUsername] = useState("");
  useEffect(() => {
    async function effect() {
      try {
        console.log("trying");

        const response = await api.get(`/leaderboard/${gameId} `);
        console.log(response.data);

        setData(response.data);

        if (
          seconds < response.data.toppers.at(-1).score ||
          response.data.toppers.length < 5
        ) {
          setIsTopper(true);
        }
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
      {data ? (
        isTopper ? (
          <div className={styles.prompt}>
            <label htmlFor="topperInput">Enter Name for leaderboard </label>
            <input
              id="topperInput"
              onChange={(e) => {
                console.log(username);

                setUsername(e.target.value);
              }}
            ></input>
            <button
              onClick={async () => {
                await api.post("/leaderboard/" + gameId, {
                  username: username,
                  score: seconds.toFixed(1),
                });
                const response = await api.get(`/leaderboard/${gameId} `);
                setData(response.data);
                setIsTopper(false);
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <ul className={styles.board}>
            <h2>Leaderboard</h2>
            {data.toppers.map((topper, index) => {
              return (
                <li key={index}>
                  <span>{topper.username}</span>
                  <span>{topper.score}</span>
                </li>
              );
            })}
          </ul>
        )
      ) : null}
      <nav>
        <Link to={"/"}>
          <span>
            <Home></Home>Return Home
          </span>
        </Link>
      </nav>
    </div>
  );
}
