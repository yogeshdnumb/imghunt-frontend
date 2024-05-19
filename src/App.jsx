import styles from "./App.module.scss";
import Router from "./Router";

export default function App() {
  return (
    <div className={styles.App}>
      <Router></Router>
    </div>
  );
}
