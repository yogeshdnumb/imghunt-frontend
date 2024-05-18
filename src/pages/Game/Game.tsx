import styles from "./Game.module.scss";
import gameImage from "assets/cyberpunk.jpg";
import { useEffect, useRef, useState } from "react";

import ContextMenu from "src/components/ContextMenu/ContextMenu";
import Header from "src/components/Header/Header";

import Loader from "src/components/Loader/Loader";
import useFetch from "src/hooks/useFetch";

// Default values shown

export default function Game() {
  const [data, isError, isLoading] = useFetch("game/6648734c2efc4e1ae02fcd60");

  // const [isWon, setIsWon] = useState(false);

  const [isImgLoading, setIsImgLoading] = useState(true);

  const [isCImglicked, setImgIsClicked] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [contextMenuCoords, setContextMenuCoords] = useState({});
  const clickedCoordsRef = useRef({});

  const [founds, setFounds] = useState([]);

  function handleImgClick(event) {
    (event) => {
      // console.log(coref, state);

      if (!isCImglicked) {
        // console.log("ksnk");
        // setStartTime(Date.now());
        setInterval(() => {
          // setNow(Date.now());
          setSeconds((s) => s + 0.1);
        }, 100);
        setImgIsClicked(true);
      }

      const bounds = event.currentTarget.getBoundingClientRect();
      const x = Math.round(
        ((event.clientX - bounds.left) / bounds.width) * 100
      );
      const y = Math.round(
        ((event.clientY - bounds.top) / bounds.height) * 100
      );
      clickedCoordsRef.current = { x, y };
      console.log(clickedCoordsRef.current, contextMenuCoords);

      // console.log(event.clientX, event.clientY);
      // console.log(bounds.width, bounds.height);

      setContextMenuCoords({
        x: event.pageX + 24 + "px",
        y: event.pageY + 24 + "px",
      });
    };
  }
  if (founds == 3) {
    return <p>You Won!</p>;
  } else if (isLoading) {
    return <Loader size={200}></Loader>;
  } else if (isError) {
    return <p>Error</p>;
  } else if (data) {
    return (
      <div className={styles.Game}>
        <Header
          time={seconds.toFixed(1)}
          findables={data.findables}
          founds={founds}
        ></Header>
        {isImgLoading && <Loader size={200}></Loader>}
        <img
          src={data.img}
          className={isImgLoading ? styles.hidden : styles.gameImage}
          alt=""
          onLoad={() => {
            setIsImgLoading(false);
          }}
          onClick={handleImgClick}
        />
        <ContextMenu
          findables={data.findables}
          coords={contextMenuCoords}
          clickedCoordsRef={clickedCoordsRef}
          founds={founds}
          setFounds={setFounds}
          // setIsWon={setIsWon}
        ></ContextMenu>
      </div>
    );
  }
}
