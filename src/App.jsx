import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home/Home";
import Game from "pages/Game/Game";

export default function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/game" element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
