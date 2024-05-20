import styles from "./Home.module.scss";
import Header from "src/components/Header/Header";
import GameCard from "src/components/GameCard/GameCard";
import Loader from "src/components/Loader/Loader";
import useFetch from "src/hooks/useFetch";

import cyberpunk_thumbnail from "assets/cyberpunk_thumbnail.jpg";

export default function Home() {
  const [data, error, isLoading] = useFetch(`/games/`);

  return (
    <div className={styles.Home}>
      <Header></Header>
      {error && <p>{error.message}</p>}``
      {isLoading && <Loader size={200}></Loader>}
      <h1>Select Image to Play!</h1>
      {data &&
        data.map((game) => {
          return (
            <GameCard
              key={game._id}
              img={game.img}
              title={game.title}
              gameId={game._id}
            ></GameCard>
          );
        })}
    </div>
  );
}
