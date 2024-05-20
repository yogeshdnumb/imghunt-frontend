import styles from "./GameHeader.module.scss";
import { useState, useRef, useEffect } from "react";
import { Clock, Home } from "react-feather";
import gisImage from "src/assets/gis.png";
import goatImage from "src/assets/goat.png";
import maskImage from "src/assets/mask.png";
import { Link } from "react-router-dom";

export default function GameHeader({
  isStarted,
  setIsStarted,
  seconds,
  setSeconds,
  findables,
  founds,
  isImgLoading,
}) {
  const intervelRef = useRef(null);
  if (founds.length == 3) {
    clearInterval(intervelRef.current);
  }
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <Link to={"/"}>ImgHunt</Link>
      </div>
      {isStarted ? (
        <div className={styles.timer}>
          <Clock size={32}></Clock>
          <p>{seconds}s</p>
        </div>
      ) : (
        <button
          onClick={() => {
            console.log("CCC");

            if (!isImgLoading) {
              setIsStarted(true);
              intervelRef.current = setInterval(() => {
                // setNow(Date.now());
                setSeconds((s) => s + 0.1);
              }, 100);
            }
          }}
        >
          START
        </button>
      )}
      <div className={styles.findables}>
        {findables.map((findable) => {
          return (
            <img
              className={
                founds.includes(findable._id)
                  ? styles.found
                  : styles.contextMenuImg
              }
              src={findable.img}
              alt=""
              key={findable._id}
            />
          );
        })}
      </div>
    </header>
  );
}
