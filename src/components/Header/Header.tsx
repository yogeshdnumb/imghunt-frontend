import styles from "./Header.module.scss";
import { useState, useRef, useEffect } from "react";
import { Clock, Home } from "react-feather";
import gisImage from "src/assets/gis.png";
import goatImage from "src/assets/goat.png";
import maskImage from "src/assets/mask.png";
import { Link } from "react-router-dom";

export default function Header({ time, findables, founds }) {
  // useEffect(() => {

  // }, []);

  return (
    <header className={styles.Header}>
      <div className={styles.logo}>ImgHunt</div>
      <div className={styles.timer}>
        <Clock size={32}></Clock>
        <p>{time}s</p>
      </div>
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
