import styles from "./Game.module.scss";
import gameImage from "assets/cyberpunk.jpg";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import ContextMenu from "src/components/ContextMenu/ContextMenu";
import GameHeader from "src/components/GameHeader/GameHeader";
import Leaderboard from "src/components/Leaderboard/Leaderboard";

import Loader from "src/components/Loader/Loader";
import useFetch from "src/hooks/useFetch";

// Default values shown

export default function Game() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [data, error, isLoading] = useFetch(`game/${gameId}`);

  const [isImgLoading, setIsImgLoading] = useState(true);

  const [seconds, setSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const [contextMenuCoords, setContextMenuCoords] = useState({});
  const clickedCoordsRef = useRef({});

  const [founds, setFounds] = useState([]);

  function handleImgClick(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.round(((event.clientX - bounds.left) / bounds.width) * 100);
    const y = Math.round(((event.clientY - bounds.top) / bounds.height) * 100);
    clickedCoordsRef.current = { x, y };
    setContextMenuCoords({
      x: event.pageX + 24 + "px",
      y: event.pageY + 24 + "px",
    });
  }
  if (isLoading) {
    return <Loader size={200}></Loader>;
  } else if (error) {
    return <p>{error.message}</p>;
  } else if (data) {
    return (
      <div className={styles.Game}>
        {founds.length == 3 && (
          <Leaderboard gameId={gameId} seconds={seconds}></Leaderboard>
        )}
        <GameHeader
          seconds={seconds.toFixed(1)}
          setSeconds={setSeconds}
          findables={data.findables}
          founds={founds}
          setIsStarted={setIsStarted}
          isStarted={isStarted}
        ></GameHeader>
        {isImgLoading && <Loader size={200}></Loader>}
        <img
          src={data.img}
          className={
            isImgLoading
              ? styles.hidden
              : isStarted
              ? styles.gameImg
              : styles.gameImg + " " + styles.blur
          }
          alt=""
          onLoad={() => {
            setIsImgLoading(false);
          }}
          onClick={handleImgClick}
        />
        {isStarted && (
          <ContextMenu
            findables={data.findables}
            coords={contextMenuCoords}
            clickedCoordsRef={clickedCoordsRef}
            founds={founds}
            setFounds={setFounds}
          ></ContextMenu>
        )}
      </div>
    );
  }
}
