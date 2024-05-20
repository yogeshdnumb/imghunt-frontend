import styles from "./GameCard.module.scss";
import { Link } from "react-router-dom";
import Loader from "components/Loader/Loader";
import { useState } from "react";

export default function GameCard({ img, title, gameId }) {
  const [isImgLoading, setIsImgLoading] = useState(true);

  return (
    <div className={styles.GameCard}>
      <Link to={`/game/${gameId}`}>
        {isImgLoading && <Loader size={100}></Loader>}
        <img
          src={img}
          className={isImgLoading ? styles.hidden : styles.cardImg}
          alt=""
          onLoad={() => {
            setIsImgLoading(false);
          }}
        />
        <p className={styles.title}>{title}</p>
      </Link>
    </div>
  );
}
