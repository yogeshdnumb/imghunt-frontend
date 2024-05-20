import styles from "./GameCard.module.scss";
import { Link } from "react-router-dom";

export default function GameCard({ img, title, gameId }) {
  return (
    <div className={styles.GameCard}>
      <Link to={`/game/${gameId}`}>
        <img src={img} alt="" />
        <p className={styles.title}>{title}</p>
      </Link>
    </div>
  );
}
